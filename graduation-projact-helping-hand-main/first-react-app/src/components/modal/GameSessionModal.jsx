import React from "react";
import { useNavigate } from "react-router-dom";
import { X, AlertCircle } from "lucide-react";
import "../../styles/gameplay.css"; 

const GameSessionModal = ({ type, isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  // Determine modal content based on type (interrupted vs expired)
  const isInterrupted = type === "interrupted";

  const title = isInterrupted ? "تنبيه: انقطاع الجلسة" : "انتهى الوقت";
  
  const message = isInterrupted 
    ? "تم إنهاء الجلسة بسبب انقطاع أثناء اللعب. شروط التقييم السريع تتطلب إكمال الجلسة بشكل متواصل دون مغادرة أو توقف."
    : "لقد انتهى الوقت المخصص لهذه الجلسة (30 دقيقة). لم يتم استكمال جميع الأسئلة.";

  const nextSteps = "لن يتم احتساب هذه المحاولة، ويمكن إعادة اللعب الأسبوع القادم.";

  const handleReturn = () => {
    onClose();
    navigate("/parent/children");
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container" style={{ maxWidth: "500px", textAlign: "center" }}>
        <button className="modal-close-btn" onClick={handleReturn}>
          <X size={20} />
        </button>
        <div className="modal-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', padding: '1rem' }}>
          <AlertCircle size={64} color="var(--warning-color, #f39c12)" style={{ marginBottom: "1rem" }} />
          <h3 style={{ color: "var(--text-dark)", fontSize: "1.5rem", fontWeight: "700", margin: 0 }}>{title}</h3>
          
          <p style={{ color: "var(--text-muted)", fontSize: "1.1rem", lineHeight: "1.6", margin: 0 }}>
            {message}
          </p>
          
          <p style={{ color: "var(--error-color, #e74c3c)", fontSize: "1.1rem", fontWeight: "600", marginTop: "0.5rem" }}>
            {nextSteps}
          </p>

          <button 
            className="btn-primary" 
            onClick={handleReturn}
            style={{ marginTop: "1.5rem", width: "100%", padding: "0.8rem", fontSize: "1.2rem", fontWeight: "bold" }}
          >
            العودة لصفحة الأبناء
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameSessionModal;
