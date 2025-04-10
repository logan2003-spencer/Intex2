// HomePage.tsx
import { useEffect, useState } from "react";
import GenreCarousel from "./GenreCarousel";
import MovieModal from "../components/MovieModel";
import { Movie } from "../types/Movie";
const HomePage = () => {
  const [genreData, setGenreData] = useState<{ [genre: string]: Movie[] }>({});
  const [visibleGenres, setVisibleGenres] = useState(3); // Tracks how many genres are displayed
  const [selectedMovieId, setSelectedMovieId] = useState<string | null>(null);
  const [movieHistory, setMovieHistory] = useState<string[]>([]);
  const userId = 1;
  useEffect(() => {
    const fetchRecommendedMovies = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await fetch(
          `https://intex-backend-4logan-g8agdge9hsc2aqep.westus-01.azurewebsites.net/api/movies/home-page-recommendations?user_id=${userId}`,
          {
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setGenreData(data);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      }
    };
    fetchRecommendedMovies();
  }, [userId]);
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 50 // Adjust threshold as needed
      ) {
        setVisibleGenres((prev) =>
          Math.min(prev + 3, Object.keys(genreData).length)
        );
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [genreData]);
  const handlePosterClick = (movie: Movie) => {
    const newId = String(movie.showId);
    if (selectedMovieId && selectedMovieId !== newId) {
      setMovieHistory((prev) => [...prev, selectedMovieId]);
    }
    setSelectedMovieId(newId);
  };
  const handleBack = () => {
    setMovieHistory((prev) => {
      const newHistory = [...prev];
      const previousId = newHistory.pop();
      setSelectedMovieId(previousId ?? null);
      return newHistory;
    });
  };
  return (
    <div className="home-page">
      {Object.entries(genreData)
        .slice(0, visibleGenres)
        .map(([genre, movies]) => (
          <GenreCarousel
            key={genre}
            genre={genre}
            movies={movies}
            onPosterClick={handlePosterClick}
          />
        ))}
      {selectedMovieId && (
        <MovieModal
          movieId={selectedMovieId}
          onClose={() => setSelectedMovieId(null)}
          onPosterClick={handlePosterClick}
          onBack={movieHistory.length > 0 ? handleBack : undefined}
        />
      )}
    </div>
  );
};
export default HomePage;






