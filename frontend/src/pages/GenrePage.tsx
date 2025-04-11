import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Movie } from "../types/Movie";
import "../components/GenrePage.css";
import { moviePosters as allPosters } from "../data/moviePosters";

const getPosterUrl = (title: string | undefined): string => {
  if (!title) return "/posters/default.jpg";

  const sanitize = (str: string) =>
    str.replace(/[^a-zA-Z0-9 ]/g, "").trim();

  const sanitizedTitle = sanitize(title);
  const encodedTitle = encodeURIComponent(sanitizedTitle);
  const match = allPosters.find(
    (path) => path === `/posters/${encodedTitle}.jpg`
  );

  const baseUrl = "https://movieblob4logang.blob.core.windows.net/posters";
  return match ? `${baseUrl}${match}` : "/posters/default.jpg";
};

const GenrePage = () => {
  const { genre } = useParams<{ genre: string }>();
  const [movies, setMovies] = useState<Movie[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGenreMovies = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await fetch(
          `https://intex-backend-4logan-g8agdge9hsc2aqep.westus-01.azurewebsites.net/api/movies/by-genre`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();

        const decodedGenre = genre ? decodeURIComponent(genre) : "";
        const selected = data[decodedGenre] || [];

        setMovies(selected);
      } catch (error) {
        console.error("Error fetching genre movies:", error);
      }
    };

    fetchGenreMovies();
  }, [genre]);

  const decodedGenre = genre ? decodeURIComponent(genre) : "";

  return (
    <div className="genre-page">
      <button className="back-btn" onClick={() => navigate("/home")}>
        ← Back to Home
      </button>
      <h1 className="genre-heading">{decodedGenre}</h1>
      <div className="genre-movie-grid">
        {movies.map((movie) => (
          <div key={movie.showId} className="movie-card">
            <img
              src={getPosterUrl(movie.title)}
              alt={movie.title ?? "Movie poster"}
              className="movie-poster"
              onError={(e) => (e.currentTarget.src = "/posters/default.jpg")}
            />
            <h3>{movie.title}</h3>
            <p className="movie-meta">
              {movie.releaseYear} • {movie.country}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GenrePage;
