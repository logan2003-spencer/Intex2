// GenreDropdown.tsx
import React from "react";
import { useNavigate } from "react-router-dom";

const genreList = [
  "Action & Adventure",
  "Anime Series International TV Shows",
  "British TV Shows Docuseries International TV Shows",
  "Children",
  "Comedies",
  "Comedies Dramas International Movies",
  "Comedies International Movies",
  "Comedies Romantic Movies",
  "Crime TV Shows Docuseries",
  "Documentaries",
  "Documentaries International Movies",
  "Docuseries",
  "Dramas",
  "Dramas International Movies",
  "Dramas Romantic Movies",
  "Family Movies",
  "Fantasy",
  "Horror Movies",
  "International Movies Thrillers",
  "International TV Shows Romantic TV Shows TV Dramas",
  "Kids TV",
  "Language TV Shows",
  "Musicals",
  "Nature TV",
  "Reality TV",
  "Spirituality",
  "TV Action",
  "TV Comedies",
  "TV Dramas",
  "Talk Shows TV Comedies",
  "Thrillers"
];

const GenreDropdown: React.FC = () => {
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedGenre = e.target.value;
    if (selectedGenre) {
      navigate(`/genres/${encodeURIComponent(selectedGenre)}`);
    }
  };

  return (
    <select onChange={handleChange} defaultValue="">
      <option value="" disabled>
        Browse by Genre
      </option>
      {genreList.map((genre) => (
        <option key={genre} value={genre}>
          {genre}
        </option>
      ))}
    </select>
  );
};

export default GenreDropdown;
