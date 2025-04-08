import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import CreateProfile from "./pages/CreateProfile";
import MovieDisplay from "./pages/MovieDisplay";  // Ensure correct path
import PrivacyPage from "./pages/PrivacyPage";

import HomePage from "./pages/HomePage";
import AddMoviePage from "./pages/AddMoviePage";
import AdminMoviesPage from "./pages/AdminMoviePage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/create-profile" element={<CreateProfile />} />
        <Route path="/movies" element={<MovieDisplay />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/adminMovies" element={<AdminMoviesPage/>} />
        <Route
          path="/AddMovie/:title/:showId"
          element={<AddMoviePage onSuccess={() => console.log('Success')} onCancel={() => console.log('Cancelled')} />}
        />
        <Route path="/privacy" element={<PrivacyPage />} />
        {/* Add more routes here as needed */}
      </Routes>
    </Router>
  );
};

export default App;
