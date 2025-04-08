import React, { useEffect } from "react";
import confetti from "canvas-confetti";
import { Movie } from "../types/Movie";
import "./MovieModel.css";

interface MovieModelProps {
  movie: Movie;
  onClose: () => void;
}

const MovieModel: React.FC<MovieModelProps> = ({ movie, onClose }) => {
  const getPosterUrl = (title: string) => {
    const formattedTitle = title
      .replace(/[^a-zA-Z0-9 ]/g, "")
      .trim()
      .replace(/\s+/g, " ");
    return `/posters/${formattedTitle}.jpg`;
  };

  useEffect(() => {
    // 🎉 Confetti on modal open
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  }, []);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          ✕
        </button>
        <img
          src={getPosterUrl(movie.title ?? "")}
          alt={movie.title ?? "Movie Poster"}
          className="modal-poster"
        />
        <h2>{movie.title}</h2>
        <p>
          <strong>Director:</strong> {movie.director}
        </p>
        <p>
          <strong>Cast:</strong> {movie.cast}
        </p>
        <p>
          <strong>Country:</strong> {movie.country}
        </p>
        <p>
          <strong>Release Year:</strong> {movie.releaseYear}
        </p>
        <p>
          <strong>Rating:</strong> {movie.rating}
        </p>
        <p>
          <strong>Duration:</strong> {movie.duration}
        </p>
        <p>
          <strong>Description:</strong> {movie.description}
        </p>

        <a
          href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          target="_blank"
          rel="noopener noreferrer"
          className="watch-button"
        >
          🎬 Watch Movie
        </a>
      </div>
    </div>
  );
};

export default MovieModel;
