import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/layout/Header.jsx";
import Footer from "../components/layout/Footer.jsx";
import ParentProfileSection from "../components/parent-dashboard/ParentProfileSection.jsx";
import ChildrenSummarySection from "../components/parent-dashboard/ChildrenSummarySection.jsx";
import SDQSection from "../components/parent-dashboard/SDQSection.jsx";
import NoChildrenModal from "../components/modal/NoChildrenModal.jsx";
import "../styles/parentdashboard.css";

// Demo data
const demoParent = {
  name: "سناء علي",
  email: "sanaa.ali@example.com",
  avatar: "", // Can add a real image path here
  children: [
    {
      id: 1,
      name: "أحمد",
      gender: "male",
      isEvaluated: true,
      note: "",
    },
    {
      id: 2,
      name: "علي",
      gender: "male",
      isEvaluated: false,
      note: "تذكر موعد اللعب الثاني بتاريخ 29/1/2027 لاتمام عملية التقييم",
    },
    {
      id: 3,
      name: "نورا",
      gender: "female",
      isEvaluated: false,
      note: "قم باجراء تقييم SDQ لطفلتك . ثم دعها تلعب الالعاب التقييمية مرتين بين كل واحدة و 7 أيام لاتمام عملية التقييم",
    },
  ],
};

export default function ParentDashboard() {
  const navigate = useNavigate();
  const [parent] = useState(demoParent);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const children = parent.children || [];
  const hasChildren = children.length > 0;
  
  // Find the first child who hasn't completed SDQ
  const nextChild = children.find(c => !c.isEvaluated);
  
  // Logic to open modal if user tries to do SDQ without children
  const handleSDQClick = () => {
    if (!hasChildren) {
      setIsModalOpen(true);
    } else {
      navigate("/parent/sdq", { state: { childName: nextChild?.name, gender: nextChild?.gender } });
    }
  };

  return (
    <div className="pd-page">
      <Header />

      <main className="pd-main-container">
        <ParentProfileSection parent={parent} />

        <div className="pd-sections-wrapper">
          <ChildrenSummarySection children={children} />

          <SDQSection
            hasChildren={hasChildren}
            nextChild={nextChild}
            allCompleted={hasChildren && children.every(c => c.isEvaluated)}
            onSDQClick={handleSDQClick}
          />

          <button type="button" className="pd-tour-btn">
            جولة في الموقع
          </button>
        </div>
      </main>

      <NoChildrenModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
      
      <Footer />
    </div>
  );
}
