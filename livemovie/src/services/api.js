// Mock API service for frontend only
const movies = [
  {
    id: 1,
    title: "Avatar: The Way of Water",
    genre: "Sci-Fi",
    duration: "3h 12m",
    rating: 7.8,
    poster: "https://images.unsplash.com/photo-1489599809516-9827b6d1cf13?w=300&h=450&fit=crop",
    description: "Jake Sully lives with his newfound family formed on the extrasolar moon Pandora.",
    showtimes: ["10:00 AM", "2:00 PM", "6:00 PM", "10:00 PM"],
    language: "English",
    director: "James Cameron"
  },
  {
    id: 2,
    title: "Spider-Man: No Way Home",
    genre: "Action",
    duration: "2h 28m",
    rating: 8.3,
    poster: "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?w=300&h=450&fit=crop",
    description: "Peter Parker's secret identity is revealed to the entire world.",
    showtimes: ["11:00 AM", "3:00 PM", "7:00 PM"],
    language: "English",
    director: "Jon Watts"
  },
  {
    id: 3,
    title: "The Batman",
    genre: "Action",
    duration: "2h 56m",
    rating: 7.9,
    poster: "https://images.unsplash.com/photo-1497124401559-3e75ec2ed794?w=300&h=450&fit=crop",
    description: "Batman ventures into Gotham City's underworld.",
    showtimes: ["12:00 PM", "4:00 PM", "8:00 PM"],
    language: "English",
    director: "Matt Reeves"
  },
  {
    id: 4,
    title: "Top Gun: Maverick",
    genre: "Action",
    duration: "2h 10m",
    rating: 8.4,
    poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=300&h=450&fit=crop",
    description: "After thirty years, Maverick is still pushing the envelope.",
    showtimes: ["1:00 PM", "5:00 PM", "9:00 PM"],
    language: "English",
    director: "Joseph Kosinski"
  },
  {
    id: 5,
    title: "Jurassic World Dominion",
    genre: "Adventure",
    duration: "2h 27m",
    rating: 5.7,
    poster: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=300&h=450&fit=crop",
    description: "Dinosaurs now live and hunt alongside humans all over the world.",
    showtimes: ["10:30 AM", "2:30 PM", "6:30 PM"],
    language: "English",
    director: "Colin Trevorrow"
  },
  {
    id: 6,
    title: "Doctor Strange 2",
    genre: "Fantasy",
    duration: "2h 6m",
    rating: 6.9,
    poster: "https://images.unsplash.com/photo-1534008897995-27a23e859048?w=300&h=450&fit=crop",
    description: "Doctor Strange teams up with a mysterious teenage girl.",
    showtimes: ["11:30 AM", "3:30 PM", "7:30 PM"],
    language: "English",
    director: "Sam Raimi"
  }
];

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API functions
export const movieAPI = {
  // Get all movies
  getAllMovies: async () => {
    await delay(500); // Simulate network delay
    return { data: movies, status: 200 };
  },

  // Get movie by ID
  getMovieById: async (id) => {
    await delay(300);
    const movie = movies.find(m => m.id === parseInt(id));
    return movie 
      ? { data: movie, status: 200 }
      : { data: null, status: 404, error: "Movie not found" };
  },

  // Search movies
  searchMovies: async (query) => {
    await delay(400);
    const results = movies.filter(movie => 
      movie.title.toLowerCase().includes(query.toLowerCase()) ||
      movie.genre.toLowerCase().includes(query.toLowerCase()) ||
      movie.director.toLowerCase().includes(query.toLowerCase())
    );
    return { data: results, status: 200 };
  },

  // Get showtimes for a movie
  getShowtimes: async (movieId) => {
    await delay(300);
    const movie = movies.find(m => m.id === parseInt(movieId));
    return movie 
      ? { data: movie.showtimes, status: 200 }
      : { data: [], status: 404 };
  },

  // Check seat availability
  checkSeatAvailability: async (movieId, showtime) => {
    await delay(400);
    // Mock seat data
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const seats = [];
    
    rows.forEach(row => {
      for (let i = 1; i <= 10; i++) {
        const seatId = `${row}${i}`;
        // Randomly mark some seats as booked (30% chance)
        const isBooked = Math.random() < 0.3;
        seats.push({
          id: seatId,
          row: row,
          number: i,
          isAvailable: !isBooked,
          price: row === 'A' || row === 'B' ? 250 : 200
        });
      }
    });
    
    return { 
      data: { 
        movieId, 
        showtime, 
        seats,
        totalSeats: 80,
        availableSeats: seats.filter(s => s.isAvailable).length
      }, 
      status: 200 
    };
  },

  // Book tickets
  bookTickets: async (bookingData) => {
    await delay(800); // Simulate payment processing
    
    // Generate a random booking ID
    const bookingId = `BK${Date.now()}${Math.floor(Math.random() * 1000)}`;
    
    return {
      data: {
        success: true,
        bookingId,
        message: "Booking confirmed successfully",
        ...bookingData,
        bookingDate: new Date().toISOString(),
        qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${bookingId}`
      },
      status: 201
    };
  },

  // Get booking history
  getBookingHistory: async (userId) => {
    await delay(600);
    
    // Mock booking history
    const history = [
      {
        id: 1,
        bookingId: "BK123456",
        movie: "Spider-Man: No Way Home",
        movieId: 2,
        showtime: "6:00 PM",
        seats: ["A1", "A2"],
        totalAmount: 400,
        bookingDate: "2024-01-15",
        status: "confirmed"
      },
      {
        id: 2,
        bookingId: "BK123457",
        movie: "The Batman",
        movieId: 3,
        showtime: "8:00 PM",
        seats: ["B3", "B4"],
        totalAmount: 400,
        bookingDate: "2024-01-10",
        status: "confirmed"
      },
      {
        id: 3,
        bookingId: "BK123458",
        movie: "Avatar: The Way of Water",
        movieId: 1,
        showtime: "2:00 PM",
        seats: ["C5"],
        totalAmount: 200,
        bookingDate: "2024-01-05",
        status: "confirmed"
      }
    ];
    
    return { data: history, status: 200 };
  },

  // Cancel booking
  cancelBooking: async (bookingId) => {
    await delay(500);
    
    return {
      data: {
        success: true,
        message: `Booking ${bookingId} cancelled successfully`,
        refundAmount: 400,
        refundStatus: "processed"
      },
      status: 200
    };
  }
};

// Theater information
export const theaterAPI = {
  getAllTheaters: async () => {
    await delay(500);
    
    return {
      data: [
        {
          id: 1,
          name: "PVR Cinemas",
          location: "Connaught Place, Delhi",
          screens: 8,
          facilities: ["Dolby Atmos", "IMAX", "Food Court", "Parking"],
          distance: "2.5 km"
        },
        {
          id: 2,
          name: "INOX",
          location: "Saket, Delhi",
          screens: 6,
          facilities: ["Dolby 7.1", "3D", "Cafe", "Valet Parking"],
          distance: "5.1 km"
        },
        {
          id: 3,
          name: "Cinepolis",
          location: "Rajouri Garden, Delhi",
          screens: 4,
          facilities: ["4DX", "VIP Lounge", "Restaurant", "Kids Zone"],
          distance: "8.3 km"
        }
      ],
      status: 200
    };
  }
};

// Export default for easy imports
export default movieAPI;