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

        // POST or PUT to add or update rating
        [HttpPost]
        public async Task<IActionResult> AddOrUpdateRating([FromBody] MoviesRating rating)
        {
            if (rating.UserId == null || string.IsNullOrEmpty(rating.ShowId) || rating.starRating == null)
            {
                return BadRequest(new { message = "UserId, ShowId, and Rating are required." });
            }
            // Find the existing rating for the user and movie
            var existingRating = await _context.MoviesRatings
                .FirstOrDefaultAsync(r => r.UserId == rating.UserId && r.ShowId == rating.ShowId);
            if (existingRating != null)
            {
                // Update the user rating (stars)
                existingRating.starRating = rating.starRating;
                _context.Update(existingRating);
            }
            else
            {
                // Add a new user rating (stars) if none exists
                await _context.MoviesRatings.AddAsync(rating);
            }
            await _context.SaveChangesAsync();
            return Ok(new { message = "Rating updated successfully", rating = existingRating ?? rating });
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
