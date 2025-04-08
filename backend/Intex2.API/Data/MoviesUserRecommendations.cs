namespace Intex2.API.Data;

public partial class MoviesUserRecommendations
{
    public string? ShowId { get; set; }

    public string? Title { get; set; }

    public int? Score { get; set; }
    
    public int? UserId { get; set; }
    
    public string? SourceShowId { get; set; }
}