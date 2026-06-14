const mongoose = require('mongoose');

const scenarioSchema = new mongoose.Schema({
  // رقم اللعبة (من 1 إلى 5)
  gameNumber: {
    type: Number,
    enum: [1, 2, 3, 4, 5],
    required: true
  },
  
  gameName: {
    type: String,
    required: true
  },
  
  domain: {
    type: String,
    enum: ['emotional', 'conduct', 'hyperactivity', 'peer', 'prosocial'],
    required: true
  },
  

  sdqItem: {
    type: Number
  },
  scenarioId: {
    type: String, 
    unique: true,
    // دالة شرطية: الحقل مطلوب فقط إذا كانت اللعبة ليست اللعبة رقم 3
    required: function() { return this.gameNumber !== 3; }
  },
  imageTag: {
    type: String
  },
  questionText: {
    type: String
  },
  options: [
    {
      text: { type: String, required: true }, 
      points: { type: Number, required: true }, // النقاط (0, 1, 2)
    }
  ],
  isTrap: {
    type: Boolean,
    default: false
  },

  stages: [
    {
      stageId: { type: String, required: true },
      description: { type: String, required: true },
      scoring: { type: mongoose.Schema.Types.Mixed } 
    }
  ]

}, { timestamps: true }); 

module.exports = mongoose.model('Scenario', scenarioSchema);
