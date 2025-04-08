import React, { useRef } from "react";
import { Movie } from "../types/Movie";
import "../components/HomePage.css"; // reuse same styles

interface Props {
  genre: string;
  movies: Movie[];
  onPosterClick?: (movie: Movie) => void;
}

const GenreCarousel: React.FC<Props> = ({ genre, movies, onPosterClick }) => {
  const rowRef = useRef<HTMLDivElement>(null);

  const getPosterUrl = (title: string | undefined): string => {
    if (!title) return "/posters/default.jpg";
    const formattedTitle = title
      .replace(/[^a-zA-Z0-9 ]/g, "")
      .trim()
      .replace(/\s+/g, " ");
    return `/posters/${formattedTitle}.jpg`;
  };

  const scroll = (direction: "left" | "right") => {
    const scrollAmount = 500;
    if (rowRef.current) {
      rowRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="genre-section">
      <h2 className="genre-title">{genre}</h2>
      <div className="carousel-container">
        <button className="scroll-btn left" onClick={() => scroll("left")}>‹</button>
        <div className="movie-carousel" ref={rowRef}>
          {movies.map((movie) => (
            <img
              key={movie.showId}
              src={getPosterUrl(movie.title ?? "")}
              alt={movie.title || "Movie poster"}
              className="movie-poster"
              onClick={() => onPosterClick?.(movie)}
              onError={(e) => {
                e.currentTarget.src = "/posters/default.jpg";
              }}
            />
          ))}
        </div>
        <button className="scroll-btn right" onClick={() => scroll("right")}>›</button>
      </div>
    </div>
  );
};

export default GenreCarousel;
