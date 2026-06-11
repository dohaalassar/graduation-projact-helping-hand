const express = require('express');
const router = express.Router();
const {
  addChild,
  getMyChildren,
  getOneChild,
  updateChild,
  getAssignedChildren, 
} = require('../controllers/child.controller');

const { protect, restrictTo } = require('../middleware/auth.middleware');

router.use(protect);

// This must be restricted to 'psychologist'
router.get('/assigned', restrictTo('psychologist'), getAssignedChildren);

// Parent-only routes
// We move the 'parent' restriction here so it doesn't block psychologists
router.post('/', restrictTo('parent'), addChild);
router.get('/', restrictTo('parent'), getMyChildren);


router.get('/:id', getOneChild); // Both parent & psychologist might need this
router.put('/:id', restrictTo('parent'), updateChild);

//  Notifications
const Notification = require('../models/Notification.model');
router.get('/notifications/all', restrictTo('parent'), async (req, res) => {
  try {
    const notifications = await Notification.find({ recipient: req.user._id })
      .populate('sender', 'name')
      .populate('child', 'name')
      .sort({ createdAt: -1 });

    await Notification.updateMany(
      { recipient: req.user._id, isRead: false },
      { isRead: true }
    );

    res.status(200).json({ success: true, count: notifications.length, notifications });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error.', error: error.message });
  }
});

module.exports = router;