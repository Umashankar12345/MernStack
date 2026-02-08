import express from 'express';
import { 
  createBooking, 
  getUserBookings, 
  getBookingById 
} from '../controllers/bookingController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// All booking routes are protected
router.use(protect);

router.post('/', createBooking);
router.get('/my-bookings', getUserBookings);
router.get('/:id', getBookingById);

export default router;