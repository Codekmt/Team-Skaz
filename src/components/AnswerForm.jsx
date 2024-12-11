import {React, useState} from "react";
import axios from "axios";

const AnswerForm = ({ questionId, onAnswerAdded }) => {
    const [answer, setAnswer] = useState("");
  
    const handleSubmit = async () => {
      await axios.post("http://localhost:5000/api/answers", { questionId, answer });
      setAnswer("");
      onAnswerAdded();
    };

    return (
      <section>
        <input
          type="text"
          placeholder="Your answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
        <br></br>
        <button className="button" onClick={handleSubmit}>Post Answer</button>
      </section>
    );
};
export default AnswerForm;