import React from "react";
const AnswerList = ({ answers }) => (
    <ul>
      {answers.map((a) => (
        <li className="answersList" key={a.id}>{a.answer}  <input type="checkbox" /></li>
      ))}
    </ul>
  );
export default AnswerList;