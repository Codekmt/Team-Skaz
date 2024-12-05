import React, { useState, useEffect } from "react";
import axios from "axios";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";
import QuestionDetail from "./QuestionDetail";

const App = () => {
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
    <div className="forum">
      <h1>Simple Forum</h1>
      <QuestionForm onQuestionAdded={fetchQuestions} />
      <div className="content">
        <QuestionList questions={questions} onSelectQuestion={setSelectedQuestion} />
        {selectedQuestion && <QuestionDetail question={selectedQuestion} />}
      </div>
    </div>
  );
};


export default App;