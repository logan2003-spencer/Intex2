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
      if (query.length < 2) {
        setResults([]); // Clear results when query is short
        return;
      }

      try {
        const res = await fetch(
          `https://intex-backend-4logan-g8agdge9hsc2aqep.westus-01.azurewebsites.net/api/Movies/search?query=${encodeURIComponent(
            query
          )}`
        );

        if (!res.ok) {
          console.error("Failed to fetch search results");
          return;
        }

        const data: Movie[] = await res.json();
        setResults(data.slice(0, 5));
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
          {query.length >= 2 && results.length === 0 && (
            <li>No matching movies found</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default SearchBar;
