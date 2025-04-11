import { useEffect, useState } from "react";
import { Movie } from "../types/Movie";
import { deleteMovie, fetchMovies } from "../api/MovieAPI";
import Pagination from "../components/pagination";
import NewMovieForm from "../components/NewMovieForm";
import EditMovieForm from "../components/EditMovieForm";
import "../components/AdminMoviePage.css";

const AdminMoviesPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]); // New state for filtered movies
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const loadMovies = async () => {
      try {
        setLoading(true);
        const data = await fetchMovies(pageSize, pageNum, [], searchTerm);
        setTotalPages(Math.ceil(data.totalNumMovies / pageSize));
        setMovies(data.movies);
        setFilteredMovies(data.movies); // Initially, all movies are shown
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };
    loadMovies();
  }, [pageSize, pageNum]);

  // Handle delete movie
  const handleDelete = async (showId: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this movie?");
    if (!confirmDelete) return;

    try {
      await deleteMovie(showId);
      setMovies(movies.filter((movie) => movie.showId !== showId));
    } catch (error) {
      alert("Failed to delete movie. Please try again.");
    }
  };

  // Handle live search by title
  const handleSearch = (query: string) => {
    setSearchTerm(query);
    if (query) {
      const filtered = movies.filter((movie) =>
        (movie.title?.toLowerCase() ?? "").includes(query.toLowerCase()) // Filtering by title
      );
      setFilteredMovies(filtered); // Set filtered list based on search
    } else {
      setFilteredMovies(movies); // Reset to all movies if search term is cleared
    }
  };

  return (
    <div className="admin-page">
      <h1>Admin Dashboard – Movies</h1>

      {/* Live Search Input */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)} // Trigger search as user types
          style={{
            marginBottom: "16px",
            padding: "8px",
            width: "300px",
            fontSize: "16px",
          }}
        />
      </div>

      {/* Button to toggle New Movie Form */}
      {!showForm && (
        <button className="btn btn-primary" onClick={() => setShowForm(true)}>
          + Add New Movie
        </button>
      )}

      {/* New Movie Form */}
      {showForm && (
        <NewMovieForm
          onSuccess={() => {
            setShowForm(false);
            fetchMovies(pageSize, pageNum, [], searchTerm).then((data) =>
              setMovies(data.movies)
            );
          }}
          onCancel={() => setShowForm(false)}
        />
      )}

      {/* Edit Movie Form */}
      {editingMovie && (
        <EditMovieForm
          movie={editingMovie}
          onSuccess={() => {
            setEditingMovie(null);
            fetchMovies(pageSize, pageNum, [], searchTerm).then((data) =>
              setMovies(data.movies)
            );
          }}
          onCancel={() => setEditingMovie(null)}
        />
      )}

      {/* Movie Table */}
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Director</th>
            <th>Year</th>
            <th>Duration</th>
            <th>Type</th>
            <th>Genres</th>
            <th>Cast</th>
            <th>Country</th>
            <th>Rating</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredMovies.map((movie) => (
            <tr key={movie.showId}>
              <td>{movie.title}</td>
              <td>{movie.director}</td>
              <td>{movie.releaseYear}</td>
              <td>{movie.duration}</td>
              <td>{movie.type}</td>
              <td>
                {Object.keys(movie)
                  .filter(
                    (key) =>
                      ![
                        "showId",
                        "title",
                        "director",
                        "releaseYear",
                        "duration",
                        "type",
                        "description",
                        "cast",
                        "country",
                        "rating",
                      ].includes(key)
                  )
                  .map((key) =>
                    movie[key as keyof Movie] === 1 ? (
                      <span key={key}>{key}, </span>
                    ) : null
                  )}
              </td>
              <td>{movie.cast}</td>
              <td>{movie.country}</td>
              <td>{movie.rating}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => setEditingMovie(movie)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => movie.showId && handleDelete(movie.showId)}
                  style={{ marginLeft: "8px" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <Pagination
        currPage={pageNum}
        totalPages={totalPages}
        pageSize={pageSize}
        onPageChange={setPageNum}
        onPageSizeChange={(newSize) => {
          setPageSize(newSize);
          setPageNum(1);
        }}
      />
    </div>
  );
};

export default AdminMoviesPage;
