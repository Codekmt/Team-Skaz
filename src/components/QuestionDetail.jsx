import {React, useState, useCallback, useEffect} from "react";
import axios from "axios";
import AnswerForm from "./AnswerForm";
import AnswerList from "./AnswerList";

const QuestionDetail = ({ question }) => {
    const [answers, setAnswers] = useState([]);
    const [correctAnswerID, setCorrectAnswerID] = useState(null);
    
    const handleSaveQuestion = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/save-question-to-db",
          { question }
        );
        alert(response.data.message); // Notify user of success
      } catch (error) {
        console.error("Failed to save question:", error);
        alert("Failed to save question to the database.");
      }
    };
    
    const handleCorrectAnswer = (answerId) => {
      setCorrectAnswerID(answerId);
    }
    
    const fetchAnswers = useCallback(async () => {
      const response = await axios.get(`http://localhost:5000/api/answers/${question.id}`);
      setAnswers(response.data);
    }, [question.id]); 
    useEffect(() => {
      fetchAnswers();
    }, [fetchAnswers]); 
  
    return (
      <>
      <section className="displayedQuestion">
        <h2 className="questionTitle"> {question.title}</h2>
        
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
                    onCorrectAnswer={handleCorrectAnswer}
        />
        
        <AnswerForm questionId={question.id} onAnswerAdded={fetchAnswers} />
        <button onClick={handleSaveQuestion} className="save-question-button button">
        Save Question To DB
        </button>
      </section>
      </>
    );
  };

export default QuestionDetail;