import React from "react";
import { Link } from "react-router-dom";
import "../components/Header.css"; // adjust path if needed

const Header = () => {
  return (
    <header className="header">
      <div className="header-title">CineNiche</div>
      <nav className="nav-links">
        <Link to="/home">Home</Link>
        <Link to="/genres">Genres</Link>
        <Link to="/movies">Movie Data</Link>
        <Link to="/privacy">Privacy</Link>
      </nav>
    </header>
  );
};

export default Header;
