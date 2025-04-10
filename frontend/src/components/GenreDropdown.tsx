// GenreDropdown.tsx
import React from "react";
import { useNavigate } from "react-router-dom";

const genreList = [
  "action",
  "adventure",
  "animeSeriesInternationalTvShows",
  "britishTvShowsDocuseriesInternationalTvShows",
  "children",
  "comedies",
  "comediesDramasInternationalMovies",
  "comediesInternationalMovies",
  "comediesRomanticMovies",
  "crimeTvShowsDocuseries",
  "documentaries",
  "documentariesInternationalMovies",
  "docuseries",
  "dramas",
  "dramasInternationalMovies",
  "dramasRomanticMovies",
  "familyMovies",
  "fantasy",
  "horrorMovies",
  "internationalMoviesThrillers",
  "internationalTvShowsRomanticTvShowsTvDramas",
  "kidsTv",
  "languageTvShows",
  "musicals",
  "natureTv",
  "realityTv",
  "spirituality",
  "tvAction",
  "tvComedies",
  "tvDramas",
  "talkShowsTvComedies",
  "thrillers"
];

const formatGenreName = (slug: string) => {
  return slug
    .replace(/([a-z])([A-Z])/g, "$1 $2")       // split camelCase
    .replace(/([a-z])([0-9])/gi, "$1 $2")       // split digits
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/([A-Z]+)/g, match => match[0] + match.slice(1).toLowerCase())
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/([A-Z])/g, " $1")                // split ALL CAPS if any
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/\s+/g, " ")                      // collapse multiple spaces
    .trim()
    .replace(/\b\w/g, c => c.toUpperCase());   // capitalize each word
};

const GenreDropdown: React.FC = () => {
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedGenre = e.target.value;
    if (selectedGenre) {
      navigate(`/genres/${selectedGenre}`);
    }
  };

  return (
    <select onChange={handleChange} defaultValue="">
      <option value="" disabled>
        Browse by Genre
      </option>
      {genreList.map((genre) => (
        <option key={genre} value={genre}>
          {formatGenreName(genre)}
        </option>
      ))}
    </select>
  );
};

export default GenreDropdown;
