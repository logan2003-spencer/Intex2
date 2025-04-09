import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../components/Header.css"; // Adjust path if needed
import MovieModal from "./MovieModel"; // Import the modal component

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMovieId, setSelectedMovieId] = useState<string | null>(null); // State for the movie ID to show in modal
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:5176/api/movies/search?query=${encodeURIComponent(
          searchQuery
        )}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch search results");
      }

      const data = await response.json();
      if (data.length > 0) {
        setSelectedMovieId(data[0].showId); // Assuming the first match is displayed
        setShowModal(true); // Open the modal
      } else {
        console.log("No movies found.");
        alert("No movies found with that title.");
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error searching for movies:", error.message);
      } else {
        console.error("An unknown error occurred:", error);
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedMovieId(null); // Reset modal state
  };

  return (
    <header className="header">
      <div className="header-title">CineNiche</div>
      <nav className="nav-links">
        <Link to="/home">Home</Link>
        <Link to="/genres">Genres</Link>
        <Link to="/movies">Movie Data</Link>
        <Link to="/privacy">Privacy</Link>
      </nav>
      <form className="search-bar" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search movies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {/* Show the MovieModal if a movie is selected */}
      {showModal && selectedMovieId && (
        <MovieModal movieId={selectedMovieId} onClose={handleCloseModal} />
      )}
    </header>
  );
};

export default Header;
