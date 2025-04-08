import { useEffect, useState } from 'react';
import { Movie } from './types/Movie';
import { moviePosters as allPosters } from "../src/data/moviePosters";
import { parseJwt } from "./utils/jwt";

const token = localStorage.getItem("authToken");
const user = token ? parseJwt(token) : null;
const isAdmin = user?.role === "Admin"; // Or whatever your backend encodes

function MovieList () {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const token = localStorage.getItem("authToken");

    const response = await fetch('http://localhost:5174/api/ratings/titles', {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
});

// Optional: safer error handling
if (!response.ok) {
  const errorText = await response.text();
  throw new Error(`HTTP ${response.status}: ${errorText}`);
}

const data = await response.json();
      setMovies(data);
    };

    fetchMovies();
  }, [])

  const getPosterForMovie = (title: string): string => {
    const match = allPosters.find((path) => {
      const filename = (path.split("/").pop() ?? "").toLowerCase().replace(/\.[^/.]+$/, '');
      return filename === title.toLowerCase();
    });
    return match ?? "/posters/fallback.jpg";
  };
  

  const getGenres = (movie: Movie): string[] => {
    const genres: string[] = [];
    if (movie.action) genres.push('Action');
    if (movie.adventure) genres.push('Adventure');
    if (movie.animeSeriesInternationalTvShows) genres.push('Anime Series');
    if (movie.britishTvShowsDocuseriesInternationalTvShows) genres.push('British TV Shows / Docuseries');
    if (movie.children) genres.push('Children');
    if (movie.comedies) genres.push('Comedies');
    if (movie.comediesDramasInternationalMovies) genres.push('Comedies / Dramas / International Movies');
    if (movie.comediesInternationalMovies) genres.push('Comedies / International Movies');
    if (movie.comediesRomanticMovies) genres.push('Comedies / Romantic Movies');
    if (movie.crimeTvShowsDocuseries) genres.push('Crime TV Shows / Docuseries');
    if (movie.documentaries) genres.push('Documentaries');
    if (movie.documentariesInternationalMovies) genres.push('Documentaries / International Movies');
    if (movie.docuseries) genres.push('Docuseries');
    if (movie.dramas) genres.push('Dramas');
    if (movie.dramasInternationalMovies) genres.push('Dramas / International Movies');
    if (movie.dramasRomanticMovies) genres.push('Dramas / Romantic Movies');
    if (movie.familyMovies) genres.push('Family Movies');
    if (movie.fantasy) genres.push('Fantasy');
    if (movie.horrorMovies) genres.push('Horror Movies');
    if (movie.internationalMoviesThrillers) genres.push('International Movies / Thrillers');
    if (movie.internationalTvShowsRomanticTvShowsTvDramas) genres.push('International TV Shows / Romantic TV Shows / TV Dramas');
    if (movie.kidsTv) genres.push('Kids TV');
    if (movie.languageTvShows) genres.push('Language TV Shows');
    if (movie.musicals) genres.push('Musicals');
    if (movie.natureTv) genres.push('Nature TV');
    if (movie.realityTv) genres.push('Reality TV');
    if (movie.spirituality) genres.push('Spirituality');
    if (movie.tvAction) genres.push('TV Action');
    if (movie.tvComedies) genres.push('TV Comedies');
    if (movie.tvDramas) genres.push('TV Dramas');
    if (movie.talkShowsTvComedies) genres.push('Talk Shows / TV Comedies');
    if (movie.thrillers) genres.push('Thrillers');

    return genres;
  };

  return (
    <>  
      <h1>Movies</h1>
      <br />
      {movies.map((m) => (
        <div id="movieCard" key={`${m.title}-${m.releaseYear}-${m.showId}`}>
          <h3>{m.title}</h3>

      <img 
      src={getPosterForMovie(m.title ?? "")} 
      alt={m.title ?? "Movie poster"} 
      style={{ width: '200px', height: 'auto' }} 
      onError={(e) => e.currentTarget.src = "/posters/fallback.jpg"}
    />


          <ul>
            <li>Director: {m.director}</li>
            <li>Cast: {m.cast}</li>
            <li>Release Year: {m.releaseYear}</li>
            <li>Rating: {m.rating}</li>
            <li>Duration: {m.duration}</li>
            <li>Description: {m.description}</li>
            <li>
              Genres: {getGenres(m).length > 0 ? getGenres(m).join(', ') : 'No genres listed'}
            </li>
          </ul>
        </div>
      ))}
    </>
  );
}

export default MovieList;
