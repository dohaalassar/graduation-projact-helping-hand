import "../../styles/ChildStatusCard.css";

export default function ChildStatusCard({ index, child }) {
  const statusText = child.isEvaluated ? "مقيم" : "غير مقيم";
  const statusClass = child.isEvaluated ? "is-evaluated" : "is-not-evaluated";

  return (
    <div className="pd-child-card">
      <div className="pd-child-row">
        <div className="pd-child-name">
          <span className="pd-child-index">{index}.</span>
          <strong>{child.name}</strong>
        </div>
        <div className={`pd-child-status ${statusClass}`}>
          <span className="pd-status-dot" />
          <span>الحالة: {statusText}</span>
        </div>
      </div>

      {child.note && (
        <div className="pd-child-note">
          <span className="pd-note-label">ملاحظة:</span> {child.note}
        </div>
      )}
    </div>
  );
}
