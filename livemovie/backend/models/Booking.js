import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  movie: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Movie', 
    required: true 
  },
  showtime: { 
    type: String, 
    required: [true, 'Showtime is required']
  },
  seats: [{ 
    type: String, 
    required: [true, 'At least one seat is required'],
    validate: {
      validator: function(seats) {
        return seats.length > 0;
      },
      message: 'Please select at least one seat'
    }
  }],
  totalPrice: { 
    type: Number, 
    required: [true, 'Total price is required'],
    min: 0
  },
  bookingDate: { 
    type: Date, 
    default: Date.now 
  },
  status: {
    type: String,
    enum: ['confirmed', 'cancelled'],
    default: 'confirmed'
  }
}, { 
  timestamps: true 
});

export default mongoose.model('Booking', bookingSchema);