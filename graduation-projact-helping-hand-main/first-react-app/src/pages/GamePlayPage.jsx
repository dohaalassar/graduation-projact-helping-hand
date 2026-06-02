import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import GameTimer from '../components/game/GameTimer';
import GameSessionModal from '../components/modal/GameSessionModal';
import GameQuestionCard from '../components/game/GameQuestionCard';
import { gameQuestions } from '../data/gameQuestions';
import '../styles/gameplay.css';

const GamePlayPage = () => {
  const navigate = useNavigate();
  const { childId } = useParams();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [modalType, setModalType] = useState(null); // 'interrupted' or 'expired'
  const [isFinished, setIsFinished] = useState(false);
  const [isSessionValid, setIsSessionValid] = useState(true);

  // TODO: Placeholder for storing answers to send to backend later
  // const [answers, setAnswers] = useState([]);

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

  const handleOptionSelect = (optionId) => {
    setSelectedOption(optionId);
  };

  const handleNext = () => {
    // TODO: Placeholder for saving current answer
    // setAnswers([...answers, { questionId: currentQuestion.id, answerId: selectedOption }]);

    if (currentQuestionIndex < gameQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
    } else {
      // Mark as finished
      setIsFinished(true);
      sessionStorage.setItem(sessionKey, 'completed');

      // TODO: Placeholder for final result API submission
      // submitResultsToBackend(answers);

      navigate(`/game2/intro/${childId || 'default'}`);
    }
  };

  const currentQuestion = gameQuestions[currentQuestionIndex];

  return (
    <div className="game-page-container">
      <Header />

      <main className="game-main-content">
        <div className="game-card">

          {/* Timer is always shown */}
          <GameTimer sessionId={sessionId} onTimeUp={handleTimeUp} />

          <GameQuestionCard
            question={currentQuestion}
            selectedOption={selectedOption}
            onOptionSelect={handleOptionSelect}
            isSessionValid={isSessionValid}
            onNext={handleNext}
          />
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
