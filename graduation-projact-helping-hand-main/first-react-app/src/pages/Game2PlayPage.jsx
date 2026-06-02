import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import GameTimer from '../components/game/GameTimer';
import GameSessionModal from '../components/modal/GameSessionModal';
import GameQuestionScreen from '../components/game/GameQuestionScreen';
import { game2Questions } from '../data/game2Questions';
import '../styles/gameplay.css';

const Game2PlayPage = () => {
  const navigate = useNavigate();
  const { childId } = useParams();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [modalType, setModalType] = useState(null); // 'interrupted' or 'expired'
  const [isFinished, setIsFinished] = useState(false);
  const [isSessionValid, setIsSessionValid] = useState(true);

  // TODO: Placeholder for storing answers to send to backend later
  // const [answers, setAnswers] = useState([]);

  const sessionId = childId || 'default';
  const sessionKey = `game2_session_${sessionId}`;
  const blockKey = `game2_blocked_${sessionId}`;

  useEffect(() => {
    // 1. Validate Session on Mount
    const currentSessionStatus = sessionStorage.getItem(sessionKey);
    const isBlocked = localStorage.getItem(blockKey);

    if (isBlocked === 'true') {
      setIsSessionValid(false);
      setModalType('interrupted');
      return;
    }

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
  }, [sessionKey, blockKey]);

  const handleTimeUp = () => {
    if (!isFinished && isSessionValid) {
      sessionStorage.setItem(sessionKey, 'expired');
      setIsSessionValid(false);
      setModalType('expired');
    }
  };

  const handleNext = (selectedOptionId) => {
    // TODO: Placeholder for saving current answer
    // setAnswers([...answers, { questionId: currentQuestion.id, answerId: selectedOptionId }]);

    if (currentQuestionIndex < game2Questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Mark as finished
      setIsFinished(true);
      sessionStorage.setItem(sessionKey, 'completed');

      // TODO: Placeholder for final result API submission
      // submitResultsToBackend(answers);

      navigate(`/game3/intro/${childId || 'default'}`);
    }
  };

  const handleModalClose = () => {
    setModalType(null);
  };

  const currentQuestion = game2Questions[currentQuestionIndex];

  return (
    <div className="game-page-container">
      <Header />

      <main className="game-main-content">
        <div className="game-card">

          {/* Timer is always shown */}
          <GameTimer sessionId={sessionId} onTimeUp={handleTimeUp} />

          <GameQuestionScreen
            questionText={currentQuestion.text}
            image={currentQuestion.image}
            options={currentQuestion.options}
            onNext={handleNext}
            currentStep={currentQuestionIndex + 1}
            totalSteps={game2Questions.length}
            isSessionValid={isSessionValid}
          />
        </div>
      </main>

      <Footer />

      {/* Interruption / Timeout Modal */}
      <GameSessionModal
        isOpen={!!modalType}
        type={modalType}
        onClose={handleModalClose}
      />
    </div>
  );
};

export default Game2PlayPage;
