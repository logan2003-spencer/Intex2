import { useEffect, useState } from "react";
import { Movie } from "./types/Movie";
import { moviePosters as allPosters } from "./data/moviePosters";

type MovieByGenre = {
  [genre: string]: Movie[];
};

function RecommendedMovies() {
  const [groupedMovies, setGroupedMovies] = useState<MovieByGenre>({});
  const userId = 134; // Replace with actual user ID if needed

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await fetch(
          `https://intex-backend-4logan-g8agdge9hsc2aqep.westus-01.azurewebsites.net/api/movies/home-page-recommendations?user_id=${userId}`
        );
        const data = await response.json();
        console.log("Fetched data:", data);
        setGroupedMovies(data); // e.g., { "Action": [...], "Comedy": [...] }
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      }
    };

    fetchRecommendations();
  }, [userId]);

  const getPosterForMovie = (title: string): string => {
  if (!title) return "/posters/fallback.jpg";

  const encode = (str: string) =>
    encodeURIComponent(str.trim().toLowerCase());

  // Try to match using encoded filename logic
  const match = allPosters.find((filename) => {
    const nameWithoutExtension = filename.split(".")[0].toLowerCase();
    const titleEncoded = encode(title).replace(/%20/g, "").replace(/[^a-z0-9]/gi, "");
    const matchEncoded = nameWithoutExtension.replace(/%20/g, "").replace(/[^a-z0-9]/gi, "");
    return matchEncoded === titleEncoded;
  });

  if (!match) return "/posters/fallback.jpg";

  const baseUrl = "https://movieblob4logang.blob.core.windows.net/posters";
  return `${baseUrl}/${match}`;
};


  return (
    <div className="px-4 pb-10">
      <h1 className="text-3xl font-bold mb-6">Recommended Movies</h1>

      {Object.entries(groupedMovies).map(([genre, movies]) => (
        <div key={genre} className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">{genre}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {movies.map((m) => (
              <div
                key={`${m.title}-${m.releaseYear}-${m.showId}`}
                className="border p-4 rounded shadow bg-white"
              >
                <h3 className="text-lg font-bold mb-2">{m.title}</h3>
                <img
                  src={getPosterForMovie(m.title ?? "")}
                  alt={m.title ?? "Movie poster"}
                  className="w-48 h-auto object-contain mx-auto mb-2"
                  onError={(e) => {
                    e.currentTarget.src = "/posters/fallback.jpg";
                  }}
                />
                <ul className="text-sm space-y-1">
                  <li><strong>Director:</strong> {m.director}</li>
                  <li><strong>Cast:</strong> {m.cast}</li>
                  <li><strong>Release Year:</strong> {m.releaseYear}</li>
                  <li><strong>Rating:</strong> {m.rating}</li>
                  <li><strong>Duration:</strong> {m.duration}</li>
                  <li><strong>Description:</strong> {m.description}</li>
                  <li><strong>Genre:</strong> {genre}</li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      ))}

      {Object.keys(groupedMovies).length === 0 && (
        <p>No recommendations available for this user.</p>
      )}
    </div>
  );
}

export default RecommendedMovies;
