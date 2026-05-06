import React from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../../styles/nochildrenmodal.css";

export default function NoChildrenModal({ open, onClose }) {
  const navigate = useNavigate();

  if (!open) return null;

  const handleAddChild = () => {
    onClose();
    navigate("/parent/add-child");
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="modal-close-btn" onClick={onClose}>
          <X size={24} />
        </button>
        
        <div className="modal-content">
          <h2 className="modal-title">لم تقم باضافة أبناء بعد</h2>
          <button 
            className="btn-primary modal-action-btn" 
            onClick={handleAddChild}
          >
            أضف ابن جديد +
          </button>
        </div>
      </div>
    </div>
  );
}