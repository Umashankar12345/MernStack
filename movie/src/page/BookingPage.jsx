import React, { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useMovies } from '../context/MovieContext';
import { useBooking } from '../context/BookingContext';
import Booking from '../components/Booking/Booking';
import { ArrowLeft, Loader } from 'lucide-react';

function BookingPage() {
  const { movieId } = useParams();
  const { getMovieById } = useMovies();
  const { initializeBooking } = useBooking();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      setLoading(true);
      try {
        const movieData = getMovieById(parseInt(movieId));
        if (movieData) {
          setMovie(movieData);
          initializeBooking(movieData.id, movieData.title);
        }
      } catch (error) {
        console.error('Error fetching movie:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [movieId, getMovieById, initializeBooking]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <Loader className="w-12 h-12 text-bms-red animate-spin mb-4" />
          <p className="text-gray-600">Loading movie details...</p>
        </div>
      </div>
    );
  }

  if (!movie) {
    return <Navigate to="/movies" />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <button
        onClick={() => window.history.back()}
        className="flex items-center text-gray-600 hover:text-gray-800 mb-6"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Movies
      </button>

      {/* Movie Header */}
      <div className="bg-gradient-to-r from-gray-900 to-black text-white rounded-2xl p-8 mb-8">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-48 h-64 rounded-xl overflow-hidden">
            <img
              src={movie.image}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{movie.title}</h1>
            <div className="flex flex-wrap gap-2 mb-4">
              {movie.genre.map((genre, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm"
                >
                  {genre}
                </span>
              ))}
            </div>
            <p className="text-gray-300 mb-6">{movie.description}</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <div className="text-sm text-gray-300">Rating</div>
                <div className="text-2xl font-bold text-yellow-400">{movie.rating} ⭐</div>
              </div>
              <div>
                <div className="text-sm text-gray-300">Duration</div>
                <div className="text-2xl font-bold">{movie.duration}</div>
              </div>
              <div>
                <div className="text-sm text-gray-300">Language</div>
                <div className="text-xl font-bold">{movie.language}</div>
              </div>
              <div>
                <div className="text-sm text-gray-300">Price</div>
                <div className="text-2xl font-bold text-bms-red">₹{movie.price}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Component */}
      <Booking movie={movie} />
    </div>
  );
}

export default BookingPage;