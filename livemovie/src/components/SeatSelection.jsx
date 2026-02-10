import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SeatSelection.css';

const SeatSelection = ({ 
  movie, 
  selectedSeats, 
  onSeatSelect,
  initialPosture = 'standard',
  onPostureChange 
}) => {
  const navigate = useNavigate();
  const [seats, setSeats] = useState([]);
  const [selectedTime, setSelectedTime] = useState('6:00 PM');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedPosture, setSelectedPosture] = useState(initialPosture);
  const [showPostureInfo, setShowPostureInfo] = useState(false);
  
  const postureTypes = [
    {
      id: 'standard',
      name: "Standard",
      icon: "🪑",
      description: "Regular seating with standard legroom",
      priceMultiplier: 1.0,
      features: ["Standard legroom", "Regular recline", "Basic amenities"],
      color: "#3B82F6",
      badge: "Most Popular"
    },
    {
      id: 'recliner',
      name: "Recliner",
      icon: "🛋️",
      description: "Full reclining seats with extra comfort",
      priceMultiplier: 1.5,
      features: ["Full recline", "Extra padding", "Personal space", "Footrest"],
      color: "#8B5CF6",
      badge: "Premium"
    },
    {
      id: 'premium',
      name: "Premium",
      icon: "⭐",
      description: "Premium seating with enhanced experience",
      priceMultiplier: 2.0,
      features: ["Extra legroom", "Priority service", "Complimentary snacks"],
      color: "#F59E0B",
      badge: "Luxury"
    },
    {
      id: 'couple',
      name: "Couple Seat",
      icon: "💑",
      description: "Special seating for couples",
      priceMultiplier: 2.2,
      features: ["Shared armrest", "Privacy screen", "Romantic setup"],
      color: "#EC4899",
      badge: "For Two"
    },
    {
      id: 'box',
      name: "Box Seat",
      icon: "🎭",
      description: "Private box seating arrangement",
      priceMultiplier: 3.0,
      features: ["Private enclosure", "Dedicated server", "Premium view"],
      color: "#10B981",
      badge: "VIP"
    }
  ];

  const handlePostureSelect = (postureId) => {
    setSelectedPosture(postureId);
    if (onPostureChange) {
      onPostureChange(postureId);
    }
  };

  const showDates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date;
  });

  useEffect(() => {
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const initialSeats = [];
    const selectedPostureData = postureTypes.find(p => p.id === selectedPosture);
    
    rows.forEach(row => {
      for (let i = 1; i <= 10; i++) {
        const seatId = `${row}${i}`;
        const isBooked = Math.random() < 0.3;
        const isPremiumRow = row === 'A' || row === 'B';
        const basePrice = isPremiumRow ? 250 : 200;
        const finalPrice = Math.round(basePrice * selectedPostureData.priceMultiplier);
        
        initialSeats.push({
          id: seatId,
          row: row,
          number: i,
          isBooked: isBooked,
          isSelected: selectedSeats.includes(seatId),
          basePrice: basePrice,
          currentPrice: finalPrice,
          isPremium: isPremiumRow
        });
      }
    });
    
    setSeats(initialSeats);
  }, [selectedSeats, selectedPosture]);

  const handleSeatClick = (seatId) => {
    const seat = seats.find(s => s.id === seatId);
    if (seat.isBooked) return;
    
    const updatedSeats = seats.map(seat => 
      seat.id === seatId 
        ? { ...seat, isSelected: !seat.isSelected }
        : seat
    );
    
    setSeats(updatedSeats);
    
    const selectedSeatIds = updatedSeats
      .filter(s => s.isSelected)
      .map(s => s.id);
    
    onSeatSelect(selectedSeatIds);
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const calculateTotal = () => {
    return seats
      .filter(seat => seat.isSelected)
      .reduce((total, seat) => total + seat.currentPrice, 0);
  };

  const selectedPostureData = postureTypes.find(p => p.id === selectedPosture);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center text-gray-700 hover:text-red-600"
            >
              <span className="text-xl mr-2">←</span>
              <span>Back to Movie</span>
            </button>
            <h1 className="text-xl font-bold text-gray-800">
              {movie?.title} - Seat Selection
            </h1>
            <div className="text-sm text-gray-600">
              <span className="hidden md:inline">Powered by </span>
              <span className="font-bold text-red-600">LiveMovie</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wider">
                Select Date
              </h3>
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {showDates.map((date, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedDate(date)}
                    className={`flex-shrink-0 px-4 py-3 rounded-lg text-center min-w-[80px] border ${
                      date.toDateString() === selectedDate.toDateString()
                        ? 'border-red-600 bg-red-50 text-red-600'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <div className="text-xs font-medium">
                      {date.toLocaleDateString('en-US', { weekday: 'short' })}
                    </div>
                    <div className="text-lg font-bold mt-1">
                      {date.getDate()}
                    </div>
                    <div className="text-xs text-gray-500">
                      {date.toLocaleDateString('en-US', { month: 'short' })}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wider">
                Select Showtime
              </h3>
              <div className="flex flex-wrap gap-2">
                {['10:00 AM', '1:00 PM', '4:00 PM', '7:00 PM', '10:00 PM'].map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`px-4 py-2 rounded border ${
                      selectedTime === time
                        ? 'border-red-600 bg-red-600 text-white'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-800">
              Select Seating Type
            </h3>
            <button
              onClick={() => setShowPostureInfo(!showPostureInfo)}
              className="text-sm text-red-600 hover:text-red-700 font-medium"
            >
              {showPostureInfo ? 'Hide Details' : 'View All Details'}
            </button>
          </div>

          <div className="flex space-x-4 overflow-x-auto pb-4">
            {postureTypes.map((posture) => (
              <div
                key={posture.id}
                onClick={() => handlePostureSelect(posture.id)}
                className={`flex-shrink-0 w-64 border-2 rounded-xl p-4 cursor-pointer transition-all duration-200 ${
                  selectedPosture === posture.id
                    ? 'border-red-500 bg-red-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{posture.icon}</span>
                    <div>
                      <h4 className="font-bold text-gray-800">{posture.name}</h4>
                      <p className="text-sm text-gray-600">{posture.description}</p>
                    </div>
                  </div>
                  {posture.badge && (
                    <span className={`px-2 py-1 text-xs font-semibold rounded ${
                      posture.id === 'standard' ? 'bg-blue-100 text-blue-800' :
                      posture.id === 'recliner' ? 'bg-purple-100 text-purple-800' :
                      posture.id === 'premium' ? 'bg-yellow-100 text-yellow-800' :
                      posture.id === 'couple' ? 'bg-pink-100 text-pink-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {posture.badge}
                    </span>
                  )}
                </div>
                
                {showPostureInfo && (
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <ul className="space-y-1">
                      {posture.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-600">
                          <span className="mr-2 text-green-500">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-3 text-right">
                      <span className="text-lg font-bold" style={{ color: posture.color }}>
                        {posture.priceMultiplier}x Price Multiplier
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-gray-600">Selected:</span>
                <span className="ml-2 font-bold text-gray-800">
                  {selectedPostureData.name} {selectedPostureData.icon}
                </span>
                <span className="ml-3 text-sm text-gray-600">
                  ({selectedPostureData.description})
                </span>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600">Price per seat:</div>
                <div className="text-lg font-bold text-red-600">
                  ₹200-₹250 × {selectedPostureData.priceMultiplier} = 
                  ₹{Math.round(200 * selectedPostureData.priceMultiplier)}-
                  ₹{Math.round(250 * selectedPostureData.priceMultiplier)}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-800">
              Select Seats
            </h3>
            <div className="text-sm text-gray-600">
              {formatDate(selectedDate)} • {selectedTime}
            </div>
          </div>

          <div className="relative mb-10">
            <div className="bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 h-12 rounded-lg flex items-center justify-center">
              <div className="text-gray-700 font-bold tracking-widest text-lg">
                🎬 S C R E E N 🎬
              </div>
            </div>
            <div className="absolute left-0 right-0 top-full mt-2 flex justify-center">
              <div className="w-48 h-1 bg-gradient-to-r from-transparent via-gray-400 to-transparent"></div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-around py-8">
              {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].map(row => (
                <div key={row} className="text-gray-600 font-medium w-8 text-center">
                  {row}
                </div>
              ))}
            </div>

            <div className="ml-12 grid grid-cols-10 gap-3">
              {seats.map(seat => (
                <button
                  key={seat.id}
                  onClick={() => handleSeatClick(seat.id)}
                  disabled={seat.isBooked}
                  className={`
                    relative aspect-square rounded-lg flex items-center justify-center
                    transition-all duration-200 border-2
                    ${seat.isBooked 
                      ? 'bg-gray-200 border-gray-300 cursor-not-allowed' 
                      : seat.isSelected 
                      ? 'bg-red-500 border-red-600 text-white' 
                      : seat.isPremium
                      ? 'bg-blue-100 border-blue-300 hover:border-blue-400'
                      : 'bg-green-100 border-green-300 hover:border-green-400'
                    }
                    ${!seat.isBooked ? 'hover:scale-110 hover:shadow-md' : ''}
                  `}
                  title={`${seat.id} - ${seat.isBooked ? 'Booked' : `₹${seat.currentPrice}`}`}
                >
                  <span className="font-bold">{seat.number}</span>
                  {seat.isPremium && !seat.isBooked && (
                    <span className="absolute -top-1 -right-1 text-xs bg-yellow-400 text-white rounded-full w-5 h-5 flex items-center justify-center">
                      P
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-gray-200">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">SEAT LEGEND</h4>
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded bg-green-100 border-2 border-green-300"></div>
                <span className="text-sm text-gray-600">Available (₹{Math.round(200 * selectedPostureData.priceMultiplier)})</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded bg-blue-100 border-2 border-blue-300"></div>
                <span className="text-sm text-gray-600">Premium (₹{Math.round(250 * selectedPostureData.priceMultiplier)})</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded bg-red-500 border-2 border-red-600"></div>
                <span className="text-sm text-gray-600">Selected</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded bg-gray-200 border-2 border-gray-300"></div>
                <span className="text-sm text-gray-600">Sold Out</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded border-2 border-dashed border-gray-400"></div>
                <span className="text-sm text-gray-600">Not Available</span>
              </div>
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 bg-white border-t shadow-lg rounded-t-lg">
          <div className="p-6">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-4 md:mb-0 md:mr-6">
                <div className="text-sm text-gray-600">Selected Seats</div>
                <div className="text-xl font-bold text-gray-800">
                  {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'No seats selected'}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {selectedSeats.length} seat{selectedSeats.length !== 1 ? 's' : ''} • {selectedPostureData.name}
                </div>
              </div>
              
              <div className="text-center mb-4 md:mb-0 md:mr-6">
                <div className="text-sm text-gray-600">Price Breakdown</div>
                <div className="text-lg font-bold text-gray-800">
                  {selectedSeats.length} × ₹{Math.round(200 * selectedPostureData.priceMultiplier)}-₹{Math.round(250 * selectedPostureData.priceMultiplier)}
                </div>
              </div>
              
              <div className="text-center mb-4 md:mb-0 md:mr-6">
                <div className="text-sm text-gray-600">Total Amount</div>
                <div className="text-3xl font-bold text-red-600">
                  ₹{calculateTotal()}
                </div>
              </div>
              
              <button
                onClick={() => navigate('/booking-summary')}
                disabled={selectedSeats.length === 0}
                className={`
                  px-8 py-3 rounded-lg font-bold text-lg transition-all duration-300
                  ${selectedSeats.length === 0
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl'
                  }
                `}
              >
                {selectedSeats.length === 0 
                  ? 'SELECT SEATS TO PROCEED' 
                  : `PROCEED TO PAY ₹${calculateTotal()}`
                }
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatSelection;