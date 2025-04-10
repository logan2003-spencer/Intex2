// GenreDropdown.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const GenreDropdown: React.FC = () => {
  const [genres, setGenres] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await fetch(
          "https://intex-backend-4logan-g8agdge9hsc2aqep.westus-01.azurewebsites.net/api/movies/GetGenres",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        setGenres(data);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchGenres();
  }, []);

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
      {genres.map((genre) => (
        <option key={genre} value={genre}>
          {genre}
        </option>
      ))}
    </select>
  );
};

export default GenreDropdown;
