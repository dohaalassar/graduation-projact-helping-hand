import "../../styles/SDQSection.css";

export default function SDQSection({ hasChildren, nextChild, allCompleted }) {
  return (
    <section className="pd-card pd-sdq-card">
      <header className="pd-card-header">
        <h3>نموذج تقييم نقاط القوة والصعوبات (SDQ)</h3>
        <span className="pd-card-icon" aria-hidden>📋</span>
      </header>

      <p className="pd-sdq-desc">
        هو استبيان موجز وسريع يتكون من 25 بند يستخدم لفحص الحالة العاطفية
        والسلوكية للأطفال من خلال السؤال عن 5 مقاييس وهي: الأعراض العاطفية،
        مشاكل السلوك، فرط النشاط/قلة الانتباه، مشاكل العلاقات مع الأقران،
        والسلوك الاجتماعي الإيجابي. كل مقياس من الخمسة يتكون من 5 بنود تقوم أنت
        كولي أمر بالإجابة عنها.
      </p>
      <p className="pd-sdq-note">الأسئلة عن الطفل لكن أنت من يجيب عنها</p>

      {allCompleted ? (
        <div className="pd-sdq-success">
          <span className="pd-sdq-check">✓</span>
          <span>
            تهانينا، لقد أتممت الإجابة عن تقييم نقاط القوة والصعوبات لجميع أطفالك.
          </span>
        </div>
      ) : (
        <button type="button" className="pd-btn pd-btn-dark">
          {hasChildren && nextChild
            ? `نموذج تقييم طفلتك ${nextChild.name}`
            : "نموذج تقييم طفلك"}
        </button>
      )}
    </section>
  );
}

