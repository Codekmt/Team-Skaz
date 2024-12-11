import React, { useState } from "react";
import "../styling/FAQs.css";
import questions from "../backend/questions"; 
import answers from "../backend/answers"; 

export function FAQs() {
  const [activeIndex, setActiveIndex] = useState(null);

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

  return (
    <div className="faqs">
      <h2>Frequently Asked Questions</h2>
      {faqs.map((faq, index) => (
        <div
          key={index}
          className={`faq-item ${activeIndex === index ? "active" : ""}`}
          onClick={() => toggleFAQ(index)}
        >
          <h3>{faq.question}</h3>
          {activeIndex === index && <p>{faq.answer}</p>}
        </div>
      ))}
    </div>
  );
}