import ChildStatusCard from "./ChildStatusCard.jsx";
import "../../styles/ChildrenSummarySection.css";

export default function ChildrenSummarySection({ children }) {
  const hasChildren = Array.isArray(children) && children.length > 0;

  return (
    <section className="pd-card pd-children-card">
      <header className="pd-card-header">
        <h3>ملخص الأبناء</h3>
        <span className="pd-card-icon" aria-hidden>👥</span>
      </header>

      {!hasChildren ? (
        <>
          <p className="pd-empty-text">لا يوجد لديك أبناء مسجلين بعد</p>
          <button type="button" className="pd-btn pd-btn-dark">
            أضف ابن جديد +
          </button>
        </>
      ) : (
        <>
          <div className="pd-children-list">
            {children.map((c, i) => (
              <ChildStatusCard key={c.id} index={i + 1} child={c} />
            ))}
          </div>
          <div className="pd-children-actions">
            <button type="button" className="pd-btn pd-btn-success">
              تفاصيل الأبناء
            </button>
            <button type="button" className="pd-btn pd-btn-dark">
              أضف ابن جديد +
            </button>
          </div>
        </>
      )}
    </section>
  );
}
