import React, { useState } from "react";
import "../styling/FAQs.css";
import questions from "../backend/questions"; 
import answers from "../backend/answers"; 

export function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [visibleCount, setVisibleCount] = useState(5);

  const faqs = questions.map((question) => {
    const questionAnswers = answers[question.id]; 
    const correctAnswer = questionAnswers?.find((answer) => answer.correctAnswer === true);

    return correctAnswer
      ? {
          question: question.title,
          answer: correctAnswer.answer,
        }
      : null;
  }).filter((faq) => faq !== null); 

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

 
  const showMore = () => {
    setVisibleCount(visibleCount + 5); 
  };

  return (
    <div className="faqs">
      <h2>Frequently Asked Questions</h2>
      {faqs.slice(0, visibleCount).map((faq, index) => (
        <div
          key={index}
          className={`faq-item ${activeIndex === index ? "active" : ""}`}
          onClick={() => toggleFAQ(index)}
        >
          <h3>{faq.question}</h3>
          {activeIndex === index && <p>{faq.answer}</p>}
        </div>
      ))}
      {visibleCount < faqs.length && (
        <button className="button" onClick={showMore}>Show More</button>
      )}
    </div>
  );
}