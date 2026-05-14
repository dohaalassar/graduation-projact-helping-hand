import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import GameTimer from '../components/game/GameTimer';
import GameSessionModal from '../components/modal/GameSessionModal';
import '../styles/gameplay.css';

// Import the specific game image
import game1Img from '../assets/Game1.jpg';

const GamePlayPage = () => {
  const navigate = useNavigate();
  const { childId } = useParams();
  
  const [selectedOption, setSelectedOption] = useState(null);
  const [modalType, setModalType] = useState(null); // 'interrupted' or 'expired'
  const [isFinished, setIsFinished] = useState(false);
  const [isSessionValid, setIsSessionValid] = useState(true);

  const sessionId = childId || 'default';
  const sessionKey = `game_session_${sessionId}`;

  useEffect(() => {
    // 1. Validate Session on Mount
    const currentSessionStatus = sessionStorage.getItem(sessionKey);
    
    if (currentSessionStatus !== 'active') {
      // If they refreshed or navigated directly without start flag, session is invalid
      setIsSessionValid(false);
      setModalType('interrupted');
      return;
    }

    // 2. Handle Page Refresh / Close (Interruption)
    const handleBeforeUnload = () => {
      sessionStorage.setItem(sessionKey, 'interrupted');
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    // 3. Cleanup event listener
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [sessionKey]);

  const handleTimeUp = () => {
    if (!isFinished && isSessionValid) {
      sessionStorage.setItem(sessionKey, 'expired');
      setIsSessionValid(false);
      setModalType('expired');
    }
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleNext = () => {
    // Mark as finished cleanly (for this simple single-question demo)
    // In a real flow, this would go to the next question.
    // For now, we simulate completion.
    setIsFinished(true);
    sessionStorage.setItem(sessionKey, 'completed');
    
    // For demonstration, navigate back to children page
    navigate('/parent/children');
  };

  return (
    <div className="game-page-container">
      <Header />

      <main className="game-main-content">
        <div className="game-card">
          
          {/* Timer is always shown as requested */}
          <GameTimer initialMinutes={30} onTimeUp={handleTimeUp} />

          <div className="gameplay-content">
            <h2 className="game-question-text">
              بماذا تشعر اذا سمعت صوت الزنانة العالي ؟
            </h2>

            <div className="game-image-container">
              <img src={game1Img} alt="طفل في خيمة ويسمع صوت زنانة" />
            </div>

            <div className="game-options-container">
              <button 
                className={`game-option-btn ${selectedOption === 'fear' ? 'selected' : ''}`}
                onClick={() => handleOptionClick('fear')}
                disabled={!isSessionValid}
              >
                أشعر بالخوف 😱
              </button>
              
              <button 
                className={`game-option-btn ${selectedOption === 'safe' ? 'selected' : ''}`}
                onClick={() => handleOptionClick('safe')}
                disabled={!isSessionValid}
              >
                أشعر بالاطمئنان 😊
              </button>
              
              <button 
                className={`game-option-btn ${selectedOption === 'anxiety' ? 'selected' : ''}`}
                onClick={() => handleOptionClick('anxiety')}
                disabled={!isSessionValid}
              >
                أشعر بالقلق 😟
              </button>
            </div>

            <button 
              className="game-btn-next" 
              onClick={handleNext}
              disabled={!selectedOption || !isSessionValid}
            >
              التالي
            </button>
          </div>
        </div>
      </main>

      <Footer />

      {/* Interruption / Timeout Modal */}
      <GameSessionModal 
        isOpen={!!modalType} 
        type={modalType} 
        onClose={() => setModalType(null)} 
      />
    </div>
  );
};

export default GamePlayPage;
