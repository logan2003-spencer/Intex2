import { useEffect, useState } from "react";
import { Movie } from "../types/Movie"; 
import { deleteMovie, fetchMovies } from "../api/MoviesAPI"; 
import Pagination from "../components/pagination";
import NewMovieForm from "../components/NewMovieForm"; 
import EditMovieForm from "../components/EditMovieForm"; 

const AdminMoviesPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const data = await fetchMovies(pageSize, pageNum, []);
        setTotalPages(Math.ceil(data.totalNumMovies / pageSize));
        setMovies(data.movies);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };
    loadMovies();
  }, [pageSize, pageNum]);

  const handleDelete = async (showId: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this movie?"
    );
    if (!confirmDelete) return;

    try {
      await deleteMovie(showId);
      setMovies(movies.filter((movie) => movie.showId !== showId));
    } catch (error) {
      alert("Failed to delete movie. Please try again.");
    }
  };

  if (loading) {
    return <div>Loading movies...</div>;
  }
  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div>
      <h1>Admin - Movies</h1>
      
      {/* "Add New Movie" button moved to the top of the page */}
      {!showForm && (
        <button className="btn btn-primary" onClick={() => setShowForm(true)}>
          Add New Movie
        </button>
      )}

      {showForm && (
        <NewMovieForm
          onSuccess={() => {
            setShowForm(false);
            fetchMovies(pageSize, pageNum, []).then((data) =>
              setMovies(data.movies)
            );
          }}
          onCancel={() => setShowForm(false)}
        />
      )}

      {editingMovie && (
        <EditMovieForm
          movie={editingMovie}
          onSuccess={() => {
            setEditingMovie(null);
            fetchMovies(pageSize, pageNum, []).then((data) =>
              setMovies(data.movies)
            );
          }}
          onCancel={() => setEditingMovie(null)}
        />
      )}

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Director</th>
            <th>Release Year</th>
            <th>Duration</th>
            <th>Type</th>
            <th>Description</th>
            <th>Cast</th>
            <th>Country</th>
            <th>Rating</th>
            {/* Add additional columns for the new fields */}
            <th>Genres</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie.showId}>
              <td>{movie.title}</td>
              <td>{movie.director}</td>
              <td>{movie.releaseYear}</td>
              <td>{movie.duration}</td>
              <td>{movie.type}</td>
              <td>{movie.description}</td>
              <td>{movie.cast}</td>
              <td>{movie.country}</td>
              <td>{movie.rating}</td>
              {/* Render genres (customize as needed) */}
              <td>
                {Object.keys(movie)
                  .filter(
                    (key) =>
                      key !== "showId" &&
                      key !== "title" &&
                      key !== "director" &&
                      key !== "releaseYear" &&
                      key !== "duration" &&
                      key !== "description"
                  )
                  .map((key) =>
                    movie[key as keyof Movie] === 1 ? (
                      <span key={key}>{key}, </span>
                    ) : null
                  )}
              </td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => setEditingMovie(movie)}
                >
                  Edit
                </button>
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() =>
                    movie.showId && handleDelete(movie.showId)
                  }
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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