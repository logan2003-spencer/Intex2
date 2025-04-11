import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  const [username, setUsername] = useState<string | null>(null); // State to store the username

  const navigate = useNavigate(); // Use navigate for programmatic navigation

  // Function to decode the JWT and get the 'sub' (email or user ID)
  const decodeJWT = (token: string) => {
    const base64Url = token.split('.')[1]; // Get the payload part of the token
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Decode Base64 URL encoding
    const jsonPayload = atob(base64); // Decode the base64 string into a JSON string
    return JSON.parse(jsonPayload); // Parse JSON to get the claims
  };

  // Extract the username (email or user ID) from the JWT token when the component mounts
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const decoded = decodeJWT(token); // Decode the token
        console.log("Decoded Token:", decoded); // Log the decoded token to inspect it
        setUsername(decoded.sub || "Guest"); // Set username from 'sub' (email/user ID) or fallback to "Guest"
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []); // Empty array means this will run once when the component mounts

  // Search handling
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

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Remove the token from localStorage
    navigate("/login"); // Redirect to the login page
  };

  return (
    <header className="header">
      <div className="header-left">
        <div className="header-title">CineNiche</div>
      </div>

      <div>
        <div className="user-placeholder">
          Hi, {username || "Guest"} {/* Display the username or fallback to "Guest" */}
        </div>
      </div>

      <nav className="nav-links">
        <Link to="/home">Home</Link>
        <Link to="/privacy">Privacy</Link>
        <button onClick={handleLogout} className="logout-btn">Logout</button> {/* Logout button */}
        <Link to="/adminMovies">Admin</Link>
      </nav>

      <div className="header-right">
        <form className="search-bar" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
      </div>

      {showModal && selectedMovieId && (
        <MovieModal movieId={selectedMovieId} onClose={handleCloseModal} />
      )}
    </header>
  );
};

export default Header;
