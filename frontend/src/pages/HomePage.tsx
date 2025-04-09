import React, { useEffect, useState } from "react";
import "../components/HomePage.css";
import GenreCarousel from "./GenreCarousel";
import MovieModal from "../components/MovieModel";
import { Movie } from "../types/Movie";

type GenreMovies = {
  [genre: string]: Movie[];
};

const HomePage = () => {
  const [genreData, setGenreData] = useState<GenreMovies>({});
  const [selectedMovieId, setSelectedMovieId] = useState<string | null>(null);

  const userId = 1;

  useEffect(() => {
    const fetchRecommendedMovies = async () => {
      try {
        const response = await fetch(
          `http://localhost:5176/api/movies/home-page-recommendations?user_id=${userId}`
        );
        const data: GenreMovies = await response.json();

        const filtered = Object.fromEntries(
          Object.entries(data).map(([genre, movies]) => [
            genre,
            movies.filter((movie: Movie) => movie.title),
          ])
        );

        setGenreData(filtered);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      }
    };

    fetchRecommendedMovies();
  }, [userId]);

  const handlePosterClick = (movie: Movie) => {
    setSelectedMovieId(movie.showId);
  };

  return (
    <div className="home-page">
      <div className="content-wrapper">
        {Object.entries(genreData).map(([genre, movies]) => (
          <GenreCarousel
            key={genre}
            genre={genre}
            movies={movies}
            onPosterClick={handlePosterClick}
          />
        ))}

        {selectedMovieId !== null && (
          <MovieModal
            movieId={selectedMovieId}
            onClose={() => setSelectedMovieId(null)}
          />
        )}

        {Object.keys(genreData).length === 0 && (
          <p className="text-center text-gray-500 mt-6">
            No recommendations available for this user.
          </p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
