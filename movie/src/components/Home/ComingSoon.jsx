import React from 'react'
import { Calendar, Clock } from 'lucide-react'

function ComingSoon() {
  const upcomingMovies = [
    {
      title: "Dune: Part Two",
      releaseDate: "2024-03-01",
      duration: "2h 46m",
      genre: "Sci-Fi, Adventure",
      image: "https://images.unsplash.com/photo-1595769812725-4c6564ca0e71?w=400&fit=crop"
    },
    {
      title: "Deadpool 3",
      releaseDate: "2024-07-26",
      duration: "2h 30m",
      genre: "Action, Comedy",
      image: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&fit=crop"
    },
    {
      title: "Furiosa",
      releaseDate: "2024-05-24",
      duration: "2h 20m",
      genre: "Action, Adventure",
      image: "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?w=400&fit=crop"
    }
  ]

  return (
    <div className="card p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-6">Coming Soon</h3>
      
      <div className="space-y-4">
        {upcomingMovies.map((movie, index) => (
          <div key={index} className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <div className="w-16 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg overflow-hidden flex-shrink-0">
              <img
                src={movie.image}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-gray-800 truncate">{movie.title}</h4>
              <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
                <Calendar className="w-3 h-3" />
                <span>{movie.releaseDate}</span>
                <Clock className="w-3 h-3 ml-2" />
                <span>{movie.duration}</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">{movie.genre}</p>
              
              <div className="mt-2">
                <button className="px-3 py-1 text-xs border border-bms-red text-bms-red rounded-lg hover:bg-red-50 transition-colors">
                  Notify Me
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <button className="w-full mt-6 py-2 text-center text-bms-red font-medium hover:bg-red-50 rounded-lg transition-colors">
        View All Upcoming
      </button>
    </div>
  )
}

export default ComingSoon