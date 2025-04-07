import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import CreateProfile from "./pages/CreateProfile";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/create-profile" element={<CreateProfile />} />
        {/* Add more routes here as needed */}
      </Routes>
    </Router>
  );
};

export default App;
