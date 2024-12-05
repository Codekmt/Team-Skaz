import React from "react";

const QuestionList = ({ questions, onSelectQuestion }) => (
    <ul>
      {questions.map((q) => (
        <li key={q.id} onClick={() => onSelectQuestion(q)}>
          {q.title}
        </li>
      ))}
    </ul>
  );

export default QuestionList;