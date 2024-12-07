import React, { useState } from "react";
import axios from "axios";

const AnswerForm = ({ questionId, onAnswerAdded }) => {
  const [answer, setAnswer] = useState("");

  const handleSubmit = async () => {
    await axios.post("http://localhost:5000/api/solutions", { questionId, body: answer });
    setAnswer("");
    onAnswerAdded();
  };

  return (
    <div className="answer-form">
      <textarea
        placeholder="Your answer"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />
      <button onClick={handleSubmit}>Post Answer</button>
    </div>
  );
};

export default AnswerForm;