using Intex2.API.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Reflection;
using System.Linq;
using System.Reflection;
using System.Collections.Generic;

namespace Intex2.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MoviesController : ControllerBase
    {
        private readonly MoviesContext _moviesContext;

        public MoviesController(MoviesContext context)
        {
            _moviesContext = context;
        }

        // Get all MoviesRatings
        [HttpGet("ratings")]
        public IEnumerable<MoviesRating> GetMoviesRatings()
        {
            return _moviesContext.MoviesRatings;
        }

        // Get all MoviesTitles
        [Authorize]
        [HttpGet("titles")]
        public IEnumerable<MoviesTitle> GetMoviesTitles()
        {
            return _moviesContext.MoviesTitles;
        }

        // Get all MoviesUsers
        [HttpGet("users")]
        public IEnumerable<MoviesUser> GetMoviesUsers()
        {
            return _moviesContext.MoviesUsers;
        }

        [HttpGet("home-page-recommendations")]
        public IActionResult GetMoviesHomePageRecommendations([FromQuery] int user_id)
        {
            var result = new Dictionary<string, List<object>>();

            // Get all rows from homepage_recommendations for this user
            var recommendations = _moviesContext.MoviesHomePageRecommendations
                .Where(r => r.UserId == user_id)
                .ToList();

            if (!recommendations.Any())
            {
                return NotFound("No recommendations found for the given user.");
            }

            // Get the set of titles (for joining)
            var titleSet = recommendations.Select(r => r.Title).ToHashSet();

            // Fetch full movie data
            var moviesRaw = _moviesContext.MoviesTitles
                .Where(m => titleSet.Contains(m.Title))
                .ToList();

            // Join with genre info from the homepage_recommendations table
            var joined = from r in recommendations
                         join m in moviesRaw on r.Title equals m.Title
                         group new
                         {
                             m.ShowId,
                             m.Title,
                             Genre = r.Genre,
                             PosterUrl = $"/posters/{SanitizeFileName(m.Title)}.jpg",
                             m.Director,
                             m.Cast,
                             m.Country,
                             m.ReleaseYear,
                             m.Rating,
                             m.Duration,
                             m.Description
                         }
                         by r.Genre into genreGroup
                         select new
                         {
                             Genre = genreGroup.Key,
                             Movies = genreGroup.Take(15).Cast<object>().ToList()
                         };

            foreach (var group in joined)
            {
                result[group.Genre] = group.Movies;
            }

            return Ok(result);
        }




        // Get MoviesUserRecommendations
        [HttpGet("user-recommendations")]
        public IEnumerable<MoviesUserRecommendations> GetMoviesUserRecommendations()
        {
            return _moviesContext.MoviesUserRecommendations;
        }

        [HttpGet("by-genre")]
        public IActionResult GetMoviesByGenre()
        {
            var genreProperties = typeof(MoviesTitle)
                .GetProperties(BindingFlags.Public | BindingFlags.Instance)
                .Where(p => p.PropertyType == typeof(int?) && p.Name != "ReleaseYear" && p.Name != "ShowId")
                .ToList();

            var result = new Dictionary<string, List<object>>();

            foreach (var genreProp in genreProperties)
            {
                string genreName = genreProp.Name;

                // ✅ Pull movies into memory BEFORE projecting
                var moviesRaw = _moviesContext.MoviesTitles
                    .Where(m => EF.Property<int?>(m, genreName) == 1)
                    .Take(20) // Limit to avoid pulling thousands of records
                    .ToList();

                var movies = moviesRaw
                    .Select(m => new
                    {
                        m.ShowId,
                        m.Title,
                        Genre = genreName,
                        PosterUrl = $"/posters/{SanitizeFileName(m.Title)}.jpg"
                    })
                    .ToList();

                if (movies.Any())
                {
                    result[genreName] = movies.Cast<object>().ToList();
                }
            }

            return Ok(result);
        }

        // private string SanitizeFileName(string? title)
        // {
        //     if (string.IsNullOrWhiteSpace(title)) return "fallback";

            // Remove invalid characters and encode space as %20
        [HttpGet("details/{id}")]
        public IActionResult GetMovieDetails(int id)
        {
            var movie = _moviesContext.MoviesTitles
                .Where(m => m.ShowId == id.ToString())
                .Select(m => new
                {
                    m.ShowId,
                    m.Title,
                    PosterUrl = $"/posters/{SanitizeFileName(m.Title)}.jpg",
                    m.Director,
                    m.Cast,
                    m.Country,
                    m.ReleaseYear,
                    m.Rating,
                    m.Duration,
                    m.Description
                })
                .FirstOrDefault();

            if (movie == null)
            {
                return NotFound();
            }

            return Ok(movie);
        }

        [HttpGet("AllMovies")]
        public IActionResult GetMovies(int pageSize = 10, int pageNum = 1, [FromQuery] List<string>? Type = null)
        {
            var query = _moviesContext.MoviesTitles.AsQueryable();
            if (Type != null && Type.Any())
            {
                query = query.Where(m => Type.Contains(m.Type));
            }
            query = query.OrderBy(m => m.Title);
            var totalNumMovies = query.Count();
            var list = query.Skip(pageSize * (pageNum - 1)).Take(pageSize);
            var returnObject = new
            {
                Movies = list,
                TotalNumMovies = totalNumMovies
            };
            return Ok(returnObject);
        }

        [HttpGet("GetGenres")]
        public IActionResult GetGenres()
        {
            var genres = _moviesContext.MoviesTitles
                .Select(m => m.Type)
                .Distinct()
                .ToList();
            return Ok(genres);
        }

        [HttpPost("AddMovie")]
        public IActionResult AddMovie([FromBody] MoviesTitle newMovie)
        {
            if (newMovie == null)
            {
                return BadRequest("Invalid movie data.");
            }
            var lastShowId = _moviesContext.MoviesTitles.OrderByDescending(m => m.ShowId).FirstOrDefault()?.ShowId;
            string newShowId;
            if (lastShowId != null)
            {
                int lastIdNum = int.Parse(lastShowId.Substring(1));
                int newIdNum = lastIdNum + 1;
                newShowId = $"s{newIdNum}";
            }
            else
            {
                newShowId = "s1";
            }
            newMovie.ShowId = newShowId;
            _moviesContext.MoviesTitles.Add(newMovie);
            _moviesContext.SaveChanges();
            return CreatedAtAction(nameof(GetMovie), new { showId = newMovie.ShowId }, newMovie);
        }

        [HttpPut("Update/{showId}")]
        public IActionResult UpdateMovie(string showId, [FromBody] MoviesTitle updatedMovie)
        {
            var existingMovie = _moviesContext.MoviesTitles.FirstOrDefault(m => m.ShowId == showId);
            if (existingMovie == null)
            {
                return NotFound("Movie not found");
            }

            existingMovie.Title = updatedMovie.Title ?? existingMovie.Title;
            existingMovie.Director = updatedMovie.Director ?? existingMovie.Director;
            existingMovie.ReleaseYear = updatedMovie.ReleaseYear ?? existingMovie.ReleaseYear;
            existingMovie.Description = updatedMovie.Description ?? existingMovie.Description;
            existingMovie.Type = updatedMovie.Type ?? existingMovie.Type;
            existingMovie.Rating = updatedMovie.Rating ?? existingMovie.Rating;
            existingMovie.Duration = updatedMovie.Duration ?? existingMovie.Duration;

            foreach (var property in updatedMovie.GetType().GetProperties())
            {
                if (property.GetValue(updatedMovie) != null)
                {
                    property.SetValue(existingMovie, property.GetValue(updatedMovie));
                }
            }

            _moviesContext.MoviesTitles.Update(existingMovie);
            _moviesContext.SaveChanges();
            return Ok(existingMovie);
        }

        [HttpDelete("Delete/{showId}")]
        public IActionResult DeleteMovie(string showId)
        {
            var movie = _moviesContext.MoviesTitles.FirstOrDefault(m => m.ShowId == showId);
            if (movie == null)
            {
                return NotFound("Movie not found");
            }
            _moviesContext.MoviesTitles.Remove(movie);
            _moviesContext.SaveChanges();
            return Ok("Movie deleted successfully");
        }

        [HttpGet("GetMovie/{showId}")]
        public IActionResult GetMovie(string showId)
        {
            var movie = _moviesContext.MoviesTitles.FirstOrDefault(m => m.ShowId == showId);
            if (movie == null)
            {
                return NotFound("Movie not found");
            }
            return Ok(movie);
        }

        private string SanitizeFileName(string? title)
        {
            if (string.IsNullOrWhiteSpace(title)) return "fallback";
            var cleaned = string.Join("", title.Split(Path.GetInvalidFileNameChars()));
            return cleaned.Trim().Replace(" ", "%20");
        }
    }
}

