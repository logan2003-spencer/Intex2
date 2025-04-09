import React, { useState, useEffect } from "react";
import { Movie } from "../types/Movie";

interface SearchBarProps {
  onSelectMovie: (movie: Movie) => void;
  onClose: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSelectMovie, onClose }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchResults = async () => {
      if (query.length < 2) return;
      try {
        const res = await fetch(`http://localhost:5176/api/Movies/AllMovies?pageSize=1000`);
        const data = await res.json();
        const filtered = data.movies.filter((m: Movie) =>
          m.title && m.title.toLowerCase().includes(query.toLowerCase())
        );
        setResults(filtered.slice(0, 5));
      } catch (err) {
        console.error("Search error:", err);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <div className="search-overlay" onClick={onClose}>
      <div className="search-box" onClick={(e) => e.stopPropagation()}>
        <input
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
        />
        <ul>
          {results.map((movie) => (
            <li key={movie.showId} onClick={() => onSelectMovie(movie)}>
              {movie.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchBar;
