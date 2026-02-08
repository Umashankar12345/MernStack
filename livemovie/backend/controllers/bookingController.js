import Booking from '../models/Booking.js';
import Movie from '../models/Movie.js';
import User from '../models/User.js';

// Create a new booking
export const createBooking = async (req, res) => {
  try {
    const { movieId, showtime, seats } = req.body;
    const userId = req.user._id;

    // Get movie details
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    // Check seat availability
    const showtimeObj = movie.showtimes.find(st => st.time === showtime);
    if (!showtimeObj) {
      return res.status(400).json({ error: 'Invalid showtime' });
    }

    if (showtimeObj.availableSeats < seats.length) {
      return res.status(400).json({ error: 'Not enough seats available' });
    }

    // Calculate total price
    const totalPrice = movie.price * seats.length;

    // Create booking
    const booking = new Booking({
      user: userId,
      movie: movieId,
      showtime,
      seats,
      totalPrice
    });

    const savedBooking = await booking.save();

    // Update movie available seats
    showtimeObj.availableSeats -= seats.length;
    await movie.save();

    // Add booking to user
    await User.findByIdAndUpdate(userId, {
      $push: { bookings: savedBooking._id }
    });

    // Populate booking details
    const populatedBooking = await Booking.findById(savedBooking._id)
      .populate('movie', 'title posterUrl duration')
      .populate('user', 'name email');

    res.status(201).json(populatedBooking);
  } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({ error: 'Error creating booking' });
  }
};

// Get user's bookings
export const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate('movie', 'title posterUrl duration price')
      .sort({ bookingDate: -1 });
    
    res.json(bookings);
  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({ error: 'Error fetching bookings' });
  }
};

// Get booking by ID
export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('movie')
      .populate('user', 'name email');
    
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    
    // Check if user owns this booking
    if (booking.user._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Not authorized' });
    }
    
    res.json(booking);
  } catch (error) {
    console.error('Get booking error:', error);
    res.status(500).json({ error: 'Error fetching booking' });
  }
};