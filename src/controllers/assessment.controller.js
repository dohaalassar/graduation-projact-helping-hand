const Assessment = require('../models/Assessment.model');
const GameSession = require('../models/GameSession.model');
const SDQ = require('../models/SDQ.model');
const Child = require('../models/Child.model');

const GAME_MAP = {
  1: { name: 'Journey of Feelings',      domain: 'emotional'      },
  2: { name: 'Heroes Mission',           domain: 'conduct'        },
  3: { name: 'Focus Race',               domain: 'hyperactivity'  },
  4: { name: 'The Good Friend',          domain: 'peer'           },
  5: { name: 'The Positive Treasure Box', domain: 'prosocial'    },
};

// @route   POST /api/assessments/:childId
exports.createAssessment = async (req, res) => {
  try {
    const { childId } = req.params;

    const child = await Child.findById(childId);
    if (!child) return res.status(404).json({ success: false, message: 'Child not found.' });

    if (child.parent.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized.' });
    }

    // جلب كافة الجلسات (مكتملة وملغاة)
    const allAssessments = await Assessment.find({ child: childId }).sort({ createdAt: -1 });
    
    // 1. حساب عدد الجلسات المكتملة فقط (بحد أقصى 2)
    const completedSessions = allAssessments.filter(a => a.status === 'completed');
    if (completedSessions.length >= 2) {
      return res.status(400).json({ success: false, message: 'Child already has 2 completed sessions.' });
    }

    // 2. التحقق من "آخر جلسة" سواء كانت مكتملة أو ملغاة (شرط الـ 7 أيام)
    if (allAssessments.length > 0) {
      const lastSession = allAssessments[0];
      const daysSinceLast = Math.floor((Date.now() - new Date(lastSession.createdAt)) / (1000 * 60 * 60 * 24));

      if (daysSinceLast < 7) {
        return res.status(400).json({
          success: false,
          message: `The next attempt is available in ${7 - daysSinceLast} day(s). This cooldown applies to both completed and cancelled sessions.`
        });
      }
    }

    const sessionNumber = completedSessions.length + 1;

    const sdq = await SDQ.findOne({ child: childId });
    if (!sdq) return res.status(400).json({ success: false, message: 'Please complete parent SDQ first.' });

    const assessment = await Assessment.create({
      child: childId,
      parent: req.user._id,
      sessionNumber,
      sdq: sdq._id,
      status: 'in_progress',
    });

    res.status(201).json({ success: true, message: `Session ${sessionNumber} started.`, assessment });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error.', error: error.message });
  }
};

// @route   POST /api/assessments/:assessmentId/games/:gameNumber
exports.submitGameResult = async (req, res) => {
  try {
    const { assessmentId, gameNumber } = req.params;
    const { actions, durationSeconds } = req.body;
    const gameNum = parseInt(gameNumber);

    const assessment = await Assessment.findById(assessmentId);
    if (!assessment) return res.status(404).json({ success: false, message: 'Assessment not found.' });

    // ── شرط الـ 30 دقيقة المتواصلة ──
    const startTime = new Date(assessment.createdAt);
    const timeDiffMinutes = (Date.now() - startTime) / (1000 * 60);

    if (timeDiffMinutes > 30) {
      assessment.status = 'cancelled'; // إلغاء الجلسة فوراً
      await assessment.save();
      return res.status(400).json({ 
        success: false, 
        message: 'Session cancelled: 30-minute limit exceeded. You can retry after 7 days.' 
      });
    }

    if (assessment.status !== 'in_progress') {
      return res.status(400).json({ success: false, message: 'This session is no longer active.' });
    }

    const alreadySubmitted = await GameSession.findOne({ assessment: assessmentId, gameNumber: gameNum });
    if (alreadySubmitted) return res.status(400).json({ success: false, message: 'Game already submitted.' });

    const domainScore = actions.reduce((total, action) => total + (action.pointsAwarded || 0), 0);
    const gameInfo = GAME_MAP[gameNum];

    const gameSession = await GameSession.create({
      assessment: assessmentId,
      child: assessment.child,
      gameNumber: gameNum,
      gameName: gameInfo.name,
      domain: gameInfo.domain,
      actions,
      domainScore,
      durationSeconds,
      completed: true,
    });

    assessment.gameSessions.push(gameSession._id);
    await assessment.save();

    res.status(201).json({ success: true, gameSession });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route   POST /api/assessments/:assessmentId/finalize
exports.finalizeAssessment = async (req, res) => {
  try {
    const { assessmentId } = req.params;
    const assessment = await Assessment.findById(assessmentId).populate('gameSessions').populate('sdq');

    if (!assessment || assessment.status === 'cancelled') {
      return res.status(400).json({ success: false, message: 'Assessment invalid or cancelled.' });
    }

    // التأكد من إنهاء الألعاب الخمسة
    if (assessment.gameSessions.length < 5) {
      return res.status(400).json({ success: false, message: 'Please complete all 5 games.' });
    }

    // فحص نهائي للوقت الإجمالي عند الإغلاق
    const timeDiffMinutes = (Date.now() - new Date(assessment.createdAt)) / (1000 * 60);
    if (timeDiffMinutes > 30) {
      assessment.status = 'cancelled';
      await assessment.save();
      return res.status(400).json({ success: false, message: 'Finalization failed: Total time exceeded 30 minutes.' });
    }

    const gameScores = { emotional: 0, conduct: 0, hyperactivity: 0, peer: 0, prosocial: 0 };
    assessment.gameSessions.forEach(s => { gameScores[s.domain] += s.domainScore; });

    const sdq = assessment.sdq;
    const combinedScores = {
      emotional: Math.round((gameScores.emotional + sdq.emotionalScore) / 2),
      conduct: Math.round((gameScores.conduct + sdq.conductScore) / 2),
      hyperactivity: Math.round((gameScores.hyperactivity + sdq.hyperactivityScore) / 2),
      peer: Math.round((gameScores.peer + sdq.peerScore) / 2),
      prosocial: Math.round((gameScores.prosocial + sdq.prosocialScore) / 2),
    };

    const totalDifficulties = combinedScores.emotional + combinedScores.conduct + combinedScores.hyperactivity + combinedScores.peer;

    let riskLevel = totalDifficulties <= 13 ? 'green' : totalDifficulties <= 16 ? 'yellow' : 'red';
    
    assessment.scores = { ...combinedScores, totalDifficulties };
    assessment.riskLevel = riskLevel;
    assessment.status = 'completed';
    assessment.isAnalyzed = true;
    assessment.analyzedAt = new Date();

    await assessment.save();
    res.status(200).json({ success: true, report: assessment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// @route   GET /api/assessments/:childId
exports.getChildAssessments = async (req, res) => {
  try {
    const assessments = await Assessment.find({ child: req.params.childId })
      .populate('gameSessions')
      .populate('sdq')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: assessments.length,
      assessments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error.',
      error: error.message,
    });
  }
};