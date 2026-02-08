import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CheckCircle, Ticket, Download, Share2, Printer, Home } from 'lucide-react';

function SuccessPage() {
  const location = useLocation();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for booking data from navigation state or localStorage
    const bookingData = location.state?.bookingData;
    
    if (bookingData) {
      setBooking(bookingData);
      // Also save to localStorage for persistence
      const bookings = JSON.parse(localStorage.getItem('userBookings') || '[]');
      bookings.push(bookingData);
      localStorage.setItem('userBookings', JSON.stringify(bookings));
    } else {
      // Try to get from localStorage
      const bookings = JSON.parse(localStorage.getItem('userBookings') || '[]');
      if (bookings.length > 0) {
        setBooking(bookings[bookings.length - 1]);
      }
    }
    
    setLoading(false);
  }, [location.state]);

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    if (navigator.share && booking) {
      try {
        await navigator.share({
          title: 'Movie Ticket Booking Confirmation',
          text: `I just booked tickets for ${booking.movie?.name} on BookMyShow!`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <div className="loader"></div>
          <p className="text-gray-600 mt-4">Loading booking confirmation...</p>
        </div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="card p-8 max-w-md mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">No Booking Found</h2>
          <p className="text-gray-600 mb-6">It seems there's no booking information available.</p>
          <Link
            to="/movies"
            className="block w-full py-3 bg-bms-red text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
          >
            Browse Movies
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Success Header */}
      <div className="text-center mb-12">
        <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Booking Confirmed!</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Your tickets have been successfully booked. You'll receive a confirmation email shortly.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Booking Summary */}
        <div className="card mb-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Movie Poster */}
            <div className="md:w-1/3">
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl aspect-[2/3] overflow-hidden">
                {booking.movie?.image ? (
                  <img
                    src={booking.movie.image}
                    alt={booking.movie.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Ticket className="w-20 h-20 text-white opacity-50" />
                  </div>
                )}
              </div>
            </div>

            {/* Booking Details */}
            <div className="md:w-2/3">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">{booking.movie?.name}</h2>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h3 className="font-bold text-gray-700 mb-2">Booking Information</h3>
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <span className="text-gray-600">Booking ID:</span>
                      <span className="font-bold">BMS{Date.now().toString().slice(-8)}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">Date:</span>
                      <span className="font-bold">{new Date().toLocaleDateString()}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">Time:</span>
                      <span className="font-bold">{booking.tickets?.time}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">Theater:</span>
                      <span className="font-bold">{booking.tickets?.theater}</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-gray-700 mb-2">Ticket Details</h3>
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <span className="text-gray-600">Seats:</span>
                      <span className="font-bold">{booking.tickets?.seats} seats</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">Ticket Price:</span>
                      <span className="font-bold">₹{booking.tickets?.ticketPrice}/seat</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">Convenience Fee:</span>
                      <span className="font-bold">₹{booking.tickets?.convenienceFee}</span>
                    </li>
                    <li className="flex justify-between border-t pt-2">
                      <span className="font-bold">Total Amount:</span>
                      <span className="text-2xl font-bold text-bms-red">₹{booking.tickets?.totalPrice}</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* User Info */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="font-bold text-gray-700 mb-3">Ticket Holder Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-600">Name</div>
                    <div className="font-medium">{booking.user?.name}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Email</div>
                    <div className="font-medium">{booking.user?.email}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ticket */}
        <div className="card p-8 mb-8 border-2 border-dashed border-bms-red">
          <div className="text-center mb-6">
            <Ticket className="w-16 h-16 text-bms-red mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-800">Your E-Ticket</h3>
            <p className="text-gray-600">Present this ticket at the theater entrance</p>
          </div>
          
          <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-xl p-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-sm text-gray-600">Movie</div>
                <div className="text-xl font-bold">{booking.movie?.name}</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-gray-600">Date & Time</div>
                <div className="text-xl font-bold">
                  {new Date().toLocaleDateString()} | {booking.tickets?.time}
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm text-gray-600">Seats</div>
                <div className="text-xl font-bold">{booking.tickets?.seats} seats</div>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-300">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm text-gray-600">Theater</div>
                  <div className="font-bold">{booking.tickets?.theater}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600">Booking ID</div>
                  <div className="font-mono font-bold">BMS{Date.now().toString().slice(-8)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
          <button
            onClick={handlePrint}
            className="p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors flex flex-col items-center"
          >
            <Printer className="w-6 h-6 mb-2" />
            <span>Print Ticket</span>
          </button>
          <button
            onClick={() => {/* Download functionality */}}
            className="p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors flex flex-col items-center"
          >
            <Download className="w-6 h-6 mb-2" />
            <span>Download</span>
          </button>
          <button
            onClick={handleShare}
            className="p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors flex flex-col items-center"
          >
            <Share2 className="w-6 h-6 mb-2" />
            <span>Share</span>
          </button>
          <Link
            to="/"
            className="p-4 bg-bms-red text-white rounded-lg hover:bg-red-700 transition-colors flex flex-col items-center"
          >
            <Home className="w-6 h-6 mb-2" />
            <span>Home</span>
          </Link>
        </div>

        {/* Important Information */}
        <div className="card">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Important Information</h3>
          <ul className="space-y-3 text-gray-600">
            <li>• Please arrive at the theater at least 30 minutes before the showtime</li>
            <li>• Carry a valid ID proof along with this e-ticket</li>
            <li>• Tickets are non-refundable and non-transferable</li>
            <li>• Children below 3 years are free (without seat)</li>
            <li>• For any queries, contact our customer support at 1800-123-4567</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SuccessPage;