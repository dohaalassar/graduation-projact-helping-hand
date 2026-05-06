import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserPlus, X, Loader2 } from "lucide-react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import "../styles/childrendetails.css";

// Import images (ensure these exist in your src/assets folder)
import ahmedImg from "../assets/ahmed.jpeg";
import aliImg from "../assets/ali.jpeg";
import noraImg from "../assets/nora.jpeg";

// 1. Backend Readiness: Structured Mock Data
const MOCK_CHILDREN_DATA = [
  {
    id: 1,
    name: "أحمد",
    gender: "male", // Added gender field
    age: 7,
    status: "طبيعي",
    statusColor: "var(--success-green)",
    plays: 2,
    firstPlay: "22/1/2027",
    secondPlay: "28/1/2027",
    averageScore: "86%",
    resultNote: "يحتاج التدرب على التركيز من خلال تمرينات يومية بسيطة",
    tips: [
      "تغيير بسيط في الغرفة وملاحظة هل انتبه الطفل وسؤاله عن هذا التغيير",
      "تكرار التمرين يومياً لزيادة تركيز الطفل على البيئة من حوله"
    ],
    image: ahmedImg
  },
  {
    id: 2,
    name: "علي",
    gender: "male",
    age: 10,
    status: "غير مقيم بعد",
    statusColor: "var(--text-muted)",
    plays: 1,
    firstPlay: "23/1/2027",
    secondPlay: "29/1/2027",
    averageScore: "--",
    resultNote: "يرجى احضار الطفل علي ليلعب مرة أخرى بتاريخ 29/1/2027 وذلك للتأكد من صحة النتائج شاكرين لكم تعاونكم",
    tips: [
      "عندما يعيد الطفل اللعب مرة أخرى تظهر نتائج التقييم بشكل موضوعي أكثر",
      "يرجى الالتزام بالتاريخ المحدد لاعادة اللعب",
      "في حال عدم الالتزام بالتاريخ المحدد، سيضطر الطفل للبدء من جديد"
    ],
    returnDate: "29/1/2027",
    image: aliImg
  },
  {
    id: 3,
    name: "نورا",
    gender: "female",
    age: 9,
    status: "غير مقيمة بعد",
    statusColor: "var(--text-muted)",
    plays: 0,
    firstPlay: "--",
    secondPlay: "--",
    averageScore: "--",
    resultNote: "يرجى احضار الطفلة نورا لتلعب الالعاب التقييمية شاكرين لكم تعاونكم",
    tips: [
      "يرجى اختيار وقت مناسب للعب يتوفر فيه الانترنت والكهرباء للوصول الى موقعنا",
      "يرجى ان تكون الطفلة في وضع مناسب لتقوم بجولة الالعاب الأولى",
      "في خمس العاب متتالية قد تستغرق حوالي نصف ساعة من اللعب"
    ],
    image: noraImg
  }
];

// Mock API Call
const fetchChildrenDetails = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_CHILDREN_DATA);
    }, 1200); // Simulate 1.2s network delay
  });
};

const ChildrenDetailsPage = () => {
  const navigate = useNavigate();
  const [children, setChildren] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalData, setModalData] = useState(null);

  // 2. Data Fetching Hook
  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchChildrenDetails();
        if (isMounted) {
          setChildren(data);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError("حدث خطأ أثناء جلب بيانات الأبناء. يرجى المحاولة لاحقاً.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleStartPlay = (child) => {
    if (child.plays === 1 && child.returnDate) {
      setModalData(child.returnDate);
    } else {
      console.log(`Starting play for ${child.name}`);
    }
  };

  return (
    <div className="details-page">
      <Header />

      <main className="details-container">
        {/* Loading State */}
        {isLoading && (
          <div className="loading-state">
            <Loader2 className="spinner-icon" size={48} />
            <p>جاري تحميل بيانات الأبناء...</p>
          </div>
        )}

        {/* Error State */}
        {!isLoading && error && (
          <div className="error-state">
            <p>{error}</p>
            <button className="btn-primary" onClick={() => window.location.reload()}>
              إعادة المحاولة
            </button>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && children.length === 0 && (
          <div className="empty-state">
            <div className="empty-state-icon">👶</div>
            <h3>لا يوجد أبناء مسجلين بعد</h3>
            <p>قم بإضافة بيانات أبنائك لتبدأ في متابعة حالتهم النفسية وتقييماتهم.</p>
            <button 
               className="btn-primary add-child-footer-btn"
               onClick={() => navigate("/parent/add-child")}
             >
               أضف ابن جديد <UserPlus size={18} style={{ marginRight: '8px' }} />
             </button>
          </div>
        )}

        {/* Data State */}
        {!isLoading && !error && children.length > 0 && (
          <>
            {children.map((child) => (
              <section key={child.id} className="child-detail-section">
                {/* Child Header Card */}
                <div className="common-card child-header-card">
                  <div className="child-info-row">
                    <div className="child-header-text">
                      {/* Conditional Rendering for Gender Title */}
                      <h3>{child.gender === 'female' ? 'الطفلة' : 'الطفل'}: {child.name}</h3>
                      <p>العمر: {child.age}</p>
                      <p>الحالة: <span style={{ color: child.statusColor }}>{child.status}</span></p>
                    </div>
                    <div className="child-avatar-circle">
                       {child.image ? (
                         <img src={child.image} alt={child.name} className="avatar-img-real" />
                       ) : (
                         <div className="avatar-img-placeholder" />
                       )}
                    </div>
                  </div>
                </div>

                {/* Stats Card */}
                <div className="common-card stats-grid-card">
                  <div className="stat-item">
                    <span className="stat-label">عدد مرات اللعب</span>
                    <span className="stat-value">{child.plays}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">تاريخ اللعب الاول</span>
                    <span className="stat-value">{child.firstPlay}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">تاريخ اللعب الثاني</span>
                    <span className="stat-value" style={{ color: child.plays === 1 ? '#f39c12' : 'inherit' }}>
                      {child.secondPlay}
                    </span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">متوسط النتائج</span>
                    <span className="stat-value">{child.averageScore}</span>
                  </div>
                </div>

                {/* Results Card */}
                <div className="common-card result-info-card">
                  <h4>نتيجة التقييم :</h4>
                  <p className="result-status">الحالة: <span style={{ color: child.statusColor }}>{child.status}</span></p>
                  <p className="result-notes">ملاحظات: {child.resultNote}</p>
                </div>

                {/* Tips Card */}
                <div className="common-card tips-card">
                  <h4>نصائح :</h4>
                  <ul className="tips-list">
                    {child.tips.map((tip, idx) => (
                      <li key={idx}>{tip}</li>
                    ))}
                  </ul>
                </div>

                {/* Action Button */}
                <div className="child-action-wrap">
                  <button 
                    className="btn-success full-width-btn"
                    onClick={() => handleStartPlay(child)}
                  >
                    ابدأ باللعب
                  </button>
                </div>
              </section>
            ))}

            {/* Global Page Action */}
            <div className="page-footer-actions">
               <button 
                 className="btn-primary add-child-footer-btn"
                 onClick={() => navigate("/parent/add-child")}
               >
                 أضف ابن جديد <UserPlus size={18} style={{ marginRight: '8px' }} />
               </button>
            </div>
          </>
        )}
      </main>

      {/* Return Date Modal */}
      {modalData && (
        <div className="modal-overlay">
          <div className="modal-container return-modal">
            <button className="modal-close-btn" onClick={() => setModalData(null)}>
              <X size={20} />
            </button>
            <div className="modal-content">
              <h3 className="return-modal-title">يرجى العودة بتاريخ {modalData}</h3>
              <button className="btn-primary modal-ok-btn" onClick={() => setModalData(null)}>
                حسناً
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default ChildrenDetailsPage;
