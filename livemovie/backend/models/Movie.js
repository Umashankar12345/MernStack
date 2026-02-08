import mongoose from 'mongoose';

const showtimeSchema = new mongoose.Schema({
  time: { 
    type: String, 
    required: true,
    enum: ['10:00 AM', '1:30 PM', '4:00 PM', '7:00 PM', '10:30 PM']
  },
  date: { 
    type: String, 
    required: true,
    default: () => new Date().toISOString().split('T')[0]
  },
  availableSeats: { 
    type: Number, 
    default: 50, 
    min: 0, 
    max: 50 
  }
});

const movieSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: [true, 'Movie title is required'],
    trim: true
  },
  description: { 
    type: String, 
    required: [true, 'Description is required']
  },
  genre: [{ 
    type: String, 
    enum: ['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 'Romance', 'Thriller']
  }],
  duration: { 
    type: Number, 
    required: true,
    min: 60,
    max: 240
  },
  posterUrl: { 
    type: String, 
    default: 'https://via.placeholder.com/300x450.png?text=Movie+Poster'
  },
  price: { 
    type: Number, 
    required: true,
    default: 10,
    min: 5
  },
  showtimes: [showtimeSchema],
  rating: {
    type: Number,
    min: 0,
    max: 10,
    default: 7.5
  }
}, { 
  timestamps: true 
});

export default mongoose.model('Movie', movieSchema);