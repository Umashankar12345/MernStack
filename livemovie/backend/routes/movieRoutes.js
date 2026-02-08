import express from 'express';
import { 
  getMovies, 
  getMovieById, 
  createMovie, 
  getRandomMovie 
} from '../controllers/movieController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getMovies);
router.get('/random', getRandomMovie);
router.get('/:id', getMovieById);

// Protected routes (for admin - add admin check if needed)
router.post('/', protect, createMovie);

export default router;