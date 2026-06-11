import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { createAssessment } from '../services/childService';
import '../styles/gameplay.css';

const GameIntroPage = () => {
  const navigate      = useNavigate();
  const { childId }   = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');

  const handleStart = async () => {
    setError('');
    setLoading(true);

    const sId = childId || 'default';

    try {
      // ── إنشاء assessment جديد في الباكند ──
      const assessment = await createAssessment(sId);

      // ── احفظي الـ assessmentId عشان كل الألعاب تستخدمه ──
      sessionStorage.setItem(`assessment_${sId}`, assessment._id);

      // ── ضعي علامة الجلسة النشطة ──
      sessionStorage.setItem(`game_session_${sId}`, 'active');

      // ── ضعي وقت انتهاء الـ 30 دقيقة ──
      const endTime = Date.now() + 30 * 60 * 1000;
      localStorage.setItem(`global_timer_end_${sId}`, endTime.toString());

      // ── امسحي أي حجب سابق ──
      localStorage.removeItem(`game2_blocked_${sId}`);

      navigate(`/game/play/${sId}`);

    } catch (err) {
      const msg = err.response?.data?.message || '';

      // إذا في assessment شغال بالفعل — كملي
      if (msg.includes('in_progress') || msg.includes('already')) {
        sessionStorage.setItem(`game_session_${sId}`, 'active');
        const endTime = Date.now() + 30 * 60 * 1000;
        localStorage.setItem(`global_timer_end_${sId}`, endTime.toString());
        localStorage.removeItem(`game2_blocked_${sId}`);
        navigate(`/game/play/${sId}`);
        return;
      }

      // إذا ما مضى 7 أيام
      if (msg.includes('day')) {
        setError(msg);
      } else if (msg.includes('SDQ')) {
        setError('يرجى إكمال تقييم SDQ أولاً قبل بدء الألعاب');
      } else {
        setError('حدث خطأ أثناء بدء الجلسة. يرجى المحاولة مجدداً.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="game-page-container">
      <Header />

      <main className="game-main-content">
        <div className="game-card">

          {/* ── نجوم الخلفية ── */}
          <div className="game-stars-bg">
            <span className="star">★</span>
            <span className="star">★</span>
            <span className="star">★</span>
            <span className="star">★</span>
            <span className="star">★</span>
            <span className="star">★</span>
            <span className="star">★</span>
            <span className="star">★</span>
            <span className="star">★</span>
            <span className="star">★</span>
            <span className="star">★</span>
            <span className="star">★</span>
            <span className="star">★</span>
          </div>

          {/* ── المحتوى ── */}
          <div className="game-intro-content">
            <h1 className="game-intro-title">هيا نبدأ اللعبة الأولى</h1>

            <div className="game-title-pill">
              رحلة المشاعر
            </div>

            {error && (
              <p style={{
                color: '#ef4444',
                backgroundColor: 'rgba(255,255,255,0.9)',
                padding: '10px 20px',
                borderRadius: '10px',
                marginTop: '15px',
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
                {error}
              </p>
            )}

            <button
              className="game-btn-start"
              onClick={handleStart}
              disabled={loading}
            >
              {loading ? 'جاري التحضير...' : 'ابدأ'}
            </button>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default GameIntroPage;