// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Users } from "lucide-react";

// import Header from "../components/layout/Header";
// import NoChildrenModal from "../components/modal/NoChildrenModal";
// import ProfileSection from "../components/dashboard/ProfileSection";
// import DashboardCard from "../components/dashboard/DashboardCard";
// import DashboardActionButton from "../components/dashboard/DashboardActionButton";
// import FooterNote from "../components/auth/FooterNote";

// import "../styles/parentdashboard.css";

// const ParentDashboard = () => {
//   const navigate = useNavigate();

//   const [parentData] = useState({
//     name: "سناء علي",
//     email: "sanaa012@gmail.com",
//     imageUrl: null,
//     childrenCount: 0,
//   });

//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const hasChildren = parentData.childrenCount > 0;

//   const handleOpenAssessment = () => {
//     if (!hasChildren) {
//       setIsModalOpen(true);
//     } else {
//       console.log("Navigate to SDQ assessment");
//     }
//   };

//   const handleAddChild = () => {
//     setIsModalOpen(false);
//     navigate("/parent/add-child");
//   };

//   return (
//     <div className="parent-dashboard-page">
//       <Header/>

//       <main className="parent-dashboard-main">
//         <ProfileSection
//           name={parentData.name}
//           email={parentData.email}
//           imageUrl={parentData.imageUrl}
//         />

//         <DashboardCard
//           icon={<Users size={20} />}
//           title="ملخص الأبناء"
//         >
//           <p className="dashboard-card-text">
//             {hasChildren
//               ? `لديك ${parentData.childrenCount} ابن مسجل`
//               : "لا يوجد لديك أبناء مسجلين بعد"}
//           </p>

//           <div className="dashboard-card-button-wrap">
//             <DashboardActionButton onClick={handleAddChild}>
//               أضف ابن جديد +
//             </DashboardActionButton>
//           </div>
//         </DashboardCard>

//         <DashboardCard
//           icon={<span className="dashboard-check-icon">✓</span>}
//           title="نموذج تقييم نقاط القوة والصعوبات (SDQ)"
//         >
//           <p className="dashboard-card-text dashboard-card-text-long">
//             هو استبيان موجز وسريع يتكون من 25 بند يستخدم لفحص الحالة العاطفية
//             والسلوكية للأطفال من خلال السؤال عن 5 مقاييس وهي : الأعراض
//             العاطفية، مشاكل السلوك، فرط النشاط/قلة الانتباه، مشاكل العلاقات مع
//             الأقران، والسلوك الاجتماعي الإيجابي. كل مقياس من الخمسة يتكون من 5
//             بنود تقوم أنت كولي أمر بالإجابة عنها.
//           </p>

//           <p className="dashboard-card-note">
//             الاسئلة عن الطفل لكن أنت من يجيب عنها
//           </p>

//           <div className="dashboard-card-button-wrap">
//             <DashboardActionButton onClick={handleOpenAssessment}>
//               نموذج تقييم طفلك
//             </DashboardActionButton>
//           </div>
//         </DashboardCard>

//         <div className="dashboard-tour-wrap">
//           <DashboardActionButton variant="success" fullWidth>
//             جولة في الموقع
//           </DashboardActionButton>
//         </div>
//       </main>
//       <FooterNote />
//       <NoChildrenModal
//         open={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         onAddChild={handleAddChild}
//       />
//     </div>
//   );
// };

import { useState } from "react";

import Footer from "../components/layout/Footer.jsx";
import ParentProfileSection from "../components/parent-dashboard/ParentProfileSection.jsx";
import ChildrenSummarySection from "../components/parent-dashboard/ChildrenSummarySection.jsx";
import SDQSection from "../components/parent-dashboard/SDQSection.jsx";
import "../styles/ParentDashboard.css";

// Demo data — replace with real backend data.
// Toggle scenarios by editing the `parent` object below.
const demoParent = {
  name: "سناء علي",
  email: "sanaa.ali@example.com",
  avatar: "",
  
  // Try [] for empty state, or the array below for populated state.
  children: [
    {
      id: 1,
      name: "أحمد",
      isEvaluated: true,
      sdqCompleted: true,
      note: "",
    },
    {
      id: 2,
      name: "علي",
      isEvaluated: false,
      sdqCompleted: true,
      note: "نكرر موعد الفحص الثاني بتاريخ 29/1/2027 لإتمام عملية التقييم",
    },
    {
      id: 3,
      name: "نورا",
      isEvaluated: false,
      sdqCompleted: false,
      note: "قام بإجراء تقييم 500 لطفلتك. تم رفض طلب الإتمام التقييمية مرتين بين كل واحدة و7 أيام لإتمام عملية التقييم",
    },
  ],
};

export default function ParentDashboard() {
  const [parent] = useState(demoParent);
  const children = parent.children || [];

  // Determine the next child who still needs SDQ
  const nextChildForSDQ = children.find((c) => !c.sdqCompleted) || null;
  const allSDQCompleted = children.length > 0 && !nextChildForSDQ;

  return (
    <div className="pd-page" dir="rtl">

      <main className="pd-main">
        <ParentProfileSection parent={parent} />

        <ChildrenSummarySection children={children} />

        <SDQSection
          hasChildren={children.length > 0}
          nextChild={nextChildForSDQ}
          allCompleted={allSDQCompleted}
        />

        <button type="button" className="pd-tour-btn">
          جولة في الموقع
        </button>
      </main>

      <Footer />
    </div>
  );
}
