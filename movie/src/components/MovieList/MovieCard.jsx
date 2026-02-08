import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, Play } from 'lucide-react';

function MovieCard({ movie }) {
  return (
    <Link
      to={`/booking/${movie.id}`}
      className="movie-card group block"
    >
      <div className="relative h-64 overflow-hidden rounded-t-xl">
        <img
          src={movie.image || 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&fit=crop'}
          alt={movie.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Rating Badge */}
        <div className="absolute top-3 right-3 bg-black/80 text-white px-2 py-1 rounded-md text-sm font-bold flex items-center">
          <Star className="w-3 h-3 mr-1 text-yellow-400" />
          <span>{movie.rating || "N/A"}</span>
        </div>

        {/* Play Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
            <Play className="w-8 h-8 text-white ml-1" />
          </div>
        </div>
      </div>

      <div className="p-4 bg-white rounded-b-xl border-x border-b border-gray-200">
        <h3 className="font-bold text-lg mb-2 line-clamp-1 group-hover:text-bms-red transition-colors">
          {movie.title}
        </h3>
        
        {/* Genres */}
        <div className="flex flex-wrap gap-1 mb-3">
          {movie.genre?.slice(0, 2).map((genre, idx) => (
            <span
              key={idx}
              className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
            >
              {genre}
            </span>
          ))}
        </div>

        {/* Movie Details */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
          <div className="flex items-center">
            <Clock className="w-3 h-3 mr-1" />
            <span>{movie.duration || "120 min"}</span>
          </div>
          <span>{movie.releaseDate?.split("-")[0] || "N/A"}</span>
        </div>

        {/* Book Button */}
        <button className="w-full py-2 bg-bms-red text-white rounded-lg font-medium hover:bg-red-700 transition-colors">
          Book Tickets
        </button>
      </div>
    </Link>
  );
}

export default MovieCard;