import React from "react";

const AnswerList = ({ answers }) => (
  <div className="answer-list">
    <h3>Answers:</h3>
    <ul>
      {answers.map((a) => (
        <li key={a.solution_id}>{a.body}</li>
      ))}
    </ul>
  </div>
);

export default AnswerList;