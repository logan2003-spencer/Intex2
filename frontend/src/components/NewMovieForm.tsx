import { useState } from "react";
import { addMovie } from "../api/MovieAPI";
import { Movie } from "../types/Movie";

interface NewMovieFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const NewMovieForm = ({ onSuccess, onCancel }: NewMovieFormProps) => {
  const [formData, setFormData] = useState<Movie>({
    showId: "",
    type: "",
    title: "",
    director: "",
    cast: "",
    country: "",
    releaseYear: 0,
    rating: "",
    duration: "",
    description: "",
    // Genre flags:
    action: 0,
    adventure: 0,
    animeSeriesInternationalTvShows: 0,
    britishTvShowsDocuseriesInternationalTvShows: 0,
    children: 0,
    comedies: 0,
    comediesDramasInternationalMovies: 0,
    comediesInternationalMovies: 0,
    comediesRomanticMovies: 0,
    crimeTvShowsDocuseries: 0,
    documentaries: 0,
    documentariesInternationalMovies: 0,
    docuseries: 0,
    dramas: 0,
    dramasInternationalMovies: 0,
    dramasRomanticMovies: 0,
    familyMovies: 0,
    fantasy: 0,
    horrorMovies: 0,
    internationalMoviesThrillers: 0,
    internationalTvShowsRomanticTvShowsTvDramas: 0,
    kidsTv: 0,
    languageTvShows: 0,
    musicals: 0,
    natureTv: 0,
    realityTv: 0,
    spirituality: 0,
    tvAction: 0,
    tvComedies: 0,
    tvDramas: 0,
    talkShowsTvComedies: 0,
    thrillers: 0,
  });

  // Numeric fields conversion
  const numericFields = new Set<string>([
    "releaseYear",
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
    "thrillers",
  ]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      // Parse numeric fields; leave others as string.
      [name]: numericFields.has(name) ? parseInt(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addMovie(formData);
      onSuccess();
    } catch (error) {
      console.error("Failed to add movie:", error);
    }
  };

  // Define an array of genre options.
  const genreOptions = [
    { value: "action", label: "Action" },
    { value: "adventure", label: "Adventure" },
    { value: "animeSeriesInternationalTvShows", label: "Anime Series / International TV Shows" },
    { value: "britishTvShowsDocuseriesInternationalTvShows", label: "British TV Shows / Docuseries / International TV Shows" },
    { value: "children", label: "Children" },
    { value: "comedies", label: "Comedies" },
    { value: "comediesDramasInternationalMovies", label: "Comedies / Dramas (International Movies)" },
    { value: "comediesInternationalMovies", label: "Comedies (International Movies)" },
    { value: "comediesRomanticMovies", label: "Comedies (Romantic Movies)" },
    { value: "crimeTvShowsDocuseries", label: "Crime TV Shows / Docuseries" },
    { value: "documentaries", label: "Documentaries" },
    { value: "documentariesInternationalMovies", label: "Documentaries (International Movies)" },
    { value: "docuseries", label: "Docuseries" },
    { value: "dramas", label: "Dramas" },
    { value: "dramasInternationalMovies", label: "Dramas (International Movies)" },
    { value: "dramasRomanticMovies", label: "Dramas (Romantic Movies)" },
    { value: "familyMovies", label: "Family Movies" },
    { value: "fantasy", label: "Fantasy" },
    { value: "horrorMovies", label: "Horror Movies" },
    { value: "internationalMoviesThrillers", label: "International Movies / Thrillers" },
    { value: "internationalTvShowsRomanticTvShowsTvDramas", label: "International TV Shows / Romantic TV Shows / TV Dramas" },
    { value: "kidsTv", label: "Kids TV" },
    { value: "languageTvShows", label: "Language TV Shows" },
    { value: "musicals", label: "Musicals" },
    { value: "natureTv", label: "Nature TV" },
    { value: "realityTv", label: "Reality TV" },
    { value: "spirituality", label: "Spirituality" },
    { value: "tvAction", label: "TV Action" },
    { value: "tvComedies", label: "TV Comedies" },
    { value: "tvDramas", label: "TV Dramas" },
    { value: "talkShowsTvComedies", label: "Talk Shows / TV Comedies" },
    { value: "thrillers", label: "Thrillers" },
  ];

  // Compute the currently selected genre (if any).
  // This finds the first flag that is set to 1.
  const currentGenre =
    genreOptions.find((option) => formData[option.value as keyof Movie] === 1)?.value || "";

  // Handle genre changes separately.
  const handleGenreSelect = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedGenre = e.target.value;

    // Reset all genre flags to 0 first.
    const resetGenres = genreOptions.reduce((acc, option) => {
      acc[option.value] = 0;
      return acc;
    }, {} as { [key: string]: number });

    // Set the selected genre's flag to 1.
    resetGenres[selectedGenre] = 1;

    setFormData({
      ...formData,
      ...resetGenres,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Movie</h2>
      <div className="form-grid">
        {/* Movie Title */}
        <label>
          Movie Title:
          <input
            type="text"
            name="title"
            value={formData.title || ""}
            onChange={handleChange}
            required
          />
        </label>

        {/* Director */}
        <label>
          Director:
          <input
            type="text"
            name="director"
            value={formData.director || ""}
            onChange={handleChange}
            required
          />
        </label>

        {/* Release Year */}
        <label>
          Release Year:
          <input
            type="number"
            name="releaseYear"
            value={formData.releaseYear || ""}
            onChange={handleChange}
            required
          />
        </label>

        {/* Duration */}
        <label>
          Duration:
          <input
            type="text"
            name="duration"
            value={formData.duration ?? ""}
            onChange={handleChange}
            required
          />
        </label>

        {/* Type */}
        <label>
          Type:
          <select
            name="type"
            value={formData.type ?? ""}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select a type
            </option>
            <option value="Movie">Movie</option>
            <option value="TV Show">TV Show</option>
          </select>
        </label>

        {/* Genre Dropdown */}
        <label>
          Genre:
          <select
            name="genre"
            value={currentGenre}
            onChange={handleGenreSelect}
            required
          >
            <option value="" disabled>
              Select a genre
            </option>
            {genreOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        {/* Description */}
        <label>
          Description:
          <input
            type="text"
            name="description"
            value={formData.description ?? ""}
            onChange={handleChange}
            required
          />
        </label>

        {/* Cast */}
        <label>
          Cast:
          <input
            type="text"
            name="cast"
            value={formData.cast ?? ""}
            onChange={handleChange}
            required
          />
        </label>

        {/* Country */}
        <label>
          Country:
          <input
            type="text"
            name="country"
            value={formData.country ?? ""}
            onChange={handleChange}
            required
          />
        </label>

        {/* Rating */}
        <label>
          Rating:
          <select
            name="rating"
            value={formData.rating ?? ""}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select a rating
            </option>
            <option value="G">G</option>
            <option value="PG">PG</option>
            <option value="PG-13">PG-13</option>
            <option value="R">R</option>
            <option value="TV-G">TV-G</option>
            <option value="TV-PG">TV-PG</option>
            <option value="TV-14">TV-14</option>
            <option value="TV-MA">TV-MA</option>
          </select>
        </label>

        {/* Additional fields can be rendered here as needed. */}

        <div className="form-buttons">
          <button type="submit" className="btn btn-success">
            Add Movie
          </button>
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
};

export default NewMovieForm;