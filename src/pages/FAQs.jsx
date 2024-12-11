import React, { useState } from "react";
import "../styling/FAQs.css";

export function FAQs() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "How can I schedule a meeting in Teams?",
      answer: "To schedule a meeting in Teams, go to the Calendar tab, click on 'New meeting', fill in the details, and send the invite.",
    },
    {
      question: "How do I share my screen during a Teams meeting?",
      answer: "During a Teams meeting, click on the 'Share' button in the meeting controls, and select the screen or window you want to share.",
    },
    {
      question: "How can I collaborate on documents in Teams?",
      answer: "You can collaborate on documents by uploading them to a Teams channel or chat. Team members can then edit the documents in real-time.",
    },
    {
      question: "How do I manage notifications in Teams?",
      answer: "To manage notifications, go to your profile picture, select 'Settings', and then 'Notifications'. From there, you can customize your notification preferences.",
    },
    {
      question: "How can I integrate other apps with Teams?",
      answer: "You can integrate other apps with Teams by going to the Apps tab, searching for the app you want to integrate, and following the installation instructions.",
    },
  ];

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
          <p>{faq.answer}</p>
        </div>
      ))}
    </div>
  );
}