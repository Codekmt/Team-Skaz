import React from "react";

const QuestionList = ({ questions, onSelectQuestion }) => (
    <>
    <ul>
      {questions.map((q) => (
        <li className="questionsList" key={q.id} onClick={() => onSelectQuestion(q)}>
          {q.title} <hr />
        </li>
        
      ))}
      
    </ul>
    </>
  );

export default QuestionList;