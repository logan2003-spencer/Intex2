import React, { useEffect, useState } from "react";
import "./MovieModel.css";
import { Movie } from "../types/Movie";

interface MovieModalProps {
  movieId: string;
  onClose: () => void;
}

const MovieModal: React.FC<MovieModalProps> = ({ movieId, onClose }) => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [relatedMovies, setRelatedMovies] = useState<Movie[]>([]);

  const userId = 1; // TODO: Replace with dynamic user ID when auth is integrated

  useEffect(() => {
    if (!movieId) return;

    const fetchMovie = async () => {
      try {
        const res = await fetch(`http://localhost:5176/api/Movies/details/${movieId}`);
        const data = await res.json();
        setMovie(data);
      } catch (error) {
        console.error("Failed to fetch movie details:", error);
      }
    };

    fetchMovie();
  }, [movieId]);

  useEffect(() => {
    if (!movie || !movie.showId) return;

    const fetchRelatedMovies = async () => {
      try {
        const res = await fetch(
          `http://localhost:5176/api/movies/user-recommendations?user_id=${userId}&show_id=${movie.showId}`
        );
        const data = await res.json();
        setRelatedMovies(data);
      } catch (error) {
        console.error("Failed to fetch related recommendations:", error);
      }
    };

    fetchRelatedMovies();
  }, [movie]);

  const getPosterUrl = (title: string) => {
    const formattedTitle = title
      .replace(/[^a-zA-Z0-9]/g, "")
      .trim()
      .replace(/\s+/g, "");
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
          onError={(e) => (e.currentTarget.src = "/posters/fallback.jpg")}
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

        {relatedMovies.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Recommended Based on This Movie</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedMovies.map((rec) => (
                <div key={rec.showId} className="border p-2 rounded bg-gray-100">
                  <p className="font-bold">{rec.title}</p>
                  <p className="text-sm">
                    {rec.releaseYear} • {rec.rating}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieModal;
