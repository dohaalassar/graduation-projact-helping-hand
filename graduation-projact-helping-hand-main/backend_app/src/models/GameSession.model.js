const mongoose = require('mongoose');

// One answer/action within a game
const gameActionSchema = new mongoose.Schema({
  scenarioId: { type: String, required: true }, // e.g., "1.1", "4.2", "8"
  selectedOption: { type: Number }, // Which option the child picked (1, 2, or 3)
  pointsAwarded: { type: Number, enum: [0, 1, 2], required: true },
  reactionTimeMs: { type: Number }, // How fast they responded (milliseconds)
});

const gameSessionSchema = new mongoose.Schema(
  {
    assessment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Assessment',
      required: true,
    },
    child: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Child',
      required: true,
    },
    gameNumber: {
      type: Number,
      enum: [1, 2, 3, 4, 5],
      required: true,
    },
    gameName: {
      type: String,
      enum: [
        'Journey of Feelings',
        'Heroes Mission',
        'Focus Race',
        'The Good Friend',
        'The Positive Treasure Box',
      ],
      required: true,
    },
    domain: {
      type: String,
      enum: ['emotional', 'conduct', 'hyperactivity', 'peer', 'prosocial'],
      required: true,
    },
    actions: [gameActionSchema], // All the child's responses inside this game
    domainScore: { type: Number, default: 0 }, // Total score for this game
    durationSeconds: { type: Number }, // How long the child spent
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('GameSession', gameSessionSchema);