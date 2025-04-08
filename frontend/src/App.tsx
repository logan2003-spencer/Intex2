import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import CreateProfile from "./pages/CreateProfile";
import MovieDisplay from "./pages/MovieDisplay";
import PrivacyPage from "./pages/PrivacyPage";
import HomePage from "./pages/HomePage";
import MainLayout from "./layouts/MainLayout"; // <- This layout includes Header

const App = () => {
  return (
    <Router>
      <Routes>
        {/* 👇 Route WITHOUT the layout or header */}
        <Route path="/" element={<LandingPage />} />

        {/* 👇 All other routes go through layout with header */}
        <Route element={<MainLayout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/create-profile" element={<CreateProfile />} />
          <Route path="/movies" element={<MovieDisplay />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/recommended" element={<MovieDisplay />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
