import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import CreateProfile from "./pages/CreateProfile";
import MovieDisplay from "./pages/MovieDisplay";  // Ensure correct path

import HomePage from "./pages/HomePage";
import Header from "./components/Header"; // make sure this path is correct
import LoginPage from "./pages/LoginPage";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/create-profile" element={<CreateProfile />} />
        <Route path="/movies" element={<MovieDisplay />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        {/* Add more routes here as needed */}
      </Routes>
    </Router>
  );
};

export default App;
