import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import heroImg from "../assets/hero-child.jpg";
import { UserPlus, ClipboardList, PlayCircle, Coffee, CheckCircle } from "lucide-react";
import "../styles/landingpage.css";

const LandingPage = () => {
  const navigate = useNavigate();

  const steps = [
    { id: 1, title: "1.تسجيل طفلك", desc: "من خلال تعبئة البيانات المطلوبة", icon: <UserPlus /> },
    { id: 2, title: "2.اجراء تقييم SDQ", desc: "تقوم بحل نموذج تقييم نقاط القوة والصعوبات (SDQ) الخاص بطفلك", icon: <ClipboardList /> },
    { id: 3, title: "3.مرحلة اللعب الأولى", desc: "يقوم فيها طفلك بلعب مجموعة من الألعاب التقييمية لبعض الجوانب السلوكية والنفسية لديه", icon: <PlayCircle /> },
    { id: 4, title: "4.استراحة", desc: "استراحة مدتها 7 أيام قبل مرحلة اللعب الثانية", icon: <Coffee /> },
    { id: 5, title: "5.مرحلة اللعب الثانية", desc: "يقوم فيها طفلك بلعب مجموعة من الألعاب التقييمية للمرة الثانية بهدف التحقق من التقييم الأول", icon: <PlayCircle /> },
    { id: 6, title: "6.التقييم", desc: "تستطيع الآن الوصول إلى تقييم حالة طفلك النفسية", icon: <CheckCircle /> },
  ];

  return (
    <div className="landing-page">
      <Header />
      
      <main className="landing-content">
        <div className="white-container-wrapper">
          <div className="landing-container">
            {/* Hero Section */}
            <section className="hero-section">
              <div className="hero-text-side">
                <h1 className="brand-title">يداً بيد</h1>
                <p className="brand-subtitle">منصة رقمية تساعدك على فهم صحة طفلك النفسية</p>
                
                <div className="hero-cta-box">
                  <h2 className="hero-motto">خطوة . . . <br /> نحو طمأنينة العائلة</h2>
                  <button className="btn-primary join-btn" onClick={() => navigate("/signup/parent")}>
                    انضم الينا
                  </button>
                </div>
              </div>
              <div className="hero-image-side">
                <img src={heroImg} alt="Child Playing" className="hero-img" />
              </div>
            </section>

            {/* Role Section */}
            <section className="role-section">
              <h2 className="section-title">ما دورنا ؟</h2>
              <ul className="role-list">
                <li>نساعد <strong>ولي الأمر</strong> على تقييم حالة طفله النفسية ومدى حاجته للاستعانة بأخصائي نفسي.</li>
                <li>ونساعد <strong>الأخصائي النفسي</strong> على الوصول للحالات الحرجة لتقديم العناية المطلوبة للطفل.</li>
              </ul>
            </section>

            <div className="divider-line" />

            {/* How it works Section */}
            <section className="how-it-works">
              <h2 className="section-title">كيف نقيم حالة الطفل النفسية ؟</h2>
              <div className="steps-grid">
                {steps.map((step) => (
                  <div key={step.id} className="step-item">
                    <div className="step-header">
                      <span className="step-icon">{step.icon}</span>
                      <h3>{step.title}</h3>
                    </div>
                    <p className="step-desc">{step.desc}</p>
                  </div>
                ))}
              </div>

              <div className="cta-footer-box">
                <button className="btn-primary create-account-btn" onClick={() => navigate("/signup/parent")}>
                  أنشئ حسابك
                </button>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;
