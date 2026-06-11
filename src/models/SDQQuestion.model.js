const mongoose = require('mongoose');

const sdqQuestionSchema = new mongoose.Schema({
  itemNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  textArabic: {
    type: String,
    required: true,
  },
  textEnglish: {
    type: String,
    required: true,
  },
  domain: {
    type: String,
    enum: ['emotional', 'conduct', 'hyperactivity', 'peer', 'prosocial'],
    required: true,
  },
  isReversed: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('SDQQuestion', sdqQuestionSchema);