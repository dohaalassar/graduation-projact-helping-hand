import { useNavigate } from "react-router-dom";
import ChildStatusCard from "./ChildStatusCard.jsx";
import { Users } from "lucide-react";
import "../../styles/ChildrenSummarySection.css";

export default function ChildrenSummarySection({ children }) {
  const navigate = useNavigate();
  const hasChildren = Array.isArray(children) && children.length > 0;

  return (
    <section className="common-card pd-summary-card">
      <div className="pd-card-header-row">
        <Users className="pd-card-header-icon" size={24} />
        <h3 className="pd-card-title">ملخص الأبناء</h3>
      </div>

      {!hasChildren ? (
        <div className="pd-empty-state">
          <p className="pd-empty-msg">لا يوجد لديك أبناء مسجلين بعد</p>
          <button 
            type="button" 
            className="btn-primary pd-add-btn"
            onClick={() => navigate("/parent/add-child")}
          >
            أضف ابن جديد +
          </button>
        </div>
      ) : (
        <div className="pd-populated-state">
          <div className="pd-children-items-list">
            {children.map((c, i) => (
              <ChildStatusCard key={c.id} index={i + 1} child={c} />
            ))}
          </div>
          
          <div className="pd-summary-actions">
            <button 
              type="button" 
              className="btn-success pd-action-btn"
              onClick={() => navigate("/parent/children")}
            >
              تفاصيل الأبناء
            </button>
            <button 
              type="button" 
              className="btn-primary pd-action-btn"
              onClick={() => navigate("/parent/add-child")}
            >
              أضف ابن جديد +
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
