import React, { useState, useEffect } from "react";
import axios from "axios";
import QuestionForm from "../components/QuestionForm";
import QuestionList from "../components/QuestionList";
import QuestionDetail from "../components/QuestionDetail";
import "../Forum.css";

const Forum = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const fetchQuestions = async () => {
    const response = await axios.get("http://localhost:5000/api/questions");
    setQuestions(response.data);
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <>
    <div className="forum">
      <header>
        <h1>Forum</h1>
      </header>
        <main>
          <QuestionForm onQuestionAdded={fetchQuestions} />
            <div className="content">
              {selectedQuestion && <QuestionDetail question={selectedQuestion} />}
                  <QuestionList questions={questions} onSelectQuestion={setSelectedQuestion} />
            </div>
        </main>
    </div>
    </>
  );
};


export default Forum;