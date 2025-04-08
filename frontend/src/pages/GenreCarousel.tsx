import React, { useRef } from "react";
import "../components/HomePage.css"; // reuse same styles

type Movie = {
  showId: string;
  title: string;
  genre: string;
  posterUrl: string;
};

interface Props {
  genre: string;
  movies: Movie[];
}

const GenreCarousel: React.FC<Props> = ({ genre, movies }) => {
  const rowRef = useRef<HTMLDivElement>(null);

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
      <div className="carousel-container" >
        <button className="scroll-btn left" onClick={() => scroll("left")}>
          ‹
        </button>
        <div className="movie-carousel" ref={rowRef}>
          {movies.map((movie) => (
            <img
              key={movie.showId}
              src={movie.posterUrl}
              alt={movie.title}
              className="movie-poster"
              onError={(e) => e.currentTarget.remove()}
            />
          ))}
        </div>
        <button className="scroll-btn right" onClick={() => scroll("right")}>
          ›
        </button>
      </div>
    </div>
  );
};

export default GenreCarousel;
