import {React, useState} from "react";
import axios from "axios";

const AnswerForm = ({ questionId, onAnswerAdded }) => {
    const [text, setText] = useState("");
  
    const handleSubmit = async () => {
      await axios.post("http://localhost:5000/api/answers", { questionId, text });
      setText("");
      onAnswerAdded();
    };

    return (
      <div>
        <textarea
          placeholder="Your answer"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={handleSubmit}>Post Answer</button>
      </div>
    );
};
export default AnswerForm;