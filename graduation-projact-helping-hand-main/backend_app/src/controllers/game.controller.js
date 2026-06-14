const Assessment = require('../models/Assessment.model'); 
const Scenario = require('../models/Scenario.model');   

// 1. استقبال وحفظ نتيجة لعبة محددة
exports.submitGameResult = async (req, res) => {
  try {
    const { assessmentId, gameNumber } = req.params;
    const gameNum = Number(gameNumber);

    // [المسار الأول]: معالجة اللعبة رقم 3 (سباق التركيز - التفاعلية الحركية بكودك الخاص)
    if (gameNum === 3) {
      const { rawPerformance } = req.body; 

      if (!rawPerformance || !Array.isArray(rawPerformance)) {
        return res.status(400).json({ 
          status: 'fail', 
          message: 'لم يتم إرسال بيانات الأداء الحركي للعبة الثالثة بشكل صحيح' 
        });
      }

      let hyperactivityScore = 0;
      const processedResults = [];

      for (const item of rawPerformance) {
        const scenario = await Scenario.findOne({ scenarioCode: item.scenarioCode });
        if (!scenario) continue;

        let points = 0;

        switch (scenario.mechanism) {
          case 'GO_NO_GO': 
            points = item.errors > 0 ? 2 : 0;
            break;

          case 'TARGET_TAP': 
            if (item.errors >= 5) points = 2;
            else if (item.errors >= 1) points = 1;
            else points = 0;
            break;

          case 'QUIET_TIME': 
            if (item.touches >= 5) points = 2;
            else if (item.touches >= 1) points = 1;
            else points = 0;
            break;

          case 'LONG_PRESS': 
            if (item.interruptions >= 3) points = 2;
            else if (item.interruptions >= 1) points = 1;
            else points = 0;
            break;

          case 'SEQUENCE_COMPLETION': 
            if (item.lastStep < 3) points = 2;
            else if (item.lastStep === 3) points = 1;
            else points = 0;
            break;

          default:
            points = 0;
        }

        processedResults.push({
          scenarioCode: item.scenarioCode,
          sdqItem: scenario.sdqItem,
          points: points
        });

        hyperactivityScore += points;
      }

      await Assessment.findByIdAndUpdate(
        assessmentId,
        { 
          $set: { "domainScores.hyperactivity": hyperactivityScore },
          $push: { "gameLogs": { gameId: 3, details: processedResults } }
        }
      );

      return res.status(200).json({
        status: "success",
        message: "تمت معالجة بيانات التركيز بنجاح بحسب آليات اللعب المعتمدة",
        summary: { hyperactivityScore }
      });
    }

    // [المسار الثاني]: معالجة الألعاب (1, 2, 4, 5) القائمة على الأسئلة والخيارات
    const { answers } = req.body; 
    if (!answers || !Array.isArray(answers)) {
      return res.status(400).json({ 
        status: 'fail', 
        message: 'لم يتم إرسال مصفوفة الإجابات الخاصة باللعبة' 
      });
    }

    let totalGamePoints = 0;
    const gameDetailsLogs = [];
    let targetDomain = '';

    for (const answer of answers) {
      const scenario = await Scenario.findOne({ scenarioId: answer.scenarioId });
      if (!scenario) continue;

      // تحديد المجال النفسي بناءً على بيانات السيناريو المستخرج
      targetDomain = scenario.domain;

      // البحث عن الخيار الذي اختاره الطفل داخل مصفوفة الخيارات لمعرفة نقاطه (0، 1، 2)
      const selectedOption = scenario.options.find(opt => opt.text === answer.chosenOptionText);
      const points = selectedOption ? selectedOption.points : 0;

      totalGamePoints += points;

      // توثيق الإجابة في السجل
      gameDetailsLogs.push({
        scenarioId: scenario.scenarioId,
        sdqItem: scenario.sdqItem,
        chosenAnswer: answer.chosenOptionText,
        points: points
      });
    }

    const updateData = {
      $push: { "gameLogs": { gameId: gameNum, details: gameDetailsLogs } }
    };
    
    // ربط مجموع النقاط بالمجال النفسي الصحيح ديناميكياً (emotional, conduct, peer, prosocial)
    if (targetDomain) {
      updateData.$set = { [`domainScores.${targetDomain}`]: totalGamePoints };
    }

    // تحديث السجل في قاعدة البيانات
    await Assessment.findByIdAndUpdate(assessmentId, updateData);

    return res.status(200).json({
      status: 'success',
      message: `تم احتساب وحفظ نتائج اللعبة رقم ${gameNum} بنجاح`,
      summary: {
        domain: targetDomain,
        totalScore: totalGamePoints
      }
    });

  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  }
};
