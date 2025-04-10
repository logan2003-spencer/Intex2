import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../components/LandingPage.css";
import { moviePosters as allPosters } from "../data/moviePosters"; // This should now contain movie *titles*

const baseUrl = "https://movieblob4logang.blob.core.windows.net/posters";

const getPosterUrl = (title: string): string => {
  if (!title) return "/posters/default.jpg";

  const sanitize = (str: string) =>
    str
      .replace(/[^a-zA-Z0-9 ]/g, "") // Remove punctuation
      .trim();

  const sanitizedTitle = sanitize(title);
  const encodedTitle = encodeURIComponent(sanitizedTitle);
  const match = allPosters.find((path) => path === `/posters/${encodedTitle}.jpg`);

  return match ? `${baseUrl}${match}` : "/posters/default.jpg";
};


const LandingPage = () => {
  const [email, setEmail] = useState<string>("");
  const navigate = useNavigate();
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    let scrollAmount = 0;
    const scrollStep = 0.5;

    const scroll = () => {
      if (!carousel) return;

      scrollAmount += scrollStep;
      carousel.scrollLeft = scrollAmount;

      if (scrollAmount >= carousel.scrollWidth / 2) {
        scrollAmount = 0;
        carousel.scrollLeft = 0;
      }

      requestAnimationFrame(scroll);
    };

    requestAnimationFrame(scroll);
  }, []);

  // Random 10 movie titles (not paths)
  const movieTitles = allPosters
    .map((path) => decodeURIComponent(path.replace("/posters/", "").replace(".jpg", "")))
    .sort(() => 0.5 - Math.random())
    .slice(0, 10);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleGetStarted = () => {
    navigate("/create-profile", { state: { email } });
  };

  return (
    <div className="landing-page">
      <header className="header">
        <div className="logo">CineNiche</div>
        <nav>
          <button className="sign-in-btn" onClick={() => navigate("/login")}>
            Sign In
          </button>
        </nav>
      </header>

      <section className="hero-section">
        <div className="carousel-wrapper">
          <div className="carousel" ref={carouselRef}>
            {[...movieTitles, ...movieTitles].map((title, index) => (
              <img
                key={index}
                src={getPosterUrl(title)}
                alt={`Movie poster ${title}`}
                className="carousel-image"
                onError={(e) => (e.currentTarget.src = "/posters/fallback.jpg")}
              />
            ))}
          </div>
        </div>

        <div className="hero-content">
          <h1 className="hero-logo">CineNiche</h1>
          <h1 className="title">Unlimited movies, TV shows, and more.</h1>
          <h2 className="subtitle">Watch anywhere. Cancel anytime.</h2>
          <p className="cta">
            Ready to watch? Enter your email to create or restart your membership.
          </p>
          <form className="email-form">
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={handleEmailChange}
            />
            <button
              type="button"
              className="start-btn"
              onClick={handleGetStarted}
            >
              Get Started
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
