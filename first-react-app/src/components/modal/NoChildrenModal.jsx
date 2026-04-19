// import { useNavigate } from "react-router-dom";
// import { X } from "lucide-react";
// import "../../styles/nochildrenmodal.css";

// const NoChildrenModal = ({ open, onClose }) => {
//   const navigate = useNavigate();

//   if (!open) return null;
// const handleAddChild = () => {
//   onClose();
//   navigate("/parent/add-child");
// };

//   return (
//     <div className="no-children-overlay" onClick={onClose}>
//       <div className="no-children-modal" onClick={(e) => e.stopPropagation()}>
//         <button className="modal-close-btn" onClick={onClose}>
//           <X size={22} />
//         </button>
//         <p>لم تقم بإضافة أبناء بعد</p>
//         <button className="card-btn" onClick={handleAddChild}>
//           أضف ابن جديد +
//         </button>
//       </div>
//     </div>
//   );
// };

// export default NoChildrenModal;

import React from "react";
import { X } from "lucide-react";

const NoChildrenModal = ({ open, onClose, onAddChild }) => {
  if (!open) return null;

  return (
    <div className="no-children-modal-overlay" onClick={onClose}>
      <div
        className="no-children-modal-box"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="no-children-modal-close"
          onClick={onClose}
          aria-label="إغلاق"
        >
          <X size={20} />
        </button>

        <p className="no-children-modal-text">
          لم تقم بإضافة أبناء بعد
        </p>

        <button
          type="button"
          className="no-children-modal-button"
          onClick={onAddChild}
        >
          أضف ابن جديد +
        </button>
      </div>
    </div>
  );
};

export default NoChildrenModal;