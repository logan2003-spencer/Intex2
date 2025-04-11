using System;
using System.Collections.Generic;

namespace Intex2.API.Data;

public partial class MoviesRating
{
    public int? UserId { get; set; }

    public string? ShowId { get; set; }

    public int? Rating { get; set; }
    
    public string? Comment { get; set; } // <-- Add this line

}
