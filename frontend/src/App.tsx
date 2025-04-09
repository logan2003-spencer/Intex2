import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import MainLayout from "./layouts/MainLayout";
import MovieModal from "./components/MovieModel";
import { useState } from "react";
import { Movie } from "./types/Movie";


const App = () => {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  return (
    <>
      <Router>
        {/* Show Header only if not on Landing Page */}
        <Routes>
          <Route
            path="/"
            element={<LandingPage />}
          />

          <Route
            path="*"
            element={
                <>
                <Header onMovieSelect={(movie: Movie) => setSelectedMovie(movie)} />
                <Routes>
                  <Route path="/create-profile" element={<CreateProfile />} />
                  <Route path="/movies" element={<MovieDisplay />} />
                  <Route path="/recommended" element={<RecommendedDisplay />} />

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
                </>
            }
          />
        </Routes>
      </Router>

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
