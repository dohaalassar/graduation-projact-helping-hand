
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/rolemodal.css";

const RoleSelectionModal = ({ open, onClose }) => {
  const navigate = useNavigate();
  const modalRef = useRef(null);

  const [selectedRole, setSelectedRole] = useState("parent");

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);

    return () =>
      document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      modalRef.current?.focus();
    }
  }, [open]);

  if (!open) return null;

  const handleSelect = (role) => {
    setSelectedRole(role);

    setTimeout(() => {
      onClose();

      if (role === "parent") {
        navigate("/signup/parent");
      } else {
        navigate("/signup/psychologist");
      }
    }, 150);
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
            className={`role-btn-parent ${
              selectedRole === "parent" ? "active-role" : ""
            }`}
            onClick={() => handleSelect("parent")}
          >
            ولي أمر
          </button>

          <button
            type="button"
            className={`role-btn-psychologist ${
              selectedRole === "psychologist" ? "active-role" : ""
            }`}
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