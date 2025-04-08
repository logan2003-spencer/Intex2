import { useState } from "react";
import { Movie } from "../types/Movie"; 

const genreOptions = [
  "action", "adventure", "animeSeriesInternationalTvShows", "britishTvShowsDocuseriesInternationalTvShows",
  "children", "comedies", "comediesDramasInternationalMovies", "comediesInternationalMovies", "comediesRomanticMovies",
  "crimeTvShowsDocuseries", "documentaries", "documentariesInternationalMovies", "docuseries", "dramas", "dramasInternationalMovies",
  "dramasRomanticMovies", "familyMovies", "fantasy", "horrorMovies", "internationalMoviesThrillers", "internationalTvShowsRomanticTvShowsTvDramas",
  "kidsTv", "languageTvShows", "musicals", "natureTv", "realityTv", "spirituality", "tvAction", "tvComedies", "tvDramas", "talkShowsTvComedies", "thrillers"
];

const AddMovieForm = ({ onSuccess, onCancel }: { onSuccess: () => void; onCancel: () => void }) => {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    // Handle genre dropdowns
    if (genreOptions.includes(name)) {
      setFormData({
        ...formData,
        [name]: value === "1" ? 1 : 0, // Update to 1 for selected genres, or 0 if unselected
      });
    } else {
      setFormData({
        ...formData,
        [name]: name === "releaseYear" ? Number(value) : value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Replace this line with actual API call to save movie
      console.log(formData); // Example to log out form data
      onSuccess(); // Call success callback
    } catch (error) {
      console.error("Failed to add movie:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Movie</h2>

      {/* Title */}
      <label>
        Title:
        <input
          type="text"
          name="title"
          value={formData.title ?? ""}
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
          value={formData.director ?? ""}
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
        />
      </label>

      {/* Release Year */}
      <label>
        Release Year:
        <input
          type="number"
          name="releaseYear"
          value={formData.releaseYear ?? ""}
          onChange={handleChange}
          required
        />
      </label>

      {/* Rating */}
      <label>
        Rating:
        <input
          type="text"
          name="rating"
          value={formData.rating ?? ""}
          onChange={handleChange}
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
        />
      </label>

      {/* Description */}
      <label>
        Description:
        <input
          type="text"
          name="description"
          value={formData.description ?? ""}
          onChange={handleChange}
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
          <option value="">Select Type</option>
          <option value="Movie">Movie</option>
          <option value="TV Show">TV Show</option>
        </select>
      </label>

      {/* Genre Options - Add a dropdown for each genre */}
      <div>
        <label>Genres:</label>
        {genreOptions.map((genre) => (
          <div key={genre}>
            <label>{genre}:</label>
            <select
              name={genre}
              value={formData[genre as keyof Movie] ?? 0}
              onChange={handleChange}
            >
              <option value="0">No</option>
              <option value="1">Yes</option>
            </select>
          </div>
        ))}
      </div>

      {/* Submit and Cancel Buttons */}
      <div>
        <button type="submit">Add Movie</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AddMovieForm;
