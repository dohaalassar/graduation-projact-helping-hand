import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import GameTimer from '../components/game/GameTimer';
import GameSessionModal from '../components/modal/GameSessionModal';
import GameQuestionCard from '../components/game/GameQuestionCard';
import { game4Questions } from '../data/game4Questions';
import { submitGameResult } from '../services/childService';
import '../styles/gameplay.css';

const Game4PlayPage = () => {
  const navigate    = useNavigate();
  const { childId } = useParams();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [modalType, setModalType]           = useState(null);
  const [isFinished, setIsFinished]         = useState(false);
  const [isSessionValid, setIsSessionValid] = useState(true);
  const [answers, setAnswers]               = useState([]); // ← تخزين الإجابات
  const [startTime]                         = useState(Date.now());

  const sessionId  = childId || 'default';
  const sessionKey = `game4_session_${sessionId}`;

  useEffect(() => {
    const currentSessionStatus = sessionStorage.getItem(sessionKey);

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

  const handleNext = async () => {
    const currentQuestion = game4Questions[currentQuestionIndex];

    // ── احسبي النقاط للإجابة الحالية ──
    const selected = currentQuestion.options?.find(
      (o) => o.id === selectedOption
    );
    const pointsAwarded = selected?.points ?? 0;

    // ── احفظي الإجابة ──
    const newAnswers = [
      ...answers,
      {
        scenarioId:     currentQuestion.id,
        selectedOption: selectedOption,
        pointsAwarded,
        reactionTimeMs: Date.now() - startTime,
      },
    ];
    setAnswers(newAnswers);

    if (currentQuestionIndex < game4Questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
    } else {
      // ── آخر سؤال ──
      setIsFinished(true);
      sessionStorage.setItem(sessionKey, 'completed');

      // ── أرسلي النتائج للباكند ──
      try {
        const assessmentId    = sessionStorage.getItem(`assessment_${childId}`);
        const durationSeconds = Math.floor((Date.now() - startTime) / 1000);

        if (assessmentId) {
          await submitGameResult(
            assessmentId,
            4,            // ← Game 4: Good Friend
            newAnswers,
            durationSeconds
          );
        }
      } catch (err) {
        console.error('خطأ في إرسال نتائج اللعبة 4:', err);
      }

      // ── الانتقال للعبة التالية إن وجدت ──
      // navigate(`/game5/intro/${childId || 'default'}`);
      // مؤقتاً سيتم التوجيه للصفحة الرئيسية حتى يتم إنشاء اللعبة 5
      navigate('/parent/dashboard');
    }
  };

  const currentQuestion = game4Questions[currentQuestionIndex];

  return (
    <div className="game-page-container">
      <Header />

      <main className="game-main-content">
        <div className="game-card">

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

      <GameSessionModal
        isOpen={!!modalType}
        type={modalType}
        onClose={() => setModalType(null)}
      />
    </div>
  );
};

export default Game4PlayPage;
