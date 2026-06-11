const mongoose = require('mongoose');

const specialistActionSchema = new mongoose.Schema(
  {
    psychologist: {
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
    actionType: {
      type: String,
      enum: ['approve', 'send_notification', 'schedule_session', 'add_note'],
      required: true,
    },
    notes: { type: String },
    notificationMessage: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('SpecialistAction', specialistActionSchema);