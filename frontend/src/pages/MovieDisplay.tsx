// MovieDisplay.tsx
// import React from 'react';
import MovieList from '../MovieList';
  // Correct import path to MovieList

const MovieDisplay = () => {
  return (
    <div>
      <h1>Movie Display</h1>
      {/* MovieList component is rendered here */}
      <MovieList />
    </div>
  );
};

export default MovieDisplay;