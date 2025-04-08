import { useEffect, useState } from 'react';
import { Movie } from './types/Movie';
import { moviePosters as allPosters } from "./data/moviePosters";

function RecommendedMovies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [recommendedMovies, setRecommendedMovies] = useState<Movie[]>([]);
  
  const userId = 1;  // Hardcoded user_id for testing
  
  // Fetch movies from the database
  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch('http://localhost:5174/api/ratings/titles');
      const data = await response.json();
      setMovies(data);
    };
    fetchMovies();
  }, []); // This only runs once when the component mounts

  // Fetch recommendations based on user_id and filter movies after the movies are fetched
  useEffect(() => {
    if (movies.length > 0) {
      const fetchRecommendations = async () => {
        const response = await fetch(`http://localhost:5174/api/ratings/home-page-recommendations?user_id=${userId}`);
        const data = await response.json();
        console.log("Recommendations for user:", data);  // Log the data
        
        if (data.length === 0) {
          console.log("No recommendations found for userId = 1");
          setRecommendedMovies([]);  // If no recommendations, show nothing
          return;
        }

        // Normalize the title to avoid case sensitivity issues
        const recommendedMovieTitles = data.map((rec: { title: string }) => rec.title.toLowerCase());
        console.log("Recommended Titles:", recommendedMovieTitles);  // Log the titles

        // Filter movies based on the recommendation titles
        const filteredMovies = movies.filter(movie => recommendedMovieTitles.includes(movie.title.toLowerCase()));
        setRecommendedMovies(filteredMovies);
      };

      fetchRecommendations();
    }
  }, [movies, userId]);
  
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
      <h1>Recommended Movies</h1>
      <br />
      {recommendedMovies.length > 0 ? (
        recommendedMovies.map((m) => (
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
              <li>Genres: {getGenres(m).length > 0 ? getGenres(m).join(', ') : 'No genres listed'}</li>
            </ul>
          </div>
        ))
      ) : (
        <p>No recommendations available for this user.</p>
      )}
    </>
  );
}

export default RecommendedMovies;
