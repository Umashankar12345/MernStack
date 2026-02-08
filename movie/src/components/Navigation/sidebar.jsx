import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  Home, Film, Tv, Trophy, Calendar, Music, Globe, 
  User, Ticket, Heart, Settings, HelpCircle, LogOut,
  ChevronRight, Star, Clock, TrendingUp
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const { user, logout } = useAuth()

  const mainLinks = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Film, label: 'Movies', path: '/movies' },
    { icon: Tv, label: 'Stream', path: '/stream' },
    { icon: Trophy, label: 'Sports', path: '/sports' },
    { icon: Calendar, label: 'Events', path: '/events' },
    { icon: Music, label: 'Plays', path: '/plays' },
    { icon: Globe, label: 'Activities', path: '/activities' },
  ]

  const userLinks = [
    { icon: User, label: 'Profile', path: '/profile' },
    { icon: Ticket, label: 'My Bookings', path: '/profile?tab=bookings' },
    { icon: Heart, label: 'Watchlist', path: '/profile?tab=watchlist' },
    { icon: Star, label: 'Ratings', path: '/profile?tab=ratings' },
    { icon: Clock, label: 'History', path: '/profile?tab=history' },
  ]

  const otherLinks = [
    { icon: TrendingUp, label: 'Trending', path: '/trending' },
    { icon: Settings, label: 'Settings', path: '/settings' },
    { icon: HelpCircle, label: 'Help & Support', path: '/help' },
  ]

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/'
    }
    return location.pathname.startsWith(path)
  }

  return (
    <>
      {/* Sidebar Toggle Button (Mobile) */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden fixed top-4 left-4 z-40 p-2 bg-white rounded-lg shadow-lg"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside className={`
        fixed md:sticky top-0 left-0 h-screen w-64 bg-white shadow-lg z-50
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        md:translate-x-0
      `}>
        {/* Header */}
        <div className="p-6 border-b">
          <Link to="/" className="flex items-center space-x-2" onClick={() => setIsOpen(false)}>
            <div className="w-8 h-8 bg-bms-red rounded-md"></div>
            <span className="text-2xl font-bold text-bms-red">bookmyshow</span>
          </Link>
          
          {user && (
            <div className="mt-4 flex items-center space-x-3">
              <div className="w-10 h-10 bg-bms-red rounded-full flex items-center justify-center">
                <span className="text-white font-bold">{user.name.charAt(0)}</span>
              </div>
              <div>
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="overflow-y-auto h-[calc(100vh-200px)] p-4">
          {/* Main Links */}
          <div className="mb-8">
            <h3 className="text-xs uppercase text-gray-500 font-semibold tracking-wider mb-4">
              Main Menu
            </h3>
            <nav className="space-y-1">
              {mainLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`
                    flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors
                    ${isActive(link.path)
                      ? 'bg-bms-red text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                    }
                  `}
                >
                  <link.icon className="w-5 h-5" />
                  <span className="font-medium">{link.label}</span>
                </Link>
              ))}
            </nav>
          </div>

          {/* User Links */}
          {user && (
            <div className="mb-8">
              <h3 className="text-xs uppercase text-gray-500 font-semibold tracking-wider mb-4">
                My Account
              </h3>
              <nav className="space-y-1">
                {userLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`
                      flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors
                      ${isActive('/profile')
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-700 hover:bg-gray-100'
                      }
                    `}
                  >
                    <link.icon className="w-5 h-5" />
                    <span className="font-medium">{link.label}</span>
                  </Link>
                ))}
              </nav>
            </div>
          )}

          {/* Other Links */}
          <div className="mb-8">
            <h3 className="text-xs uppercase text-gray-500 font-semibold tracking-wider mb-4">
              More
            </h3>
            <nav className="space-y-1">
              {otherLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <link.icon className="w-5 h-5" />
                  <span className="font-medium">{link.label}</span>
                </Link>
              ))}
            </nav>
          </div>

          {/* Quick Stats */}
          <div className="bg-gray-50 rounded-xl p-4 mb-8">
            <h4 className="font-bold text-gray-800 mb-3">Quick Stats</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Movies Watched</span>
                <span className="font-bold">12</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Upcoming Bookings</span>
                <span className="font-bold text-green-600">3</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Watchlist</span>
                <span className="font-bold">8</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
          {user ? (
            <button
              onClick={() => {
                logout()
                setIsOpen(false)
              }}
              className="flex items-center justify-center space-x-2 w-full py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          ) : (
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="block w-full py-3 bg-bms-red text-white text-center rounded-lg font-medium hover:bg-red-700 transition-colors"
            >
              Sign In
            </Link>
          )}
        </div>

        {/* Close Button (Mobile) */}
        <button
          onClick={() => setIsOpen(false)}
          className="md:hidden absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </aside>
    </>
  )
}

export default Sidebar