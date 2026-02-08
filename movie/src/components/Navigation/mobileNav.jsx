import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  Home, Film, Tv, Trophy, Calendar, Music, Globe,
  Search, User, Menu, X, ChevronDown
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const location = useLocation()
  const { user } = useAuth()

  const navLinks = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Film, label: 'Movies', path: '/movies' },
    { icon: Tv, label: 'Stream', path: '/stream' },
    { icon: Trophy, label: 'Sports', path: '/sports' },
    { icon: Calendar, label: 'Events', path: '/events' },
    { icon: Music, label: 'Plays', path: '/plays' },
    { icon: Globe, label: 'Activities', path: '/activities' },
  ]

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/'
    }
    return location.pathname.startsWith(path)
  }

  return (
    <>
      {/* Mobile Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-40">
        <div className="flex items-center justify-around px-4 py-2">
          {/* Menu Button */}
          <button
            onClick={() => setIsOpen(true)}
            className="flex flex-col items-center p-2"
          >
            <Menu className="w-6 h-6 text-gray-600" />
            <span className="text-xs mt-1">Menu</span>
          </button>

          {/* Home */}
          <Link
            to="/"
            className="flex flex-col items-center p-2"
          >
            <Home className={`w-6 h-6 ${isActive('/') ? 'text-bms-red' : 'text-gray-600'}`} />
            <span className={`text-xs mt-1 ${isActive('/') ? 'text-bms-red font-medium' : 'text-gray-600'}`}>
              Home
            </span>
          </Link>

          {/* Search */}
          <button
            onClick={() => setShowSearch(true)}
            className="flex flex-col items-center p-2"
          >
            <Search className="w-6 h-6 text-gray-600" />
            <span className="text-xs mt-1">Search</span>
          </button>

          {/* Movies */}
          <Link
            to="/movies"
            className="flex flex-col items-center p-2"
          >
            <Film className={`w-6 h-6 ${isActive('/movies') ? 'text-bms-red' : 'text-gray-600'}`} />
            <span className={`text-xs mt-1 ${isActive('/movies') ? 'text-bms-red font-medium' : 'text-gray-600'}`}>
              Movies
            </span>
          </Link>

          {/* Profile */}
          <Link
            to={user ? '/profile' : '/login'}
            className="flex flex-col items-center p-2"
          >
            <User className={`w-6 h-6 ${isActive('/profile') ? 'text-bms-red' : 'text-gray-600'}`} />
            <span className={`text-xs mt-1 ${isActive('/profile') ? 'text-bms-red font-medium' : 'text-gray-600'}`}>
              {user ? 'Profile' : 'Login'}
            </span>
          </Link>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setIsOpen(false)}>
          <div
            className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-bms-red rounded-md"></div>
                <span className="text-2xl font-bold text-bms-red">bookmyshow</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            {/* User Info */}
            {user && (
              <div className="flex items-center space-x-3 mb-8 p-4 bg-gray-50 rounded-xl">
                <div className="w-12 h-12 bg-bms-red rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">{user.name.charAt(0)}</span>
                </div>
                <div>
                  <p className="font-bold text-lg">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>
            )}

            {/* Navigation Links */}
            <nav className="space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`
                    flex items-center space-x-4 px-4 py-3 rounded-xl transition-colors
                    ${isActive(link.path)
                      ? 'bg-bms-red text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                    }
                  `}
                >
                  <link.icon className="w-5 h-5" />
                  <span className="font-medium">{link.label}</span>
                  <ChevronDown className="w-4 h-4 ml-auto" />
                </Link>
              ))}
            </nav>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-3 mt-6">
              <Link
                to="/profile"
                onClick={() => setIsOpen(false)}
                className="p-4 bg-blue-50 text-blue-600 rounded-xl text-center"
              >
                <div className="font-bold">My Bookings</div>
                <div className="text-sm">View all tickets</div>
              </Link>
              
              <Link
                to="/offers"
                onClick={() => setIsOpen(false)}
                className="p-4 bg-green-50 text-green-600 rounded-xl text-center"
              >
                <div className="font-bold">Offers</div>
                <div className="text-sm">Special deals</div>
              </Link>
            </div>

            {/* Categories */}
            <div className="mt-8">
              <h4 className="font-bold text-gray-800 mb-4">Browse by Category</h4>
              <div className="grid grid-cols-3 gap-2">
                {['Action', 'Comedy', 'Drama', 'Horror', 'Romance', 'Sci-Fi'].map((genre) => (
                  <Link
                    key={genre}
                    to={`/movies?genre=${genre.toLowerCase()}`}
                    onClick={() => setIsOpen(false)}
                    className="p-3 bg-gray-100 text-gray-700 rounded-lg text-center text-sm hover:bg-gray-200"
                  >
                    {genre}
                  </Link>
                ))}
              </div>
            </div>

            {/* Logout Button */}
            {user && (
              <button
                onClick={() => {
                  // Handle logout
                  setIsOpen(false)
                }}
                className="w-full mt-8 py-3 border border-red-600 text-red-600 rounded-xl font-medium hover:bg-red-50"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}

      {/* Search Overlay */}
      {showSearch && (
        <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setShowSearch(false)}>
          <div
            className="absolute top-0 left-0 right-0 bg-white p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center space-x-3">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search movies, events, actors..."
                  className="w-full px-4 py-3 pl-12 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-bms-red"
                  autoFocus
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
              <button
                onClick={() => setShowSearch(false)}
                className="px-4 py-3 text-gray-600"
              >
                Cancel
              </button>
            </div>

            {/* Recent Searches */}
            <div className="mt-4">
              <h4 className="font-bold text-gray-800 mb-2">Recent Searches</h4>
              <div className="space-y-2">
                {['Avengers', 'Spider-Man', 'Comedy Movies', 'Weekend Shows'].map((search) => (
                  <button
                    key={search}
                    className="flex items-center justify-between w-full p-3 hover:bg-gray-100 rounded-lg"
                  >
                    <span className="text-gray-700">{search}</span>
                    <X className="w-4 h-4 text-gray-400" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default MobileNav