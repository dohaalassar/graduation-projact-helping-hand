import React from 'react';

const GameQuestionCard = ({ 
  question, 
  selectedOption, 
  onOptionSelect, 
  isSessionValid, 
  onNext 
}) => {
  return (
    <div className="gameplay-content">
      <h2 className="game-question-text">
        {question.text}
      </h2>

      <div className="game-image-container">
        <img src={question.image} alt={question.alt} />
      </div>

      <div className="game-options-container">
        {question.options.map((option) => (
          <button 
            key={option.id}
            className={`game-option-btn ${selectedOption === option.id ? 'selected' : ''}`}
            onClick={() => onOptionSelect(option.id)}
            disabled={!isSessionValid}
          >
            {option.label}
          </button>
        ))}
      </div>

      <button 
        className="game-btn-next" 
        onClick={onNext}
        disabled={!selectedOption || !isSessionValid}
      >
        التالي
      </button>
    </div>
  );
};

export default GameQuestionCard;
