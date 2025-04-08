import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import CreateProfile from "./pages/CreateProfile";
import MovieDisplay from "./pages/MovieDisplay";
import PrivacyPage from "./pages/PrivacyPage";
import HomePage from "./pages/HomePage";
import Header from "./components/Header"; // make sure this path is correct
import RecommendedDisplay from "./pages/RecommendedDisplay";
import LoginPage from "./pages/LoginPage";
import AddMoviePage from "./pages/AddMoviePage";
import AdminMoviesPage from "./pages/AdminMoviePage";
import CookieConsent from "./components/CookieConsent";
import MainLayout from "./layouts/MainLayout"; // 👈 Layout that includes Header

const App = () => {
  return (
    <>
    <Router>
      <Routes>
        {/* 👇 LandingPage is the ONLY one without the layout/header */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/create-profile" element={<CreateProfile />} />
        <Route path="/movies" element={<MovieDisplay />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/recommended" element={<RecommendedDisplay />} />

        {/* Add more routes here as needed */}

        {/* 👇 All these pages use MainLayout which includes Header */}
        <Route element={<MainLayout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/create-profile" element={<CreateProfile />} />
          <Route path="/movies" element={<MovieDisplay />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/recommended" element={<MovieDisplay />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/adminMovies" element={<AdminMoviesPage />} />
          <Route
            path="/addMovie"
            element={
              <AddMoviePage
                onSuccess={() => console.log("Movie added successfully")}
                onCancel={() => console.log("Movie addition canceled")}
              />
            }
            
          />
        </Route>
        
      </Routes>
    </Router> 
    <CookieConsent />
    </>
  );
};

export default App;
