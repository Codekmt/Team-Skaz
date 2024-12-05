import {React, useState, useCallback, useEffect} from "react";
import axios from "axios";
import AnswerForm from "./AnswerForm";
import AnswerList from "./AnswerList";

const QuestionDetail = ({ question }) => {
    const [answers, setAnswers] = useState([]);
  
    const fetchAnswers = useCallback(async () => {
      const response = await axios.get(`http://localhost:5000/api/answers/${question.id}`);
      setAnswers(response.data);
    }, [question.id]); 
    useEffect(() => {
      fetchAnswers();
    }, [fetchAnswers]); 
  
    return (
      <div>
        <h2 className="questionTitle">{question.title}</h2>
        <p className="questionTime"> {question.date}</p>
        <AnswerList answers={answers} />
        <AnswerForm questionId={question.id} onAnswerAdded={fetchAnswers} />
      </div>
    );
  };

export default QuestionDetail;