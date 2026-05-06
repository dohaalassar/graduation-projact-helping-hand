// import { useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import { X } from "lucide-react";

// const RoleSelectionModal = ({ open, onClose }) => {
//   const navigate = useNavigate();
//   const modalRef = useRef(null);

//   useEffect(() => {
//     if (!open) return;

//     const handleKeyDown = (e) => {
//       if (e.key === "Escape") onClose();
//     };

//     document.addEventListener("keydown", handleKeyDown);
//     return () => document.removeEventListener("keydown", handleKeyDown);
//   }, [open, onClose]);

//   useEffect(() => {
//     if (open) {
//       modalRef.current?.focus();
//     }
//   }, [open]);

//   if (!open) return null;

//   const handleSelect = (role) => {
//     onClose();

//     if (role === "parent") {
//       navigate("/signup/parent");
//     } else {
//       navigate("/signup/psychologist");
//     }
//   };

//   return (
//     <div
//       className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 animate-fade-in"
//       onClick={onClose}
//       role="dialog"
//       aria-modal="true"
//       aria-label="اختر نوع الحساب"
//     >
//       <div
//         ref={modalRef}
//         tabIndex={-1}
//         className="bg-popover rounded-2xl shadow-2xl p-8 w-full max-w-sm mx-4 animate-scale-in relative"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <button
//           onClick={onClose}
//           className="absolute top-4 left-4 w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/70 transition-colors"
//           aria-label="إغلاق"
//         >
//           <X className="w-4 h-4 text-secondary-foreground" />
//         </button>

//         <h2 className="text-xl font-bold text-popover-foreground text-center mb-8">
//           انضم إلينا
//         </h2>

//         <div className="flex flex-col gap-4">
//           <button onClick={() => handleSelect("parent")} className="auth-btn-primary">
//             ولي أمر
//           </button>

//           <button onClick={() => handleSelect("psychologist")} className="auth-btn-secondary">
//             أخصائي نفسي
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RoleSelectionModal;
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/rolemodal.css";

const RoleSelectionModal = ({ open, onClose }) => {
  const navigate = useNavigate();
  const modalRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      modalRef.current?.focus();
    }
  }, [open]);

  if (!open) return null;

  const handleSelect = (role) => {
    onClose();

    if (role === "parent") {
      navigate("/signup/parent");
    } else {
      navigate("/signup/psychologist");
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="role-modal-box"
        ref={modalRef}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="role-modal-title">انضم الينا كـ</h2>

        <div className="role-modal-buttons">
          <button
            type="button"
            className="role-btn-parent"
            onClick={() => handleSelect("parent")}
          >
            ولي أمر
          </button>

          <button
            type="button"
            className="role-btn-psychologist"
            onClick={() => handleSelect("psychologist")}
          >
            أخصائي نفسي
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleSelectionModal;