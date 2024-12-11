
  import React from "react";
  import { HashRouter as Router, Route, Routes, Link } from "react-router-dom";
  import HomePage from "./pages/HomePage";
  import { FAQ } from "./pages/FAQs";
  import Forum from "./pages/Forum";
  
 


  export default function App() {
    return (
      <Router>
        <div>
          <nav className="navBar">
            <Link to="/" className="navLinks">
              Home
            </Link>
            <Link to="/Forum" className="navLinks">
              Forum
            </Link>
            <Link to="/FAQ" className="navLinks">
              FAQ
            </Link>
            
          </nav>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/FAQ" element={<FAQ />} />
            <Route path="/Forum" element={<Forum />} />
          </Routes>
        </div>
      </Router>
    );
  };
