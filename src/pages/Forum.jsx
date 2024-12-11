import React, { useState, useEffect } from "react";
import axios from "axios";
import QuestionForm from "../components/QuestionForm";
import QuestionList from "../components/QuestionList";
import QuestionDetail from "../components/QuestionDetail";
import "../styling/Forum.css";

const Forum = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [filterTag, setFilterTag] = useState("");
  const [availableTags, setAvailableTags] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const fetchQuestions = async () => {
    const response = await axios.get("http://localhost:5000/api/questions");
    const fetchedQuestions = response.data;

    setQuestions(fetchedQuestions);

    const tags = Array.from(
      new Set(fetchedQuestions.flatMap((question) => question.tags))
    );
    setAvailableTags(tags);
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const filteredQuestions = filterTag
    ? questions.filter((question) => question.tags.includes(filterTag))
    : questions;

  const filteredTags = availableTags.filter((tag) =>
    tag.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div className="forum">
      <main>
        <QuestionForm onQuestionAdded={fetchQuestions} />
        <div className="filter-container">
          {!filterTag && (
            <>
              <input
                type="text"
                placeholder="Filter by tags"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="tag-search-input"
              />
              <div className="tag-dropdown">
                {filteredTags.map((tag) => (
                  <div
                    key={tag}
                    className="tag-option"
                    onClick={() => {
                      setFilterTag(tag);
                      setSearchInput(""); 
                    }}
                  >
                    {tag}
                  </div>
                ))}
              </div>
            </>
          )}
          
          {filterTag && (
            <div className="selected-tag">
              <span>Filtering by: {filterTag}</span>
              <button onClick={() => setFilterTag("")}>Clear</button>
            </div>
          )}
        </div>
        <div className="content">
          {selectedQuestion && <QuestionDetail question={selectedQuestion} />}
          <QuestionList
            questions={filteredQuestions}
            onSelectQuestion={setSelectedQuestion}
          />
        </div>
      </main>
    </div>
  );
};

export default Forum;