// src/context/MovieContext.jsx
import React, { createContext, useState, useContext } from 'react';
import { getRandomMovies, searchMovies, getMovieById } from '../services/movieService';

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const fetchMovies = async (limit = 8) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getRandomMovies(limit);
      setMovies(data);
      setFilteredMovies(data);
    } catch (err) {
      setError('Failed to fetch movies. Please try again.');
      console.error('Error fetching movies:', err);
    } finally {
      setLoading(false);
    }
  };

  const searchMoviesByQuery = async (query) => {
    if (!query.trim()) {
      setFilteredMovies(movies);
      return;
    }
    
    setLoading(true);
    try {
      const results = await searchMovies(query);
      setFilteredMovies(results);
    } catch (err) {
      setError('Failed to search movies');
      console.error('Error searching movies:', err);
    } finally {
      setLoading(false);
    }
  };

  const filterMoviesByGenre = (genre) => {
    if (genre === 'all') {
      setFilteredMovies(movies);
      return;
    }
    
    const filtered = movies.filter(movie => 
      movie.show.genres?.some(g => g.toLowerCase() === genre.toLowerCase())
    );
    setFilteredMovies(filtered);
  };

  const getMovieByIdFromContext = async (id) => {
    try {
      setLoading(true);
      const movie = await getMovieById(id);
      return movie;
    } catch (err) {
      setError('Failed to fetch movie details');
      console.error('Error fetching movie:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    movies,
    filteredMovies,
    loading,
    error,
    selectedMovie,
    setSelectedMovie,
    fetchMovies,
    searchMoviesByQuery,
    filterMoviesByGenre,
    getMovieById: getMovieByIdFromContext
  };

  return (
    <MovieContext.Provider value={value}>
      {children}
    </MovieContext.Provider>
  );
};

// ✅ CORRECT: Export hook OUTSIDE the Provider function
export const useMovies = () => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error('useMovies must be used within a MovieProvider');
  }
  return context;
};

// ❌ REMOVE: export default MovieContext;