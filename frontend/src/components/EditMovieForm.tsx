import { useState } from "react";
import { Movie } from "../types/Movie";
import { updateMovie } from "../api/MoviesAPI";

interface EditMovieFormProps {
    movie: Movie;
    onSuccess: () => void;
    onCancel: () => void;
}

const EditMovieForm = ({ movie, onSuccess, onCancel }: EditMovieFormProps) => {
    const [formData, setFormData] = useState<Movie>({
        ...movie,
        // Add default values for missing genre fields if they're not provided
        action: movie.action ?? 0,
        adventure: movie.adventure ?? 0,
        animeSeriesInternationalTvShows: movie.animeSeriesInternationalTvShows ?? 0,
        britishTvShowsDocuseriesInternationalTvShows: movie.britishTvShowsDocuseriesInternationalTvShows ?? 0,
        children: movie.children ?? 0,
        comedies: movie.comedies ?? 0,
        comediesDramasInternationalMovies: movie.comediesDramasInternationalMovies ?? 0,
        comediesInternationalMovies: movie.comediesInternationalMovies ?? 0,
        comediesRomanticMovies: movie.comediesRomanticMovies ?? 0,
        crimeTvShowsDocuseries: movie.crimeTvShowsDocuseries ?? 0,
        documentaries: movie.documentaries ?? 0,
        documentariesInternationalMovies: movie.documentariesInternationalMovies ?? 0,
        docuseries: movie.docuseries ?? 0,
        dramas: movie.dramas ?? 0,
        dramasInternationalMovies: movie.dramasInternationalMovies ?? 0,
        dramasRomanticMovies: movie.dramasRomanticMovies ?? 0,
        familyMovies: movie.familyMovies ?? 0,
        fantasy: movie.fantasy ?? 0,
        horrorMovies: movie.horrorMovies ?? 0,
        internationalMoviesThrillers: movie.internationalMoviesThrillers ?? 0,
        internationalTvShowsRomanticTvShowsTvDramas: movie.internationalTvShowsRomanticTvShowsTvDramas ?? 0,
        kidsTv: movie.kidsTv ?? 0,
        languageTvShows: movie.languageTvShows ?? 0,
        musicals: movie.musicals ?? 0,
        natureTv: movie.natureTv ?? 0,
        realityTv: movie.realityTv ?? 0,
        spirituality: movie.spirituality ?? 0,
        tvAction: movie.tvAction ?? 0,
        tvComedies: movie.tvComedies ?? 0,
        tvDramas: movie.tvDramas ?? 0,
        talkShowsTvComedies: movie.talkShowsTvComedies ?? 0,
        thrillers: movie.thrillers ?? 0,
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]:
                name === "releaseYear"
                    ? Number(value)
                    : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (formData.showId) {
                await updateMovie(formData.showId, formData);
                onSuccess();
            } else {
                console.error("showId is missing or invalid");
            }
        } catch (error) {
            console.error("Failed to update movie:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 bg-gray-100 rounded shadow-md">
            <h2 className="text-xl font-bold mb-4">Edit Movie</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label htmlFor="title">
                    Movie Title:
                    <input
                        id="title"
                        type="text"
                        name="title"
                        value={formData.title ?? ""}
                        onChange={handleChange}
                        required
                        className="input input-bordered w-full"
                    />
                </label>

                <label htmlFor="director">
                    Director:
                    <input
                        id="director"
                        type="text"
                        name="director"
                        value={formData.director ?? ""}
                        onChange={handleChange}
                        required
                        className="input input-bordered w-full"
                    />
                </label>

                <label htmlFor="releaseYear">
                    Release Year:
                    <input
                        id="releaseYear"
                        type="number"
                        name="releaseYear"
                        value={formData.releaseYear ?? ""}
                        onChange={handleChange}
                        required
                        className="input input-bordered w-full"
                    />
                </label>

                <label htmlFor="duration">
                    Duration:
                    <input
                        id="duration"
                        type="text"
                        name="duration"
                        value={formData.duration ?? ""}
                        onChange={handleChange}
                        required
                        className="input input-bordered w-full"
                    />
                </label>

                <label htmlFor="description" className="md:col-span-2">
                    Description:
                    <input
                        id="description"
                        type="text"
                        name="description"
                        value={formData.description ?? ""}
                        onChange={handleChange}
                        required
                        className="input input-bordered w-full"
                    />
                </label>

                <label htmlFor="type">
                    Type:
                    <select
                        id="type"
                        name="type"
                        value={formData.type ?? ""}
                        onChange={handleChange}
                        required
                        className="select select-bordered w-full"
                    >
                        <option value="">Select Type</option>
                        <option value="Movie">Movie</option>
                        <option value="TV Show">TV Show</option>
                    </select>
                </label>
            </div>

            <div className="flex justify-end gap-4 mt-6">
                <button type="submit" className="btn btn-success">
                    Save Changes
                </button>
                <button type="button" className="btn btn-secondary" onClick={onCancel}>
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default EditMovieForm;
