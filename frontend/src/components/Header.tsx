import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../components/Header.css";
import MovieModal from "./MovieModel";
import { Movie } from "../types/Movie";
import GenreDropdown from "../components/GenreDropdown";

type HeaderProps = {
  onMovieSelect: (movie: Movie) => void;
};

const Header: React.FC<HeaderProps> = ({ onMovieSelect }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMovieId, setSelectedMovieId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const navigate = useNavigate();

  const decodeJWT = (token: string) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = atob(base64);
    return JSON.parse(jsonPayload);
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const decoded = decodeJWT(token);
        setUsername(decoded.sub || "Guest");
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");
    try {
      const response = await fetch(
        `https://intex-backend-4logan-g8agdge9hsc2aqep.westus-01.azurewebsites.net/api/movies/search?query=${encodeURIComponent(searchQuery)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch search results");
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

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="header-title">CineNiche</div>

      <div className="user-placeholder">Hi, {username || "Guest"}</div>

      <nav className="nav-links">
        <Link to="/home">Home</Link>
        <Link to="/privacy">Privacy</Link>
        <Link to="/adminMovies">Admin</Link>
        <Link to="/login" onClick={handleLogout}>Logout</Link>
      </nav>

      <div className="search-genre-container">
        <form className="search-bar" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </form>
        <div className="genre-dropdown-wrapper">
          <GenreDropdown />
        </div>
      </div>

      {showModal && selectedMovieId && (
        <MovieModal movieId={selectedMovieId} onClose={handleCloseModal} />
      )}
    </header>
  );
};

export default Header;
