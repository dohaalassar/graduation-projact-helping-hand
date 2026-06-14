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
    questionText: 'بماذا تشعر إذا سمعت صوت الزنانة العالي؟',
    options: [
      { text: 'أشعر بالخوف', points: 2 },
      { text: 'أأشعر بالقلق', points: 1 },
      { text: 'ليس لدي شعور محدد', points: 0 }
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
    questionText: 'بماذا تشعر عندما تمشي إلى الحمام البعيد في الليل؟',
    options: [
      { text: 'أشعر بالخوف', points: 2 },
      { text: 'أشعر بالقلق', points: 1 },
      { text: 'أذهب بهدوء ', points: 0 }
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
    questionText: 'بماذا تشعر عندما تسمع صوت قصف قريب؟',
    options: [
      { text: 'أشعر بالخوف وأبكي', points: 2 },
      { text: 'أشعر بصدمة ولا أدري ماذا أفعل', points: 1 },
      { text: 'أشعر بالقلق لكن أبقى هادئاً', points: 0 }
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
    questionText: 'بماذا تشعر عندما تتذكر حياتك قبل الحرب وترى صوراً لها؟',
    options: [
      { text: 'أشعر بالحزن الشديد وتفكير كثير', points: 2 },
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
    questionText: 'بماذا تشعر عندما ترى صور أصدقائك الذين لا تستطيع لقاءهم ؟',
    options: [
      { text: 'أشعر بالوحدة', points: 2 },
      { text: 'أشعر ببعض الضيق', points: 1 },
      { text: 'سعيد لأنني أستطيع رؤية صورهم', points: 0 }
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
    questionText: ' بماذا تشعر عندما تتذكر مدرستك القديمة وأنت الآن تدرس في خيمة؟',
    options: [
      { text: 'أشعر بالحزن أو الضيق معظم الوقت', points: 2 },
      { text: 'أحياناً أشعر بالحزن وأحياناً أكون بخير', points: 1 },
      { text: 'سعيد لأنني أستطيع أن أتعلم', points: 0 }
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
    questionText: 'بماذا تشعر إذا سمعت والديك يتحدثان عن انتهاء الطعام ؟ ',
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
    questionText: 'بماذا تشعر عندما تهتز الخيمة في ليلة الشتاء الباردة العاصفة ؟',
    options: [
      { text: 'أفكر كثيراً خائفاً ولا أستطيع النوم بسهولة', points: 2 },
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
    questionText: 'بماذا تشعر إذا سمعت والديك يتحدثان عن الانتقال إلى منطقة نزوح جديدة؟',
    options: [
      { text: 'أشعر بقلق كبير وأفكر في أشياء قد تسوء', points: 2 },
      { text: 'أشعر ببعض القلق أحياناً', points: 1 },
      { text: 'أشعر بالهدوء وأ', points: 0 }
    ]
  },
  // ===== Item 16: الشكوى الجسدية =====
  {
    id: '4.1',
    gameNumber: 1,
    gameName: 'رحلة المشاعر',
    domain: 'emotional',
    sdqItem: 16,
    scenarioId: '16.a',
    imageTag: 'stomach_ache',
    questionText: 'بماذا تشعر في جسمك عندما تشعر بالخوف أو التوتر قبل حدث مهم ؟',
    options: [
      { text: 'أشعر بألم شديد في بطني أو صداع ولا أستطيع فعل شيء', points: 2 },
      { text: 'أشعر ببعض الضيق في جسمي لكنني أستمر في عملي', points: 1 },
      { text: 'لا أشعر بأي ألم في جسمي وأبقى بخير', points: 0 }
    ]
  },
  {
    id: '4.2',
    gameNumber: 1,
    gameName: 'رحلة المشاعر',
    domain: 'emotional',
    sdqItem: 16,
    scenarioId: '16.b',
    imageTag: 'feeling_sick',
    questionText: 'عندما تكون في مكان جديد أو وسط غرباء، هل تتعب فجأة؟',
    options: [
      { text: 'نعم، أتعب فوراً وأطلب الذهاب للمنزل بسبب ألم جسدي', points: 2 },
      { text: 'أشعر ببعض التوتر لكنني أحاول التأقلم', points: 1 },
      { text: 'لا أشعر بالتعب وأستمتع بالوقت', points: 0 }
    ]
  },
  // ===== Item 20: التردد والالتصاق =====
  {
    id: '5.1',
    gameNumber: 1,
    gameName: 'رحلة المشاعر',
    domain: 'emotional',
    sdqItem: 20,
    scenarioId: '20.a',
    imageTag: 'new_group',
    questionText: 'طلب منك أحد أن تشارك أطفالاً لا تعرفهم في لعبة جديدة، ماذا تفعل؟',
    options: [
      { text: 'أرفض بشدة وأتمسك بوالدي أو أجلس وحدي خائفاً', points: 2 },
      { text: 'أتردد قليلاً ثم أحاول المشاركة', points: 1 },
      { text: 'أذهب وأشاركهم اللعب بكل ثقة', points: 0 }
    ]
  },
  {
    id: '5.2',
    gameNumber: 1,
    gameName: 'رحلة المشاعر',
    domain: 'emotional',
    sdqItem: 20,
    scenarioId: '20.b',
    imageTag: 'stranger_talk',
    questionText: 'بماذا تشعر إذا اضطررت للجلوس مع أشخاص لا تعرفهم في خيمة جديدة؟',
    options: [
      { text: 'أشعر بخوف شديد وأبقى ملتصقاً بمن أعرفهم', points: 2 },
      { text: 'أشعر ببعض الخجل في البداية ثم أعتاد', points: 1 },
      { text: 'أشعر بالراحة وأحاول التعرف عليهم', points: 0 }
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
    imageTag: 'food_line',
    questionText: 'ماذا تفعل إذا قطع أحد الأطفال دورك في طابور المياه؟',
    options: [
      { text: 'أصرخ وأتشاجر', points: 2 },
      { text: 'أشعر بالغضب لكن أبقى في الطابور', points: 1 },
      { text: 'أصبر وأتحدث معه بهدوء', points: 0 }
    ]
  },
  {
    id: '5.2',
    gameNumber: 2,
    gameName: 'مهمة الأبطال',
    domain: 'conduct',
    sdqItem: 5,
    scenarioId: '5.b',
    imageTag: 'help_request',
    questionText: 'ماذا تفعل إذا طلب منك والديك المساعدة في تنظيف الخيمة وأنت تشعر بالتعب؟',
    options: [
      { text: 'أصرخ وأقول لا', points: 2 },
      { text: 'أتذمر ثم أستجيب', points: 1 },
      { text: 'أطيع وأساعد', points: 0 }
    ]
  },

  // ===== Item 7: الطاعة =====
  {
    id: '7.1',
    gameNumber: 2,
    gameName: 'مهمة الأبطال',
    domain: 'conduct',
    sdqItem: 7,
    scenarioId: '7.a',
    imageTag: 'tent_stay',
    questionText: 'قال لك والداك أن تبقى داخل الخيمة لسلامتك.. ماذا تفعل؟',
    options: [
      { text: 'أخرج دون إذن', points: 2 },
      { text: 'أتردد ثم أبقى', points: 1 },
      { text: 'ألتزم وأبقى', points: 0 }
    ]
  },
  {
    id: '7.2',
    gameNumber: 2,
    gameName: 'مهمة الأبطال',
    domain: 'conduct',
    sdqItem: 7,
    scenarioId: '7.b',
    imageTag: 'chore_help',
    questionText: 'طلب منك أحد الكبار المساعدة في عمل بسيط.. ماذا تفعل؟',
    options: [
      { text: 'أتجاهل الطلب', points: 2 },
      { text: 'أستجيب بتردد', points: 1 },
      { text: 'أساعد بحب', points: 0 }
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
    imageTag: 'play_fight',
    questionText: 'ماذا تفعل إذا كسر صديقك لعتبك الوحيدة عن طريق الخطأ؟',
    options: [
      { text: 'أهجم عليه وأضربه', points: 2 },
      { text: 'أرد بكلام غاضب', points: 1 },
      { text: 'أحزن ولكن أسامحه', points: 0 }
    ]
  },
  {
    id: '12.2',
    gameNumber: 2,
    gameName: 'مهمة الأبطال',
    domain: 'conduct',
    sdqItem: 12,
    scenarioId: '12.b',
    imageTag: 'toy_argue',
    questionText: 'أنت تريد أن تلعب الجري وصديقك الغميضة واختلفتما ماذا تفعل ؟',
    options: [
      { text: 'أتشاجر معه وأصر على لعبتي', points: 2 },
      { text: 'نتجادل ثم نهدأ', points: 1 },
      { text: 'نحلها بهدوء', points: 0 }
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
    imageTag: 'hide_mistake',
    questionText: 'ماذا تفعل إذا كسرت المصباح الشمسي عن طريق الخطأ وأنت وحدك؟',
    options: [
      { text: ' أنكر ما حدث وأتهم غيري', points: 2 },
      { text: 'أبقى صامتاً', points: 1 },
      { text: 'أقول الحقيقة', points: 0 }
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
    questionText: 'أصطدمت الكرة بقربة المياه الوحيدة وسكبتها وأنت وحدك تلعب ماذا تفعل؟',
    options: [
      { text: 'أكذب وأتهم غيري', points: 2 },
      { text: 'أبقى صامتاً', points: 1 },
      { text: 'أقول الحقيقة', points: 0 }
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
    imageTag: 'find_item',
    questionText: 'ماذا تفعل إذا وجدت شواكل ملقاة على الأرض في ساحة المخيم؟',
    options: [
      { text: 'آخذها وأخبئها', points: 2 },
      { text: 'أتركها مكانها', points: 1 },
      { text: 'أبحث عن صاحبها لأعيدها له', points: 0 }
    ]
  },
  {
    id: '22.2',
    gameNumber: 2,
    gameName: 'مهمة الأبطال',
    domain: 'conduct',
    sdqItem: 22,
    scenarioId: '22.b',
    imageTag: 'steal_toy',
    questionText: 'ماذا تفعل إذا وجدت علبة طعام ملقاة على الأرض؟',
    options: [
      { text: 'آخذها وأخبئها', points: 2 },
      { text: 'أتركها مكانها', points: 1 },
      { text: 'أبحث عن صاحبها لأعيدها له', points: 0 }
    ]
  }
];

const gameThreeConfig = {
  gameNumber: 3,
  gameName: 'سباق التركيز', 
  domain: 'hyperactivity', 

  stages: [
    {
      stageId: 'movement_freeze',
      description: 'A large button (or traffic light) changes color every 2-3 seconds between Green and Red. The child must tap only when it turns Red (Stop).', 
      scoring: {
        tapOnGreen: 2,      
        correctTapOnRed: 0   // استجابة صحيحة 
      }
    },
    {
      stageId: 'spot_the_difference',
      description: 'Two nearly identical images (5 differences) with a 30-second timer. The child must find all differences.', 
      scoring: {
        found_1_to_2: 2,     // تركيز منخفض جداً
        found_3_to_4: 1,     // تركيز متوسط 
        found_5: 0           // تركيز ممتاز 
      }
    },
    {
      stageId: 'quiet_tap',
      description: 'A simple screen with a 30-second countdown. The instruction is: "Do not touch the screen at all."', 
      scoring: {
        fivePlusTaps: 2,     // نشاط حركي زائد مرتفع 
        oneToFourTaps: 1,    // تململ حركي بسيط 
        zeroTaps: 0          // ثبات وهدوء تام 
      }
    },
    {
      stageId: 'tower_completion',
      description: 'Interface shows 4 empty slots for a tower. Tapping fills one slot. A "Quit/Skip" button is always visible.', 
      scoring: {
        skipBeforeStep4: 2,  // انسحاب مبكر وعدم إكمال المهمة 
        stopAtStep3: 1,      // انسحاب في اللحظات الأخيرة 
        fullCompletion: 0    // إكمال المهمة للنهاية 
      }
    },
    {
      stageId: 'sailing_ship',
      description: 'A ship moves on screen. The child must use a Long Press to keep it on course.', 
      scoring: {
        liftFingerThreePlusTimes: 2, // عدم القدرة على استدامة النشاط 
        oneStopOrMinorJitter: 1,     // اضطراب بسيط في الانتباه 
        steadyContinuousPress: 0     // استمرارية ممتازة وثبات 
      }
    }
  ]
};
const gameFourScenarios = [
  // ===== Item 1, 4, 9, 17, 25: السلوك الاجتماعي الإيجابي (لعبة الصديق الوحيد) =====
  {
    id: '4.1',
    gameNumber: 4,
    gameName: 'لعبة الصديق الوحيد',
    domain: 'prosocial',
    sdqItem: 1,
    scenarioId: '1.a',
    imageTag: 'water_help',
    questionText: 'ماذا تفعل إذا رأيت طفلاً يتصعب في حمل قربة المياه؟',
    options: [
      { text: 'أسرع لمساعدته', points: 0 },
      { text: 'أقول له بالتوفيق', points: 1 },
      { text: 'أتجاهله وأكمل طريقي', points: 2 }
    ]
  },
  {
    id: '4.2',
    gameNumber: 4,
    gameName: 'لعبة الصديق الوحيد',
    domain: 'prosocial',
    sdqItem: 4,
    scenarioId: '4.a',
    imageTag: 'lost_child',
    questionText: 'ماذا تفعل إذا رأيت طفلاً يبكي في المخيم لأنه ضائع؟',
    options: [
      { text: 'أساعده للوصول لوالديه', points: 0 },
      { text: 'أشير له على الطريق', points: 1 },
      { text: 'لا أفعل شيئاً', points: 2 }
    ]
  },
  {
    id: '4.3',
    gameNumber: 4,
    gameName: 'لعبة الصديق الوحيد',
    domain: 'prosocial',
    sdqItem: 9,
    scenarioId: '9.a',
    imageTag: 'tent_rope',
    questionText: 'ماذا تفعل إذا طلب جارك الكبير بالسن مساعدتك في شد حبال الخيمة؟',
    options: [
      { text: 'أساعده فوراً', points: 0 },
      { text: 'أقف متفرجاً', points: 1 },
      { text: 'أذهب لألعب مع أصحابي', points: 2 }
    ]
  },
  {
    id: '4.4',
    gameNumber: 4,
    gameName: 'لعبة الصديق الوحيد',
    domain: 'prosocial',
    sdqItem: 17,
    scenarioId: '17.a',
    imageTag: 'new_child',
    questionText: 'ماذا تفعل إذا رأيت طفلاً نازحاً جديداً يجلس لوحده؟',
    options: [
      { text: 'أدعوه للعب معي', points: 0 },
      { text: 'أذهب وأقول مرحباً', points: 1 },
      { text: 'أتجاهله وأكمل اللعب', points: 2 }
    ]
  },
  {
    id: '4.5',
    gameNumber: 4,
    gameName: 'لعبة الصديق الوحيد',
    domain: 'prosocial',
    sdqItem: 25,
    scenarioId: '25.a',
    imageTag: 'colors',
    questionText: 'ماذا تفعل إذا كنت تمتلك علبة ألوان في خيمة المدرسة؟',
    options: [
      { text: 'أسمح للجميع باستخدامها', points: 0 },
      { text: 'أسمح فقط لصديقي', points: 1 },
      { text: 'لا أسمح لأحد غيري', points: 2 }
    ]
  },
  {
    id: '4.6',
    gameNumber: 4,
    gameName: 'لعبة الصديق الوحيد',
    domain: 'prosocial',
    sdqItem: 25,
    scenarioId: '25.b',
    imageTag: 'candy',
    questionText: 'ماذا تفعل إذا كنت تمتلك قطعة حلوى والآخرون لا يمتلكون؟',
    options: [
      { text: 'أقسمها ونتشاركها', points: 0 },
      { text: 'آكلها بسرعة', points: 1 },
      { text: 'أرفض مشاركتها', points: 2 }
    ]
  }
];
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
