const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const connectDB = require('./db');
const SDQQuestion = require('../models/SDQQuestion.model');

const sdqQuestions = [
  {
    itemNumber: 1,
    textArabic: 'يهتم بمشاعر الاخرين',
    textEnglish: "Considerate of other people's feelings",
    domain: 'prosocial',
    isReversed: false,
  },
  {
    itemNumber: 2,
    textArabic: 'لا يستطيع البقاء أو الاستقرار في مكان واحد، كثير الحركة',
    textEnglish: 'Restless, overactive, cannot stay still for long',
    domain: 'hyperactivity',
    isReversed: false,
  },
  {
    itemNumber: 3,
    textArabic: 'كثيرا ما يشكو من صداع أو آلام في البطن أو الشعور بالغثيان',
    textEnglish: 'Often complains of headaches, stomach-aches or sickness',
    domain: 'emotional',
    isReversed: false,
  },
  {
    itemNumber: 4,
    textArabic: 'يشرك الاخرين بسهولة فيما يخصه (لعب، أقلام، ألعاب، حلويات)',
    textEnglish: 'Shares readily with other children',
    domain: 'prosocial',
    isReversed: false,
  },
  {
    itemNumber: 5,
    textArabic: 'كثيرا ما تنتابه نوبات من الغضب الشديد أو سريع الغضب',
    textEnglish: 'Often has temper tantrums or hot-tempered',
    domain: 'conduct',
    isReversed: false,
  },
  {
    itemNumber: 6,
    textArabic: 'يحب العزلة، يميل إلى اللعب لوحده',
    textEnglish: 'Rather solitary, prefers to play alone',
    domain: 'peer',
    isReversed: false,
  },
  {
    itemNumber: 7,
    textArabic: 'مطيع على وجه العموم، عادة يفعل ما يطلبه منه الكبار',
    textEnglish: 'Generally obedient, usually does what adults request',
    domain: 'conduct',
    isReversed: true,
  },
  {
    itemNumber: 8,
    textArabic: 'يقلق من أشياء كثيرة، كثيرا ما يبدو عليه القلق',
    textEnglish: 'Many worries, often seems worried',
    domain: 'emotional',
    isReversed: false,
  },
  {
    itemNumber: 9,
    textArabic: 'يساعد الاخرين إذا ما حدث لأحدهم مكروه',
    textEnglish: 'Helpful if someone is hurt, upset or feeling ill',
    domain: 'prosocial',
    isReversed: false,
  },
  {
    itemNumber: 10,
    textArabic: 'يتشتت انتباهه بسرعة وقليل التركيز',
    textEnglish: 'Easily distracted, concentration wanders',
    domain: 'hyperactivity',
    isReversed: false,
  },
  {
    itemNumber: 11,
    textArabic: 'لديه على الأقل صديق واحد جيد',
    textEnglish: 'Has at least one good friend',
    domain: 'peer',
    isReversed: true,
  },
  {
    itemNumber: 12,
    textArabic: 'كثيرا ما يتعارك مع الاخرين من نفس سنه أو يستأسد عليهم',
    textEnglish: 'Often fights with other children or bullies them',
    domain: 'conduct',
    isReversed: false,
  },
  {
    itemNumber: 13,
    textArabic: 'كثيرا ما يكون غير سعيد، حزين أو يبكي بسهولة',
    textEnglish: 'Often unhappy, downhearted or tearful',
    domain: 'emotional',
    isReversed: false,
  },
  {
    itemNumber: 14,
    textArabic: 'في الغالب محبوب ممن هم في سنه',
    textEnglish: 'Generally liked by other children',
    domain: 'peer',
    isReversed: true,
  },
  {
    itemNumber: 15,
    textArabic: 'يتململ أو يتلوى باستمرار، جسمه في حركة مستمرة أثناء جلوسه',
    textEnglish: 'Constantly fidgeting or squirming',
    domain: 'hyperactivity',
    isReversed: false,
  },
  {
    itemNumber: 16,
    textArabic: 'يخاف من أشياء كثيرة، من السهل تخويفه',
    textEnglish: 'Nervous or clingy in new situations, easily loses confidence',
    domain: 'emotional',
    isReversed: false,
  },
  {
    itemNumber: 17,
    textArabic: 'كثيرا ما يتطوع لمساعدة الاخرين (الوالدين، المدرسين، الأطفال الآخرين)',
    textEnglish: 'Often volunteers to help others',
    domain: 'prosocial',
    isReversed: false,
  },
  {
    itemNumber: 18,
    textArabic: 'يسرق من البيت أو المدرسة أو من أماكن أخرى',
    textEnglish: 'Steals from home, school or elsewhere',
    domain: 'conduct',
    isReversed: false,
  },
  {
    itemNumber: 19,
    textArabic: 'ينسجم بشكل أفضل مع الكبار عنه مع الأطفال في نفس سنه',
    textEnglish: 'Gets on better with adults than with other children',
    domain: 'peer',
    isReversed: false,
  },
  {
    itemNumber: 20,
    textArabic: 'كثير الحركة لا يهدأ',
    textEnglish: 'Cannot stay still, restless',
    domain: 'hyperactivity',
    isReversed: false,
  },
  {
    itemNumber: 21,
    textArabic: 'يفكر قبل أن يتصرف',
    textEnglish: 'Thinks things out before acting',
    domain: 'hyperactivity',
    isReversed: true,
  },
  {
    itemNumber: 22,
    textArabic: 'كثيرا ما يكذب، يخدع أو يغش',
    textEnglish: 'Often lies or cheats',
    domain: 'conduct',
    isReversed: false,
  },
  {
    itemNumber: 23,
    textArabic: 'ينسجم مع الأطفال في سنه',
    textEnglish: 'Generally liked, gets along with other children',
    domain: 'peer',
    isReversed: true,
  },
  {
    itemNumber: 24,
    textArabic: 'عصبي أو متشبث بالاخرين في المواقف الجديدة',
    textEnglish: 'Many fears, easily scared',
    domain: 'emotional',
    isReversed: false,
  },
  {
    itemNumber: 25,
    textArabic: 'يتابع أداء الواجبات حتى النهاية، لديه انتباه جيد',
    textEnglish: 'Sees tasks through to the end, good attention span',
    domain: 'hyperactivity',
    isReversed: true,
  },
];

const seedSDQ = async () => {
  try {
    await connectDB(); 
    await SDQQuestion.deleteMany(); //delete old data
    console.log('Old questions removed.');
    await SDQQuestion.insertMany(sdqQuestions);//insert new data
    console.log('SDQ Questions Seeded Successfully!');
    await mongoose.connection.close();//close connection after success
    console.log('MongoDB connection closed.');
    process.exit(0); 
  } catch (error) {
    console.error(`Error: ${error.message}`);
    
    await mongoose.connection.close();//close connection after errors
    process.exit(1); 
  }
};
seedSDQ();