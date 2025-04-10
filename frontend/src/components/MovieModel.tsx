import React, { useEffect, useState, useRef } from "react";
import "./MovieModel.css";
import { Movie } from "../types/Movie";
import { moviePosters as allPosters } from "../data/moviePosters";

interface MovieModalProps {
  movieId: string;
  onClose: () => void;
  onPosterClick?: (movie: Movie) => void;
  onBack?: () => void;
}

const MovieModal: React.FC<MovieModalProps> = ({
  movieId,
  onClose,
  onPosterClick,
  onBack,
}) => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [relatedMovies, setRelatedMovies] = useState<Movie[]>([]);
  const [rating, setRating] = useState<number>(0); // For star rating
  const [fade, setFade] = useState(false);
  const token = localStorage.getItem("authToken");

  const userId = 1; // Replace with real auth ID if needed
  const rowRef = useRef<HTMLDivElement>(null); // Ref for carousel scrolling
  const modalRef = useRef<HTMLDivElement>(null); // Ref for modal scroll behavior

  // Add fade-out effect when movieId changes
  useEffect(() => {
    setFade(true);
    const timer = setTimeout(() => setFade(false), 200);
    return () => clearTimeout(timer);
  }, [movieId]);

  // Reset modal scroll position when movieId changes
  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [movieId]);

  // Fetch movie details
  useEffect(() => {
    if (!movieId) return;

    const fetchMovie = async () => {
      try {
        const res = await fetch(
          `https://intex-backend-4logan-g8agdge9hsc2aqep.westus-01.azurewebsites.net/api/Movies/details/${movieId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
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

  // Fetch related movies
  useEffect(() => {
    if (!movie || !movie.showId) return;

    const fetchRelatedMovies = async () => {
      try {
        const res = await fetch(
          `https://intex-backend-4logan-g8agdge9hsc2aqep.westus-01.azurewebsites.net/api/movies/user-recommendations?user_id=${userId}&show_id=${movie.showId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
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

  // Helper to generate poster URL
  const getPosterUrl = (title: string | undefined): string => {
    if (!title) return "/posters/default.jpg";

    const sanitize = (str: string) =>
      str
        .normalize("NFD") // Split accented chars
        .replace(/[\u0300-\u036f]/g, "") // Remove accents
        .replace(/[^a-zA-Z0-9 ]/g, "") // Remove punctuation
        .trim();

    const sanitizedTitle = sanitize(title);
    const encodedTitle = encodeURIComponent(sanitizedTitle);
    const expectedPath = `/posters/${encodedTitle}.jpg`;

    const match = allPosters.find(
      (path) => path.toLowerCase() === expectedPath.toLowerCase()
    );
    const baseUrl = "https://movieblob4logang.blob.core.windows.net/posters";

    return match ? `${baseUrl}${match}` : "/posters/default.jpg";
  };

  // Carousel scroll logic
  const scroll = (direction: "left" | "right") => {
    if (rowRef.current) {
      rowRef.current.scrollBy({
        left: direction === "left" ? -500 : 500,
        behavior: "smooth",
      });
    }
  };

  // Star rating click handler
  const handleStarClick = async (star: number) => {
    setRating(star);

    if (!movie?.showId) {
      console.error("Invalid ShowId");
      return;
    }

    try {
      // First try to PUT (update the rating)
      let response = await fetch(
        `https://intex-backend-4logan-g8agdge9hsc2aqep.westus-01.azurewebsites.net/api/Movies/ratings/${userId}/${movie.showId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            UserId: userId,
            ShowId: movie.showId,
            Rating: star,
          }),
        }
      );

      // If PUT fails (e.g., rating doesn't exist), try to POST (create a new rating)
      if (!response.ok) {
        console.log("PUT failed, attempting POST...");
        response = await fetch(
          "https://intex-backend-4logan-g8agdge9hsc2aqep.westus-01.azurewebsites.net/api/Movies/ratings",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              UserId: userId,
              ShowId: movie.showId,
              Rating: star,
            }),
          }
        );
      }

      // If POST or PUT is successful
      if (response.ok) {
        const responseBody = await response.json();
        console.log("Rating updated or created successfully:", responseBody);
      } else {
        const errorMessage = await response.text();
        console.error(`Error ${response.status}: ${errorMessage}`);
        throw new Error(
          `Failed to update or create rating. Status: ${response.status}`
        );
      }
    } catch (error) {
      console.error(
        "Error updating or creating rating:",
        (error as Error).message
      );
    }
  };

  if (!movie) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className={`modal-content ${fade ? "fade-out" : ""}`}
        onClick={(e) => e.stopPropagation()}
        ref={modalRef}
      >
        {onBack && (
          <button className="back-button" onClick={onBack}>
            ← Back
          </button>
        )}
        <button className="close-button" onClick={onClose}>
          ✕
        </button>

        <img
          src={getPosterUrl(movie.title)}
          alt={movie.title ?? "Movie Poster"}
          className="modal-poster"
          onError={(e) => (e.currentTarget.src = "/posters/fallback.jpg")}
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

        <div className="rating-section">
          <p>
            <strong>Your Rating:</strong>
          </p>
          <div className="stars">
            {Array.from({ length: 5 }, (_, index) => (
              <span
                key={index}
                className={`star ${index < rating ? "filled" : ""}`}
                onClick={() => handleStarClick(index + 1)} // Trigger rating update
              >
                &#9733;
              </span>
            ))}
          </div>
        </div>

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
            <h3 className="text-lg font-semibold mb-2">
              Recommended Based on This Movie
            </h3>
            <div className="carousel-container">
              <button
                className="scroll-btn left"
                onClick={() => scroll("left")}
              >
                ‹
              </button>
              <div className="movie-carousel" ref={rowRef}>
                {relatedMovies.map((rec) => (
                  <img
                    key={rec.showId}
                    src={getPosterUrl(rec.title)}
                    alt={rec.title}
                    className="movie-poster"
                    onClick={() => onPosterClick?.(rec)}
                    onError={(e) =>
                      (e.currentTarget.src = "/posters/default.jpg")
                    }
                  />
                ))}
              </div>
              <button
                className="scroll-btn right"
                onClick={() => scroll("right")}
              >
                ›
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieModal;
