import React, { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import "./MovieModel.css";
import { Movie } from "../types/Movie";

interface MovieModalProps {
  movieId: number;
  onClose: () => void;
}

const MovieModal: React.FC<MovieModalProps> = ({ movieId, onClose }) => {
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await fetch(`http://localhost:5174/api/Movies/details/${movieId}`);
        const data = await res.json();
        setMovie(data);
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      } catch (error) {
        console.error("Failed to fetch movie details:", error);
      }
    };

    fetchMovie();
  }, [movieId]);

  const getPosterUrl = (title: string) => {
    const formattedTitle = title
      .replace(/[^a-zA-Z0-9 ]/g, "")
      .trim()
      .replace(/\s+/g, " ");
    return `/posters/${formattedTitle}.jpg`;
  };

  if (!movie) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>✕</button>
        <img
          src={getPosterUrl(movie.title ?? "")}
          alt={movie.title ?? "Movie Poster"}
          className="modal-poster"
        />
        <h2>{movie.title}</h2>
        <p><strong>Director:</strong> {movie.director}</p>
        <p><strong>Cast:</strong> {movie.cast}</p>
        <p><strong>Country:</strong> {movie.country}</p>
        <p><strong>Release Year:</strong> {movie.releaseYear}</p>
        <p><strong>Rating:</strong> {movie.rating}</p>
        <p><strong>Duration:</strong> {movie.duration}</p>
        <p><strong>Description:</strong> {movie.description}</p>

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

export default MovieModal;
