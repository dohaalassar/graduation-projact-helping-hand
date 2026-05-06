import "../../styles/ChildStatusCard.css";

export default function ChildStatusCard({ index, child }) {
  const statusText = child.isEvaluated ? "مقيم" : "غير مقيم بعد";
  const statusClass = child.isEvaluated ? "is-evaluated" : "is-not-evaluated";

  return (
    <div className="pd-child-item">
      <div className="pd-child-main-row">
        <div className="pd-child-identity">
          <span className="pd-child-num">{index}.</span>
          <span className="pd-child-name-text">{child.name}</span>
        </div>
        <div className={`pd-child-status-box ${statusClass}`}>
          <span>الحالة: {statusText}</span>
          <span className="pd-status-dot" />
        </div>
      </div>

      {child.note && (
        <div className="pd-child-note-box">
          <span className="pd-note-label">ملاحظة:</span>
          <span className="pd-note-content">{child.note}</span>
        </div>
      )}
      
      <div className="pd-child-divider" />
    </div>
  );
}
