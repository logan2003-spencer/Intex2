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
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:5174/api/Movies/by-genre");
      const data: GenreMovies = await res.json();

      console.log("Fetched Genre Data:", data);

      const filtered = Object.fromEntries(
        Object.entries(data).map(([genre, movies]) => [
          genre,
          movies.filter((movie: Movie) => movie.title),
        ])
      );

      setGenreData(filtered);
    };

    fetchData();
  }, []);

  const handlePosterClick = (movie: Movie) => {
    setSelectedMovieId(Number(movie.showId));
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
      </div>
    </div>
  );
};

export default HomePage;
