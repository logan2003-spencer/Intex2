import { Movie } from "../types/Movie";

interface FetchMoviesResponse {
  movies: Movie[];
  totalNumMovies: number;
}

const API_URL = 'https://intex-backend-4logan-g8agdge9hsc2aqep.westus-01.azurewebsites.net/api/movies';

const getAuthHeaders = () => {
  const token = localStorage.getItem("authToken");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

// Fetch Movies with Pagination and Filter
export const fetchMovies = async (
  pageSize: number,
  pageNum: number,
  selectedGenres: string[]
): Promise<FetchMoviesResponse> => {
  try {
    const genreParams = selectedGenres.map((genre) => `Type=${encodeURIComponent(genre)}`).join("&");
    const url = `${API_URL}/AllMovies?pageSize=${pageSize}&pageNum=${pageNum}${selectedGenres.length ? `&${genreParams}` : ""}`;

    const response = await fetch(url, {
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch movies.");
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
      headers: getAuthHeaders(),
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
      headers: getAuthHeaders(),
      body: JSON.stringify(updatedMovie),
    });

    if (!response.ok) {
      throw new Error(`Failed to update movie with ID ${showId}.`);
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
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Failed to delete movie with ID ${showId}.`);
    }

    console.log(`Movie with ID ${showId} successfully deleted.`);
  } catch (error) {
    console.error("Error deleting movie:", error);
    throw error;
  }
};
