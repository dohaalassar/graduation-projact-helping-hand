import React, { useState } from 'react';

const GameQuestionScreen = ({ 
  questionText, 
  image, 
  options, 
  onNext, 
  currentStep, 
  totalSteps,
  isSessionValid = true
}) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleNextClick = () => {
    if (selectedOption) {
      onNext(selectedOption);
      setSelectedOption(null);
    }
  };

  return (
    <div className="gameplay-content">
      <h2 className="game-question-text" style={{ padding: '0 1rem' }}>
        {questionText}
      </h2>

      <div className="game-image-container">
        <img src={image} alt="Question scenario" />
      </div>

      <div className="game-options-container">
        {options.map((option) => (
          <button 
            key={option.id}
            className={`game-option-btn ${selectedOption === option.id ? 'selected' : ''}`}
            onClick={() => setSelectedOption(option.id)}
            disabled={!isSessionValid}
          >
            {option.label}
          </button>
        ))}
      </div>

      <button 
        className="game-btn-next" 
        onClick={handleNextClick}
        disabled={!selectedOption || !isSessionValid}
      >
        التالي
      </button>
    </div>
  );
};

export default GameQuestionScreen;
