import { React, useState, useCallback, useEffect } from "react";
import axios from "axios";
import AnswerForm from "./AnswerForm";
import AnswerList from "./AnswerList";

const QuestionDetail = ({ question }) => {
  const [answers, setAnswers] = useState([]);
  const [correctAnswerID, setCorrectAnswerID] = useState(null);

  const fetchAnswers = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/answers/${question.id}`
      );
      setAnswers(response.data);
      const correctAnswer = response.data.find((a) => a.correctAnswer);
      if (correctAnswer) setCorrectAnswerID(correctAnswer.id);
    } catch (error) {
      console.error("Failed to fetch answers:", error);
    }
  }, [question.id]);

  const updateCorrectAnswer = async (selectedID) => {
    try {
      const updatedAnswers = answers.map((answer) => ({
        ...answer,
        correctAnswer: answer.id === selectedID,
      }));
      await axios.patch(
        `http://localhost:5000/api/answers/${question.id}`,
        updatedAnswers
      );
      setAnswers(updatedAnswers);
      setCorrectAnswerID(selectedID);
    } catch (error) {
      console.error("Failed to update correct answer:", error);
      alert("Failed to update the correct answer.");
    }
  };

  useEffect(() => {
    fetchAnswers();
  }, [fetchAnswers]);

  return (
    <section className="displayedQuestion">
      <h2 className="questionTitle">{question.title}</h2>
      <p className="questionTime">Asked: {question.date}</p>
      <hr />
      <p className="questionTags">
        {question.tags.map((tag, index) => (
          <span key={index} className="tag">
            {tag}
          </span>
        ))}
      </p>
      <hr />
      <AnswerList
        answers={answers}
        correctAnswerID={correctAnswerID}
        onCorrectAnswer={updateCorrectAnswer}
      />
      <AnswerForm questionId={question.id} onAnswerAdded={fetchAnswers} />
    </section>
  );
};

export default QuestionDetail;