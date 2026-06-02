import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import '../styles/gameplay.css';

const GameIntroPage = () => {
  const navigate = useNavigate();
  const { childId } = useParams();

  const handleStart = () => {
    const sId = childId || 'default';
    // Set active session flag for this child
    sessionStorage.setItem(`game_session_${sId}`, 'active');
    
    // Set global timer for the session (30 minutes from now)
    const endTime = Date.now() + 30 * 60 * 1000;
    localStorage.setItem(`global_timer_end_${sId}`, endTime.toString());
    
    // Clear any previous blocking
    localStorage.removeItem(`game2_blocked_${sId}`);

    // Navigate to gameplay page
    navigate(`/game/play/${sId}`);
  };

  return (
    <div className="game-page-container">
      <Header />

      <main className="game-main-content">
        <div className="game-card">
          {/* Star Background Elements */}
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

          {/* Intro Content */}
          <div className="game-intro-content">
            <h1 className="game-intro-title">هيا نبدأ اللعبة الأولى</h1>

            <div className="game-title-pill">
              رحلة المشاعر
            </div>

            <button className="game-btn-start" onClick={handleStart}>
              ابدأ
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default GameIntroPage;
