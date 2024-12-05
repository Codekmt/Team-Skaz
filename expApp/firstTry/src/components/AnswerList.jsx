import React from "react";
const AnswerList = ({ answers }) => (
    <ul>
      {answers.map((a) => (
        <li key={a.id}>{a.text}</li>
      ))}
    </ul>
  );
export default AnswerList;