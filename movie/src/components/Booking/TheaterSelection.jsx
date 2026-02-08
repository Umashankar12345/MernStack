import React, { useState } from 'react'
import { MapPin, Clock, Phone, Wifi, Car, Coffee, Star } from 'lucide-react'

function TheaterSelection({ selectedTheater = null, onTheaterSelect }) {
  const [selected, setSelected] = useState(selectedTheater)

  const theaters = [
    {
      id: 1,
      name: 'PVR Cinemas, Jalandhar',
      location: 'MBD Mall, Near Bus Stand, Jalandhar',
      distance: '2.5 km',
      rating: 4.5,
      shows: ['10:00 AM', '01:30 PM', '04:45 PM', '06:00 PM', '09:15 PM'],
      amenities: ['Dolby Atmos', '3D Screen', 'Food Court', 'Parking', 'Wheelchair Access'],
      price: 250,
      isPremium: true
    },
    {
      id: 2,
      name: 'INOX, Jalandhar',
      location: 'City Square Mall, G.T. Road, Jalandhar',
      distance: '3.2 km',
      rating: 4.3,
      shows: ['10:30 AM', '02:00 PM', '05:15 PM', '07:30 PM', '10:00 PM'],
      amenities: ['IMAX', '4DX', 'Café', 'Valet Parking'],
      price: 230,
      isPremium: true
    },
    {
      id: 3,
      name: 'Cinepolis, Jalandhar',
      location: 'Urban Estate, Phase 2, Jalandhar',
      distance: '4.1 km',
      rating: 4.2,
      shows: ['11:00 AM', '02:30 PM', '05:45 PM', '08:00 PM', '10:30 PM'],
      amenities: ['VIP Lounges', 'Gaming Zone', 'Restaurant', 'Kids Area'],
      price: 220,
      isPremium: false
    },
    {
      id: 4,
      name: 'Wave Cinemas, Jalandhar',
      location: 'Mall Road, Jalandhar Cantt',
      distance: '5.0 km',
      rating: 4.0,
      shows: ['10:15 AM', '01:45 PM', '05:00 PM', '07:15 PM', '09:45 PM'],
      amenities: ['Atmos Sound', 'Recliner Seats', 'Snack Bar'],
      price: 200,
      isPremium: false
    }
  ]

  const handleSelect = (theater) => {
    setSelected(theater.id)
    onTheaterSelect?.(theater)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-purple-100 rounded-lg">
            <MapPin className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">Select Theater</h3>
            <p className="text-gray-600">Choose your preferred theater location</p>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-sm text-gray-500">Currently viewing in</div>
          <div className="font-bold text-lg">Jalandhar</div>
        </div>
      </div>

      {/* Theater Cards */}
      <div className="grid grid-cols-1 gap-6">
        {theaters.map((theater) => (
          <div
            key={theater.id}
            onClick={() => handleSelect(theater)}
            className={`
              border rounded-2xl p-6 cursor-pointer transition-all duration-300
              transform hover:-translate-y-1 hover:shadow-lg
              ${selected === theater.id
                ? 'border-bms-red bg-red-50'
                : 'border-gray-200 hover:border-bms-red'
              }
            `}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              {/* Left Column - Theater Info */}
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="text-xl font-bold text-gray-800">{theater.name}</h4>
                      {theater.isPremium && (
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-bold rounded">
                          PREMIUM
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>{theater.location}</span>
                      </div>
                      <div className="flex items-center">
                        <Car className="w-4 h-4 mr-1" />
                        <span>{theater.distance} away</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="font-bold">{theater.rating}</span>
                  </div>
                </div>

                {/* Amenities */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {theater.amenities.map((amenity, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>

                {/* Show Times */}
                <div>
                  <div className="flex items-center text-sm text-gray-700 mb-2">
                    <Clock className="w-4 h-4 mr-2" />
                    <span className="font-medium">Available Shows:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {theater.shows.map((show, index) => (
                      <button
                        key={index}
                        className={`
                          px-4 py-2 rounded-lg text-sm font-medium transition-colors
                          ${selected === theater.id
                            ? 'bg-bms-red text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }
                        `}
                        onClick={(e) => {
                          e.stopPropagation()
                          // Handle time selection
                        }}
                      >
                        {show}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - Price & Action */}
              <div className="md:w-48 space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-bms-red">₹{theater.price}</div>
                  <div className="text-sm text-gray-500">per ticket</div>
                </div>

                <div className="space-y-2">
                  <button
                    className={`
                      w-full py-3 rounded-lg font-bold transition-colors
                      ${selected === theater.id
                        ? 'bg-bms-red text-white hover:bg-red-700'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }
                    `}
                  >
                    {selected === theater.id ? 'Selected' : 'Select Theater'}
                  </button>
                  
                  {selected === theater.id && (
                    <button className="w-full py-2 text-sm text-bms-red hover:text-red-700">
                      View Seat Map →
                    </button>
                  )}
                </div>

                {/* Quick Info */}
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2 bg-blue-50 rounded">
                    <Wifi className="w-4 h-4 text-blue-600 mx-auto mb-1" />
                    <div className="text-xs text-gray-600">Free WiFi</div>
                  </div>
                  <div className="p-2 bg-green-50 rounded">
                    <Phone className="w-4 h-4 text-green-600 mx-auto mb-1" />
                    <div className="text-xs text-gray-600">Book by Phone</div>
                  </div>
                  <div className="p-2 bg-yellow-50 rounded">
                    <Coffee className="w-4 h-4 text-yellow-600 mx-auto mb-1" />
                    <div className="text-xs text-gray-600">Café</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Map View */}
      <div className="bg-gray-50 rounded-2xl p-6">
        <h4 className="font-bold text-gray-800 mb-4">Theater Locations Map</h4>
        <div className="h-64 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl relative overflow-hidden">
          {/* Simplified Map */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-64 h-48">
              {/* Map Background */}
              <div className="absolute inset-0 bg-white rounded-lg shadow-inner"></div>
              
              {/* Location Dots */}
              {theaters.map((theater, index) => {
                const positions = [
                  { top: '20%', left: '30%' },
                  { top: '40%', left: '60%' },
                  { top: '60%', left: '20%' },
                  { top: '70%', left: '70%' }
                ]
                
                return (
                  <div
                    key={theater.id}
                    className={`absolute w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transform hover:scale-125 transition-transform ${
                      selected === theater.id
                        ? 'bg-bms-red text-white shadow-lg'
                        : 'bg-gray-300 text-gray-700'
                    }`}
                    style={positions[index]}
                    onClick={() => handleSelect(theater)}
                  >
                    <MapPin className="w-4 h-4" />
                  </div>
                )
              })}
              
              {/* Legend */}
              <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow">
                <div className="text-sm font-medium text-gray-700 mb-2">Theaters</div>
                <div className="space-y-1">
                  {theaters.map((theater) => (
                    <div
                      key={theater.id}
                      className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 p-1 rounded"
                      onClick={() => handleSelect(theater)}
                    >
                      <div className={`w-3 h-3 rounded-full ${
                        selected === theater.id ? 'bg-bms-red' : 'bg-gray-400'
                      }`}></div>
                      <span className="text-xs">{theater.name.split(',')[0]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-blue-50 rounded-2xl p-6">
        <h4 className="font-bold text-gray-800 mb-3">💡 Tips for Better Experience</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <div className="font-medium text-blue-700">Best View</div>
            <div className="text-sm text-gray-600">Rows D-G offer the best viewing angles</div>
          </div>
          <div className="space-y-2">
            <div className="font-medium text-blue-700">Early Booking</div>
            <div className="text-sm text-gray-600">Book at least 1 hour before showtime</div>
          </div>
          <div className="space-y-2">
            <div className="font-medium text-blue-700">Parking</div>
            <div className="text-sm text-gray-600">Premium theaters offer free parking</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TheaterSelection