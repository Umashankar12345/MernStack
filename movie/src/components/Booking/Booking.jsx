import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBooking } from '../../context/BookingContext'
import { Calendar, Clock, Users, CreditCard, MapPin, Ticket } from 'lucide-react'

function Booking({ movie }) {
  const [step, setStep] = useState(1)
  const [seats, setSeats] = useState(1)
  const [date, setDate] = useState('')
  const [time, setTime] = useState('18:00')
  const [theater, setTheater] = useState('PVR Cinemas, Jalandhar')
  const [paymentMethod, setPaymentMethod] = useState('credit')
  const [loading, setLoading] = useState(false)

  const { saveBooking, setCurrentBooking } = useBooking()
  const navigate = useNavigate()

  const ticketPrice = 250
  const convenienceFee = 42
  const totalPrice = (seats * ticketPrice + convenienceFee)

  const theaters = [
    'PVR Cinemas, Jalandhar',
    'INOX, Jalandhar',
    'Cinepolis, Jalandhar',
    'Wave Cinemas, Jalandhar'
  ]

  const showTimes = ['14:00', '16:00', '18:00', '20:00', '22:00']

  const handleBooking = async () => {
    if (!date) {
      alert('Please select a date')
      return
    }

    setLoading(true)
    
    try {
      // Get user from correct localStorage key
      const userJson = localStorage.getItem('bookmyshow_user')
      if (!userJson) {
        alert('Please login to continue with booking')
        navigate('/login')
        return
      }
      const user = JSON.parse(userJson)
      
      const bookingData = {
        movie: {
          name: movie.name,
          image: movie.image?.medium || movie.image?.original,
          rating: movie.rating?.average || 'N/A',
          genres: movie.genres || [],
        },
        user: {
          name: user.name,
          email: user.email,
        },
        tickets: {
          seats,
          date,
          time,
          theater,
          ticketPrice,
          convenienceFee,
          totalPrice,
        },
        paymentMethod,
      }

      const savedBooking = saveBooking(bookingData)
      setCurrentBooking(savedBooking)
      
      navigate('/success', { state: { bookingData: savedBooking } })
    } catch (error) {
      console.error('Booking error:', error)
      alert('Booking failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Select Theater</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {theaters.map((t) => (
                <div
                  key={t}
                  onClick={() => setTheater(t)}
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    theater === t
                      ? 'border-bms-red bg-red-50'
                      : 'border-gray-300 hover:border-bms-red'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-gray-500 mt-1" />
                    <div>
                      <div className="font-medium">{t}</div>
                      <div className="text-sm text-gray-500 mt-1">Standard | ₹250 per ticket</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-between pt-6">
              <button
                onClick={() => navigate('/movies')}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => setStep(2)}
                className="btn-primary"
              >
                Next: Select Date & Time
              </button>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Select Date & Time</h3>
            
            <div>
              <label className="flex items-center text-lg font-semibold mb-4">
                <Calendar className="w-5 h-5 mr-2 text-bms-red" />
                Select Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="input-field"
                required
              />
            </div>

            <div>
              <label className="flex items-center text-lg font-semibold mb-4">
                <Clock className="w-5 h-5 mr-2 text-bms-red" />
                Select Show Time
              </label>
              <div className="grid grid-cols-3 gap-3">
                {showTimes.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTime(t)}
                    className={`p-4 border rounded-lg transition-all ${
                      time === t
                        ? 'bg-bms-red text-white border-bms-red'
                        : 'border-gray-300 hover:border-bms-red'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-between pt-6">
              <button
                onClick={() => setStep(1)}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="btn-primary"
                disabled={!date}
              >
                Next: Select Seats
              </button>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Select Number of Seats</h3>
            
            <div className="bg-gray-50 rounded-xl p-8">
              <div className="flex items-center justify-between max-w-md mx-auto">
                <button
                  onClick={() => setSeats(Math.max(1, seats - 1))}
                  className="w-12 h-12 bg-white border rounded-lg text-2xl font-bold hover:bg-gray-50 transition-colors"
                >
                  -
                </button>
                
                <div className="text-center">
                  <div className="text-6xl font-bold text-bms-red">{seats}</div>
                  <div className="text-gray-500 mt-2">Seats</div>
                </div>
                
                <button
                  onClick={() => setSeats(Math.min(10, seats + 1))}
                  className="w-12 h-12 bg-white border rounded-lg text-2xl font-bold hover:bg-gray-50 transition-colors"
                >
                  +
                </button>
              </div>
              
              <div className="mt-8 text-center">
                <div className="text-2xl font-bold">₹{ticketPrice} per seat</div>
                <div className="text-gray-500">Standard seating</div>
              </div>
            </div>

            {/* Seat Layout Preview */}
            <div className="mt-8">
              <div className="text-center mb-4">
                <div className="w-full h-4 bg-gray-800 rounded-t-lg"></div>
                <p className="text-sm text-gray-500 mt-2">Screen</p>
              </div>
              
              <div className="grid grid-cols-10 gap-2 max-w-md mx-auto">
                {Array.from({ length: 50 }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-8 h-8 rounded ${
                      i < seats ? 'bg-bms-red' : 'bg-gray-200'
                    }`}
                  ></div>
                ))}
              </div>
              
              <div className="flex justify-center space-x-4 mt-4">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-bms-red rounded mr-2"></div>
                  <span className="text-sm">Selected</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-gray-200 rounded mr-2"></div>
                  <span className="text-sm">Available</span>
                </div>
              </div>
            </div>

            <div className="flex justify-between pt-6">
              <button
                onClick={() => setStep(2)}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Back
              </button>
              <button
                onClick={() => setStep(4)}
                className="btn-primary"
              >
                Next: Payment
              </button>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Select Payment Method</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { id: 'credit', label: 'Credit Card', icon: '💳' },
                { id: 'debit', label: 'Debit Card', icon: '🏦' },
                { id: 'upi', label: 'UPI', icon: '📱' },
                { id: 'netbanking', label: 'Net Banking', icon: '🌐' }
              ].map((method) => (
                <div
                  key={method.id}
                  onClick={() => setPaymentMethod(method.id)}
                  className={`border rounded-lg p-4 cursor-pointer text-center transition-all ${
                    paymentMethod === method.id
                      ? 'border-bms-red bg-red-50'
                      : 'border-gray-300 hover:border-bms-red'
                  }`}
                >
                  <div className="text-2xl mb-2">{method.icon}</div>
                  <div className="font-medium">{method.label}</div>
                </div>
              ))}
            </div>

            {/* Price Summary */}
            <div className="bg-gray-50 rounded-xl p-6 mt-8">
              <h4 className="text-lg font-bold mb-4">Price Summary</h4>
              
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b">
                  <span>Tickets ({seats} × ₹{ticketPrice})</span>
                  <span className="font-semibold">₹{seats * ticketPrice}</span>
                </div>
                
                <div className="flex justify-between py-2 border-b">
                  <span>Convenience Fee</span>
                  <span className="font-semibold">₹{convenienceFee}</span>
                </div>
                
                <div className="flex justify-between py-2 pt-4">
                  <span className="text-xl font-bold">Total Amount</span>
                  <span className="text-2xl font-bold text-bms-red">₹{totalPrice}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-between pt-6">
              <button
                onClick={() => setStep(3)}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Back
              </button>
              <button
                onClick={handleBooking}
                disabled={loading}
                className="btn-primary flex items-center justify-center min-w-32"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <Ticket className="w-5 h-5 mr-2" />
                    Pay ₹{totalPrice}
                  </>
                )}
              </button>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {['Theater', 'Date & Time', 'Seats', 'Payment'].map((label, index) => (
            <div key={label} className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                  step > index + 1
                    ? 'bg-green-500 text-white'
                    : step === index + 1
                    ? 'bg-bms-red text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {step > index + 1 ? '✓' : index + 1}
              </div>
              <span className={`text-sm ${
                step === index + 1 ? 'font-bold text-bms-red' : 'text-gray-600'
              }`}>
                {label}
              </span>
            </div>
          ))}
        </div>
        
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-bms-red transition-all duration-300"
            style={{ width: `${(step - 1) * 33.33}%` }}
          ></div>
        </div>
      </div>

      {/* Step Content */}
      <div className="card p-8">
        <div className="flex items-start space-x-6 mb-8">
          <img
            src={movie.image?.medium || movie.image?.original || 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&fit=crop'}
            alt={movie.name}
            className="w-32 h-48 object-cover rounded-lg"
          />
          
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{movie.name}</h2>
            <div className="flex flex-wrap gap-2 mb-3">
              {movie.genres?.map((genre, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
                >
                  {genre}
                </span>
              ))}
            </div>
            <p className="text-gray-600">{movie.summary?.replace(/<[^>]*>/g, '').substring(0, 200)}...</p>
          </div>
        </div>

        {renderStep()}
      </div>
    </div>
  )
}

export default Booking