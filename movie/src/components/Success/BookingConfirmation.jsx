import React from 'react'
import { CheckCircle, Download, Share2, Printer, Mail } from 'lucide-react'
import Ticket from './Ticket'

function BookingConfirmation({ booking, onNewBooking }) {
  if (!booking) return null

  const handleDownload = () => {
    const element = document.createElement('a')
    const text = `
BookMyShow Booking Confirmation
===============================

Booking ID: ${booking.bookingId}
Movie: ${booking.movie.name}
Theater: ${booking.tickets.theater}
Date: ${booking.tickets.date}
Time: ${booking.tickets.time}
Seats: ${booking.tickets.seats}
Amount Paid: ₹${booking.tickets.totalPrice}
Booked by: ${booking.user.name}
Booking Time: ${booking.bookingTime}

Please arrive 30 minutes before showtime.
Carry a valid photo ID.
    `
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text))
    element.setAttribute('download', `ticket-${booking.bookingId}.txt`)
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `My Movie Ticket - ${booking.movie.name}`,
          text: `I booked tickets for ${booking.movie.name} at ${booking.tickets.theater} on ${booking.tickets.date}`,
          url: window.location.href,
        })
      } catch (error) {
        console.log('Error sharing:', error)
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  const handlePrint = () => {
    window.print()
  }

  const handleEmail = () => {
    const subject = `Your Movie Ticket - ${booking.movie.name}`
    const body = `
Dear ${booking.user.name},

Thank you for booking with BookMyShow!

Booking Details:
- Movie: ${booking.movie.name}
- Theater: ${booking.tickets.theater}
- Date: ${booking.tickets.date}
- Time: ${booking.tickets.time}
- Seats: ${booking.tickets.seats}
- Amount: ₹${booking.tickets.totalPrice}
- Booking ID: ${booking.bookingId}

Please arrive 30 minutes before showtime and carry a valid photo ID.

Enjoy your movie!
BookMyShow Team
    `
    
    window.location.href = `mailto:${booking.user.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <div className="space-y-8">
      {/* Success Message */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mb-6">
          <CheckCircle className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Booking Confirmed!</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Your tickets have been booked successfully. Details have been sent to {booking.user.email}
        </p>
        <div className="mt-4 inline-flex items-center space-x-2 bg-green-50 text-green-700 px-4 py-2 rounded-full">
          <span className="font-mono font-bold">{booking.bookingId}</span>
        </div>
      </div>

      {/* Ticket */}
      <Ticket booking={booking} />

      {/* Action Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button
          onClick={handleDownload}
          className="flex flex-col items-center justify-center p-6 bg-white border rounded-2xl hover:bg-gray-50 transition-colors group"
        >
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-blue-200 transition-colors">
            <Download className="w-6 h-6 text-blue-600" />
          </div>
          <span className="font-medium text-gray-800">Download</span>
          <span className="text-sm text-gray-500">Save Ticket</span>
        </button>

        <button
          onClick={handlePrint}
          className="flex flex-col items-center justify-center p-6 bg-white border rounded-2xl hover:bg-gray-50 transition-colors group"
        >
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-purple-200 transition-colors">
            <Printer className="w-6 h-6 text-purple-600" />
          </div>
          <span className="font-medium text-gray-800">Print</span>
          <span className="text-sm text-gray-500">Hard Copy</span>
        </button>

        <button
          onClick={handleShare}
          className="flex flex-col items-center justify-center p-6 bg-white border rounded-2xl hover:bg-gray-50 transition-colors group"
        >
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-green-200 transition-colors">
            <Share2 className="w-6 h-6 text-green-600" />
          </div>
          <span className="font-medium text-gray-800">Share</span>
          <span className="text-sm text-gray-500">With Friends</span>
        </button>

        <button
          onClick={handleEmail}
          className="flex flex-col items-center justify-center p-6 bg-white border rounded-2xl hover:bg-gray-50 transition-colors group"
        >
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-red-200 transition-colors">
            <Mail className="w-6 h-6 text-red-600" />
          </div>
          <span className="font-medium text-gray-800">Email</span>
          <span className="text-sm text-gray-500">Send Again</span>
        </button>
      </div>

      {/* Next Steps */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">What's Next?</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-3">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-bold text-xl">1</span>
            </div>
            <h4 className="font-bold text-gray-800">Save Your Ticket</h4>
            <p className="text-gray-600 text-sm">
              Download or screenshot your ticket. You'll need to show it at the theater.
            </p>
          </div>
          
          <div className="space-y-3">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-green-600 font-bold text-xl">2</span>
            </div>
            <h4 className="font-bold text-gray-800">Arrive Early</h4>
            <p className="text-gray-600 text-sm">
              Reach the theater 30 minutes before showtime for a smooth entry.
            </p>
          </div>
          
          <div className="space-y-3">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="text-purple-600 font-bold text-xl">3</span>
            </div>
            <h4 className="font-bold text-gray-800">Carry ID</h4>
            <p className="text-gray-600 text-sm">
              Bring a valid government-issued photo ID for verification.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={onNewBooking}
          className="flex-1 py-4 bg-bms-red text-white rounded-xl font-bold hover:bg-red-700 transition-colors"
        >
          Book Another Movie
        </button>
        
        <button
          onClick={() => window.location.href = '/profile'}
          className="flex-1 py-4 bg-white border-2 border-bms-red text-bms-red rounded-xl font-bold hover:bg-red-50 transition-colors"
        >
          View All Bookings
        </button>
      </div>

      {/* Contact Support */}
      <div className="text-center">
        <p className="text-gray-600">
          Need help?{' '}
          <a href="mailto:support@bookmyshow.com" className="text-bms-red hover:text-red-700 font-medium">
            Contact Support
          </a>
        </p>
      </div>
    </div>
  )
}

export default BookingConfirmation