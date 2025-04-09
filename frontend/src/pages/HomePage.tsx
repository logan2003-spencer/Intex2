// // HomePage.tsx
// import React, { useEffect, useState } from "react";
// import GenreCarousel from "./GenreCarousel";
// import MovieModal from "../components/MovieModel";
// import { Movie } from "../types/Movie";

// const HomePage = () => {
// <<<<<<< HEAD
//   const [genreData, setGenreData] = useState<{ [genre: string]: Movie[] }>({});
//   const [selectedMovieId, setSelectedMovieId] = useState<string | null>(null);
//   const [movieHistory, setMovieHistory] = useState<string[]>([]);
// =======
//   const [genreData, setGenreData] = useState<GenreMovies>({});
//   const [selectedMovieId, setSelectedMovieId] = useState<string | null>(null);
// >>>>>>> 3832aac08a7414400100ceb685706296a67a30ee

//   const userId = 1;

//   useEffect(() => {
//     const fetchRecommendedMovies = async () => {
//       try {
//         const response = await fetch(
//           `http://localhost:5176/api/movies/home-page-recommendations?user_id=${userId}`
//         );
// <<<<<<< HEAD
//         const data = await response.json();
//         setGenreData(data);
// =======
//         const data: GenreMovies = await response.json();

//         const filtered = Object.fromEntries(
//           Object.entries(data).map(([genre, movies]) => [
//             genre,
//             movies.filter((movie: Movie) => movie.title),
//           ])
//         );

//         setGenreData(filtered);
// >>>>>>> 3832aac08a7414400100ceb685706296a67a30ee
//       } catch (error) {
//         console.error("Error fetching recommendations:", error);
//       }
//     };

//     fetchRecommendedMovies();
//   }, [userId]);

//   const handlePosterClick = (movie: Movie) => {
//     const newId = String(movie.showId);
//     if (selectedMovieId && selectedMovieId !== newId) {
//       setMovieHistory((prev) => [...prev, selectedMovieId]);
//     }
//     setSelectedMovieId(newId);
//   };

//   const handleBack = () => {
//     setMovieHistory((prev) => {
//       const newHistory = [...prev];
//       const previousId = newHistory.pop();
//       setSelectedMovieId(previousId ?? null);
//       return newHistory;
//     });
//   };

//   return (
//     <div className="home-page">
//       {Object.entries(genreData).map(([genre, movies]) => (
//         <GenreCarousel
//           key={genre}
//           genre={genre}
//           movies={movies}
//           onPosterClick={handlePosterClick}
//         />
//       ))}

// <<<<<<< HEAD
//       {selectedMovieId && (
//         <MovieModal
//           movieId={selectedMovieId}
//           onClose={() => setSelectedMovieId(null)}
//           onPosterClick={handlePosterClick}
//           onBack={movieHistory.length > 0 ? handleBack : undefined}
//         />
//       )}
// =======
//         {selectedMovieId !== null && (
//           <MovieModal
//             movieId={selectedMovieId}
//             onClose={() => setSelectedMovieId(null)}
//           />
//         )}

//         {Object.keys(genreData).length === 0 && (
//           <p className="text-center text-gray-500 mt-6">
//             No recommendations available for this user.
//           </p>
//         )}
//       </div>
// >>>>>>> 3832aac08a7414400100ceb685706296a67a30ee
//     </div>
//   );
// };

// export default HomePage;


import { useEffect, useState } from "react";
import GenreCarousel from "./GenreCarousel";
import MovieModal from "../components/MovieModel";
import { Movie } from "../types/Movie";

type GenreMovies = {
  [genre: string]: Movie[];
};

const HomePage = () => {
  const [genreData, setGenreData] = useState<GenreMovies>({});
  const [selectedMovieId, setSelectedMovieId] = useState<string | null>(null);
  const [movieHistory, setMovieHistory] = useState<string[]>([]);

  const userId = 1;

  useEffect(() => {
    const fetchRecommendedMovies = async () => {
      try {
        const response = await fetch(
          `http://localhost:5176/api/movies/home-page-recommendations?user_id=${userId}`
        );
        const data: GenreMovies = await response.json();

        const filtered = Object.fromEntries(
          Object.entries(data).map(([genre, movies]) => [
            genre,
            movies.filter((movie: Movie) => movie.title),
          ])
        );

        setGenreData(filtered);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      }
    };

    fetchRecommendedMovies();
  }, [userId]);

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
      {Object.entries(genreData).map(([genre, movies]) => (
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

      {Object.keys(genreData).length === 0 && (
        <p className="text-center text-gray-500 mt-6">
          No recommendations available for this user.
        </p>
      )}
    </div>
  );
};

export default HomePage;
