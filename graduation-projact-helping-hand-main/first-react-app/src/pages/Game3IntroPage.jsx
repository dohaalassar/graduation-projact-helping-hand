import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import '../styles/gameplay.css';

const Game3IntroPage = () => {
  const navigate      = useNavigate();
  const { childId }   = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');

  const handleStart = () => {
    setError('');
    setLoading(true);

    const sId = childId || 'default';

    // ── تأكدي إن الـ assessmentId موجود ──
    const assessmentId = sessionStorage.getItem(`assessment_${sId}`);
    if (!assessmentId) {
      setError('لم يتم العثور على جلسة التقييم. يرجى العودة للبداية.');
      setLoading(false);
      return;
    }

    sessionStorage.setItem(`game3_session_${sId}`, 'active');
    navigate(`/game3/play/${sId}`);
  };

  return (
    <div className="game-page-container">
      <Header />

      <main className="game-main-content">
        <div className="game-card">

          {/* ── نجوم الخلفية ── */}
          <div className="game-stars-bg">
            <span className="star" style={{ top: '10%', left: '15%' }}>★</span>
            <span className="star" style={{ top: '20%', right: '20%' }}>★</span>
            <span className="star" style={{ top: '35%', left: '30%' }}>★</span>
            <span className="star" style={{ top: '50%', right: '10%' }}>★</span>
            <span className="star" style={{ top: '70%', left: '20%' }}>★</span>
            <span className="star" style={{ top: '80%', right: '30%' }}>★</span>
            <span className="star" style={{ top: '15%', left: '50%' }}>★</span>
            <span className="star" style={{ top: '65%', left: '70%' }}>★</span>
            <span className="star" style={{ top: '40%', right: '40%' }}>★</span>
            <span className="star" style={{ top: '85%', left: '45%' }}>★</span>
            <span className="star" style={{ top: '25%', right: '5%' }}>★</span>
            <span className="star" style={{ top: '75%', right: '15%' }}>★</span>
            <span className="star" style={{ top: '5%', left: '80%' }}>★</span>
          </div>

          {/* ── المحتوى ── */}
          <div
            className="game-intro-content"
            style={{ zIndex: 10, position: 'relative' }}
          >
            <h1 className="game-intro-title">
              تهانينا! هيا نبدأ اللعبة الثالثة
            </h1>

            <div
              className="game-title-pill"
              style={{
                backgroundColor: '#FFDF20',
                color: '#000',
                border: 'none',
                padding: '15px 40px',
                fontSize: '2rem',
                fontWeight: 'bold',
              }}
            >
              سباق التركيز
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

export default Game3IntroPage;