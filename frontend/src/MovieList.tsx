import { useEffect, useState } from "react";
import { Movie } from "./types/Movie";
import { moviePosters as allPosters } from "../src/data/moviePosters";

function MovieList() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch("http://localhost:5174/api/Movies/titles");
      const data = await response.json();
      setMovies(data);
    };

    fetchMovies();
  }, []);

  const getPosterForMovie = (title: string): string => {
    const match = allPosters.find((path) => {
      const filename = (path.split("/").pop() ?? "")
        .toLowerCase()
        .replace(/\.[^/.]+$/, "");
      return filename === title.toLowerCase();
    });
    return match ?? "/posters/fallback.jpg";
  };

  const getGenres = (movie: Movie): string[] => {
    const genres: string[] = [];
    if (movie.action) genres.push("Action");
    if (movie.adventure) genres.push("Adventure");
    if (movie.animeSeriesInternationalTvShows) genres.push("Anime Series");
    if (movie.britishTvShowsDocuseriesInternationalTvShows)
      genres.push("British TV Shows / Docuseries");
    if (movie.children) genres.push("Children");
    if (movie.comedies) genres.push("Comedies");
    if (movie.comediesDramasInternationalMovies)
      genres.push("Comedies / Dramas / International Movies");
    if (movie.comediesInternationalMovies)
      genres.push("Comedies / International Movies");
    if (movie.comediesRomanticMovies) genres.push("Comedies / Romantic Movies");
    if (movie.crimeTvShowsDocuseries)
      genres.push("Crime TV Shows / Docuseries");
    if (movie.documentaries) genres.push("Documentaries");
    if (movie.documentariesInternationalMovies)
      genres.push("Documentaries / International Movies");
    if (movie.docuseries) genres.push("Docuseries");
    if (movie.dramas) genres.push("Dramas");
    if (movie.dramasInternationalMovies)
      genres.push("Dramas / International Movies");
    if (movie.dramasRomanticMovies) genres.push("Dramas / Romantic Movies");
    if (movie.familyMovies) genres.push("Family Movies");
    if (movie.fantasy) genres.push("Fantasy");
    if (movie.horrorMovies) genres.push("Horror Movies");
    if (movie.internationalMoviesThrillers)
      genres.push("International Movies / Thrillers");
    if (movie.internationalTvShowsRomanticTvShowsTvDramas)
      genres.push("International TV Shows / Romantic TV Shows / TV Dramas");
    if (movie.kidsTv) genres.push("Kids TV");
    if (movie.languageTvShows) genres.push("Language TV Shows");
    if (movie.musicals) genres.push("Musicals");
    if (movie.natureTv) genres.push("Nature TV");
    if (movie.realityTv) genres.push("Reality TV");
    if (movie.spirituality) genres.push("Spirituality");
    if (movie.tvAction) genres.push("TV Action");
    if (movie.tvComedies) genres.push("TV Comedies");
    if (movie.tvDramas) genres.push("TV Dramas");
    if (movie.talkShowsTvComedies) genres.push("Talk Shows / TV Comedies");
    if (movie.thrillers) genres.push("Thrillers");

    return genres;
  };

  const getPosterUrl = (title: string): string => {
    const formattedTitle = title
      .replace(/[^a-zA-Z0-9 ]/g, "")
      .trim()
      .replace(/\s+/g, "_");
    return `/posters/${formattedTitle}.jpg`;
  };

  return (
    <>
      <h1>Movies</h1>
      <div className="movie-grid">
        {movies.map((m) => (
          <div
            key={m.showId}
            className="movie-card"
            onClick={() => setSelectedMovie(m)}
          >
            <img
              src={getPosterUrl(m.title ?? "Unknown")}
              alt={`${m.title}`}
              className="movie-poster"
              onError={(e) => {
                e.currentTarget.src = "/posters/default.jpg";
              }}
            />
          </div>
        ))}
      </div>

      {selectedMovie && (
        <div
          className="movie-modal-overlay"
          onClick={() => setSelectedMovie(null)}
        >
          <div className="movie-modal" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedMovie.title}</h2>
            <p>
              <strong>Director:</strong> {selectedMovie.director}
            </p>
            <p>
              <strong>Cast:</strong> {selectedMovie.cast}
            </p>
            <p>
              <strong>Release Year:</strong> {selectedMovie.releaseYear}
            </p>
            <p>
              <strong>Rating:</strong> {selectedMovie.rating}
            </p>
            <p>
              <strong>Duration:</strong> {selectedMovie.duration}
            </p>
            <p>
              <strong>Description:</strong> {selectedMovie.description}
            </p>
            <p>
              <strong>Genres:</strong> {getGenres(selectedMovie).join(", ")}
            </p>
            <button onClick={() => setSelectedMovie(null)}>Close</button>
          </div>
        </div>
      )}
    </>
  );
}

export default MovieList;
