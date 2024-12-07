import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import AnswerForm from "./AnswerForm";
import AnswerList from "./AnswerList";

const QuestionDetail = ({ question }) => {
  const [answers, setAnswers] = useState([]);

  const fetchAnswers = useCallback(async () => {
    const response = await axios.get(`http://localhost:5000/api/solutions/${question.question_id}`);
    setAnswers(response.data);
  }, [question.question_id]);

  useEffect(() => {
    fetchAnswers();
  }, [fetchAnswers]);  

  return (
    <div className="question-detail">
      <h2>{question.body}</h2>
      <p>Posted on: {question.created_at}</p>
      <p>Tags: {question.tags.join(", ")}</p>
      <AnswerForm questionId={question.question_id} onAnswerAdded={fetchAnswers} />
      <AnswerList answers={answers} />
    </div>
  );
};

export default QuestionDetail;