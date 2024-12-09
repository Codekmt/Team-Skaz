import React from "react";
const AnswerList = ({ answers, correctAnswerID, onCorrectAnswer }) => (
    <ul>
      {answers.map((a) => (
        <li  className={`answersList ${correctAnswerID === a.id ? "correct" : ""}`} 
            key={a.id}>
          {a.answer}  
            <input 
            type="radio"  
            checked={correctAnswerID === a.id}
            onChange={() => onCorrectAnswer(a.id)}
            />
          <hr />
        </li>
        
      ))}
    </ul>
  );
export default AnswerList;