const Scenario = require('../models/scenario.model');
const Session = require('../models/session.model'); // افترضنا وجود موديل للجلسة

exports.submitFocusGameResults = async (req, res) => {
    try {
        const { sessionId, rawPerformance } = req.body; 

        let hyperactivityScore = 0;
        const processedResults = [];

        for (const item of rawPerformance) {
            const scenario = await Scenario.findOne({ scenarioCode: item.scenarioCode });
            if (!scenario) continue;

            let points = 0;

            switch (scenario.mechanism) {
                
                case 'GO_NO_GO': // مثل مهمة Movement Freeze (بند 21)
                    // الضغط على الأخضر (اندفاع) = 2، التوقف الصحيح عند الأحمر = 0 
                    points = item.errors > 0 ? 2 : 0;
                    break;

                case 'TARGET_TAP': // مثل مهمة Catch the Treasure (بند 10)
                    // 5 أخطاء فأكثر = 2، من 1-4 أخطاء = 1، لا أخطاء = 0 
                    if (item.errors >= 5) points = 2;
                    else if (item.errors >= 1) points = 1;
                    else points = 0;
                    break;

                case 'QUIET_TIME': // مثل مهمة Quiet Tap (بند 15)
                    // 5 نقرات فأكثر (تململ عالي) = 2، من 1-4 = 1، صفر نقرات = 0 
                    if (item.touches >= 5) points = 2;
                    else if (item.touches >= 1) points = 1;
                    else points = 0;
                    break;

                case 'LONG_PRESS': // مثل مهمة The Sailing Ship (بند 2)
                    // رفع الإصبع 3 مرات فأكثر = 2، مرة واحدة = 1، ضغط مستمر = 0 
                    if (item.interruptions >= 3) points = 2;
                    else if (item.interruptions >= 1) points = 1;
                    else points = 0;
                    break;

                case 'SEQUENCE_COMPLETION': // مثل مهمة Tower Completion (بند 25)
                    // التوقف قبل الخطوة الرابعة = 2، التوقف عند الثالثة = 1، الإكمال = 0 
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

        // تحديث جلسة الطفل بالنقاط الجديدة
        await Session.findOneAndUpdate(
            { sessionId: sessionId },
            { 
                $set: { "scores.hyperactivity": hyperactivityScore },
                $push: { "gameLogs": { gameId: 3, details: processedResults } }
            }
        );

        res.status(200).json({
            status: "success",
            message: "تمت معالجة بيانات التركيز بنجاح",
            summary: { hyperactivityScore }
        });

    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};