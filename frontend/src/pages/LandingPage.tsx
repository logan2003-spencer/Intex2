// src/pages/LandingPage.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../components/LandingPage.css";
const moviePosters = [
  "https://image.tmdb.org/t/p/w500/ptpr0kGAckfQkJeJIt8st5dglvd.jpg",
  "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
  "https://image.tmdb.org/t/p/w500/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg",
  "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg",
  "https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg",
  "https://image.tmdb.org/t/p/w500/62HCnUTziyWcpDaBO2i1DX17ljH.jpg",
  "https://image.tmdb.org/t/p/w500/r2J02Z2OpNTctfOSN1Ydgii51I3.jpg",
  "https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg",
  "https://image.tmdb.org/t/p/w500/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg",
];
const LandingPage = () => {
  const [email, setEmail] = useState<string>("");
  const navigate = useNavigate();
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handleGetStarted = () => {
    // Navigate to the CreateProfile page and pass the email as state
    navigate("/create-profile", { state: { email } });
  };
  return (
    <div className="landing-page">
      <header className="header">
        <div className="logo">CineNiche</div>
        <nav>
          <button className="sign-in-btn">Sign In</button>
        </nav>
      </header>
      <section className="hero-section">
        <div className="carousel">
          {moviePosters.map((src, index) => (
            <img key={index} src={src} alt={`Movie poster ${index}`} className="carousel-image" />
          ))}
        </div>
        <div className="hero-content">
          <h1 className="hero-logo">CineNiche</h1>
          <h1 className="title">Unlimited movies, TV shows, and more.</h1>
          <h2 className="subtitle">Watch anywhere. Cancel anytime.</h2>
          <p className="cta">Ready to watch? Enter your email to create or restart your membership.</p>
          <form className="email-form">
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={handleEmailChange}
            />
            <button type="button" className="start-btn" onClick={handleGetStarted}>
              Get Started
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};
export default LandingPage;
