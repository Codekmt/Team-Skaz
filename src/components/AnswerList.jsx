import React from "react";

const AnswerList = ({ answers, correctAnswerID, onCorrectAnswer }) => {
  const handleSelectCorrectAnswer = (selectedID) => {
    // Only call onCorrectAnswer function from the parent component
    onCorrectAnswer(selectedID); 
  };

  return (
    <ul>
      {answers.map((a) => (
        <li
          className={`answersList ${a.correctAnswer ? "correct" : ""}`}
          key={a.id}
        >
          {a.answer}
          <input
            type="radio"
            checked={correctAnswerID === a.id}
            onChange={() => handleSelectCorrectAnswer(a.id)} // Trigger parent handler
          />
          <hr />
        </li>
      ))}
    </ul>
  );
};

export default AnswerList;