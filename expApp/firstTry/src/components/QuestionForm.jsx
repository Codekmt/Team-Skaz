import {React, useState} from "react";
import axios from "axios";

const QuestionForm = ({ onQuestionAdded }) => {
    const [title, setTitle] = useState("");
    const [tags, setTags] = useState("");
  
    const handleSubmit = async () => {
      await axios.post("http://localhost:5000/api/questions", { 
        title : title, 
        tags : tags.split(",").map(tag => tag.trim()),
      });

      setTitle("");
      setTags("");
      onQuestionAdded();
    };
  
    return (
      <div className="question-card">
          <h2>Ask a question</h2>
              <p>Be specific and imagine you’re asking a question to another person.</p>
                  <textarea
                  rows={3}
                  type="text"
                  placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
                  className="question-input"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  />
          <h2>Tags</h2>
              <p>Add up to 3 tags to describe what your question is about</p>
                  <input
                  type="text" 
                  placeholder="e.g. (javascript, react, node.js)"
                  className="question-input"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  />
            <button className="button" onClick={handleSubmit}>Post Question</button>
        </div>
    );
  };

  export default QuestionForm;