// MovieModal.tsx
import React, { useEffect, useState, useRef } from "react";
import "./MovieModel.css";
import { Movie } from "../types/Movie";

interface MovieModalProps {
  movieId: string;
  onClose: () => void;
  onPosterClick?: (movie: Movie) => void;
  onBack?: () => void;
}

const MovieModal: React.FC<MovieModalProps> = ({ movieId, onClose, onPosterClick, onBack }) => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [relatedMovies, setRelatedMovies] = useState<Movie[]>([]);
  const rowRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const [fade, setFade] = useState(false);

  const userId = 43; // Replace with real auth ID if needed

  useEffect(() => {
    setFade(true);
    const timer = setTimeout(() => {
      setFade(false);
    }, 200);
    return () => clearTimeout(timer);
  }, [movieId]);

  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [movieId]);

  useEffect(() => {
    if (!movieId) return;

    const fetchMovie = async () => {
      try {
        const res = await fetch(`http://localhost:5176/api/Movies/details/${movieId}`);
        if (!res.ok) throw new Error("Failed to load movie");
        const data = await res.json();
        setMovie(data);
      } catch (error) {
        console.error("Failed to fetch movie details:", error);
        setMovie(null);
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
        if (!res.ok) throw new Error("Failed to load related movies");
        const data = await res.json();
        setRelatedMovies(data);
      } catch (error) {
        console.error("Failed to fetch related recommendations:", error);
        setRelatedMovies([]);
      }
    };

    fetchRelatedMovies();
  }, [movie]);

  const getPosterUrl = (title: string | undefined): string => {
    if (!title) return "/posters/default.jpg";
    const formattedTitle = title.replace(/[^a-zA-Z0-9 ]/g, "").trim().replace(/\s+/g, " ");
    return `/posters/${formattedTitle}.jpg`;
  };

  const scroll = (direction: "left" | "right") => {
    if (rowRef.current) {
      rowRef.current.scrollBy({
        left: direction === "left" ? -500 : 500,
        behavior: "smooth",
      });
    }
  };

  if (!movie) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className={`modal-content ${fade ? "fade-out" : ""}`} onClick={(e) => e.stopPropagation()} ref={modalRef}>
        {onBack && (
          <button className="back-button" onClick={onBack}>← Back</button>
        )}
        <button className="close-button" onClick={onClose}>✕</button>

        <img
          src={getPosterUrl(movie.title)}
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
            <div className="carousel-container">
              <button className="scroll-btn left" onClick={() => scroll("left")}>‹</button>
              <div className="movie-carousel" ref={rowRef}>
                {relatedMovies.map((rec) => (
                  <img
                    key={rec.showId}
                    src={getPosterUrl(rec.title)}
                    alt={rec.title}
                    className="movie-poster"
                    onClick={() => onPosterClick?.(rec)}
                    onError={(e) => (e.currentTarget.src = "/posters/default.jpg")}
                  />
                ))}
              </div>
              <button className="scroll-btn right" onClick={() => scroll("right")}>›</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieModal;