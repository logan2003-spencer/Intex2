// src/components/Header.tsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../components/Header.css";
import { Movie } from "../types/Movie";

interface HeaderProps {
  onMovieSelect: (movie: Movie) => void;
}

const Header: React.FC<HeaderProps> = ({ onMovieSelect }) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch("http://localhost:5176/api/movies/titles");
        const data: Movie[] = await res.json();
        setAllMovies(data);
      } catch (err) {
        console.error("Failed to fetch movies:", err);
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    const query = searchQuery.toLowerCase();
    setFilteredMovies(
      allMovies.filter((movie) =>
        movie.title?.toLowerCase().includes(query)
      )
    );
  }, [searchQuery, allMovies]);

  const handleResultClick = (movie: Movie) => {
    onMovieSelect(movie);
    setSearchOpen(false);
    setSearchQuery("");
  };

  return (
    <>
      <header className="header">
        <div className="header-title">CineNiche</div>
        <nav className="nav-links">
          <Link to="/home">Home</Link>
          <Link to="/genres">Genres</Link>
          <Link to="/movies">Movie Data</Link>
          <Link to="/privacy">Privacy</Link>
          <span className="search-icon" onClick={() => setSearchOpen(!searchOpen)}>🔍</span>
        </nav>
      </header>

      {searchOpen && (
        <div className="search-overlay" onClick={() => setSearchOpen(false)}>
          <div className="search-box" onClick={(e) => e.stopPropagation()}>
            <input
              type="text"
              placeholder="Search for a movie..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
            <ul>
              {filteredMovies.slice(0, 8).map((movie) => (
                <li key={movie.showId} onClick={() => handleResultClick(movie)}>
                  {movie.title}
                </li>
              ))}
              {searchQuery && filteredMovies.length === 0 && (
                <li>No results found</li>
              )}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
