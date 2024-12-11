
  import React from "react";
  import { HashRouter as Router, Route, Routes, Link } from "react-router-dom";
  import HomePage from "./pages/HomePage";
  import { FAQs } from "./pages/FAQs";
  import Forum from "./pages/Forum";
  
 


  export default function App() {
    return (
      <Router>
        <div>
          {/* Navigation Tabs */}
          <nav className="navBar">
            <Link to="/" className="navLinks">
              Home
            </Link>
            <Link to="/FAQs" className="navLinks">
              FAQs
            </Link>
            <Link to="/Forum" className="navLinks">
              Forum
            </Link>
          </nav>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/FAQs" element={<FAQs />} />
            <Route path="/Forum" element={<Forum />} />
          </Routes>
        </div>
      </Router>
    );
  };
