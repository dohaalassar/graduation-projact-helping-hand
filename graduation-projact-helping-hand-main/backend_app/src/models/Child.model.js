const mongoose = require('mongoose');

const childSchema = new mongoose.Schema(
  {
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Links to the User model
      required: true,
    },
    name: {
      type: String,
      required: [true, 'Child name is required'],
      trim: true,
    },
    age: {
      type: Number,
      required: [true, 'Age is required'],
      min: [7, 'Child must be at least 7 years old'],
      max: [12, 'Child must be at most 12 years old'],
    },
    gender: {
      type: String,
      enum: ['male', 'female'],
      required: true,
    },
    assignedPsychologist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
 // prevent updating anything during the game
    currentAssessmentStatus: {
      type: String,
      enum: ['idle', 'in_progress', 'blocked'], 
      default: 'idle',
    },
    nextAllowedAssessmentDate: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Child', childSchema);