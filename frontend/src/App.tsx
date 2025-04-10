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
import GenrePage from "./pages/GenrePage";
import { Movie } from "./types/Movie";

const App = () => {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  return (
    <>
      <Router>
        <Routes>
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
