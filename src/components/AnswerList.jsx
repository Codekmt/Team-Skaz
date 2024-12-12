import React from "react";

const AnswerList = ({ answers, correctAnswerID, onCorrectAnswer }) => {
  const handleSelectCorrectAnswer = (selectedID) => {
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
          <br />
          <div className="answerId">User{a.id.substring(6, 9)} at {a.date}
          </div>
          <hr />
        </li>
      ))}
    </ul>
  );
};

export default AnswerList;