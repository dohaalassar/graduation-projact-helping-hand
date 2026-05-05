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
  "يُستهزأ منه أو يُستأسد عليه من من هم في سنه",
  "كثيراً ما يتطوع لمساعدة الآخرين (الوالدين، المدرسين، الأطفال)",
  "يفكر قبل أن يتصرف",
  "يسرق من البيت أو المدرسة أو من أماكن أخرى",
  "ينسجم بشكل أفضل مع الكبار أكثر من الأطفال في سنه",
  "يخاف من أشياء كثيرة، من السهل تخويفه",
  "يتابع أداء الواجبات حتى النهاية، لديه انتباه جيد"
];

const SDQAssessmentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const childName = location.state?.childName || "نورا"; // Default if no state
  const gender = location.state?.gender || "female"; // Default if no state
  const childTerm = gender === "male" ? "طفلك" : "طفلتك";

  const [step, setStep] = useState(0); // 0: Welcome, 1: Intro, 2: Qs Part 1, 3: Qs Part 2, 4: Qs Part 3
  const [answers, setAnswers] = useState({});

  const handleAnswerChange = (qIndex, value) => {
    setAnswers({ ...answers, [qIndex]: value });
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);
  const handleClose = () => navigate("/parent/dashboard");

  const renderWelcome = () => (
    <div className="sdq-step-card welcome-step">
      <div className="sdq-card-header">
         <ChevronRight className="header-back-arrow" onClick={handleClose} />
      </div>
      <h2>ما هو نموذج تقييم نقاط القوة والصعوبات (SDQ) ؟</h2>
      <div className="sdq-info-content">
        <p>هو استبيان موجز وسريع يتكون من 25 بند يستخدم لفحص الحالة العاطفية والسلوكية للأطفال من خلال السؤال عن 5 مقاييس وهي: الأعراض العاطفية، مشاكل السلوك، فرط النشاط/قلة الانتباه، مشاكل العلاقات مع الأقران، والسلوك الاجتماعي الإيجابي. كل مقياس من الخمسة يتكون من 5 بنود تقوم أنت كولي أمر بالإجابة عنها.</p>
        <p className="highlight-text">الأسئلة عن الطفل لكن أنت من يجيب عنها.</p>
      </div>
      <div className="sdq-actions-vertical">
        <button className="btn-primary" onClick={nextStep}>ابدأ</button>
        <button className="btn-outline" onClick={handleClose}>اغلاق</button>
      </div>
    </div>
  );

  const renderIntro = () => (
    <div className="sdq-step-card intro-step">
      <div className="sdq-card-header">
         <ChevronRight className="header-back-arrow" onClick={prevStep} />
      </div>
      <h2>مرحبا بك في نموذج تقييم نقاط القوة والصعوبات (SDQ)</h2>
      <p className="child-target-text">الخاص بـ {childTerm} {childName}</p>
      <div className="sdq-actions-vertical">
        <button className="btn-primary" onClick={nextStep}>التالي</button>
        <button className="btn-outline" onClick={handleClose}>اغلاق</button>
      </div>
    </div>
  );

  const renderQuestions = (startIndex, endIndex) => (
    <div className="sdq-questions-container">
      <div className="questions-page-header">
         <ChevronRight className="header-back-arrow" onClick={prevStep} />
         <h2 className="questions-title">اختر الاجابة التي تناسب السؤال:</h2>
      </div>
      
      <div className="questions-list">
        {questions.slice(startIndex, endIndex).map((q, idx) => {
          const qIndex = startIndex + idx;
          return (
            <div key={qIndex} className="question-item-card">
              <p className="question-text">
                <span className="q-number">{(qIndex + 1).toString().padStart(2, '0')}.</span> {q}
              </p>
              <div className="options-group">
                <label className="option-label">
                  <input 
                    type="radio" 
                    name={`q-${qIndex}`} 
                    value="0" 
                    checked={answers[qIndex] === "0"}
                    onChange={() => handleAnswerChange(qIndex, "0")}
                  />
                  <span>غير صحيح</span>
                </label>
                <label className="option-label">
                  <input 
                    type="radio" 
                    name={`q-${qIndex}`} 
                    value="1" 
                    checked={answers[qIndex] === "1"}
                    onChange={() => handleAnswerChange(qIndex, "1")}
                  />
                  <span>صحيح نوعاً ما</span>
                </label>
                <label className="option-label">
                  <input 
                    type="radio" 
                    name={`q-${qIndex}`} 
                    value="2" 
                    checked={answers[qIndex] === "2"}
                    onChange={() => handleAnswerChange(qIndex, "2")}
                  />
                  <span>صحيح بالتأكيد</span>
                </label>
              </div>
            </div>
          );
        })}
      </div>

      <div className="questions-footer-actions">
        <button 
          className="btn-primary next-btn" 
          onClick={endIndex >= 25 ? nextStep : nextStep}
        >
          {endIndex >= 25 ? "إنهاء" : "التالي"}
        </button>
      </div>
    </div>
  );

  const renderSuccess = () => (
    <div className="sdq-step-card success-step">
      <div className="success-icon-wrapper">
         <div className="success-circle">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
         </div>
      </div>
      <h2>تهانينا ! لقد أنهيت نموذج تقييم {childTerm} {childName}</h2>
      <p className="success-subtext">هل تفضل أن تبدأ {childName} باللعب، لاستكمال عملية التقييم؟</p>
      
      <div className="sdq-actions-vertical">
        <button className="btn-success success-action-btn" onClick={() => console.log("Start Play")}>
          ابدأ اللعب
        </button>
        <button className="btn-white-outline success-action-btn" onClick={() => navigate("/parent/dashboard")}>
          صفحتي الرئيسية
        </button>
      </div>
    </div>
  );

  return (
    <div className="sdq-assessment-page">
      <Header />
      <main className="sdq-main-content">
        {step === 0 && renderWelcome()}
        {step === 1 && renderIntro()}
        {step === 2 && renderQuestions(0, 8)}
        {step === 3 && renderQuestions(8, 16)}
        {step === 4 && renderQuestions(16, 25)}
        {step === 5 && renderSuccess()}
      </main>
      <Footer />
    </div>
  );
};

export default SDQAssessmentPage;
