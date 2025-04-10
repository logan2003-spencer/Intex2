import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
<<<<<<< HEAD
=======

>>>>>>> 30db00247032a0c483a8a3ca566a8305963b9b27
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
<<<<<<< HEAD
import GenrePage from "./pages/GenrePage";
=======
import Unauthorized from "./pages/Unauthorized";
import ProtectedRoute from "./components/ProtectedRoute";
>>>>>>> 30db00247032a0c483a8a3ca566a8305963b9b27
import { Movie } from "./types/Movie";

const App = () => {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  return (
    <>
      <Router>
        <Header onMovieSelect={(movie: Movie) => setSelectedMovie(movie)} />

        <Routes>
<<<<<<< HEAD
          {/* No header pages */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/create-profile" element={<CreateProfile />} />
          <Route path="/login" element={<LoginPage />} />

          {/* All routes that use Header */}
          <Route
            path="*"
            element={
              <>
                <Header onMovieSelect={(movie: Movie) => setSelectedMovie(movie)} />
                <Routes>
                  <Route path="/home" element={<HomePage />} />
                  <Route path="/movies" element={<MovieDisplay />} />
                  <Route path="/genres" element={<GenrePage />} />
                  <Route path="/recommended" element={<RecommendedDisplay />} />
                  <Route path="/privacy" element={<PrivacyPage />} />
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
                </Routes>
              </>
            }
          />
        </Routes>
      </Router>

      {/* Movie Modal shown globally if a movie is selected */}
=======
          {/* Public routes without layout */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/create-profile" element={<CreateProfile />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Layout wrapper for all standard routes */}
          <Route element={<MainLayout />}>
            {/* Public content */}
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/recommended" element={<RecommendedDisplay />} />

            {/* Protected user route */}
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />

            {/* Admin-only route */}
            <Route
              path="/adminMovies"
              element={
                <ProtectedRoute role="Admin">
                  <AdminMoviesPage />
                </ProtectedRoute>
              }
            />

            {/* Admin-only add movie route */}
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

            {/* Authenticated users only */}
            <Route
              path="/movies"
              element={
                <ProtectedRoute>
                  <MovieDisplay />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </Router>

      {/* Movie modal if selected */}
>>>>>>> 30db00247032a0c483a8a3ca566a8305963b9b27
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
