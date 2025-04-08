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

  // Define which fields should be treated as numbers.
  // List every field that needs numeric conversion.
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
    "realityTv",
    "tvAction",
    "tvComedies",
    "tvDramas",
    "talkShowsTvComedies",
    "thrillers",
    "kidsTv",
    "languageTvShows",
    "musicals",
    "natureTv",
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

        {/* Render additional fields here as needed.
            For example, you might iterate over a list of genres to create dropdowns.
            Ensure the 'name' attribute matches the keys in your Movie object. */}

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
