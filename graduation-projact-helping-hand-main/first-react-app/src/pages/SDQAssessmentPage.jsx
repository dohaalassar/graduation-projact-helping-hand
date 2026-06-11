import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { getSDQQuestions, submitSDQ } from "../services/childService";
import "../styles/sdqassessment.css";

// خريطة تحويل الإجابة الرقمية إلى النص المطلوب للباكند
const scoreToAnswer = {
  "0": "not_true",
  "1": "somewhat_true",
  "2": "certainly_true",
};

const SDQAssessmentPage = () => {
  const navigate  = useNavigate();
  const location  = useLocation();

  const childName = location.state?.childName || "";
  const gender    = location.state?.gender    || "male";
  const childId   = location.state?.childId  || null;
  const childTerm = gender === "male" ? "طفلك" : "طفلتك";

  const [step, setStep]       = useState(0);
  const [answers, setAnswers] = useState({});
  const [questions, setQuestions]   = useState([]);
  const [loadingQ, setLoadingQ]     = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError]   = useState("");
  const [validationError, setValidationError]         = useState("");
  const [highlightedUnanswered, setHighlightedUnanswered] = useState([]);

  // ── جيبي الأسئلة من الباكند عند تحميل الصفحة ──
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const data = await getSDQQuestions();
        setQuestions(data);
      } catch (error) {
        console.error("خطأ في جلب الأسئلة:", error);
      } finally {
        setLoadingQ(false);
      }
    };
    fetchQuestions();
  }, []);

  const handleAnswerChange = (qIndex, value) => {
    setAnswers((prev) => ({ ...prev, [qIndex]: value }));
    setHighlightedUnanswered((prev) => prev.filter((i) => i !== qIndex));
    setValidationError("");
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);
  const handleClose = () => navigate("/parent/dashboard");

  // ── التحقق من الإجابات قبل التالي ──
  const handleNextQuestionsStep = (startIndex, endIndex) => {
    const unanswered = [];
    for (let i = startIndex; i < endIndex; i++) {
      if (answers[i] === undefined || answers[i] === "") {
        unanswered.push(i);
      }
    }

    if (unanswered.length > 0) {
      setHighlightedUnanswered(unanswered);
      setValidationError("يرجى الإجابة على جميع الأسئلة قبل المتابعة");
      setTimeout(() => {
        const el = document.querySelector(".question-item-card.unanswered-highlight");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);
      return;
    }

    setValidationError("");
    setHighlightedUnanswered([]);
    nextStep();
  };

  // ── إرسال الإجابات للباكند ──
  const handleSubmitSDQ = async () => {
    if (!childId) {
      setSubmitError("لم يتم تحديد الطفل. يرجى العودة والمحاولة مجدداً.");
      return;
    }

    setSubmitting(true);
    setSubmitError("");

    try {
      // حوّلي الإجابات للشكل المطلوب من الباكند
      const formattedAnswers = questions.map((q, index) => ({
        itemNumber: q.itemNumber,
        answer: scoreToAnswer[answers[index]],
      }));

      await submitSDQ(childId, formattedAnswers);

      // انتقلي لصفحة النجاح (step 5)
      nextStep();

    } catch (error) {
      setSubmitError(
        error.response?.data?.message || "حدث خطأ أثناء إرسال التقييم"
      );
    } finally {
      setSubmitting(false);
    }
  };

  // ── عرض الأسئلة ──
  const renderQuestions = (startIndex, endIndex) => {
    const isLastPage = endIndex >= 25;

    return (
      <div className="sdq-questions-container">
        <div className="questions-page-header">
          <ChevronRight className="header-back-arrow" onClick={prevStep} />
          <h2 className="questions-title">اختر الإجابة التي تناسب السؤال</h2>
        </div>

        <div className="questions-list">
          {questions.slice(startIndex, endIndex).map((q, idx) => {
            const qIndex      = startIndex + idx;
            const isHighlighted = highlightedUnanswered.includes(qIndex);

            return (
              <div
                key={qIndex}
                className={`question-item-card ${isHighlighted ? "unanswered-highlight" : ""}`}
              >
                <p className="question-text">
                  <span className="q-number">
                    {(qIndex + 1).toString().padStart(2, "0")}.
                  </span>
                  {q.textArabic}
                </p>

                <div className="options-group">
                  {[
                    { value: "0", label: "غير صحيح" },
                    { value: "1", label: "صحيح نوعاً ما" },
                    { value: "2", label: "صحيح بالتأكيد" },
                  ].map((option) => (
                    <label key={option.value} className="option-label">
                      <input
                        type="radio"
                        name={`q-${qIndex}`}
                        checked={answers[qIndex] === option.value}
                        onChange={() => handleAnswerChange(qIndex, option.value)}
                      />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {validationError && (
          <div className="sdq-validation-error-wrapper">
            <p className="sdq-validation-error">{validationError}</p>
          </div>
        )}

        {submitError && (
          <p className="auth-server-error">{submitError}</p>
        )}

        <div className="questions-footer-actions">
          <button
            className="btn-primary next-btn"
            disabled={submitting}
            onClick={() => {
              if (isLastPage) {
                // التحقق أولاً ثم الإرسال
                const unanswered = [];
                for (let i = startIndex; i < endIndex; i++) {
                  if (answers[i] === undefined || answers[i] === "") {
                    unanswered.push(i);
                  }
                }
                if (unanswered.length > 0) {
                  setHighlightedUnanswered(unanswered);
                  setValidationError("يرجى الإجابة على جميع الأسئلة قبل المتابعة");
                  return;
                }
                handleSubmitSDQ();
              } else {
                handleNextQuestionsStep(startIndex, endIndex);
              }
            }}
          >
            {submitting ? "جاري الإرسال..." : isLastPage ? "إنهاء" : "التالي"}
          </button>
        </div>
      </div>
    );
  };

  // ── شاشة تحميل الأسئلة ──
  if (loadingQ) {
    return (
      <div style={{
        display: "flex", justifyContent: "center",
        alignItems: "center", minHeight: "100vh",
        fontSize: "20px", color: "#2c4a6b", fontFamily: "Cairo, sans-serif"
      }}>
        جاري تحميل الأسئلة...
      </div>
    );
  }

  return (
    <div className="sdq-assessment-page">
      <Header />

      <main className="sdq-main-content">

        {/* ── Step 0: ترحيب ── */}
        {step === 0 && (
          <div className="sdq-step-card" style={{ position: "relative", padding: "40px 30px", textAlign: "center", width: "100%", maxWidth: "550px", margin: "40px auto", backgroundColor: "white", borderRadius: "12px", boxShadow: "0 4px 15px rgba(0,0,0,0.1)" }}>
            <ChevronRight style={{ position: "absolute", top: "20px", right: "20px", cursor: "pointer", color: "#888" }} onClick={handleClose} />
            <h2 style={{ fontSize: "1.6rem", fontWeight: "bold", marginBottom: "40px", lineHeight: "1.5", color: "#000", marginTop: "20px" }}>
              مرحبا بك في نموذج تقييم نقاط القوة والصعوبات (SDQ)
            </h2>
            <p style={{ fontSize: "1.2rem", fontWeight: "bold", marginBottom: "50px", color: "#000" }}>
              الخاص ب{childTerm} {childName}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "15px", width: "85%", margin: "0 auto" }}>
              <button className="btn-primary" style={{ padding: "14px", fontSize: "1.2rem", borderRadius: "8px", fontWeight: "bold" }} onClick={nextStep}>
                التالي
              </button>
              <button style={{ padding: "14px", fontSize: "1.2rem", borderRadius: "8px", backgroundColor: "white", border: "1px solid #ddd", color: "#000", fontWeight: "bold", cursor: "pointer" }} onClick={handleClose}>
                اغلاق
              </button>
            </div>
          </div>
        )}

        {/* ── Step 1: شرح الـ SDQ ── */}
        {step === 1 && (
          <div className="sdq-step-card" style={{ position: "relative", padding: "40px 30px", textAlign: "center", width: "100%", maxWidth: "550px", margin: "40px auto", backgroundColor: "white", borderRadius: "12px", boxShadow: "0 4px 15px rgba(0,0,0,0.1)" }}>
            <ChevronRight style={{ position: "absolute", top: "20px", right: "20px", cursor: "pointer", color: "#888" }} onClick={prevStep} />
            <h2 style={{ fontSize: "1.6rem", fontWeight: "bold", marginBottom: "30px", lineHeight: "1.5", color: "#000", marginTop: "10px" }}>
              ما هو نموذج تقييم نقاط القوة والصعوبات (SDQ)؟
            </h2>
            <p style={{ fontSize: "1.1rem", lineHeight: "1.7", marginBottom: "25px", textAlign: "right", fontWeight: "600", color: "#222" }}>
              هو استبيان موجز وسريع يتكون من 25 بند يستخدم لفحص الحالة العاطفية والسلوكية للأطفال من خلال السؤال عن 5 مقاييس وهي: الأعراض العاطفية، مشاكل السلوك، فرط النشاط/قلة الانتباه، مشاكل العلاقات مع الأقران، والسلوك الاجتماعي الإيجابي.
            </p>
            <p style={{ fontSize: "1.15rem", fontWeight: "bold", marginBottom: "40px", textAlign: "right", color: "#000" }}>
              الأسئلة عن الطفل لكن أنت من يجيب عنها.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "15px", width: "85%", margin: "0 auto" }}>
              <button className="btn-primary" style={{ padding: "14px", fontSize: "1.2rem", borderRadius: "8px", fontWeight: "bold" }} onClick={nextStep}>
                ابدأ
              </button>
              <button style={{ padding: "14px", fontSize: "1.2rem", borderRadius: "8px", backgroundColor: "white", border: "1px solid #ddd", color: "#000", fontWeight: "bold", cursor: "pointer" }} onClick={handleClose}>
                اغلاق
              </button>
            </div>
          </div>
        )}

        {/* ── Steps 2-4: الأسئلة ── */}
        {step === 2 && renderQuestions(0, 8)}
        {step === 3 && renderQuestions(8, 16)}
        {step === 4 && renderQuestions(16, 25)}

        {/* ── Step 5: نجاح ── */}
        {step === 5 && (
          <div className="sdq-step-card" style={{ textAlign: "center", padding: "60px 30px", maxWidth: "550px", margin: "40px auto", backgroundColor: "white", borderRadius: "12px", boxShadow: "0 4px 15px rgba(0,0,0,0.1)" }}>
            <div style={{ fontSize: "60px", marginBottom: "20px" }}>✅</div>
            <h2 style={{ fontSize: "1.6rem", fontWeight: "bold", marginBottom: "15px", color: "#00a651" }}>
              تم إرسال التقييم بنجاح!
            </h2>
            <p style={{ fontSize: "1.1rem", color: "#555", marginBottom: "40px", lineHeight: "1.7" }}>
              تهانينا! لقد أنهيت تقييم {childTerm} {childName}. يمكنك الآن البدء بجلسات الألعاب التقييمية.
            </p>
            <button
              className="btn-primary"
              style={{ padding: "14px 40px", fontSize: "1.1rem", borderRadius: "8px" }}
              onClick={() => navigate("/parent/dashboard")}
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