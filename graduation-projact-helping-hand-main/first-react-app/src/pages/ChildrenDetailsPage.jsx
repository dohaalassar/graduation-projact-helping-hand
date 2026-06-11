import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { UserPlus, X, Loader2, Camera, Trash2 } from "lucide-react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { getMyChildren, getChildAssessments } from "../services/childService";
import "../styles/childrendetails.css";

const ChildrenDetailsPage = () => {
  const navigate = useNavigate();

  const [children, setChildren]   = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError]         = useState(null);
  const [modalData, setModalData] = useState(null);

  const [selectedChildId, setSelectedChildId] = useState(null);
  const fileInputRef = useRef(null);

  // ── جيبي الأبناء من الباكند ──
  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        setIsLoading(true);

        const fetchedChildren = await getMyChildren();

        // لكل طفل جيبي التقييمات وابني بياناته
        const enriched = await Promise.all(
          fetchedChildren.map(async (child) => {
            try {
              const assessments = await getChildAssessments(child._id);
              const completed   = assessments.filter((a) => a.status === 'completed');

              // ── بيانات اللعب ──
              const plays      = completed.length;
              const firstPlay  = completed[0]
                ? new Date(completed[0].createdAt).toLocaleDateString('ar-EG')
                : '--';
              const secondPlay = completed[1]
                ? new Date(completed[1].createdAt).toLocaleDateString('ar-EG')
                : plays === 1
                ? new Date(
                    new Date(completed[0].createdAt).getTime() +
                      7 * 24 * 60 * 60 * 1000
                  ).toLocaleDateString('ar-EG')
                : '--';

              // ── النتيجة ──
              const latest      = completed[completed.length - 1];
              const riskLevel   = latest?.riskLevel   || 'pending';
              const totalScore  = latest?.scores?.totalDifficulties ?? '--';

              // ── اللون والحالة ──
              let status, statusColor, resultNote, tips;

              if (plays === 0) {
                status      = child.gender === 'female' ? 'غير مقيمة بعد' : 'غير مقيم بعد';
                statusColor = 'var(--text-muted)';
                resultNote  = `يرجى إحضار ${child.gender === 'female' ? 'الطفلة' : 'الطفل'} ${child.name} للعب الألعاب التقييمية`;
                tips = [
                  'يرجى اختيار وقت مناسب للعب يتوفر فيه الإنترنت',
                  `في خمس ألعاب متتالية قد تستغرق حوالي نصف ساعة`,
                ];
              } else if (plays === 1) {
                status      = child.gender === 'female' ? 'غير مقيمة بعد' : 'غير مقيم بعد';
                statusColor = '#f39c12';
                resultNote  = `يرجى إحضار ${child.gender === 'female' ? 'الطفلة' : 'الطفل'} ${child.name} ليلعب مرة أخرى بتاريخ ${secondPlay}`;
                tips = [
                  'عندما يعيد الطفل اللعب تظهر النتائج بشكل موضوعي أكثر',
                  'يرجى الالتزام بالتاريخ المحدد لإعادة اللعب',
                ];
              } else if (riskLevel === 'green') {
                status      = 'طبيعي';
                statusColor = 'var(--success-green)';
                resultNote  = 'نتائج طفلك ضمن المعدل الطبيعي، استمر في المتابعة الدورية';
                tips = [
                  'حافظ على التواصل اليومي مع طفلك',
                  'شجّعه على ممارسة الأنشطة الاجتماعية',
                ];
              } else if (riskLevel === 'yellow') {
                status      = 'يحتاج متابعة';
                statusColor = '#f39c12';
                resultNote  = 'طفلك يحتاج متابعة — يُنصح بالتواصل مع أخصائي نفسي للمراقبة';
                tips = [
                  'تابع سلوك طفلك بشكل منتظم',
                  'تحدث مع معلمه عن أي تغييرات ملحوظة',
                ];
              } else if (riskLevel === 'red') {
                status      = 'يحتاج تدخل عاجل';
                statusColor = '#e74c3c';
                resultNote  = 'طفلك يحتاج تدخلاً نفسياً عاجلاً — يرجى التواصل مع أخصائي نفسي فوراً';
                tips = [
                  'تواصل مع الأخصائي النفسي المعيّن في أقرب وقت',
                  'لا تتأخر في طلب المساعدة المتخصصة',
                ];
              } else {
                status      = 'جاري التقييم';
                statusColor = 'var(--text-muted)';
                resultNote  = 'لم يكتمل التقييم بعد';
                tips        = [];
              }

              return {
                id:           child._id,
                name:         child.name,
                gender:       child.gender,
                age:          child.age,
                image:        '',
                status,
                statusColor,
                plays,
                firstPlay,
                secondPlay,
                returnDate:   plays === 1 ? secondPlay : null,
                averageScore: totalScore !== '--' ? `${totalScore}/40` : '--',
                resultNote,
                tips,
                assessments,
              };
            } catch {
              return {
                id:           child._id,
                name:         child.name,
                gender:       child.gender,
                age:          child.age,
                image:        '',
                status:       child.gender === 'female' ? 'غير مقيمة بعد' : 'غير مقيم بعد',
                statusColor:  'var(--text-muted)',
                plays:        0,
                firstPlay:    '--',
                secondPlay:   '--',
                returnDate:   null,
                averageScore: '--',
                resultNote:   'يرجى إجراء التقييم',
                tips:         [],
                assessments:  [],
              };
            }
          })
        );

        if (isMounted) {
          setChildren(enriched);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError('حدث خطأ أثناء جلب بيانات الأبناء. يرجى المحاولة لاحقاً.');
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    loadData();
    return () => { isMounted = false; };
  }, []);

  // ── تغيير الصورة ──
  const handleAvatarClick = (childId) => {
    setSelectedChildId(childId);
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file && selectedChildId) {
      const previewUrl = URL.createObjectURL(file);
      setChildren((prev) =>
        prev.map((c) => (c.id === selectedChildId ? { ...c, image: previewUrl } : c))
      );
    }
    e.target.value = '';
  };

  const handleDeleteAvatar = (childId) => {
    setChildren((prev) =>
      prev.map((c) => (c.id === childId ? { ...c, image: '' } : c))
    );
  };

  // ── زر ابدأ باللعب ──
  const handleStartPlay = (child) => {
    if (child.plays === 1 && child.returnDate) {
      setModalData(child.returnDate);
    } else {
      navigate(`/game/intro/${child.id}`);
    }
  };

  return (
    <div className="details-page">
      <Header />

      <main className="details-container">

        {/* Loading */}
        {isLoading && (
          <div className="loading-state">
            <Loader2 className="spinner-icon" size={48} />
            <p>جاري تحميل بيانات الأبناء...</p>
          </div>
        )}

        {/* Error */}
        {!isLoading && error && (
          <div className="error-state">
            <p>{error}</p>
            <button className="btn-primary" onClick={() => window.location.reload()}>
              إعادة المحاولة
            </button>
          </div>
        )}

        {/* فارغ */}
        {!isLoading && !error && children.length === 0 && (
          <div className="empty-state">
            <div className="empty-state-icon">👶</div>
            <h3>لا يوجد أبناء مسجلين بعد</h3>
            <p>قم بإضافة بيانات أبنائك لتبدأ في متابعة حالتهم النفسية وتقييماتهم.</p>
            <button
              className="btn-primary add-child-footer-btn"
              onClick={() => navigate('/parent/add-child')}
            >
              أضف ابن جديد <UserPlus size={18} style={{ marginRight: '8px' }} />
            </button>
          </div>
        )}

        {/* البيانات */}
        {!isLoading && !error && children.length > 0 && (
          <>
            {children.map((child) => (
              <section key={child.id} className="child-detail-section">

                {/* Header Card */}
                <div className="common-card child-header-card">
                  <div className="child-info-row">
                    <div className="child-header-text">
                      <h3>{child.gender === 'female' ? 'الطفلة' : 'الطفل'}: {child.name}</h3>
                      <p>العمر: {child.age}</p>
                      <p>الحالة: <span style={{ color: child.statusColor }}>{child.status}</span></p>
                    </div>
                    <div className="child-avatar-container">
                      <div
                        className="child-avatar-circle"
                        onClick={() => handleAvatarClick(child.id)}
                        title="تغيير الصورة"
                      >
                        {child.image ? (
                          <img src={child.image} alt={child.name} className="avatar-img-real" />
                        ) : (
                          <div className="avatar-img-placeholder">
                            {child.name?.split(' ').map((s) => s[0]).slice(0, 2).join('') || '?'}
                          </div>
                        )}
                        <div className="child-avatar-overlay">
                          <Camera size={18} />
                          <span className="child-avatar-overlay-text">تغيير الصورة</span>
                        </div>
                      </div>
                      <div className="child-avatar-camera-badge">
                        <Camera size={10} />
                      </div>
                      {child.image && (
                        <button
                          type="button"
                          className="child-avatar-delete-btn"
                          onClick={(e) => { e.stopPropagation(); handleDeleteAvatar(child.id); }}
                          title="حذف الصورة"
                        >
                          <Trash2 size={12} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Stats Card */}
                <div className="common-card stats-grid-card">
                  <div className="stat-item">
                    <span className="stat-label">عدد مرات اللعب</span>
                    <span className="stat-value">{child.plays}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">تاريخ اللعب الأول</span>
                    <span className="stat-value">{child.firstPlay}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">تاريخ اللعب الثاني</span>
                    <span className="stat-value" style={{ color: child.plays === 1 ? '#f39c12' : 'inherit' }}>
                      {child.secondPlay}
                    </span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">متوسط النتائج</span>
                    <span className="stat-value">{child.averageScore}</span>
                  </div>
                </div>

                {/* Results Card */}
                <div className="common-card result-info-card">
                  <h4>نتيجة التقييم:</h4>
                  <p className="result-status">
                    الحالة: <span style={{ color: child.statusColor }}>{child.status}</span>
                  </p>
                  <p className="result-notes">ملاحظات: {child.resultNote}</p>
                </div>

                {/* Tips Card */}
                {child.tips.length > 0 && (
                  <div className="common-card tips-card">
                    <h4>نصائح:</h4>
                    <ul className="tips-list">
                      {child.tips.map((tip, idx) => (
                        <li key={idx}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Action Button */}
                <div className="child-action-wrap">
                  <button
                    className="btn-success full-width-btn"
                    onClick={() => handleStartPlay(child)}
                  >
                    ابدأ باللعب
                  </button>
                </div>

              </section>
            ))}

            {/* إضافة ابن جديد */}
            <div className="page-footer-actions">
              <button
                className="btn-primary add-child-footer-btn"
                onClick={() => navigate('/parent/add-child')}
              >
                أضف ابن جديد <UserPlus size={18} style={{ marginRight: '8px' }} />
              </button>
            </div>
          </>
        )}

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          style={{ display: 'none' }}
        />
      </main>

      {/* Modal */}
      {modalData && (
        <div className="modal-overlay">
          <div className="modal-container return-modal">
            <button className="modal-close-btn" onClick={() => setModalData(null)}>
              <X size={20} />
            </button>
            <div className="modal-content">
              <h3 className="return-modal-title">يرجى العودة بتاريخ {modalData}</h3>
              <button className="btn-primary modal-ok-btn" onClick={() => setModalData(null)}>
                حسناً
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default ChildrenDetailsPage;