using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Intex2.API.Data;

namespace Intex2.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RatingsController : ControllerBase
    {
        private readonly MoviesContext _context;

        public RatingsController(MoviesContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> AddOrUpdateRating([FromBody] MoviesRating rating)
        {
            if (rating.UserId == null || string.IsNullOrEmpty(rating.ShowId) || rating.Rating == null)
            {
                return BadRequest("UserId, ShowId, and Rating are required.");
            }

            // Find the existing rating for the user and movie
            var existingRating = await _context.MoviesRatings
                .FirstOrDefaultAsync(r => r.UserId == rating.UserId && r.ShowId == rating.ShowId);

            if (existingRating != null)
            {
                // Update the rating
                existingRating.Rating = rating.Rating;
                _context.Update(existingRating);
            }
            else
            {
                // Add a new rating if none exists
                await _context.MoviesRatings.AddAsync(rating);
            }

            await _context.SaveChangesAsync();
            return Ok("Rating updated successfully.");
        }
        
        
        [HttpPut("comment")]
        public async Task<IActionResult> AddComment([FromBody] MoviesRating updatedRating)
        {
            var rating = await _context.MoviesRatings
                .FirstOrDefaultAsync(r => r.UserId == updatedRating.UserId && r.ShowId == updatedRating.ShowId);

            if (rating == null)
                return NotFound();

            rating.Comment = updatedRating.Comment;
            await _context.SaveChangesAsync();

            return Ok(rating);
        }
    }
}
