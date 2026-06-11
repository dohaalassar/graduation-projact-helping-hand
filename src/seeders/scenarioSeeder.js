const mongoose = require('mongoose');
const Scenario = require('../models/Scenario.model'); // استيراد الموديل
const connectDB = require('../config/db'); 
require('dotenv').config(); // لتشغيل متغيرات البيئة مثل MONGO_URI

const gameOneScenarios = [
  // ===== Item 24: الخوف =====
  {
    id: '1.1',
    gameNumber: 1,
    gameName: 'رحلة المشاعر',
    domain: 'emotional',
    sdqItem: 24,
    scenarioId: '24.a',
    imageTag: 'sound_outside',
    questionText: 'أنت تلعب خارج الخيمة، وفجأة تسمع صوتاً قوياً في الخارج... ماذا تفعل؟',
    options: [
      { text: 'أركض فوراً وأبحث عن مكان للاختباء لأنني شعرت بخوف شديد', points: 2 },
      { text: 'أتوقف وأشعر بالخوف قليلاً وأبقى منتبهاً', points: 1 },
      { text: 'أنظر حولي بهدوء وأكمل ما كنت أفعله', points: 0 }
    ]
  },
  {
    id: '1.2',
    gameNumber: 1,
    gameName: 'رحلة المشاعر',
    domain: 'emotional',
    sdqItem: 24,
    scenarioId: '24.b',
    imageTag: 'night_walk',
    questionText: 'تحتاج للذهاب إلى مكان قريب ليلاً، والمكان مظلم قليلاً... ماذا تفعل؟',
    options: [
      { text: 'أرفض الذهاب أو أطلب من أحد أن يرافقني لأنني خائف جداً', points: 2 },
      { text: 'أذهب لكن أشعر بالخوف وأبقى حذراً', points: 1 },
      { text: 'أذهب بهدوء وأتعامل مع الموقف بشكل طبيعي', points: 0 }
    ]
  },
  {
    id: '1.3',
    gameNumber: 1,
    gameName: 'رحلة المشاعر',
    domain: 'emotional',
    sdqItem: 24,
    scenarioId: '24.c',
    imageTag: 'sudden_event',
    questionText: 'أثناء جلوسك، يحدث شيء مفاجئ أو صوت غير متوقع... كيف تكون ردة فعلك؟',
    options: [
      { text: 'أفزع بشكل كبير وأشعر بخوف شديد', points: 2 },
      { text: 'أنزعج قليلاً ثم أهدأ', points: 1 },
      { text: 'أبقى هادئاً وأتعامل مع الموقف بشكل طبيعي', points: 0 }
    ]
  },

  // ===== Item 13: الحزن =====
  {
    id: '2.1',
    gameNumber: 1,
    gameName: 'رحلة المشاعر',
    domain: 'emotional',
    sdqItem: 13,
    scenarioId: '13.a',
    imageTag: 'old_memories',
    questionText: 'أثناء يومك، تتذكر مكاناً أو أشخاصاً كنت تحبهم من قبل... ماذا تشعر؟',
    options: [
      { text: 'أشعر بحزن شديد وقد لا أستطيع التوقف عن التفكير في ذلك', points: 2 },
      { text: 'أشعر ببعض الحزن ثم أعود لما كنت أفعله', points: 1 },
      { text: 'أتذكر بهدوء وأكمل يومي بشكل طبيعي', points: 0 }
    ]
  },
  {
    id: '2.2',
    gameNumber: 1,
    gameName: 'رحلة المشاعر',
    domain: 'emotional',
    sdqItem: 13,
    scenarioId: '13.b',
    imageTag: 'alone_time',
    questionText: 'عندما تجلس وحدك لفترة، كيف تشعر غالباً؟',
    options: [
      { text: 'أشعر بالحزن والوحدة بشكل واضح', points: 2 },
      { text: 'أشعر بالملل أو بعض الضيق', points: 1 },
      { text: 'أكون مرتاحاً أو أجد شيئاً أشغل نفسي به', points: 0 }
    ]
  },
  {
    id: '2.3',
    gameNumber: 1,
    gameName: 'رحلة المشاعر',
    domain: 'emotional',
    sdqItem: 13,
    scenarioId: '13.c',
    imageTag: 'daily_activity',
    questionText: 'خلال يومك، كيف يكون شعورك في أغلب الأوقات؟',
    options: [
      { text: 'أشعر بالحزن أو الضيق معظم الوقت', points: 2 },
      { text: 'أحياناً أشعر بالحزن وأحياناً أكون بخير', points: 1 },
      { text: 'أشعر بأنني بخير في أغلب الوقت', points: 0 }
    ]
  },

  // ===== Item 8: القلق =====
  {
    id: '3.1',
    gameNumber: 1,
    gameName: 'رحلة المشاعر',
    domain: 'emotional',
    sdqItem: 8,
    scenarioId: '8.a',
    imageTag: 'family_talk',
    questionText: 'عندما تسمع الكبار يتحدثون عن أمور مهمة مثل الطعام أو المستقبل... ماذا يحدث؟',
    options: [
      { text: 'أفكر كثيراً وأشعر بالقلق لفترة طويلة', points: 2 },
      { text: 'أفكر قليلاً وأشعر ببعض القلق', points: 1 },
      { text: 'لا أشغل بالي كثيراً وأبقى هادئاً', points: 0 }
    ]
  },
  {
    id: '3.2',
    gameNumber: 1,
    gameName: 'رحلة المشاعر',
    domain: 'emotional',
    sdqItem: 8,
    scenarioId: '8.b',
    imageTag: 'before_sleep',
    questionText: 'عندما تستعد للنوم، كيف تكون أفكارك عادة؟',
    options: [
      { text: 'أفكر كثيراً ولا أستطيع النوم بسهولة', points: 2 },
      { text: 'أفكر قليلاً ثم أنام', points: 1 },
      { text: 'أنام بسهولة دون تفكير مزعج', points: 0 }
    ]
  },
  {
    id: '3.3',
    gameNumber: 1,
    gameName: 'رحلة المشاعر',
    domain: 'emotional',
    sdqItem: 8,
    scenarioId: '8.c',
    imageTag: 'future_thought',
    questionText: 'عندما تفكر في الأيام القادمة، كيف تشعر؟',
    options: [
      { text: 'أشعر بقلق كبير وأفكر في أشياء قد تسوء', points: 2 },
      { text: 'أشعر ببعض القلق أحياناً', points: 1 },
      { text: 'أشعر بالهدوء أو لا أفكر كثيراً', points: 0 }
    ]
  }
];

const gameTwoScenarios = [
  // ===== Item 5: الغضب =====
  {
    id: '5.1',
    gameNumber: 2,
    gameName: 'مهمة الأبطال',
    domain: 'conduct',
    sdqItem: 5,
    scenarioId: '5.a',
    imageTag: 'waiting_line',
    questionText: 'أنت في طابور طويل للحصول على شيء تريده، والانتظار أصبح مزعجاً... ماذا تفعل؟',
    options: [
      { text: 'أغضب بشدة وأترك مكاني أو أصرخ', points: 2 },
      { text: 'أنزعج وأتذمر لكن أبقى في الطابور', points: 1 },
      { text: 'أحاول الصبر وأنتظر دوري بهدوء', points: 0 }
    ]
  },
  {
    id: '5.2',
    gameNumber: 2,
    gameName: 'مهمة الأبطال',
    domain: 'conduct',
    sdqItem: 5,
    scenarioId: '5.b',
    imageTag: 'parent_request',
    questionText: 'طلب منك أحد الكبار القيام بمهمة وأنت لا ترغب بذلك... ماذا تفعل؟',
    options: [
      { text: 'أرفض بغضب وأرفع صوتي', points: 2 },
      { text: 'أتضايق وأتأخر قبل أن أستجيب', points: 1 },
      { text: 'أحاول التحكم بنفسي وأقوم بالمطلوب', points: 0 }
    ]
  },
  {
    id: '5.3',
    gameNumber: 2,
    gameName: 'مهمة الأبطال',
    domain: 'conduct',
    sdqItem: 5,
    scenarioId: '5.c',
    imageTag: 'toy_problem',
    questionText: 'حدث شيء أزعجك أثناء اللعب مع الآخرين... كيف تتصرف؟',
    options: [
      { text: 'أنفعل بسرعة وأصرخ أو أدفع من حولي', points: 2 },
      { text: 'أغضب وأبتعد عنهم', points: 1 },
      { text: 'أحاول التحدث أو حل المشكلة بهدوء', points: 0 }
    ]
  },

  // ===== Item 7: الطاعة (reverse scoring) =====
  {
    id: '7.1',
    gameNumber: 2,
    gameName: 'مهمة الأبطال',
    domain: 'conduct',
    sdqItem: 7,
    scenarioId: '7.a',
    imageTag: 'safety_rule',
    questionText: 'قيل لك أن تبقى في مكان آمن وألا تخرج... ماذا تفعل؟',
    options: [
      { text: 'أخرج دون إخبار أحد', points: 2 },
      { text: 'أتردد لكن أبقى في النهاية', points: 1 },
      { text: 'ألتزم بالتعليمات وأبقى في مكاني', points: 0 }
    ]
  },
  {
    id: '7.2',
    gameNumber: 2,
    gameName: 'مهمة الأبطال',
    domain: 'conduct',
    sdqItem: 7,
    scenarioId: '7.b',
    imageTag: 'help_request',
    questionText: 'طلب منك أحد الكبار المساعدة في عمل بسيط... ماذا تفعل؟',
    options: [
      { text: 'أتجاهل الطلب ولا أستجيب', points: 2 },
      { text: 'أتأخر أو أستجيب بعد تردد', points: 1 },
      { text: 'أساعد مباشرة دون مشكلة', points: 0 }
    ]
  },
  {
    id: '7.3',
    gameNumber: 2,
    gameName: 'مهمة الأبطال',
    domain: 'conduct',
    sdqItem: 7,
    scenarioId: '7.c',
    imageTag: 'night_rest',
    questionText: 'حان وقت النوم والجميع يريد الهدوء... ماذا تفعل؟',
    options: [
      { text: 'أستمر في الإزعاج ولا ألتزم', points: 2 },
      { text: 'أهدأ بعد بعض الوقت', points: 1 },
      { text: 'ألتزم وأحافظ على الهدوء', points: 0 }
    ]
  },

  // ===== Item 12: الشجار =====
  {
    id: '12.1',
    gameNumber: 2,
    gameName: 'مهمة الأبطال',
    domain: 'conduct',
    sdqItem: 12,
    scenarioId: '12.a',
    imageTag: 'play_conflict',
    questionText: 'أحد الأطفال ضايقك أثناء اللعب... ماذا تفعل؟',
    options: [
      { text: 'أرد عليه بضرب أو شجار', points: 2 },
      { text: 'أرد عليه بكلام غاضب', points: 1 },
      { text: 'أبتعد أو أطلب المساعدة', points: 0 }
    ]
  },
  {
    id: '12.2',
    gameNumber: 2,
    gameName: 'مهمة الأبطال',
    domain: 'conduct',
    sdqItem: 12,
    scenarioId: '12.b',
    imageTag: 'argument',
    questionText: 'اختلفت مع طفل آخر على شيء... ماذا يحدث غالباً؟',
    options: [
      { text: 'يتحول الأمر إلى شجار', points: 2 },
      { text: 'نتجادل ثم ينتهي الأمر', points: 1 },
      { text: 'نحاول حل المشكلة بدون شجار', points: 0 }
    ]
  },
  {
    id: '12.3',
    gameNumber: 2,
    gameName: 'مهمة الأبطال',
    domain: 'conduct',
    sdqItem: 12,
    scenarioId: '12.c',
    imageTag: 'group_play',
    questionText: 'أثناء اللعب مع مجموعة، إذا لم يعجبك شيء... ماذا تفعل؟',
    options: [
      { text: 'أفسد اللعب أو أتشاجر', points: 2 },
      { text: 'أنزعج وأتوقف عن اللعب', points: 1 },
      { text: 'أحاول التكيف أو اقتراح حل', points: 0 }
    ]
  },

  // ===== Item 18: الكذب =====
  {
    id: '18.1',
    gameNumber: 2,
    gameName: 'مهمة الأبطال',
    domain: 'conduct',
    sdqItem: 18,
    scenarioId: '18.a',
    imageTag: 'mistake',
    questionText: 'حدث خطأ منك ولم يره أحد... ماذا تفعل؟',
    options: [
      { text: 'أنكر أو أقول شيئاً غير صحيح', points: 2 },
      { text: 'أتردد في قول الحقيقة', points: 1 },
      { text: 'أقول ما حدث بصدق', points: 0 }
    ]
  },
  {
    id: '18.2',
    gameNumber: 2,
    gameName: 'مهمة الأبطال',
    domain: 'conduct',
    sdqItem: 18,
    scenarioId: '18.b',
    imageTag: 'avoid_trouble',
    questionText: 'إذا كنت قد تواجه مشكلة بسبب شيء فعلته... ماذا تفعل عادة؟',
    options: [
      { text: 'أحاول الهروب بالكلام غير الصحيح', points: 2 },
      { text: 'لا أقول كل الحقيقة', points: 1 },
      { text: 'أتحمل المسؤولية وأقول الحقيقة', points: 0 }
    ]
  },
  {
    id: '18.3',
    gameNumber: 2,
    gameName: 'مهمة الأبطال',
    domain: 'conduct',
    sdqItem: 18,
    scenarioId: '18.c',
    imageTag: 'story',
    questionText: 'عندما تسألك عن شيء مهم... ماذا تفعل غالباً؟',
    options: [
      { text: 'أغير القصة أو أقول شيئاً غير دقيق', points: 2 },
      { text: 'أقول جزءاً من الحقيقة', points: 1 },
      { text: 'أقول الحقيقة كما هي', points: 0 }
    ]
  },

  // ===== Item 22: أخذ أشياء =====
  {
    id: '22.1',
    gameNumber: 2,
    gameName: 'مهمة الأبطال',
    domain: 'conduct',
    sdqItem: 22,
    scenarioId: '22.a',
    imageTag: 'found_item',
    questionText: 'وجدت قربة مياه لا تخصك لوحدها في مكان عام... ماذا تفعل؟',
    options: [
      { text: 'آخذها لنفسي دون إخبار أحد', points: 2 },
      { text: 'أحتفظ بها ولا أبحث عن صاحبها', points: 1 },
      { text: 'أحاول إرجاعها لصاحبها', points: 0 }
    ]
  },
  {
    id: '22.2',
    gameNumber: 2,
    gameName: 'مهمة الأبطال',
    domain: 'conduct',
    sdqItem: 22,
    scenarioId: '22.b',
    imageTag: 'friend_item',
    questionText: 'رأيت شيئاً يعجبك يخص شخصاً آخر... ماذا تفعل؟',
    options: [
      { text: 'آخذه دون أن أطلب', points: 2 },
      { text: 'أفكر في أخذه ثم أتردد', points: 1 },
      { text: 'لا آخذه لأنه ليس لي', points: 0 }
    ]
  },
  {
    id: '22.3',
    gameNumber: 2,
    gameName: 'مهمة الأبطال',
    domain: 'conduct',
    sdqItem: 22,
    scenarioId: '22.c',
    imageTag: 'shared_space',
    questionText: 'في خيمة المدرسة، إذا وجدت شيئاً بدون صاحب واضح... ماذا تفعل؟',
    options: [
      { text: 'أعتبره لي وأستخدمه', points: 2 },
      { text: 'أستخدمه بدون التأكد', points: 1 },
      { text: 'أتركه أو أسأل عنه', points: 0 }
    ]
  }
];

const gameThreeConfig = {
  gameNumber: 3,
  gameName: 'تحدي التركيز',
  domain: 'hyperactivity',

  stages: [
    {
      stageId: 'go_no_go',
      description: 'اضغط فقط عندما ترى اللون الأخضر',
      trials: 10,
      scoring: {
        correctClick: 0,
        missedGreen: 2,
        clickedRed: 2
      }
    },
    {
      stageId: 'memory_sequence',
      description: 'تذكر الترتيب وأعده',
      sequenceLength: 3,
      scoring: {
        correct: 0,
        partial: 1,
        wrong: 2
      }
    },
    {
      stageId: 'rule_switch',
      description: 'اتبع القاعدة الجديدة',
      rules: ['circle', 'square'],
      scoring: {
        correct: 0,
        wrong: 2
      }
    }
  ]
};
// دالة التشغيل (Seed function)
const seedGameOne = async () => {
  try {
    // 1. الاتصال بقاعدة البيانات
    await connectDB();

    // 2. مسح البيانات القديمة للعبة 1 لتجنب التكرار
    await Scenario.deleteMany({ gameNumber: 1 });

    // 3. إدخال البيانات الجديدة
    await Scenario.insertMany(gameOneScenarios);

    console.log('✅ تم تشغيل اللعبة الأولى بنجاح!');
    process.exit(); // إنهاء العملية بعد النجاح
  } catch (err) {
    console.error('❌ فشل في تعبئة البيانات:', err);
    process.exit(1);
  }
};

seedGameOne();