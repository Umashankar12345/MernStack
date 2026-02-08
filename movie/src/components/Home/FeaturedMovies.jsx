import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useMovies } from '../../context/MovieContext'
import { Star, Play } from 'lucide-react'

function FeaturedMovies() {
  const { filteredMovies, fetchMovies, loading } = useMovies()

  useEffect(() => {
    fetchMovies(6)
  }, [fetchMovies])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredMovies.slice(0, 6).map((movie) => (
        <Link
          key={movie.show.id}
          to={`/booking/${movie.show.id}`}
          className="movie-card group"
        >
          <div className="relative h-64 overflow-hidden">
            <img
              src={movie.show.image?.medium || 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&fit=crop'}
              alt={movie.show.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div className="absolute top-3 right-3 bg-black/80 text-white px-2 py-1 rounded-md text-sm font-bold flex items-center">
              <Star className="w-3 h-3 mr-1 text-yellow-400" />
              {movie.show.rating?.average || "N/A"}
            </div>

            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                <Play className="w-8 h-8 text-white ml-1" />
              </div>
            </div>
          </div>

          <div className="p-4">
            <h3 className="font-bold text-lg mb-2 line-clamp-1 group-hover:text-bms-red">
              {movie.show.name}
            </h3>
            
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

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">
                {movie.show.premiered?.split("-")[0] || "N/A"}
              </span>
              <button className="px-4 py-2 bg-bms-red text-white rounded-lg text-sm font-medium hover:bg-red-700">
                Book Now
              </button>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default FeaturedMovies