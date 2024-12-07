import React, { useState } from "react";
import axios from "axios";

const QuestionForm = ({ onQuestionAdded }) => {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      const tagsArray = tags.split(",").map((tag) => tag.trim()).filter(tag => tag !== "");
      await axios.post("http://localhost:5000/api/questions", {
        body: title,
        tags: tagsArray,
      });
      setTitle("");
      setTags("");
      onQuestionAdded();
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="question-form">
      <input
        type="text"
        placeholder="Question"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Tags (comma separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
      {error && <p>{error}</p>}
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Posting..." : "Post Question"}
      </button>
    </div>
  );
};

export default QuestionForm;