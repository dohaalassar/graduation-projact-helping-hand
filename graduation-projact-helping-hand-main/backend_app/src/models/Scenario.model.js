const mongoose = require('mongoose');

const scenarioSchema = new mongoose.Schema({
  // رقم اللعبة (من 1 إلى 5)
  gameNumber: {
    type: Number,
    enum: [1, 2, 3, 4, 5],
    required: true
  },
  // اسم اللعبة باللغة العربية أو الإنجليزية
  gameName: {
    type: String,
    required: true
  },
  // المجال النفسي الذي تقيسه اللعبة
  domain: {
    type: String,
    enum: ['emotional', 'conduct', 'hyperactivity', 'peer', 'prosocial'],
    required: true
  },
  // رقم البند في مقياس SDQ (ضروري جداً للعشوائية)
  // مثلاً: البنود 3، 8، 13، 16، 24 للعبة الأولى
  sdqItem: {
    type: Number,
    required: true
  },
  // معرف فريد لكل سيناريو (مثلاً: "3.a", "3.b")
  scenarioId: {
    type: String, 
    required: true,
    unique: true
  },
  // الكود أو الاسم المرتبط بالصورة التي ستظهر في React
  imageTag: {
    type: String, 
    required: true
  },
  // نص السؤال باللغة العربية (سياق غزة)
  questionText: {
    type: String, 
    required: true
  },
  // خيارات الإجابة (نصوص بدلاً من إيموجي)
  options: [
    {
      text: { type: String, required: true }, 
      points: { type: Number, required: true }, // النقاط (0, 1, 2)
    }
  ],
  // حقل إضافي للألعاب التي تعتمد على "الأفخاخ" أو التفاعل السريع (مثل اللعبة 3 و 5)
  isTrap: {
    type: Boolean,
    default: false
  }
}, { timestamps: true }); // أضفت التوقيت لمتابعة متى تم إدخال البيانات

module.exports = mongoose.model('Scenario', scenarioSchema);