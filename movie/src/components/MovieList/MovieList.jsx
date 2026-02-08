import React from 'react'
import { Link } from 'react-router-dom'
import { useMovies } from '../../context/MovieContext'
import { Star, Clock, Play } from 'lucide-react'

function MovieList() {
  const { filteredMovies, loading } = useMovies()

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} className="movie-card">
            <div className="h-64 bg-gray-200 animate-shimmer rounded-t-xl"></div>
            <div className="p-4">
              <div className="h-6 bg-gray-200 animate-shimmer rounded mb-2"></div>
              <div className="h-4 bg-gray-200 animate-shimmer rounded w-2/3"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (filteredMovies.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">🎬</div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">No movies found</h3>
        <p className="text-gray-600">Try adjusting your search or filter</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredMovies.map((movie) => (
        <Link
          key={movie.show.id}
          to={`/booking/${movie.show.id}`}
          className="movie-card group"
        >
          {/* Movie Poster */}
          <div className="relative h-64 overflow-hidden">
            <img
              src={movie.show.image?.medium || 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&fit=crop'}
              alt={movie.show.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* Rating Badge */}
            <div className="absolute top-3 right-3 bg-black/80 text-white px-2 py-1 rounded-md text-sm font-bold flex items-center">
              <Star className="w-3 h-3 mr-1 text-yellow-400" />
              {movie.show.rating?.average || "N/A"}
            </div>

            {/* Play Button */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                <Play className="w-8 h-8 text-white ml-1" />
              </div>
            </div>
          </div>

          {/* Movie Info */}
          <div className="p-4">
            <h3 className="font-bold text-lg mb-2 line-clamp-1 group-hover:text-bms-red transition-colors">
              {movie.show.name}
            </h3>
            
            {/* Genres */}
            <div className="flex flex-wrap gap-1 mb-3">
              {movie.show.genres?.slice(0, 2).map((genre, idx) => (
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
                <span>{movie.show.runtime || "120"} min</span>
              </div>
              <span>{movie.show.premiered?.split("-")[0] || "N/A"}</span>
            </div>

            {/* Book Button */}
            <button className="w-full py-2 bg-bms-red text-white rounded-lg font-medium hover:bg-red-700 transition-colors">
              Book Tickets
            </button>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default MovieList