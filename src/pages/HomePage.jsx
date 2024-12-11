import React from "react";
import "../HomePage.css";

const HomePage = () => {
 
    return (
      <div className="welcome page">
        <div className="narrow page-padding">
          <section class="welcome-section">
            <h1>Welcome to Our Help Center</h1>
            <p>
              Have a question or need assistance? You’re in the right place! This FAQ page is designed to provide quick and helpful answers to the most common questions across a variety of topics, from IT troubleshooting to HR policies.
            </p>
            <h2>Here’s how we can help:</h2>
            <ul>
              <li><strong>Search for Answers:</strong> Browse through our curated list of FAQs to find solutions to common problems.</li>
              <li><strong>Ask a Question:</strong> Can’t find what you’re looking for? Submit your question, and our team will assist you.</li>
              <li><strong>Stay Informed:</strong> Access guides, tips, and updates to make navigating challenges easier.</li>
            </ul>
            <p>
              Whether you’re facing technical issues or looking for guidance on workplace policies, our FAQ hub is here to help you find the answers you need quickly and efficiently.
            </p>
            <p>
              <em>Start exploring now or use the search bar to find specific topics!</em>
            </p>
          </section>
        </div>
      </div>
    );
  };

  export default HomePage;