const SDQQuestion = require('../models/SDQQuestion.model');
const SDQ = require('../models/SDQ.model');
const Child = require('../models/Child.model');

// @route   GET /api/sdq/questions
// @access  Private - Parent only
// Returns all 25 SDQ questions for the frontend to display
exports.getSDQQuestions = async (req, res) => {
  try {
    const questions = await SDQQuestion.find().sort({ itemNumber: 1 });

    res.status(200).json({
      success: true,
      count: questions.length,
      questions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error.',
      error: error.message,
    });
  }
};

// @route   POST /api/sdq/:childId
// @access  Private - Parent only
// Parent submits 25 answers — system calculates all scores
exports.submitSDQ = async (req, res) => {
  try {
    const { childId } = req.params;
    const { answers } = req.body;

    // ── 1. Verify child exists and belongs to this parent ──
    const child = await Child.findById(childId);
    if (!child) {
      return res.status(404).json({
        success: false,
        message: 'Child not found.',
      });
    }

    if (child.parent.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized.',
      });
    }

    // ── 2. Validate that exactly 25 answers are provided ──
    if (!answers || answers.length !== 25) {
      return res.status(400).json({
        success: false,
        message: 'Please provide answers for all 25 questions.',
      });
    }

    // ── 3. Fetch all questions from DB to get domain & isReversed ──
    const questions = await SDQQuestion.find().sort({ itemNumber: 1 });

    // ── 4. Calculate scores for each answer ──
    // Score map for normal items
    const scoreMap = {
      not_true: 0,
      somewhat_true: 1,
      certainly_true: 2,
    };

    // Score map for reversed items (flipped)
    const reversedScoreMap = {
      not_true: 2,
      somewhat_true: 1,
      certainly_true: 0,
    };

    // Domain score accumulators
    const domainScores = {
      emotional: 0,
      conduct: 0,
      hyperactivity: 0,
      peer: 0,
      prosocial: 0,
    };

    // Build the processed answers array
    const processedAnswers = answers.map((answer) => {
      // Find the matching question
      const question = questions.find(
        (q) => q.itemNumber === answer.itemNumber
      );

      if (!question) {
        throw new Error(`Question ${answer.itemNumber} not found.`);
      }

      // Calculate score based on whether item is reversed or not
      const score = question.isReversed
        ? reversedScoreMap[answer.answer]
        : scoreMap[answer.answer];

      // Add to the correct domain total
      domainScores[question.domain] += score;

      return {
        itemNumber: answer.itemNumber,
        domain: question.domain,
        answer: answer.answer,
        score,
      };
    });

    // ── 5. Calculate Total Difficulties Score ──
    // Prosocial is EXCLUDED from total difficulties
    const totalDifficulties =
      domainScores.emotional +
      domainScores.conduct +
      domainScores.hyperactivity +
      domainScores.peer;

    // ── 6. Save SDQ to database ──
    const sdq = await SDQ.create({
      child: childId,
      parent: req.user._id,
      answers: processedAnswers,
      emotionalScore:     domainScores.emotional,
      conductScore:       domainScores.conduct,
      hyperactivityScore: domainScores.hyperactivity,
      peerScore:          domainScores.peer,
      prosocialScore:     domainScores.prosocial,
      totalDifficulties,
    });

    // ── 7. Determine risk level from SDQ alone ──
    let sdqRisk;
    if (totalDifficulties <= 13)      sdqRisk = 'Normal';
    else if (totalDifficulties <= 16) sdqRisk = 'Borderline';
    else                              sdqRisk = 'Abnormal';

    res.status(201).json({
      success: true,
      message: 'SDQ submitted and scored successfully.',
      sdq: {
        id: sdq._id,
        domainScores,
        totalDifficulties,
        sdqRisk,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error.',
      error: error.message,
    });
  }
};

// @route   GET /api/sdq/:childId
// @access  Private - Parent or Psychologist
// Get the SDQ result for a specific child
exports.getSDQResult = async (req, res) => {
  try {
    const sdq = await SDQ.findOne({ child: req.params.childId })
      .populate('child', 'name age gender')
      .sort({ createdAt: -1 }); // Get the most recent one

    if (!sdq) {
      return res.status(404).json({
        success: false,
        message: 'No SDQ found for this child.',
      });
    }

    res.status(200).json({
      success: true,
      sdq,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error.',
      error: error.message,
    });
  }
};