// HomePage.tsx
import React, { useEffect, useState } from "react";
import GenreCarousel from "./GenreCarousel";
import MovieModal from "../components/MovieModel";
import { Movie } from "../types/Movie";

const HomePage = () => {
  const [genreData, setGenreData] = useState<{ [genre: string]: Movie[] }>({});
  const [selectedMovieId, setSelectedMovieId] = useState<string | null>(null);
  const [movieHistory, setMovieHistory] = useState<string[]>([]);

  const userId = 1;

  useEffect(() => {
    const fetchRecommendedMovies = async () => {
      try {
        const response = await fetch(
          `https://intex-backend-4logan-g8agdge9hsc2aqep.westus-01.azurewebsites.net/api/movies/home-page-recommendations?user_id=${userId}`
        );
        const data = await response.json();
        setGenreData(data);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      }
    };

    fetchRecommendedMovies();
  }, [userId]);

  const handlePosterClick = (movie: Movie) => {
    const newId = String(movie.showId);
    if (selectedMovieId && selectedMovieId !== newId) {
      setMovieHistory((prev) => [...prev, selectedMovieId]);
    }
    setSelectedMovieId(newId);
  };

  const handleBack = () => {
    setMovieHistory((prev) => {
      const newHistory = [...prev];
      const previousId = newHistory.pop();
      setSelectedMovieId(previousId ?? null);
      return newHistory;
    });
  };

  return (
    <div className="home-page">
      {Object.entries(genreData).map(([genre, movies]) => (
        <GenreCarousel
          key={genre}
          genre={genre}
          movies={movies}
          onPosterClick={handlePosterClick}
        />
      ))}

      {selectedMovieId && (
        <MovieModal
          movieId={selectedMovieId}
          onClose={() => setSelectedMovieId(null)}
          onPosterClick={handlePosterClick}
          onBack={movieHistory.length > 0 ? handleBack : undefined}
        />
      )}
    </div>
  );
};

export default HomePage;