using Intex2.API.Data;
using Microsoft.AspNetCore.Mvc;

namespace Intex2.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RatingsController : ControllerBase
    {
        private MoviesContext _moviesContext;

        // Injecting MoviesContext
        public RatingsController(MoviesContext temp) => _moviesContext = temp;

        // Get all MoviesRatings
        [HttpGet("ratings")]
        public IEnumerable<MoviesRating> GetMoviesRatings()
        {
            return _moviesContext.MoviesRatings;
        }

        // Get all MoviesTitles
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
    }
}


