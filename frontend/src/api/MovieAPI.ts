import { Movie } from "../types/Movie";

interface FetchMoviesResponse {
    movies: Movie[];
    totalNumMovies: number;
}

const API_URL = 'https://intex-2-backend-side-fqgxf8cpare3g0gu.eastus-01.azurewebsites.net/api/Movies'; // ✅ HTTPS with localhost

// Fetch Movies with Pagination and Filter
export const fetchMovies = async (
    pageSize: number,
    pageNum: number,
    selectedGenres: string[]
): Promise<FetchMoviesResponse> => {
    try {
        const genreParams = selectedGenres.map((genre) => `Type=${encodeURIComponent(genre)}`).join('&');
        const response = await fetch(
            `${API_URL}/AllMovies?pageSize=${pageSize}&pageNum=${pageNum}${selectedGenres.length ? `&${genreParams}` : ''}`
        );

        if (!response.ok) {
            throw new Error(`Failed to fetch movies.`);
        }

        return await response.json();
        
    } catch (error) {
        console.error("Error fetching movies:", error);
        throw error;
    }
};

// Add a New Movie
export const addMovie = async (newMovie: Movie): Promise<Movie> => {
    try {
        const response = await fetch(`${API_URL}/AddMovie`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newMovie),
        });

        if (!response.ok) {
            throw new Error("Failed to add movie.");
        }

        return await response.json();
    } catch (error) {
        console.error("Error adding movie:", error);
        throw error;
    }
};

// Update an Existing Movie
export const updateMovie = async (showId: string, updatedMovie: Movie): Promise<Movie> => {
    try {
        const response = await fetch(`${API_URL}/Update/${showId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedMovie),
        });

        if (!response.ok) {
            throw new Error(`Failed to update movie with ID ${showId}. HTTP Status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error updating movie:", error);
        throw error;
    }
};

// Delete a Movie
export const deleteMovie = async (showId: string): Promise<void> => {
    try {
        const response = await fetch(`${API_URL}/Delete/${showId}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error(`Failed to delete movie with ID ${showId}. HTTP Status: ${response.status}`);
        }

        console.log(`Movie with ID ${showId} successfully deleted.`);
    } catch (error) {
        console.error("Error deleting movie:", error);
        throw error;
    }
};
