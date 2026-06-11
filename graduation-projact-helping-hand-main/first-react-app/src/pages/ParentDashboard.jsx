import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/layout/Header.jsx";
import Footer from "../components/layout/Footer.jsx";
import ParentProfileSection from "../components/parent-dashboard/ParentProfileSection.jsx";
import ChildrenSummarySection from "../components/parent-dashboard/ChildrenSummarySection.jsx";
import SDQSection from "../components/parent-dashboard/SDQSection.jsx";
import NoChildrenModal from "../components/modal/NoChildrenModal.jsx";
import { useAuth } from "../context/AuthContext";
import { getMyChildren, getChildAssessments } from "../services/childService";
import "../styles/parentdashboard.css";

export default function ParentDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [parent, setParent] = useState(null);
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // ── 1. جيبي بيانات الوالد من الـ user في Context ──
        setParent({
          name: user?.name || '',
          email: user?.email || '',
          avatar: '',
        });

        // ── 2. جيبي الأبناء من الباكند ──
        const fetchedChildren = await getMyChildren();

        // ── 3. لكل طفل جيبي حالة التقييم ──
        const childrenWithStatus = await Promise.all(
          fetchedChildren.map(async (child) => {
            try {
              const assessments = await getChildAssessments(child._id);

              // الطفل مقيّم إذا عنده جلستين مكتملتين
              const completed = assessments.filter(
                (a) => a.status === 'completed'
              );

              let note = '';
              let isEvaluated = false;

              if (completed.length === 0) {
                note = 'قم بإجراء تقييم SDQ ثم دعه يلعب الألعاب التقييمية';
              } else if (completed.length === 1) {
                // احسبي تاريخ الجلسة الثانية
                const session1Date = new Date(completed[0].createdAt);
                const session2Date = new Date(
                  session1Date.getTime() + 7 * 24 * 60 * 60 * 1000
                );
                const formatted = session2Date.toLocaleDateString('ar-EG');
                note = `تذكر موعد اللعب الثاني بتاريخ ${formatted} لإتمام عملية التقييم`;
              } else if (completed.length >= 2) {
                isEvaluated = true;
                note = '';
              }

              return {
                id: child._id,
                name: child.name,
                gender: child.gender,
                age: child.age,
                isEvaluated,
                note,
                assessments,
              };
            } catch {
              return {
                id: child._id,
                name: child.name,
                gender: child.gender,
                age: child.age,
                isEvaluated: false,
                note: 'قم بإجراء تقييم SDQ ثم دعه يلعب الألعاب التقييمية',
                assessments: [],
              };
            }
          })
        );

        setChildren(childrenWithStatus);
      } catch (error) {
        console.error('خطأ في جلب البيانات:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchData();
  }, [user]);

  const hasChildren = children.length > 0;

  // أول طفل ما أكمل التقييم
  const nextChild = children.find((c) => !c.isEvaluated);

  const handleSDQClick = () => {
    if (!hasChildren) {
      setIsModalOpen(true);
    } else {
      navigate('/parent/sdq', {
        state: {
          childName: nextChild?.name,
          gender: nextChild?.gender,
          childId: nextChild?.id,
        },
      });
    }
  };

  const handleAvatarChange = (newAvatarUrl) => {
    setParent((prev) => ({ ...prev, avatar: newAvatarUrl }));
  };

  // ── شاشة التحميل ──
  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        fontSize: '20px',
        color: '#2c4a6b',
        fontFamily: 'Cairo, sans-serif',
      }}>
        جاري تحميل البيانات...
      </div>
    );
  }

  return (
    <div className="pd-page">
      <Header />

      <main className="pd-main-container">
        <ParentProfileSection
          parent={parent}
          onAvatarChange={handleAvatarChange}
        />

        <div className="pd-sections-wrapper">
          <ChildrenSummarySection children={children} />

          <SDQSection
            hasChildren={hasChildren}
            nextChild={nextChild}
            allCompleted={hasChildren && children.every((c) => c.isEvaluated)}
            onSDQClick={handleSDQClick}
          />

          <button type="button" className="pd-tour-btn">
            جولة في الموقع
          </button>
        </div>
      </main>

      <NoChildrenModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <Footer />
    </div>
  );
}