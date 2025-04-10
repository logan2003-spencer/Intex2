import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

import LandingPage from "./pages/LandingPage";
import CreateProfile from "./pages/CreateProfile";
import MovieDisplay from "./pages/MovieDisplay";
import PrivacyPage from "./pages/PrivacyPage";
import HomePage from "./pages/HomePage";
import Header from "./components/Header";
import RecommendedDisplay from "./pages/RecommendedDisplay";
import LoginPage from "./pages/LoginPage";
import AddMoviePage from "./pages/AddMoviePage";
import AdminMoviesPage from "./pages/AdminMoviePage";
import CookieConsent from "./components/CookieConsent";
import MovieModal from "./components/MovieModel";
import GenreDisplay from "./pages/GenreDisplay";
import Unauthorized from "./pages/Unauthorized";
import ProtectedRoute from "./components/ProtectedRoute";
import { Movie } from "./types/Movie";
import MainLayout from "./layouts/MainLayout";

const App = () => {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  return (
    <>
      <Router>
        <Routes>
          {/* Public routes without layout */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/create-profile" element={<CreateProfile />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Layout wrapper for all standard routes */}
          <Route element={<MainLayout />}>
            <Route
              path="/"
              element={
                <Header onMovieSelect={(movie: Movie) => setSelectedMovie(movie)} />
              }
            />

            {/* Public content */}
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/recommended" element={<RecommendedDisplay />} />

            {/* Protected routes */}
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/genres/:genre"
              element={
                <ProtectedRoute>
                  <GenreDisplay />
                </ProtectedRoute>
              }
            />
            <Route
              path="/movies"
              element={
                <ProtectedRoute>
                  <MovieDisplay />
                </ProtectedRoute>
              }
            />

            {/* Admin-only routes */}
            <Route
              path="/adminMovies"
              element={
                <ProtectedRoute role="Admin">
                  <AdminMoviesPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/addMovie"
              element={
                <ProtectedRoute role="Admin">
                  <AddMoviePage
                    onSuccess={() => console.log("Movie added successfully")}
                    onCancel={() => console.log("Movie addition canceled")}
                  />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </Router>

      {/* Movie modal if selected */}
      {selectedMovie && (
        <MovieModal
          movieId={selectedMovie.showId ?? ""}
          onClose={() => setSelectedMovie(null)}
        />
      )}

      {/* Cookie notice shown globally */}
      <CookieConsent />
    </>
  );
};

export default App;
