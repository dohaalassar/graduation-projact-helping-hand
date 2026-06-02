import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import '../../styles/gameplay.css';

const GameTimer = ({ sessionId, onTimeUp }) => {
  // We use seconds for easier calculation. 30 mins = 1800 seconds.
  const [timeLeft, setTimeLeft] = useState(() => {
    const sId = sessionId || 'default';
    const endTimeStr = localStorage.getItem(`global_timer_end_${sId}`);
    if (endTimeStr) {
      const endTime = parseInt(endTimeStr, 10);
      const remaining = Math.max(0, Math.floor((endTime - Date.now()) / 1000));
      return remaining;
    }
    // Fallback if not started properly
    return 30 * 60;
  });

  useEffect(() => {
    // Stop if time is up
    if (timeLeft <= 0) {
      if (onTimeUp) onTimeUp();
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerId);
          if (onTimeUp) onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft, onTimeUp]);

  // Format the time as MM:SS
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  // Visual cues based on remaining time
  let timerClass = "game-timer-container";
  if (timeLeft <= 300 && timeLeft > 60) {
    // Last 5 minutes
    timerClass += " warning";
  } else if (timeLeft <= 60) {
    // Last 1 minute
    timerClass += " danger";
  }

  return (
    <div className={timerClass}>
      <Clock size={20} />
      <span>{formattedMinutes}:{formattedSeconds}</span>
    </div>
  );
};

export default GameTimer;
