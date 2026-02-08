import React from 'react'
import { Ticket as TicketIcon, Calendar, Clock, MapPin, Users, Barcode } from 'lucide-react'

function Ticket({ booking }) {
  if (!booking) return null

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-IN', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  const formatTime = (timeString) => {
    return timeString // Add formatting if needed
  }

  return (
    <div className="max-w-md mx-auto">
      {/* Ticket Design */}
      <div className="relative bg-white rounded-3xl overflow-hidden shadow-2xl">
        {/* Ticket Header */}
        <div className="bg-gradient-to-r from-bms-red to-red-600 text-white p-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-sm font-medium opacity-90">Booking Confirmed</div>
              <h2 className="text-2xl font-bold">{booking.movie.name}</h2>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">₹{booking.tickets.totalPrice}</div>
              <div className="text-sm opacity-90">Paid</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              <span>{formatDate(booking.tickets.date)}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              <span>{formatTime(booking.tickets.time)}</span>
            </div>
          </div>
        </div>

        {/* Ticket Body */}
        <div className="p-8">
          {/* Movie Info */}
          <div className="flex items-start space-x-6 mb-8">
            <div className="w-24 h-32 bg-gradient-to-br from-gray-300 to-gray-400 rounded-xl overflow-hidden flex-shrink-0">
              {booking.movie.image && (
                <img
                  src={booking.movie.image}
                  alt={booking.movie.name}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-800 mb-2">{booking.movie.name}</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {booking.movie.genres?.map((genre, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Details */}
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span className="text-sm">Theater</span>
                </div>
                <div className="font-bold text-gray-800">{booking.tickets.theater}</div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center text-gray-600">
                  <Users className="w-4 h-4 mr-2" />
                  <span className="text-sm">Seats</span>
                </div>
                <div className="font-bold text-gray-800">{booking.tickets.seats} seats</div>
              </div>
            </div>

            {/* Barcode */}
            <div className="pt-8 border-t">
              <div className="text-center">
                <div className="mb-4">
                  <Barcode className="w-8 h-8 text-gray-400 mx-auto" />
                </div>
                <div className="w-full h-16 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 rounded-lg mb-4"></div>
                <div className="font-mono font-bold text-gray-800">{booking.bookingId}</div>
                <div className="text-sm text-gray-500 mt-2">Booking Reference</div>
              </div>
            </div>
          </div>
        </div>

        {/* Ticket Footer */}
        <div className="bg-gray-50 p-6 border-t">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500">Booked by</div>
              <div className="font-bold">{booking.user.name}</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Booking Time</div>
              <div className="font-bold">{booking.bookingTime}</div>
            </div>
          </div>
        </div>

        {/* Perforation Lines */}
        <div className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2">
          <div className="flex items-center justify-between px-8">
            <div className="w-6 h-6 bg-gray-100 rounded-full border-4 border-white"></div>
            <div className="flex-1 border-t-2 border-dashed border-gray-300"></div>
            <div className="w-6 h-6 bg-gray-100 rounded-full border-4 border-white"></div>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-8 p-6 bg-yellow-50 rounded-2xl border border-yellow-200">
        <h4 className="font-bold text-gray-800 mb-3">🎫 Ticket Instructions</h4>
        <ul className="space-y-2 text-sm text-gray-600">
          <li>• Present this ticket at the theater entrance</li>
          <li>• Arrive 30 minutes before showtime</li>
          <li>• Carry a valid photo ID</li>
          <li>• No refunds 30 minutes before showtime</li>
          <li>• Seats are non-transferable</li>
        </ul>
      </div>
    </div>
  )
}

export default Ticket