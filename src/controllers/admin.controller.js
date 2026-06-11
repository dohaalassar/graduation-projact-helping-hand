const Child = require('../models/Child.model');
const User = require('../models/User.model');

// ─────────────────────────────────────────
// @route   PUT /api/admin/assign
// @access  Private - Admin only
// Assign a psychologist to a child
// ─────────────────────────────────────────
exports.assignPsychologist = async (req, res) => {
  try {
    const { childId, psychologistId } = req.body;

    // ── 1. Verify psychologist exists and has correct role ──
    const psychologist = await User.findById(psychologistId);
    if (!psychologist || psychologist.role !== 'psychologist') {
      return res.status(404).json({
        success: false,
        message: 'Psychologist not found.',
      });
    }

    // ── 2. Find child and assign ──
    const child = await Child.findByIdAndUpdate(
      childId,
      { assignedPsychologist: psychologistId },
      { new: true } // Return the updated document
    ).populate('assignedPsychologist', 'name email');

    if (!child) {
      return res.status(404).json({
        success: false,
        message: 'Child not found.',
      });
    }

    res.status(200).json({
      success: true,
      message: `Psychologist "${psychologist.name}" assigned to child "${child.name}".`,
      child,
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
// @route   GET /api/admin/psychologists
// @access  Private - Admin only
// Get all psychologists
// ─────────────────────────────────────────
exports.getAllPsychologists = async (req, res) => {
  try {
    const psychologists = await User.find({ role: 'psychologist' })
      .select('name email createdAt');

    res.status(200).json({
      success: true,
      count: psychologists.length,
      psychologists,
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
// @route   GET /api/admin/children
// @access  Private - Admin only
// Get all children in the system
// ─────────────────────────────────────────
exports.getAllChildren = async (req, res) => {
  try {
    const Child = require('../models/Child.model');
    const children = await Child.find()
      .populate('parent', 'name email')
      .populate('assignedPsychologist', 'name email');

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

// @route   GET /api/admin/referrals/clinical
// @desc    Get children who scored in the "Abnormal" (Clinical) range
exports.getClinicalReferrals = async (req, res) => {
  try {
    // 17–40 = Abnormal (Clinical) 
    const clinicalCases = await Child.find({ 
      totalDifficultyScore: { $gte: 17, $lte: 40 } 
    })
    .populate('parent', 'name email')
    .select('name totalDifficultyScore referralStatus createdAt');

    res.status(200).json({
      success: true,
      count: clinicalCases.length,
      data: clinicalCases,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// @route   PATCH /api/admin/settings/scenarios/:id
// @desc    Update specific game scenarios (e.g., Gaza context items) [cite: 46]
exports.updateGameScenarios = async (req, res) => {
  try {
    const Scenario = require('../models/Scenario.model'); // Ensure this model exists
    const updatedScenario = await Scenario.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );

    if (!updatedScenario) {
      return res.status(404).json({ success: false, message: 'Scenario not found.' });
    }

    res.status(200).json({
      success: true,
      message: 'Scenario updated successfully',
      data: updatedScenario,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};