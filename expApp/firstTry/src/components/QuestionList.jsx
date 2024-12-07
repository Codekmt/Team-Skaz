import React from "react";

const QuestionList = ({ questions, onSelectQuestion }) => {
  return (
    <div className="question-list">
      <ul>
        {questions.map((q) => (
          <li key={q.question_id} onClick={() => onSelectQuestion(q)}>
            <h3>{q.body}</h3>
            <p>{q.created_at}</p>
            <p>{q.tags.join(", ")}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionList;