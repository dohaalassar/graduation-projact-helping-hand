const mongoose = require('mongoose');

const assessmentSchema = new mongoose.Schema(
  {
    child: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Child',
      required: true,
    },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    sessionNumber: {
      type: Number,
      enum: [1, 2], // Session 1 or Session 2 (after 7 days)
      required: true,
    },
    sdq: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SDQ',
      default: null,
    },
    gameSessions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'GameSession',
      },
    ],

    // Final computed scores
    scores: {
      emotional:    { type: Number, default: 0 },
      conduct:      { type: Number, default: 0 },
      hyperactivity:{ type: Number, default: 0 },
      peer:         { type: Number, default: 0 },
      prosocial:    { type: Number, default: 0 },
      totalDifficulties: { type: Number, default: 0 },
    },

    // Risk classification
    riskLevel: {
      type: String,
      enum: ['green', 'yellow', 'red', 'pending'],
      default: 'pending',
    },
    riskLabel: {
      type: String,
      enum: ['Normal', 'Borderline', 'Abnormal', 'Pending'],
      default: 'Pending',
    },

    status: {
      type: String,
      enum: ['in_progress', 'completed', 'cancelled', 'expired'],
      default: 'in_progress',
    },

    // Only relevant for session 2
    isAnalyzed: { type: Boolean, default: false },
    analyzedAt: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Assessment', assessmentSchema);