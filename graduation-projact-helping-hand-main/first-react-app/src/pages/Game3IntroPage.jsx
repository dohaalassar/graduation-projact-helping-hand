import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import '../styles/gameplay.css';

const Game3IntroPage = () => {
  const navigate = useNavigate();
  const { childId } = useParams();

  const handleStart = () => {
    // Set active session flag for this child
    sessionStorage.setItem(`game3_session_${childId || 'default'}`, 'active');
    // Navigate to gameplay page (Assuming Game3PlayPage will exist)
    navigate(`/game3/play/${childId || 'default'}`);
  };

  return (
    <div className="game-page-container">
      <Header />

      <main className="game-main-content">
        <div className="game-card">
          {/* Star Background Elements */}
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

          {/* Intro Content */}
          <div className="game-intro-content" style={{ zIndex: 10, position: 'relative' }}>
            <h1 className="game-intro-title">تهانينا !هيا نبدأ اللعبة الثالثة</h1>

            <div className="game-title-pill" style={{ backgroundColor: '#FFDF20', color: '#000', border: 'none', padding: '15px 40px', fontSize: '2rem', fontWeight: 'bold' }}>
              سباق التركيز
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

export default Game3IntroPage;
