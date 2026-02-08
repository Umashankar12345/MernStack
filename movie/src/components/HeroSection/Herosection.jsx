import React from 'react'
import { Play, Star, Calendar } from 'lucide-react'

function HeroSection() {
  const featuredMovies = [
    {
      title: "Spider-Man: No Way Home",
      rating: 8.5,
      genre: "Action, Adventure",
      duration: "2h 28m",
      image: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=800&auto=format&fit=crop"
    },
    {
      title: "Avatar: The Way of Water",
      rating: 7.9,
      genre: "Sci-Fi, Adventure",
      duration: "3h 12m",
      image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w-800&auto=format&fit=crop"
    },
    {
      title: "Top Gun: Maverick",
      rating: 8.3,
      genre: "Action, Drama",
      duration: "2h 10m",
      image: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w-800&auto=format&fit=crop"
    }
  ]

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-gray-900 to-black">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="container relative py-12 md:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white">
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Calendar className="w-5 h-5" />
              <span className="font-medium">NOW SHOWING</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Book Your <span className="text-bms-red">Movie Tickets</span> Online
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 max-w-2xl">
              Discover the latest movies, book tickets in advance, and enjoy exclusive offers. 
              Your perfect movie experience starts here.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-3 bg-bms-red text-white rounded-lg font-bold hover:bg-red-700 transition-colors flex items-center justify-center">
                <Play className="w-5 h-5 mr-2" />
                Book Now
              </button>
              <button className="px-8 py-3 bg-white/10 backdrop-blur-sm text-white rounded-lg font-bold hover:bg-white/20 transition-colors">
                Browse Movies
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12">
              <div>
                <div className="text-3xl font-bold text-bms-red">10K+</div>
                <div className="text-gray-400">Movies</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-bms-red">50K+</div>
                <div className="text-gray-400">Happy Customers</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-bms-red">100+</div>
                <div className="text-gray-400">Cities</div>
              </div>
            </div>
          </div>

          {/* Right Content - Movie Cards */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-6">
              {featuredMovies.map((movie, index) => (
                <div
                  key={index}
                  className={`bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden transform transition-all duration-300 hover:scale-105 ${
                    index === 1 ? 'col-span-2' : ''
                  }`}
                >
                  <div className="relative h-48 md:h-56 overflow-hidden">
                    <img
                      src={movie.image}
                      alt={movie.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                    <div className="absolute top-4 right-4">
                      <div className="flex items-center bg-black/80 text-white px-2 py-1 rounded-md">
                        <Star className="w-4 h-4 text-yellow-400 mr-1" />
                        <span className="font-bold">{movie.rating}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-bold text-white text-lg mb-2 line-clamp-1">
                      {movie.title}
                    </h3>
                    <div className="flex items-center justify-between text-sm text-gray-300">
                      <span>{movie.genre}</span>
                      <span>{movie.duration}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-bms-red rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
          </div>
        </div>
      </div>

      {/* Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
                opacity=".25" className="fill-current text-gray-900"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" 
                opacity=".5" className="fill-current text-gray-900"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" 
                className="fill-current text-gray-900"></path>
        </svg>
      </div>
    </div>
  )
}

export default HeroSection