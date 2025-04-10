import React, { useRef, useEffect, useState } from "react";
import { Movie } from "../types/Movie";
import "../components/HomePage.css";
import { moviePosters as allPosters } from "../data/moviePosters";
interface Props {
  genre: string;
  movies: Movie[];
  onPosterClick?: (movie: Movie) => void;
}
const GenreCarousel: React.FC<Props> = ({ genre, movies, onPosterClick }) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const [visibleMovies, setVisibleMovies] = useState<Movie[]>([...movies]);
  const getPosterUrl = (title: string | undefined): string => {
    if (!title) return "/posters/default.jpg";
    const sanitize = (str: string) =>
      str.replace(/[^a-zA-Z0-9 ]/g, "").trim();
    const sanitizedTitle = sanitize(title);
    const encodedTitle = encodeURIComponent(sanitizedTitle);
    const match = allPosters.find((path) => path === `/posters/${encodedTitle}.jpg`);
    const baseUrl = "https://movieblob4logang.blob.core.windows.net/posters";
    return match ? `${baseUrl}${match}` : "/posters/default.jpg";
  };
  // Extend movie list as user scrolls near the end
  const handleScroll = () => {
    const row = rowRef.current;
    if (!row) return;
    if (row.scrollLeft + row.clientWidth >= row.scrollWidth - 100) {
      // Clone more movies
      setVisibleMovies((prev) => [...prev, ...movies]);
    }
  };
  useEffect(() => {
    const row = rowRef.current;
    if (row) {
      row.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (row) {
        row.removeEventListener("scroll", handleScroll);
      }
    };
  }, [movies]);
  const scroll = (direction: "left" | "right") => {
    const row = rowRef.current;
    if (!row) return;
    const scrollAmount = 500;
    row.scrollBy({ left: direction === "right" ? scrollAmount : -scrollAmount, behavior: "smooth" });
  };
  return (
    <div className="genre-section">
      <h2 className="genre-title">{genre}</h2>
      <div className="carousel-container">
        <button className="scroll-btn left" onClick={() => scroll("left")}>‹</button>
        <div className="movie-carousel" ref={rowRef}>
          {visibleMovies.map((movie, index) => (
            <img
              key={`${movie.showId}-${index}`}
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
