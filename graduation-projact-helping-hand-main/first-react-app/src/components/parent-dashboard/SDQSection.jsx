import { PencilLine, CheckCircle2 } from "lucide-react";
import "../../styles/SDQSection.css";

export default function SDQSection({ hasChildren, nextChild, allCompleted, onSDQClick }) {
  return (
    <section className="common-card pd-sdq-card">
      <div className="pd-card-header-row">
        <PencilLine className="pd-card-header-icon" size={24} />
        <h3 className="pd-card-title">نموذج تقييم نقاط القوة والصعوبات (SDQ)</h3>
      </div>

      <div className="pd-sdq-body">
        <p className="pd-sdq-info-text">
          هو استبيان موجز وسريع يتكون من 25 بند يستخدم لفحص الحالة العاطفية والسلوكية للأطفال من خلال السؤال عن 5 مقاييس وهي: الأعراض العاطفية، مشاكل السلوك، فرط النشاط/قلة الانتباه، مشاكل العلاقات مع الأقران، والسلوك الاجتماعي الإيجابي. كل مقياس من الخمسة يتكون من 5 بنود تقوم أنت كولي أمر بالإجابة عنها.
        </p>
        
        <p className="pd-sdq-instruction">الاسئلة عن الطفل لكن أنت من يجيب عنها</p>

        {allCompleted ? (
          <div className="pd-sdq-completed-msg">
             <CheckCircle2 className="pd-success-icon" size={28} />
             <p>تهانينا، لقد أتممت الإجابة عن تقييم نقاط القوة والصعوبات لجميع أطفالك.</p>
          </div>
        ) : (
          <div className="pd-sdq-action-row">
            <button 
              type="button" 
              className="btn-primary pd-sdq-btn"
              onClick={onSDQClick}
            >
              نموذج تقييم طفلك {nextChild?.name || ""}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
