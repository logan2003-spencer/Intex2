import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../components/Header.css";
import MovieModal from "./MovieModel";
import { Movie } from "../types/Movie";

type HeaderProps = {
  onMovieSelect: (movie: Movie) => void;
};

const Header: React.FC<HeaderProps> = ({ onMovieSelect }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMovieId, setSelectedMovieId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:5176/api/movies/search?query=${encodeURIComponent(searchQuery)}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch search results");
      }

      const data = await response.json();
      if (data.length > 0) {
        setSelectedMovieId(data[0].showId);
        setShowModal(true);
        onMovieSelect(data[0]);
      } else {
        alert("No movies found with that title.");
      }
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedMovieId(null);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-title">CineNiche</div>

        <form className="search-bar" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>

        <nav className="nav-links">
          <Link to="/home">Home</Link>
          <Link to="/genres">Genres</Link>
          <Link to="/movies">Movie Data</Link>
          <Link to="/privacy">Privacy</Link>
        </nav>
      </div>

      {showModal && selectedMovieId && (
        <MovieModal movieId={selectedMovieId} onClose={handleCloseModal} />
      )}
    </header>
  );
};

export default Header;
