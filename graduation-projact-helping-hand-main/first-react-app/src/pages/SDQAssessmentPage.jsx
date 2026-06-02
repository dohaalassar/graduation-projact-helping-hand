import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import "../styles/sdqassessment.css";

const questions = [
  "يهتم بمشاعر الآخرين",
  "لا يستطيع البقاء أو الاستقرار في مكان واحد (كثير الحركة)",
  "كثيراً ما يشكو من صداع أو آلام في البطن أو الشعور بالغثيان",
  "يشارك الآخرين بسهولة فيما يخصه (ألعاب، أقلام، حلويات، إلخ)",
  "كثيراً ما تنتابه نوبات غضب أو سريع الغضب",
  "يحب العزلة أو يميل إلى اللعب لوحده",
  "مطيع على وجه العموم، عادة يفعل ما يطلبه منه الكبار",
  "يقلق من أشياء كثيرة، كثيراً ما يبدو عليه القلق",
  "يساعد الآخرين إذا حدث لأحدهم مكروه",
  "يتململ أو يتلوى باستمرار أثناء الجلوس",
  "لديه على الأقل صديق واحد جيد",
  "كثيراً ما يتعارك مع الآخرين من نفس سنه أو يستأسد عليهم",
  "كثيراً ما يكون غير سعيد أو حزين أو يبكي بسهولة",
  "في الغالب محبوب ممن هم في سنه",
  "يتشتت انتباهه بسرعة أو قليل التركيز",
  "عصبي أو متشبث بالآخرين في المواقف الجديدة، يفقد ثقته بنفسه بسهولة",
  "لطيف مع من هم أصغر منه",
  "كثيراً ما يكذب أو يخدع أو يغش",
  "يُستهزأ منه أو يُستأسد عليه",
  "كثيراً ما يتطوع لمساعدة الآخرين",
  "يفكر قبل أن يتصرف",
  "يسرق من البيت أو المدرسة",
  "ينسجم مع الكبار أكثر",
  "يخاف من أشياء كثيرة",
  "يتابع أداء الواجبات حتى النهاية"
];

const SDQAssessmentPage = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const childName =
    location.state?.childName || "نورا";

  const gender =
    location.state?.gender || "female";

  const childTerm =
    gender === "male"
      ? "طفلك"
      : "طفلتك";

  const [step, setStep] = useState(0);

  const [answers, setAnswers] = useState({});

  const [validationError, setValidationError] = useState("");

  const [highlightedUnanswered,
    setHighlightedUnanswered] = useState([]);

  const handleAnswerChange = (qIndex, value) => {

    setAnswers((prev) => ({
      ...prev,
      [qIndex]: value
    }));

    setHighlightedUnanswered((prev) =>
      prev.filter((item) => item !== qIndex)
    );

    setValidationError("");
  };

  const nextStep = () => {
    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
  };

  const handleClose = () => {
    navigate("/parent/dashboard");
  };

  const handleNextQuestionsStep = (
    startIndex,
    endIndex
  ) => {

    const unanswered = [];

    for (
      let i = startIndex;
      i < endIndex;
      i++
    ) {

      if (
        answers[i] === undefined ||
        answers[i] === ""
      ) {

        unanswered.push(i);

      }

    }

    if (unanswered.length > 0) {

      setHighlightedUnanswered(
        unanswered
      );

      setValidationError(
        "يرجى الإجابة على جميع الأسئلة قبل المتابعة"
      );

      setTimeout(() => {

        const firstQuestion =
          document.querySelector(
            ".question-item-card.unanswered-highlight"
          );

        if (firstQuestion) {

          firstQuestion.scrollIntoView({
            behavior: "smooth",
            block: "center"
          });

        }

      }, 100);

      return;

    }

    setValidationError("");
    setHighlightedUnanswered([]);

    nextStep();

  };

  const renderQuestions = (startIndex, endIndex) => (

    <div className="sdq-questions-container">

      <div className="questions-page-header">

        <ChevronRight
          className="header-back-arrow"
          onClick={prevStep}
        />

        <h2 className="questions-title">
          اختر الإجابة التي تناسب السؤال
        </h2>

      </div>

      <div className="questions-list">

        {questions
          .slice(startIndex, endIndex)
          .map((q, idx) => {

            const qIndex =
              startIndex + idx;

            const isHighlighted =
              highlightedUnanswered.includes(
                qIndex
              );

            return (

              <div
                key={qIndex}
                className={`question-item-card ${isHighlighted
                    ? "unanswered-highlight"
                    : ""
                  }`}
              >

                <p className="question-text">

                  <span className="q-number">

                    {(qIndex + 1)
                      .toString()
                      .padStart(2, "0")}.

                  </span>

                  {q}

                </p>

                <div className="options-group">

                  <label className="option-label">

                    <input
                      type="radio"
                      name={`q-${qIndex}`}
                      checked={
                        answers[qIndex] === "0"
                      }
                      onChange={() =>
                        handleAnswerChange(
                          qIndex,
                          "0"
                        )
                      }
                    />

                    <span>
                      غير صحيح
                    </span>

                  </label>

                  <label className="option-label">

                    <input
                      type="radio"
                      name={`q-${qIndex}`}
                      checked={
                        answers[qIndex] === "1"
                      }
                      onChange={() =>
                        handleAnswerChange(
                          qIndex,
                          "1"
                        )
                      }
                    />

                    <span>
                      صحيح نوعاً ما
                    </span>

                  </label>

                  <label className="option-label">

                    <input
                      type="radio"
                      name={`q-${qIndex}`}
                      checked={
                        answers[qIndex] === "2"
                      }
                      onChange={() =>
                        handleAnswerChange(
                          qIndex,
                          "2"
                        )
                      }
                    />

                    <span>
                      صحيح بالتأكيد
                    </span>

                  </label>

                </div>

              </div>

            );

          })}

      </div>

      {validationError && (

        <div
          className="sdq-validation-error-wrapper"
        >

          <p className="sdq-validation-error">

            {validationError}

          </p>

        </div>

      )}

      <div className="questions-footer-actions">

        <button
          className="btn-primary next-btn"
          onClick={() =>
            handleNextQuestionsStep(
              startIndex,
              endIndex
            )
          }
        >

          {endIndex >= 25
            ? "إنهاء"
            : "التالي"}

        </button>

      </div>

    </div>

  );

  return (

    <div className="sdq-assessment-page">

      <Header />

      <main className="sdq-main-content">

        {step === 0 && (
          <div className="sdq-step-card" style={{ position: 'relative', padding: '40px 30px', textAlign: 'center', width: '100%', maxWidth: '550px', margin: '40px auto', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
            <ChevronRight style={{ position: 'absolute', top: '20px', right: '20px', cursor: 'pointer', color: '#888' }} onClick={handleClose} />
            <h2 style={{ fontSize: '1.6rem', fontWeight: 'bold', marginBottom: '40px', lineHeight: '1.5', color: '#000', marginTop: '20px' }}>
              مرحبا بك في نموذج تقييم نقاط القوة والصعوبات (SDQ)
            </h2>
            <p style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '50px', color: '#000' }}>
              الخاص ب{childTerm} {childName}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '85%', margin: '0 auto' }}>
              <button className="btn-primary" style={{ padding: '14px', fontSize: '1.2rem', borderRadius: '8px', fontWeight: 'bold' }} onClick={nextStep}>
                التالي
              </button>
              <button className="btn-secondary" style={{ padding: '14px', fontSize: '1.2rem', borderRadius: '8px', backgroundColor: 'white', border: '1px solid #ddd', color: '#000', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }} onClick={handleClose}>
                اغلاق
              </button>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="sdq-step-card" style={{ position: 'relative', padding: '40px 30px', textAlign: 'center', width: '100%', maxWidth: '550px', margin: '40px auto', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
            <ChevronRight style={{ position: 'absolute', top: '20px', right: '20px', cursor: 'pointer', color: '#888' }} onClick={prevStep} />
            <h2 style={{ fontSize: '1.6rem', fontWeight: 'bold', marginBottom: '30px', lineHeight: '1.5', color: '#000', marginTop: '10px' }}>
              ما هو نموذج تقييم نقاط القوة والصعوبات(SDQ) ؟
            </h2>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '25px', textAlign: 'right', fontWeight: '600', color: '#222' }}>
              هو استبيان موجز وسريع يتكون من 25 بند يستخدم لفحص الحالة العاطفية والسلوكية للأطفال من خلال السؤال عن 5 مقاييس وهي : الأعراض العاطفية، مشاكل السلوك، فرط النشاط/قلة الانتباه، مشاكل العلاقات مع الأقران، والسلوك الاجتماعي الإيجابي. كل مقياس من الخمسة يتكون من 5 بنود تقوم انت كولي أمر بالاجابة عنها.
            </p>
            <p style={{ fontSize: '1.15rem', fontWeight: 'bold', marginBottom: '40px', textAlign: 'right', color: '#000' }}>
              الاسئلة عن الطفل لكن أنت من يجيب عنها.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '85%', margin: '0 auto' }}>
              <button className="btn-primary" style={{ padding: '14px', fontSize: '1.2rem', borderRadius: '8px', fontWeight: 'bold' }} onClick={nextStep}>
                ابدأ
              </button>
              <button className="btn-secondary" style={{ padding: '14px', fontSize: '1.2rem', borderRadius: '8px', backgroundColor: 'white', border: '1px solid #ddd', color: '#000', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }} onClick={handleClose}>
                اغلاق
              </button>
            </div>
          </div>
        )}

        {step === 2 &&
          renderQuestions(0, 8)}

        {step === 3 &&
          renderQuestions(8, 16)}

        {step === 4 &&
          renderQuestions(16, 25)}

        {step === 5 && (

          <div className="sdq-step-card">

            <h2>

              تهانينا لقد أنهيت تقييم
              {" "}
              {childTerm}
              {" "}
              {childName}

            </h2>

            <button
              className="btn-success"
              onClick={() =>
                navigate(
                  "/parent/dashboard"
                )
              }
            >

              صفحتي الرئيسية

            </button>

          </div>

        )}

      </main>

      <Footer />

    </div>

  );

};

export default SDQAssessmentPage;