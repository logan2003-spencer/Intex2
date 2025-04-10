import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import LandingPage from "./pages/LandingPage";
import CreateProfile from "./pages/CreateProfile";
import MovieDisplay from "./pages/MovieDisplay";
import PrivacyPage from "./pages/PrivacyPage";
import HomePage from "./pages/HomePage";
import RecommendedDisplay from "./pages/RecommendedDisplay";
import LoginPage from "./pages/LoginPage";
import AddMoviePage from "./pages/AddMoviePage";
import AdminMoviesPage from "./pages/AdminMoviePage";
import CookieConsent from "./components/CookieConsent";
import MainLayout from "./layouts/MainLayout";
import MovieModal from "./components/MovieModel";
import { Movie } from "./types/Movie";
import Unauthorized from "./pages/Unauthorized";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  return (
    <>
      <Router>
        <Header onMovieSelect={(movie: Movie) => setSelectedMovie(movie)} />

        <Routes>
          {/* Public Routes without layout */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/create-profile" element={<CreateProfile />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Routes with MainLayout */}
          <Route element={<MainLayout />}>
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/recommended" element={<RecommendedDisplay />} />

            {/* Protected Routes */}
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <HomePage />
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

            {/* Admin-only Routes */}
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

      <CookieConsent />
    </>
  );
};

export default App;
