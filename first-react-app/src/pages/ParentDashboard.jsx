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

// export default ParentDashboard;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Users } from "lucide-react";

import Header from "../components/layout/Header";
import NoChildrenModal from "../components/modal/NoChildrenModal";
import ProfileSection from "../components/dashboard/ProfileSection";
import DashboardCard from "../components/dashboard/DashboardCard";
import DashboardActionButton from "../components/dashboard/DashboardActionButton";
import FooterNote from "../components/auth/FooterNote";

import defaultParentImage from "../assets/default-parent.jpeg";

import "../styles/parentdashboard.css";

const ParentDashboard = () => {
  const navigate = useNavigate();

  const [parentData, setParentData] = useState({
    name: "سناء علي",
    email: "sanaa012@gmail.com",
    imageUrl: defaultParentImage,
    childrenCount: 0,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const hasChildren = parentData.childrenCount > 0;

  const handleOpenAssessment = () => {
    if (!hasChildren) {
      setIsModalOpen(true);
    } else {
      console.log("Navigate to SDQ assessment");
    }
  };

  const handleAddChild = () => {
    setIsModalOpen(false);
    navigate("/parent/add-child");
  };

  const handleImageChange = (newImageUrl) => {
    setParentData((prev) => ({
      ...prev,
      imageUrl: newImageUrl,
    }));
  };

  return (
    <div className="parent-dashboard-page">
      <Header />

      <main className="parent-dashboard-main">
        <ProfileSection
          name={parentData.name}
          email={parentData.email}
          imageUrl={parentData.imageUrl}
          onImageChange={handleImageChange}
        />

        <DashboardCard icon={<Users size={20} />} title="ملخص الأبناء">
          <p className="dashboard-card-text">
            {hasChildren
              ? `لديك ${parentData.childrenCount} ابن مسجل`
              : "لا يوجد لديك أبناء مسجلين بعد"}
          </p>

          <div className="dashboard-card-button-wrap">
            <DashboardActionButton onClick={handleAddChild}>
              أضف ابن جديد +
            </DashboardActionButton>
          </div>
        </DashboardCard>

        <DashboardCard
          icon={<span className="dashboard-check-icon">✓</span>}
          title="نموذج تقييم نقاط القوة والصعوبات (SDQ)"
        >
          <p className="dashboard-card-text dashboard-card-text-long">
            هو استبيان موجز وسريع يتكون من 25 بند يستخدم لفحص الحالة العاطفية
            والسلوكية للأطفال من خلال السؤال عن 5 مقاييس وهي : الأعراض
            العاطفية، مشاكل السلوك، فرط النشاط/قلة الانتباه، مشاكل العلاقات مع
            الأقران، والسلوك الاجتماعي الإيجابي. كل مقياس من الخمسة يتكون من 5
            بنود تقوم أنت كولي أمر بالإجابة عنها.
          </p>

          <p className="dashboard-card-note">
            الاسئلة عن الطفل لكن أنت من يجيب عنها
          </p>

          <div className="dashboard-card-button-wrap">
            <DashboardActionButton onClick={handleOpenAssessment}>
              نموذج تقييم طفلك
            </DashboardActionButton>
          </div>
        </DashboardCard>

        <div className="dashboard-tour-wrap">
          <DashboardActionButton variant="success" fullWidth>
            جولة في الموقع
          </DashboardActionButton>
        </div>
      </main>

      <FooterNote />

      <NoChildrenModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddChild={handleAddChild}
      />
    </div>
  );
};

export default ParentDashboard;