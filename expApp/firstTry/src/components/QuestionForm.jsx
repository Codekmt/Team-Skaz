import {React, useState} from "react";
import axios from "axios";

const QuestionForm = ({ onQuestionAdded }) => {
    const [title, setTitle] = useState("");
    const [tags, setTags] = useState("");
  
    const handleSubmit = async () => {
      await axios.post("http://localhost:5000/api/questions", { 
        title, 
        tags: tags.split(",").map(tag => tag.trim()), });
      setTitle("");
      setTags("");
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
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <button className="button" onClick={handleSubmit}>Post Question</button>
      </div>
    );
  };

  export default QuestionForm;