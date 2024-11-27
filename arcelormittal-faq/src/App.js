import React, { useEffect, useState } from "react";
import * as microsoftTeams from "@microsoft/teams-js";

const App = () => {
  const [isTeamsInitialized, setIsTeamsInitialized] = useState(false);
  const [isTeamsContext, setIsTeamsContext] = useState(false);

  useEffect(() => {
    try {
      microsoftTeams.initialize(() => {
        console.log("Microsoft Teams initialized");
        setIsTeamsInitialized(true);

        microsoftTeams.getContext((context) => {
          console.log("Microsoft Teams context retrieved:", context);
          setIsTeamsContext(true);
        });
      });
    } catch (error) {
      console.error("Error initializing Teams SDK:", error);
      setIsTeamsInitialized(false);
    }
  }, []);

  return (
    <div>
      <h1>ArcelorMittal FAQ Web</h1>
      {!isTeamsInitialized ? (
        <p>Loading Teams integration...</p>
      ) : isTeamsContext ? (
        <ul>
          <li>
            <strong>What is ArcelorMittal?</strong>
            <p>ArcelorMittal is the world's leading steel and mining company.</p>
          </li>
          <li>
            <strong>How do I access internal resources?</strong>
            <p>Use the internal portal accessible through your Teams app.</p>
          </li>
        </ul>
      ) : (
        <p>This app is running outside of Microsoft Teams.</p>
      )}
    </div>
  );
};

export default App;
