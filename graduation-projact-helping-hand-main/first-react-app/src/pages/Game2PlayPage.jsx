import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import GameTimer from '../components/game/GameTimer';
import GameSessionModal from '../components/modal/GameSessionModal';
import GameQuestionScreen from '../components/game/GameQuestionScreen';
import { game2Questions } from '../data/game2Questions';
import { submitGameResult } from '../services/childService';
import '../styles/gameplay.css';

const Game2PlayPage = () => {
  const navigate      = useNavigate();
  const { childId }   = useParams();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [modalType, setModalType]     = useState(null);
  const [isFinished, setIsFinished]   = useState(false);
  const [isSessionValid, setIsSessionValid] = useState(true);
  const [answers, setAnswers]         = useState([]); // ← تخزين الإجابات
  const [startTime]                   = useState(Date.now()); // ← وقت البداية

  const sessionId  = childId || 'default';
  const sessionKey = `game2_session_${sessionId}`;
  const blockKey   = `game2_blocked_${sessionId}`;

  useEffect(() => {
    const currentSessionStatus = sessionStorage.getItem(sessionKey);
    const isBlocked = localStorage.getItem(blockKey);

    if (isBlocked === 'true') {
      setIsSessionValid(false);
      setModalType('interrupted');
      return;
    }

    if (currentSessionStatus !== 'active') {
      setIsSessionValid(false);
      setModalType('interrupted');
      return;
    }

    const handleBeforeUnload = () => {
      sessionStorage.setItem(sessionKey, 'interrupted');
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [sessionKey, blockKey]);

  const handleTimeUp = () => {
    if (!isFinished && isSessionValid) {
      sessionStorage.setItem(sessionKey, 'expired');
      setIsSessionValid(false);
      setModalType('expired');
    }
  };

  const handleNext = async (selectedOptionId) => {
    const currentQuestion = game2Questions[currentQuestionIndex];

    // ── احسبي النقاط للإجابة الحالية ──
    const selectedOption = currentQuestion.options.find(
      (o) => o.id === selectedOptionId
    );
    const pointsAwarded = selectedOption?.points ?? 0;

    // ── احفظي الإجابة ──
    const newAnswers = [
      ...answers,
      {
        scenarioId:      currentQuestion.id,
        selectedOption:  selectedOptionId,
        pointsAwarded,
        reactionTimeMs:  Date.now() - startTime,
      },
    ];
    setAnswers(newAnswers);

    // ── إذا آخر سؤال ──
    if (currentQuestionIndex < game2Questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsFinished(true);
      sessionStorage.setItem(sessionKey, 'completed');

      // ── أرسلي النتائج للباكند ──
      try {
        const assessmentId  = sessionStorage.getItem(`assessment_${childId}`);
        const durationSeconds = Math.floor((Date.now() - startTime) / 1000);

        if (assessmentId) {
          await submitGameResult(
            assessmentId,
            2,            // ← Game 2: Heroes Mission
            newAnswers,
            durationSeconds
          );
        }
      } catch (err) {
        console.error('خطأ في إرسال نتائج اللعبة 2:', err);
      }

      navigate(`/game3/intro/${childId || 'default'}`);
    }
  };

  const handleModalClose = () => setModalType(null);

  const currentQuestion = game2Questions[currentQuestionIndex];

  return (
    <div className="game-page-container">
      <Header />

      <main className="game-main-content">
        <div className="game-card">

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

      <GameSessionModal
        isOpen={!!modalType}
        type={modalType}
        onClose={handleModalClose}
      />
    </div>
  );
};

export default Game2PlayPage;