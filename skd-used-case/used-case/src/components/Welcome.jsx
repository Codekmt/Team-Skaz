import React, { useContext, useState } from "react";
import { Image, Button } from "@fluentui/react-components";
import { useData } from "@microsoft/teamsfx-react";
import { TeamsFxContext } from "./Context";
import { app } from "@microsoft/teams-js";
import "./Welcome.css";

const Welcome = ({ teamsUserCredential }) => {
  const { loading, data, error } = useData(async () => {
    if (teamsUserCredential) {
      const userInfo = await teamsUserCredential.getUserInfo();
      return userInfo;
    }
  });

  const environment = window.location.hostname === "localhost" ? "local" : "azure";
  const friendlyEnvironmentName = {
    local: "local environment",
    azure: "Azure environment",
  }[environment] || "local environment";

  const userName = loading || error ? "" : data.displayName;
  const hubName = useData(async () => {
    await app.initialize();
    const context = await app.getContext();
    return context.app.host.name;
  })?.data;

  return (
    <div className="welcome page">
      <div className="narrow page-padding">
        <Image src="logoGlory1891.jpg" />
        <h1 className="center">Congratulations{userName ? ", " + userName : ""}!</h1>
        <p className="center">Your app is running in your {friendlyEnvironmentName}</p>
        {hubName && <p className="center">Your app is running in {hubName}</p>}
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
      case 'welcome':
        return <Welcome teamsUserCredential={teamsUserCredential} />;
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