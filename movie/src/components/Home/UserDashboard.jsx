import React, { useEffect, useState } from 'react'
// import { useAuth } from '../../context/AuthContext'
import { useAuth } from '../../hooks/useAuth';
import { Ticket, Calendar, Star, History } from 'lucide-react'

function UserDashboard() {
  const { user } = useAuth()
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBookings = () => {
      setLoading(true)
      try {
        const storedBookings = localStorage.getItem('bookings')
        if (storedBookings) {
          const parsedBookings = JSON.parse(storedBookings)
          setBookings(parsedBookings)
        }
      } catch (error) {
        console.error('Error fetching bookings:', error)
      } finally {
        setLoading(false)
      }
    }

    if (user) {
      fetchBookings()
    }
  }, [user])

  if (!user) {
    return (
      <div className="card p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Welcome to BookMyShow</h3>
        <p className="text-gray-600 mb-4">Sign in to view your bookings and get personalized recommendations.</p>
        <a
          href="/login"
          className="block w-full py-3 bg-bms-red text-white text-center rounded-lg font-medium hover:bg-red-700 transition-colors"
        >
          Sign In
        </a>
      </div>
    )
  }

  const upcomingBookings = bookings.filter(booking => 
    new Date(booking.tickets.date) >= new Date()
  ).slice(0, 2)

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800">Your Dashboard</h3>
        <div className="w-8 h-8 bg-bms-red rounded-full flex items-center justify-center">
          <span className="text-white font-bold">{user.name.charAt(0)}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <Ticket className="w-5 h-5 text-blue-600" />
            <span className="text-2xl font-bold text-blue-600">{bookings.length}</span>
          </div>
          <p className="text-sm text-gray-600 mt-2">Total Bookings</p>
        </div>

        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <Calendar className="w-5 h-5 text-green-600" />
            <span className="text-2xl font-bold text-green-600">{upcomingBookings.length}</span>
          </div>
          <p className="text-sm text-gray-600 mt-2">Upcoming</p>
        </div>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2].map((i) => (
            <div key={i} className="h-12 bg-gray-200 animate-shimmer rounded"></div>
          ))}
        </div>
      ) : upcomingBookings.length > 0 ? (
        <div className="space-y-3">
          <h4 className="font-medium text-gray-700 mb-2">Upcoming Bookings</h4>
          {upcomingBookings.map((booking, index) => (
            <div key={index} className="border rounded-lg p-3 hover:bg-gray-50 transition-colors">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-sm truncate">{booking.movie.name}</p>
                  <p className="text-xs text-gray-500">{booking.tickets.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-bms-red">₹{booking.tickets.totalPrice}</p>
                  <p className="text-xs text-gray-500">{booking.tickets.seats} seats</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-4">
          <History className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-600">No upcoming bookings</p>
          <a
            href="/movies"
            className="inline-block mt-3 text-sm text-bms-red hover:text-red-700"
          >
            Browse Movies
          </a>
        </div>
      )}

      <div className="mt-6 pt-6 border-t">
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Member Since</span>
          <span className="font-medium">{new Date(user.createdAt).getFullYear()}</span>
        </div>
        
        <a
          href="/profile"
          className="block w-full mt-4 py-2 text-center border border-bms-red text-bms-red rounded-lg font-medium hover:bg-red-50 transition-colors"
        >
          View Profile
        </a>
      </div>
    </div>
  )
}

export default UserDashboard;