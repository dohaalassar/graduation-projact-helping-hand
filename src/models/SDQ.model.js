const mongoose = require('mongoose');

// Each individual answer to one SDQ question
const sdqAnswerSchema = new mongoose.Schema({
  itemNumber: { type: Number, required: true }, // 1–25
  domain: {
    type: String,
    enum: [
      'emotional',
      'conduct',
      'hyperactivity',
      'peer',
      'prosocial',
    ],
    required: true,
  },
  answer: {
    type: String,
    enum: ['not_true', 'somewhat_true', 'certainly_true'],
    required: true,
  },
  score: {
    type: Number,
    enum: [0, 1, 2],
    required: true,
  },
});

const sdqSchema = new mongoose.Schema(
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
    answers: [sdqAnswerSchema], // Array of 25 answers

    // Domain scores (calculated automatically)
    emotionalScore:    { type: Number, default: 0 },
    conductScore:      { type: Number, default: 0 },
    hyperactivityScore:{ type: Number, default: 0 },
    peerScore:         { type: Number, default: 0 },
    prosocialScore:    { type: Number, default: 0 },
    totalDifficulties: { type: Number, default: 0 }, // Sum of first 4 domains only
  },
  { timestamps: true }
);

module.exports = mongoose.model('SDQ', sdqSchema);