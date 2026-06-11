const Child = require('../models/Child.model');
const Assessment = require('../models/Assessment.model');
const SDQ = require('../models/SDQ.model');
const SpecialistAction = require('../models/SpecialistAction.model');
const Notification = require('../models/Notification.model');
const User = require('../models/User.model');

// ─────────────────────────────────────────
// @route   GET /api/psychologist/children
// @access  Private - Psychologist only
// Get all children assigned to this psychologist
// ─────────────────────────────────────────
exports.getAssignedChildren = async (req, res) => {
  try {
    const children = await Child.find({
      assignedPsychologist: req.user._id,
    }).populate('parent', 'name email');
    // populate('parent') replaces the parent ID with
    // the actual parent's name and email from User collection

    res.status(200).json({
      success: true,
      count: children.length,
      children,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error.',
      error: error.message,
    });
  }
};

// ─────────────────────────────────────────
// @route   GET /api/psychologist/children/:childId/report
// @access  Private - Psychologist only
// Get the full report for a child
// ─────────────────────────────────────────
exports.getChildFullReport = async (req, res) => {
  try {
    const { childId } = req.params;

    // ── 1. Verify this child is assigned to this psychologist ──
    const child = await Child.findById(childId)
      .populate('parent', 'name email');

    if (!child) {
      return res.status(404).json({
        success: false,
        message: 'Child not found.',
      });
    }

    if (
      !child.assignedPsychologist ||
      child.assignedPsychologist.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: 'This child is not assigned to you.',
      });
    }

    // ── 2. Get all assessments for this child ──
    const assessments = await Assessment.find({ child: childId })
      .populate('gameSessions')
      .populate('sdq')
      .sort({ createdAt: 1 }); // oldest first (session 1 then session 2)

    // ── 3. Get SDQ submitted by parent ──
    const sdq = await SDQ.findOne({ child: childId });

    // ── 4. Build the full report ──
    const report = {
      child: {
        id: child._id,
        name: child.name,
        age: child.age,
        gender: child.gender,
        parent: child.parent,
      },
      sdq: sdq
        ? {
            emotionalScore:     sdq.emotionalScore,
            conductScore:       sdq.conductScore,
            hyperactivityScore: sdq.hyperactivityScore,
            peerScore:          sdq.peerScore,
            prosocialScore:     sdq.prosocialScore,
            totalDifficulties:  sdq.totalDifficulties,
            submittedAt:        sdq.createdAt,
          }
        : null,
      assessments: assessments.map((a) => ({
        id:            a._id,
        sessionNumber: a.sessionNumber,
        status:        a.status,
        riskLevel:     a.riskLevel,
        riskLabel:     a.riskLabel,
        scores:        a.scores,
        isAnalyzed:    a.isAnalyzed,
        analyzedAt:    a.analyzedAt,
        games: a.gameSessions.map((g) => ({
          gameNumber:  g.gameNumber,
          gameName:    g.gameName,
          domain:      g.domain,
          domainScore: g.domainScore,
          completed:   g.completed,
        })),
        createdAt: a.createdAt,
      })),
      // Final risk is taken from session 2 if available, otherwise session 1
      finalRisk:
        assessments.length === 2
          ? {
              riskLevel: assessments[1].riskLevel,
              riskLabel: assessments[1].riskLabel,
              scores:    assessments[1].scores,
            }
          : assessments.length === 1
          ? {
              riskLevel: assessments[0].riskLevel,
              riskLabel: assessments[0].riskLabel,
              scores:    assessments[0].scores,
            }
          : null,
    };

    res.status(200).json({
      success: true,
      report,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error.',
      error: error.message,
    });
  }
};

// ─────────────────────────────────────────
// @route   POST /api/psychologist/children/:childId/notify
// @access  Private - Psychologist only
// Send a notification to the parent of a child
// ─────────────────────────────────────────
exports.sendNotification = async (req, res) => {
  try {
    const { childId } = req.params;
    const { type, message, assessmentId } = req.body;

    // ── 1. Find child and verify assignment ──
    const child = await Child.findById(childId);
    if (!child) {
      return res.status(404).json({
        success: false,
        message: 'Child not found.',
      });
    }

    if (
      !child.assignedPsychologist ||
      child.assignedPsychologist.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: 'This child is not assigned to you.',
      });
    }

    // ── 2. Create the notification ──
    const notification = await Notification.create({
      recipient:  child.parent,  // Send to the parent
      sender:     req.user._id,  // From this psychologist
      child:      childId,
      assessment: assessmentId || null,
      type,
      message,
    });

    // ── 3. Log this as a specialist action ──
    await SpecialistAction.create({
      psychologist:        req.user._id,
      child:               childId,
      assessment:          assessmentId || null,
      actionType:          'send_notification',
      notificationMessage: message,
    });

    res.status(201).json({
      success: true,
      message: 'Notification sent to parent successfully.',
      notification,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error.',
      error: error.message,
    });
  }
};

// ─────────────────────────────────────────
// @route   POST /api/psychologist/children/:childId/approve
// @access  Private - Psychologist only
// Approve an assessment and add professional notes
// ─────────────────────────────────────────
exports.approveAssessment = async (req, res) => {
  try {
    const { childId } = req.params;
    const { assessmentId, notes } = req.body;

    // ── 1. Verify child is assigned to this psychologist ──
    const child = await Child.findById(childId);
    if (
      !child ||
      !child.assignedPsychologist ||
      child.assignedPsychologist.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized.',
      });
    }

    // ── 2. Log the approval action ──
    const action = await SpecialistAction.create({
      psychologist: req.user._id,
      child:        childId,
      assessment:   assessmentId,
      actionType:   'approve',
      notes,
    });

    res.status(201).json({
      success: true,
      message: 'Assessment approved successfully.',
      action,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error.',
      error: error.message,
    });
  }
};

// ─────────────────────────────────────────
// @route   GET /api/psychologist/children/:childId/actions
// @access  Private - Psychologist only
// View all actions taken on a child's case
// ─────────────────────────────────────────
exports.getCaseActions = async (req, res) => {
  try {
    const actions = await SpecialistAction.find({
      child:        req.params.childId,
      psychologist: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: actions.length,
      actions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error.',
      error: error.message,
    });
  }
};

// ─────────────────────────────────────────
// @route   GET /api/psychologist/dashboard
// @access  Private - Psychologist only
// Overview: total children, risk breakdown
// ─────────────────────────────────────────
exports.getDashboard = async (req, res) => {
  try {
    // All children assigned to this psychologist
    const children = await Child.find({
      assignedPsychologist: req.user._id,
    });

    const childIds = children.map((c) => c._id);

    // Get the latest completed assessment for each child
    const assessments = await Assessment.find({
      child:  { $in: childIds },
      status: 'completed',
    });

    // Count by risk level
    const riskBreakdown = {
      green:   0,
      yellow:  0,
      red:     0,
      pending: 0,
    };

    // Track one assessment per child (the latest)
    const latestPerChild = {};
    assessments.forEach((a) => {
      const cid = a.child.toString();
      if (
        !latestPerChild[cid] ||
        new Date(a.createdAt) > new Date(latestPerChild[cid].createdAt)
      ) {
        latestPerChild[cid] = a;
      }
    });

    Object.values(latestPerChild).forEach((a) => {
      riskBreakdown[a.riskLevel] =
        (riskBreakdown[a.riskLevel] || 0) + 1;
    });

    // Children with no assessment yet
    riskBreakdown.pending =
      children.length - Object.keys(latestPerChild).length;

    res.status(200).json({
      success: true,
      dashboard: {
        totalAssignedChildren: children.length,
        riskBreakdown,
        urgentCases: riskBreakdown.red,
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