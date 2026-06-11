const Child = require('../models/Child.model');

// ─────────────────────────────────────────
// @route   POST /api/children
// @access  Private - Parent only
// ─────────────────────────────────────────
exports.addChild = async (req, res) => {
  try {
    const { name, age, gender } = req.body;

    // Create child and automatically link to logged-in parent
    const child = await Child.create({
      parent: req.user._id,
      name,
      age,
      gender,
    });

    res.status(201).json({
      success: true,
      message: 'Child added successfully.',
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
// @route   GET /api/children
// @access  Private - Parent only
// ─────────────────────────────────────────
exports.getMyChildren = async (req, res) => {
  try {
    // Only return children that belong to the logged-in parent
    const children = await Child.find({ parent: req.user._id });

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
// @route   GET /api/children/:id
// @access  Private - Parent only
// ─────────────────────────────────────────
exports.getOneChild = async (req, res) => {
  try {
    const child = await Child.findById(req.params.id);

    // Check child exists
    if (!child) {
      return res.status(404).json({
        success: false,
        message: 'Child not found.',
      });
    }

    // Make sure this child belongs to the logged-in parent
    if (child.parent.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this child.',
      });
    }

    res.status(200).json({
      success: true,
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
// @route   PUT /api/children/:id
// @access  Private - Parent only
// ─────────────────────────────────────────
exports.updateChild = async (req, res) => {
  try {
    const child = await Child.findById(req.params.id);

    if (!child) {
      return res.status(404).json({
        success: false,
        message: 'Child not found.',
      });
    }
    //if a child in a middle of session, no updates allowed
    const activeSession = await Assessment.findOne({ child: child._id, status: 'in_progress' });
    if (activeSession) {
      return res.status(400).json({ 
        success: false, 
        message: 'Cannot update child data while an assessment is in progress.' 
      });
    }
    // Make sure this child belongs to the logged-in parent
    if (child.parent.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this child.',
      });
    }

    // Only allow updating these fields
    const { name, age, gender } = req.body;
    if (name) child.name = name;
    if (age)  child.age  = age;
    if (gender) child.gender = gender;

    await child.save();

    res.status(200).json({
      success: true,
      message: 'Child updated successfully.',
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


// @route   GET /api/children/assigned
// @access  Private - Psychologist only
exports.getAssignedChildren = async (req, res) => {
  try {
    // Finds children where assignedPsychologist matches the logged-in user
    const children = await Child.find({ assignedPsychologist: req.user._id })
      .populate('parent', 'name email');

    res.status(200).json({
      success: true,
      count: children.length,
      children,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};