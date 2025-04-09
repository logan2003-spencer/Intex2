// MovieDisplay.tsx
// import React from 'react';
// import MovieList from '../MovieList';
import RecommendedMovies from '../RecommendedMovies';
  // Correct import path to MovieList

const RecommendedDisplay = () => {
  return (
    <div>
      <h1>Movie Display</h1>
      {/* MovieList component is rendered here */}
      <RecommendedMovies />
    </div>
  );
};

export default RecommendedDisplay;