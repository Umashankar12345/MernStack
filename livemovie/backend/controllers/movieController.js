import Movie from '../models/Movie.js';

// Get all movies
export const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    console.error('Get movies error:', error);
    res.status(500).json({ error: 'Error fetching movies' });
  }
};

// Get single movie by ID
export const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    res.json(movie);
  } catch (error) {
    console.error('Get movie error:', error);
    res.status(500).json({ error: 'Error fetching movie' });
  }
};

// Create a movie (for admin)
export const createMovie = async (req, res) => {
  try {
    const movie = new Movie(req.body);
    const savedMovie = await movie.save();
    res.status(201).json(savedMovie);
  } catch (error) {
    console.error('Create movie error:', error);
    res.status(400).json({ error: 'Error creating movie' });
  }
};

// Get random movie (for your feature)
export const getRandomMovie = async (req, res) => {
  try {
    const count = await Movie.countDocuments();
    const random = Math.floor(Math.random() * count);
    const randomMovie = await Movie.findOne().skip(random);
    
    if (!randomMovie) {
      return res.status(404).json({ error: 'No movies available' });
    }
    
    res.json(randomMovie);
  } catch (error) {
    console.error('Random movie error:', error);
    res.status(500).json({ error: 'Error getting random movie' });
  }
};