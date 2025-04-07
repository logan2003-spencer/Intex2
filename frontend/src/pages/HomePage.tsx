import React, { useEffect, useState } from "react";
import "../components/HomePage.css";
import GenreCarousel from "../pages/GenreCarousel";

type Movie = {
  showId: string;
  title: string;
  genre: string;
  posterUrl: string;
};

type GenreMovies = {
  [genre: string]: Movie[];
};

const HomePage = () => {
  const [genreData, setGenreData] = useState<GenreMovies>({});

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:5147/api/movies/by-genre");
      const data: GenreMovies = await res.json();

      const filtered = Object.fromEntries(
        Object.entries(data).map(([genre, movies]) => [
          genre,
          movies.filter(
            (movie: Movie) => movie.posterUrl && movie.posterUrl !== ""
          ),
        ])
      );

      setGenreData(filtered);
    };

    fetchData();
  }, []);

  return (
    <div className="home-page">
      {Object.entries(genreData).map(([genre, movies]) => (
        <GenreCarousel key={genre} genre={genre} movies={movies} />
      ))}
    </div>
  );
};

export default HomePage;
