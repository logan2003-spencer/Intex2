using Intex2.API.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

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


        private string SanitizeFileName(string? title)
        {
            if (string.IsNullOrWhiteSpace(title)) return "fallback";

            // Remove invalid characters and encode space as %20
            var cleaned = string.Join("", title.Split(Path.GetInvalidFileNameChars()));
            return cleaned.Trim().Replace(" ", "%20");
        }
    }
}
