import {React, useState} from "react";
import axios from "axios";

const QuestionForm = ({ onQuestionAdded }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
  
    const handleSubmit = async () => {
      await axios.post("http://localhost:5000/api/questions", { title, description });
      setTitle("");
      setDescription("");
      onQuestionAdded();
    };
  
    return (
      <div className="question-card">
        <input
          type="text"
          placeholder="Question"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Tags"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={handleSubmit}>Post Question</button>
      </div>
    );
  };

  export default QuestionForm;