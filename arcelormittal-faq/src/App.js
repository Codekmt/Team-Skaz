import React, { useEffect, useState } from "react";
import * as microsoftTeams from "@microsoft/teams-js";

const App = () => {
  const [isTeams, setIsTeams] = useState(null); // Null indicates loading state
  const [teamsContext, setTeamsContext] = useState(null);

  useEffect(() => {
    // Detect if the app is running inside Microsoft Teams
    if (window.parent !== window.self) {
      console.log("App is running inside a Teams iframe.");
      try {
        microsoftTeams.initialize(() => {
          console.log("Microsoft Teams SDK initialized.");
          setIsTeams(true);

          // Get context information
          microsoftTeams.getContext((context) => {
            console.log("Microsoft Teams context:", context);
            setTeamsContext(context);
          });
        });
      } catch (error) {
        console.error("Error initializing Teams SDK:", error);
        setIsTeams(false);
      }
    } else {
      console.log("App is running outside of Teams.");
      setIsTeams(false);
    }
  }, []);

  if (isTeams === null) {
    return <p>Loading Teams integration...</p>; // Loading state
  }

  return (
    <div>
      <h1>ArcelorMittal FAQ Web</h1>
      {isTeams ? (
        teamsContext ? (
          <div>
            <p>Welcome to the Teams-integrated FAQ app!</p>
            <p>
              Logged in as: {teamsContext.userPrincipalName} (
              {teamsContext.userObjectId})
            </p>
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
          </div>
        ) : (
          <p>Retrieving Teams context...</p>
        )
      ) : (
        <p>This app is running outside of Microsoft Teams.</p>
      )}
    </div>
  );
};

export default App;
