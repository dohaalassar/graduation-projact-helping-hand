const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema(
  {
    recipient: {
      // The parent who receives the notification
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    sender: {
      // The psychologist who sends it
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    child: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Child',
      required: true,
    },
    assessment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Assessment',
    },
    type: {
      type: String,
      enum: [
        'general_note',
        'follow_up',
        'urgent_referral',
        'session_scheduled',
        'assessment_approved',
      ],
      required: true,
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Notification', notificationSchema);