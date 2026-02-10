import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MovieList from '../components/MovieList';

const HomePage = ({ onMovieSelect }) => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [showSeatingTypes, setShowSeatingTypes] = useState(false);

  useEffect(() => {
    // ADD ALL YOUR MOVIE DATA HERE
    const sampleMovies = [
      {
        id: 1,
        title: "Avatar: The Way of Water",
        genre: "Sci-Fi",
        duration: "3h 12m",
        rating: 7.8,
        image: "https://media.istockphoto.com/id/2176069023/photo/a-fierce-avtar-of-hindu-god-shiva-with-weapons-mahakal-corridor-hd-images-ujjain-shiva-shri.webp?a=1&b=1&s=612x612&w=0&k=20&c=t8JLd1N5yqJjU3_fyQWjoiXlHFpqjlnbyF6UQqp7Pe0=",
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
        image: "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?w=300&h=450&fit=crop",
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
        image: "https://images.unsplash.com/photo-1497124401559-3e75ec2ed794?w=300&h=450&fit=crop",
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
        image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=300&h=450&fit=crop",
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
        image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=300&h=450&fit=crop",
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
        image: "https://images.unsplash.com/photo-1534008897995-27a23e859048?w=300&h=450&fit=crop",
        description: "Doctor Strange teams up with a mysterious teenage girl.",
        showtimes: ["11:30 AM", "3:30 PM", "7:30 PM"],
        language: "English",
        director: "Sam Raimi"
      },
      {
        id: 7,
        title: "Avengers: Endgame",
        genre: "Action",
        duration: "3h 2m",
        rating: 8.4,
        image: "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?w=300&h=450&fit=crop",
        description: "The Avengers assemble once more to reverse Thanos' actions.",
        showtimes: ["10:00 AM", "2:00 PM", "6:00 PM"],
        language: "English",
        director: "Anthony Russo"
      },
      {
        id: 8,
        title: "Inception",
        genre: "Sci-Fi",
        duration: "2h 28m",
        rating: 8.8,
        image: "https://images.unsplash.com/photo-1505685296765-3a2736de412f?w=300&h=450&fit=crop",
        description: "A thief who steals corporate secrets through dream-sharing technology.",
        showtimes: ["11:00 AM", "4:00 PM", "9:00 PM"],
        language: "English",
        director: "Christopher Nolan"
      },
      {
        id: 9,
        title: "Interstellar",
        genre: "Sci-Fi",
        duration: "2h 49m",
        rating: 8.6,
        image: "https://images.unsplash.com/photo-1517602302552-471fe67acf66?w=300&h=450&fit=crop",
        description: "A team travels through a wormhole to ensure humanity's survival.",
        showtimes: ["12:00 PM", "5:00 PM", "8:30 PM"],
        language: "English",
        director: "Christopher Nolan"
      },
      {
        id: 10,
        title: "Spider-Man: No Way Home",
        genre: "Action",
        duration: "2h 28m",
        rating: 8.2,
        image: "https://images.unsplash.com/photo-1635805737707-575885ab0820?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: "Spider-Man seeks help when his identity is revealed.",
        showtimes: ["10:30 AM", "3:00 PM", "7:00 PM"],
        language: "English",
        director: "Jon Watts"
      },
      {
        id: 11,
        title: "The Batman",
        genre: "Crime",
        duration: "2h 56m",
        rating: 7.9,
        image: "https://images.unsplash.com/photo-1606112219348-204d7d8b94ee?w=300&h=450&fit=crop",
        description: "Batman uncovers corruption in Gotham City.",
        showtimes: ["1:00 PM", "5:30 PM", "9:30 PM"],
        language: "English",
        director: "Matt Reeves"
      },
      {
        id: 12,
        title: "Joker",
        genre: "Drama",
        duration: "2h 2m",
        rating: 8.4,
        image: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=300&h=450&fit=crop",
        description: "A failed comedian descends into madness.",
        showtimes: ["12:30 PM", "6:00 PM", "10:00 PM"],
        language: "English",
        director: "Todd Phillips"
      },
      {
        id: 13,
        title: "KGF Chapter 2",
        genre: "Action",
        duration: "2h 48m",
        rating: 8.3,
        image: "https://images.unsplash.com/photo-1585951237313-1979e4df7385?w=300&h=450&fit=crop",
        description: "Rocky takes control of the KGF mines.",
        showtimes: ["11:00 AM", "3:30 PM", "8:00 PM"],
        language: "Hindi",
        director: "Prashanth Neel"
      },
      {
        id: 14,
        title: "Pushpa: The Rise",
        genre: "Action",
        duration: "2h 59m",
        rating: 7.6,
        image: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=300&h=450&fit=crop",
        description: "A laborer rises through the ranks of red sandalwood smuggling.",
        showtimes: ["10:00 AM", "4:00 PM", "9:00 PM"],
        language: "Telugu",
        director: "Sukumar"
      },
      {
        id: 15,
        title: "RRR",
        genre: "Historical",
        duration: "3h 7m",
        rating: 8.0,
        image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=300&h=450&fit=crop",
        description: "A fictional story about two legendary revolutionaries.",
        showtimes: ["9:30 AM", "2:30 PM", "7:30 PM"],
        language: "Telugu",
        director: "S. S. Rajamouli"
      },
      {
        id: 16,
        title: "Dune",
        genre: "Sci-Fi",
        duration: "2h 35m",
        rating: 8.1,
        image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=300&h=450&fit=crop",
        description: "A noble family becomes embroiled in a war for control of Arrakis.",
        showtimes: ["1:30 PM", "6:30 PM", "10:00 PM"],
        language: "English",
        director: "Denis Villeneuve"
      }
    ];
    
    setMovies(sampleMovies);
  }, []);

  const handleBookNow = (movie) => {
    onMovieSelect(movie);
    navigate('/select-seats');
  };

  // Seating Types for Homepage display
  const seatingTypes = [
    {
      id: 'standard',
      name: "Standard",
      icon: "🪑",
      description: "Regular seating",
      price: "₹200-250",
      color: "bg-blue-100 border-blue-300"
    },
    {
      id: 'recliner',
      name: "Recliner",
      icon: "🛋️",
      description: "Full recline seats",
      price: "₹300-375",
      color: "bg-purple-100 border-purple-300"
    },
    {
      id: 'premium',
      name: "Premium",
      icon: "⭐",
      description: "Extra legroom",
      price: "₹400-500",
      color: "bg-yellow-100 border-yellow-300"
    },
    {
      id: 'couple',
      name: "Couple",
      icon: "💑",
      description: "For two people",
      price: "₹440-550",
      color: "bg-pink-100 border-pink-300"
    },
    {
      id: 'box',
      name: "VIP Box",
      icon: "🎭",
      description: "Private lounge",
      price: "₹600-750",
      color: "bg-green-100 border-green-300"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/20 to-blue-900/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Welcome to <span className="text-red-500">LiveMovie</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Book tickets for the latest movies in just a few clicks!
            </p>
            
            {/* Seating Types Toggle */}
            <div className="mb-12">
              <button
                onClick={() => setShowSeatingTypes(!showSeatingTypes)}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 rounded-lg font-bold text-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 transform hover:scale-105"
              >
                <span className="mr-2">{showSeatingTypes ? 'Hide' : 'View'} Seating Options</span>
                <span>{showSeatingTypes ? '↑' : '↓'}</span>
              </button>
            </div>

            {/* Seating Types Display */}
            {showSeatingTypes && (
              <div className="mb-12 bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
                <h2 className="text-2xl font-bold mb-6 text-center">Choose Your Experience</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  {seatingTypes.map((type) => (
                    <div 
                      key={type.id}
                      className={`${type.color} rounded-xl p-4 border-2 transition-all duration-300 hover:scale-105 cursor-pointer`}
                      onClick={() => {
                        setShowSeatingTypes(false);
                        localStorage.setItem('preferredSeating', type.id);
                      }}
                    >
                      <div className="text-3xl mb-2">{type.icon}</div>
                      <h3 className="font-bold text-gray-800 text-lg">{type.name}</h3>
                      <p className="text-gray-600 text-sm mb-2">{type.description}</p>
                      <div className="text-gray-800 font-bold">{type.price}</div>
                      <div className="text-xs text-gray-500 mt-2">Click to set as preferred</div>
                    </div>
                  ))}
                </div>
                <p className="text-center text-gray-400 mt-4 text-sm">
                  Select your preferred seating type. You can change it during booking.
                </p>
              </div>
            )}

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
                <div className="text-3xl font-bold text-red-400">5+</div>
                <div className="text-gray-300">Seating Types</div>
              </div>
              <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
                <div className="text-3xl font-bold text-red-400">50+</div>
                <div className="text-gray-300">Movies Available</div>
              </div>
              <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
                <div className="text-3xl font-bold text-red-400">24/7</div>
                <div className="text-gray-300">Booking Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Now Showing Section */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Now Showing</h2>
          <div className="text-red-400">
            <span className="animate-pulse">●</span> Live Bookings
          </div>
        </div>
        
        {/* Movie List - Pass all 16 movies */}
        <MovieList movies={movies} onBookNow={handleBookNow} />
        
        {/* Booking Process Info */}
        <div className="mt-16 bg-gray-800/30 rounded-2xl p-8 border border-gray-700">
          <h3 className="text-2xl font-bold mb-6 text-center">How It Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4 text-xl">
                1
              </div>
              <h4 className="font-bold mb-2">Choose Movie</h4>
              <p className="text-gray-400 text-sm">Select from latest releases</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4 text-xl">
                2
              </div>
              <h4 className="font-bold mb-2">Select Seating</h4>
              <p className="text-gray-400 text-sm">Pick from 5 seating types</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4 text-xl">
                3
              </div>
              <h4 className="font-bold mb-2">Choose Seats</h4>
              <p className="text-gray-400 text-sm">Interactive seat map</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4 text-xl">
                4
              </div>
              <h4 className="font-bold mb-2">Confirm & Pay</h4>
              <p className="text-gray-400 text-sm">Secure payment options</p>
            </div>
          </div>
        </div>
        
        {/* Why Choose Us */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold mb-6 text-center">Why Choose LiveMovie?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-gray-700">
              <div className="text-2xl mb-4">🎯</div>
              <h4 className="font-bold text-lg mb-2">Multiple Seating Options</h4>
              <p className="text-gray-400">
                Choose from Standard, Recliner, Premium, Couple, or VIP Box seating for your perfect movie experience.
              </p>
            </div>
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-gray-700">
              <div className="text-2xl mb-4">⚡</div>
              <h4 className="font-bold text-lg mb-2">Instant Confirmation</h4>
              <p className="text-gray-400">
                Get instant e-tickets on your email. No waiting in queues, no printing hassles.
              </p>
            </div>
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-gray-700">
              <div className="text-2xl mb-4">🛡️</div>
              <h4 className="font-bold text-lg mb-2">Safe & Secure</h4>
              <p className="text-gray-400">
                Your data is protected with bank-level security. 100% secure payments.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="border-t border-gray-800 mt-12 pt-8 pb-6">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-400">
          <p className="mb-2">Experience movies like never before with our premium seating options</p>
          <p className="text-sm">© 2024 LiveMovie. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;