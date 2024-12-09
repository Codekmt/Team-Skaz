import React, { useContext, useState } from "react";
import { Button } from "@fluentui/react-components";
//import { useData } from "@microsoft/teamsfx-react";
import { TeamsFxContext } from "./Context";
//import { app } from "@microsoft/teams-js";
import "./Welcome.css";

const Welcome = ({ teamsUserCredential }) => {
  /*const { loading, data, error } = useData(async () => {
    if (teamsUserCredential) {
      const userInfo = await teamsUserCredential.getUserInfo();
      return userInfo;
    }
  });

  //const environment = window.location.hostname === "localhost" ? "local" : "azure";
  /*const friendlyEnvironmentName = {
    local: "local environment",
    azure: "Azure environment",
  }[environment] || "local environment";*/

  //const userName = loading || error ? "" : data.displayName;
  /*const hubName = useData(async () => {
    await app.initialize();
    const context = await app.getContext();
    return context.app.host.name;
  })?.data;*/
  
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

const FAQ = () => (
  <div>
    <h2>Frequently Asked Questions</h2>
    <p>Page from Adbullah needs to come here !!!!</p>
  </div>
);

const Support = () => (
  <div>
    <h2>Support Center</h2>
    <p>Need help? Contact our support team.</p>
  </div>
);

const TeamsApp = () => {
  const { teamsUserCredential } = useContext(TeamsFxContext);
  const [currentTab, setCurrentTab] = useState('welcome');

  const renderContent = () => {
    switch(currentTab) {
      //case 'welcome':
        //return <Welcome teamsUserCredential={teamsUserCredential} />;
      case 'faq':
        return <FAQ />;
      case 'support':
        return <Support />;
      default:
        return <Welcome teamsUserCredential={teamsUserCredential} />;
    }
  };

  return (
    <div>
      <div className="tab-navigation">
        <Button 
          appearance={currentTab === 'welcome' ? 'primary' : 'secondary'}
          onClick={() => setCurrentTab('welcome')}
        >
          Welcome
        </Button>
        <Button 
          appearance={currentTab === 'faq' ? 'primary' : 'secondary'}
          onClick={() => setCurrentTab('faq')}
        >
          FAQ
        </Button>
        <Button 
          appearance={currentTab === 'support' ? 'primary' : 'secondary'}
          onClick={() => setCurrentTab('support')}
        >
          Support
        </Button>
      </div>
      <div>
        {renderContent()}
      </div>
    </div>
  );
};

export default TeamsApp;