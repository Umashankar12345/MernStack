import React from 'react'
import { Play, Download, Share2, Heart } from 'lucide-react'

function StreamingHero() {
  const featuredContent = {
    title: "RUDD BLACK ANACONDA",
    tagline: "A hilarious adventure comes home to you!",
    description: "Join the thrilling adventure of Rudd as he battles the mysterious Black Anaconda in this action-packed comedy that will keep you on the edge of your seat.",
    rating: 8.7,
    duration: "2h 15m",
    genre: ["Action", "Comedy", "Adventure"],
    year: 2024,
    starring: ["John Doe", "Jane Smith", "Robert Johnson"],
    director: "Michael Brown"
  }

  return (
    <div className="relative bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, #f84464 2px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-1000"></div>
      </div>

      <div className="container relative py-12 md:py-20">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left Content - Movie Info */}
          <div className="lg:w-2/3 space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
              <Play className="w-5 h-5" />
              <span className="font-medium">NOW STREAMING</span>
            </div>

            {/* Title */}
            <div>
              <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight">
                {featuredContent.title}
              </h1>
              <p className="text-2xl md:text-3xl text-gray-300 mb-6">
                {featuredContent.tagline}
              </p>
            </div>

            {/* Description */}
            <p className="text-lg text-gray-300 max-w-3xl">
              {featuredContent.description}
            </p>

            {/* Movie Details */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <div className="text-sm text-gray-400">Rating</div>
                <div className="text-2xl font-bold text-yellow-400">
                  {featuredContent.rating} ⭐
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-400">Duration</div>
                <div className="text-2xl font-bold">{featuredContent.duration}</div>
              </div>
              <div>
                <div className="text-sm text-gray-400">Year</div>
                <div className="text-2xl font-bold">{featuredContent.year}</div>
              </div>
              <div>
                <div className="text-sm text-gray-400">Director</div>
                <div className="text-xl font-bold">{featuredContent.director}</div>
              </div>
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-3">
              {featuredContent.genre.map((genre, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full font-medium"
                >
                  {genre}
                </span>
              ))}
            </div>

            {/* Cast */}
            <div>
              <div className="text-sm text-gray-400 mb-2">Starring</div>
              <div className="flex flex-wrap gap-2">
                {featuredContent.starring.map((actor, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-white/5 rounded-lg"
                  >
                    {actor}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button className="px-8 py-3 bg-bms-red text-white rounded-lg font-bold hover:bg-red-700 transition-colors flex items-center justify-center space-x-3">
                <Play className="w-5 h-5" />
                <span>Watch Now</span>
              </button>
              
              <button className="px-8 py-3 bg-white/10 backdrop-blur-sm text-white rounded-lg font-bold hover:bg-white/20 transition-colors flex items-center justify-center space-x-3">
                <Download className="w-5 h-5" />
                <span>Download</span>
              </button>
              
              <div className="flex gap-2">
                <button className="p-3 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
                <button className="p-3 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-colors">
                  <Heart className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Content - Movie Poster */}
          <div className="lg:w-1/3">
            <div className="relative group">
              {/* Main Poster */}
              <div className="relative aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl transform group-hover:scale-105 transition-transform duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-500 to-red-500"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-8xl mb-4">🎬</div>
                    <div className="text-2xl font-bold">NOW STREAMING</div>
                  </div>
                </div>
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-lg rounded-full flex items-center justify-center">
                    <Play className="w-10 h-10 text-white ml-1" />
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-yellow-500/20 rounded-full backdrop-blur-sm"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-500/20 rounded-full backdrop-blur-sm"></div>
              
              {/* Price Tag */}
              <div className="absolute -bottom-4 right-8 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-lg shadow-lg">
                <div className="text-sm">Buy/Rent Online</div>
                <div className="text-2xl font-bold">₹199</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-900 to-transparent"></div>
    </div>
  )
}

export default StreamingHero