using Intex2.API.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// ✅ Configure the database connection
builder.Services.AddDbContext<MoviesContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("MoviesConnection")));

// ✅ CORS setup (Option 1: Allow only your frontend)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:5173") // or change to your frontend port
            .AllowAnyMethod()
            .AllowAnyHeader();
    });
});

// Optional: CORS setup (Option 2: Allow all origins - for development only)
// builder.Services.AddCors(options =>
// {
//     options.AddPolicy("AllowAll", policy =>
//     {
//         policy.AllowAnyOrigin()
//               .AllowAnyMethod()
//               .AllowAnyHeader();
//     });
// });

var app = builder.Build();

// ✅ Use CORS policy
app.UseCors("AllowFrontend"); // or "AllowAll" if you picked Option 2

// ✅ Swagger UI in development
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// app.UseHttpsRedirection(); // optional if not using HTTPS

app.UseAuthorization();

app.MapControllers();

app.Run();