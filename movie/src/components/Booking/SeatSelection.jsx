import React, { useState } from 'react'
import { Users, X } from 'lucide-react'

function SeatSelection({ selectedSeats = 1, onSeatChange, maxSeats = 10 }) {
  const [seats, setSeats] = useState(selectedSeats)

  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
  const seatsPerRow = 10

  // Generate seat layout
  const generateSeats = () => {
    const seatLayout = []
    
    for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
      const row = rows[rowIndex]
      const rowSeats = []
      
      for (let seatNum = 1; seatNum <= seatsPerRow; seatNum++) {
        const seatId = `${row}${seatNum}`
        const isSelected = seatNum <= seats // Simple selection logic
        const isAvailable = Math.random() > 0.3 // 70% seats available
        const isPremium = rowIndex >= 4 // Last 4 rows are premium
        
        rowSeats.push({
          id: seatId,
          row,
          number: seatNum,
          isSelected,
          isAvailable,
          isPremium,
          price: isPremium ? 350 : 250
        })
      }
      
      seatLayout.push({
        row,
        seats: rowSeats
      })
    }
    
    return seatLayout
  }

  const seatLayout = generateSeats()
  const totalPrice = seats * 250 // Base price

  const handleSeatSelect = (seat) => {
    if (!seat.isAvailable) return
    
    if (seat.isSelected) {
      if (seats > 1) {
        setSeats(seats - 1)
        onSeatChange?.(seats - 1)
      }
    } else {
      if (seats < maxSeats) {
        setSeats(seats + 1)
        onSeatChange?.(seats + 1)
      }
    }
  }

  const incrementSeats = () => {
    if (seats < maxSeats) {
      const newSeats = seats + 1
      setSeats(newSeats)
      onSeatChange?.(newSeats)
    }
  }

  const decrementSeats = () => {
    if (seats > 1) {
      const newSeats = seats - 1
      setSeats(newSeats)
      onSeatChange?.(newSeats)
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-blue-100 rounded-lg">
            <Users className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">Select Seats</h3>
            <p className="text-gray-600">Choose your preferred seats</p>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-3xl font-bold text-bms-red">₹{totalPrice}</div>
          <div className="text-sm text-gray-500">{seats} seats selected</div>
        </div>
      </div>

      {/* Seat Counter */}
      <div className="bg-gray-50 rounded-xl p-6">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <button
            onClick={decrementSeats}
            disabled={seats <= 1}
            className="w-12 h-12 bg-white border rounded-lg text-2xl font-bold hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            -
          </button>
          
          <div className="text-center">
            <div className="text-6xl font-bold text-bms-red">{seats}</div>
            <div className="text-gray-500 mt-2">Seats</div>
          </div>
          
          <button
            onClick={incrementSeats}
            disabled={seats >= maxSeats}
            className="w-12 h-12 bg-white border rounded-lg text-2xl font-bold hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            +
          </button>
        </div>
        
        <div className="mt-6 text-center">
          <div className="text-lg font-semibold">₹250 per seat</div>
          <div className="text-gray-500">Standard seating • Max {maxSeats} seats per booking</div>
        </div>
      </div>

      {/* Seat Legend */}
      <div className="flex justify-center space-x-6">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-green-500 rounded"></div>
          <span className="text-sm">Available</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-bms-red rounded"></div>
          <span className="text-sm">Selected</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-gray-300 rounded"></div>
          <span className="text-sm">Booked</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-blue-500 rounded"></div>
          <span className="text-sm">Premium (₹350)</span>
        </div>
      </div>

      {/* Seat Layout */}
      <div className="space-y-6">
        {/* Screen */}
        <div className="text-center">
          <div className="w-full h-12 bg-gray-800 rounded-lg mx-auto max-w-2xl flex items-center justify-center">
            <span className="text-white font-bold">SCREEN THIS WAY</span>
          </div>
          <div className="h-1 w-48 bg-gradient-to-r from-transparent via-gray-400 to-transparent mx-auto mt-2"></div>
        </div>

        {/* Seats */}
        <div className="space-y-4">
          {seatLayout.map((row) => (
            <div key={row.row} className="flex items-center justify-center space-x-4">
              {/* Row Label */}
              <div className="w-8 text-center font-bold text-gray-700">{row.row}</div>
              
              {/* Seats */}
              <div className="flex space-x-2">
                {row.seats.map((seat) => (
                  <button
                    key={seat.id}
                    onClick={() => handleSeatSelect(seat)}
                    disabled={!seat.isAvailable}
                    className={`
                      w-8 h-8 rounded flex items-center justify-center text-xs font-bold
                      transition-all duration-200 transform hover:scale-110
                      ${seat.isSelected ? 'bg-bms-red text-white' : ''}
                      ${!seat.isAvailable ? 'bg-gray-300 cursor-not-allowed' : ''}
                      ${seat.isAvailable && !seat.isSelected ? 'bg-green-500 hover:bg-green-600 text-white' : ''}
                      ${seat.isPremium ? 'border-2 border-blue-500' : ''}
                      disabled:transform-none disabled:hover:scale-100
                    `}
                    title={`${seat.id} - ${seat.isPremium ? 'Premium: ₹350' : 'Standard: ₹250'}`}
                  >
                    {seat.isAvailable ? seat.number : <X className="w-3 h-3" />}
                  </button>
                ))}
              </div>
              
              {/* Row Label (Right) */}
              <div className="w-8 text-center font-bold text-gray-700">{row.row}</div>
            </div>
          ))}
        </div>

        {/* Row Numbers */}
        <div className="flex justify-center space-x-2 mt-4">
          {Array.from({ length: seatsPerRow }, (_, i) => i + 1).map((num) => (
            <div key={num} className="w-8 text-center text-sm text-gray-500">
              {num}
            </div>
          ))}
        </div>
      </div>

      {/* Selected Seats Summary */}
      <div className="bg-gray-50 rounded-xl p-6">
        <h4 className="font-bold text-gray-800 mb-4">Selected Seats</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: seats }, (_, i) => {
            const row = rows[Math.floor(i / seatsPerRow)]
            const seatNum = (i % seatsPerRow) + 1
            const isPremium = Math.floor(i / seatsPerRow) >= 4
            const price = isPremium ? 350 : 250
            
            return (
              <div key={i} className="bg-white p-4 rounded-lg border">
                <div className="font-bold text-lg">{row}{seatNum}</div>
                <div className="text-sm text-gray-500">
                  {isPremium ? 'Premium Seat' : 'Standard Seat'}
                </div>
                <div className="font-bold text-bms-red mt-2">₹{price}</div>
              </div>
            )
          })}
        </div>
        
        <div className="mt-6 pt-6 border-t">
          <div className="flex justify-between items-center">
            <div>
              <div className="font-bold text-lg">Total Amount</div>
              <div className="text-sm text-gray-500">{seats} seats selected</div>
            </div>
            <div className="text-3xl font-bold text-bms-red">₹{totalPrice}</div>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
        <h4 className="font-bold text-gray-800 mb-2">🎬 Important Notes</h4>
        <ul className="space-y-2 text-sm text-gray-600">
          <li>• Seats are allocated on a first-come, first-served basis</li>
          <li>• Premium seats offer extra legroom and better viewing angles</li>
          <li>• You can select up to {maxSeats} seats per booking</li>
          <li>• Selected seats will be held for 10 minutes</li>
          <li>• Seats marked with X are already booked</li>
        </ul>
      </div>
    </div>
  )
}

export default SeatSelection