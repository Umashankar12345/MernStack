import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SeatSelection = ({ movie, selectedSeats, onSeatSelect }) => {
  const navigate = useNavigate();
  const [seats, setSeats] = useState([]);
  const [selectedTime, setSelectedTime] = useState('6:00 PM');
  
  // Generate initial seats
  useEffect(() => {
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const initialSeats = [];
    
    rows.forEach(row => {
      for (let i = 1; i <= 10; i++) {
        const seatId = `${row}${i}`;
        // Randomly book some seats (for demo)
        const isBooked = Math.random() < 0.3;
        initialSeats.push({
          id: seatId,
          row: row,
          number: i,
          isBooked: isBooked,
          isSelected: selectedSeats.includes(seatId),
          price: row === 'A' || row === 'B' ? 250 : 200
        });
      }
    });
    
    setSeats(initialSeats);
  }, [selectedSeats]);

  const handleSeatClick = (seatId) => {
    const seat = seats.find(s => s.id === seatId);
    
    if (seat.isBooked) return;
    
    const updatedSeats = seats.map(seat => 
      seat.id === seatId 
        ? { ...seat, isSelected: !seat.isSelected }
        : seat
    );
    
    setSeats(updatedSeats);
    
    // Get selected seat IDs
    const selectedSeatIds = updatedSeats
      .filter(s => s.isSelected)
      .map(s => s.id);
    
    onSeatSelect(selectedSeatIds);
  };

  const handleProceedToPayment = () => {
    if (selectedSeats.length === 0) {
      alert('Please select at least one seat');
      return;
    }
    navigate('/booking-summary');
  };

  const calculateTotal = () => {
    return seats
      .filter(seat => seat.isSelected)
      .reduce((total, seat) => total + seat.price, 0);
  };

  const showtimes = ['2:00 PM', '6:00 PM', '10:00 PM'];

  return (
    <div className="container">
      <h1 style={styles.header}>🎯 Select Your Seats</h1>
      
      <div style={styles.movieInfo}>
        <h2>{movie?.title}</h2>
        
        <div style={styles.timeSelection}>
          <p>Select Showtime:</p>
          <div style={styles.timeButtons}>
            {showtimes.map((time, index) => (
              <button
                key={index}
                onClick={() => setSelectedTime(time)}
                style={{
                  ...styles.timeBtn,
                  backgroundColor: selectedTime === time ? '#007bff' : '#6c757d'
                }}
              >
                {time}
              </button>
            ))}
          </div>
          <p style={styles.selectedTime}>Selected: {selectedTime}</p>
        </div>
      </div>

      <div style={styles.screen}>
        <div style={styles.screenText}>🎬 SCREEN 🎬</div>
      </div>

      <div className="seat-map">
        {seats.map(seat => (
          <div
            key={seat.id}
            className={`seat ${
              seat.isBooked ? 'booked' : 
              seat.isSelected ? 'selected' : 'available'
            }`}
            onClick={() => handleSeatClick(seat.id)}
            title={`${seat.id} - ${seat.isBooked ? 'Booked' : `₹${seat.price}`}`}
          >
            {seat.number}
          </div>
        ))}
      </div>

      <div style={styles.legend}>
        <div style={styles.legendItem}>
          <div style={{...styles.legendBox, backgroundColor: '#28a745'}}></div>
          <span>Available (₹200-₹250)</span>
        </div>
        <div style={styles.legendItem}>
          <div style={{...styles.legendBox, backgroundColor: '#007bff'}}></div>
          <span>Selected</span>
        </div>
        <div style={styles.legendItem}>
          <div style={{...styles.legendBox, backgroundColor: '#6c757d'}}></div>
          <span>Booked</span>
        </div>
      </div>

      <div style={styles.summary}>
        <div style={styles.summaryCard}>
          <h3>Booking Summary</h3>
          <div style={styles.summaryDetails}>
            <div style={styles.summaryRow}>
              <span>Movie:</span>
              <span>{movie?.title}</span>
            </div>
            <div style={styles.summaryRow}>
              <span>Showtime:</span>
              <span>{selectedTime}</span>
            </div>
            <div style={styles.summaryRow}>
              <span>Selected Seats:</span>
              <span>{selectedSeats.join(', ') || 'None'}</span>
            </div>
            <div style={styles.summaryRow}>
              <span>Number of Seats:</span>
              <span>{selectedSeats.length}</span>
            </div>
            <div style={styles.summaryRow}>
              <span>Total Amount:</span>
              <span style={styles.totalAmount}>₹{calculateTotal()}</span>
            </div>
          </div>
          
          <button 
            onClick={handleProceedToPayment}
            className="btn btn-success"
            style={styles.proceedBtn}
            disabled={selectedSeats.length === 0}
          >
            {selectedSeats.length === 0 ? 'Select Seats to Continue' : `Proceed to Payment (${selectedSeats.length} seats)`}
          </button>
        </div>
      </div>

      <div style={styles.navigation}>
        <button onClick={() => navigate(-1)} className="btn btn-secondary">
          Back to Movie
        </button>
      </div>
    </div>
  );
};

const styles = {
  header: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333',
  },
  movieInfo: {
    textAlign: 'center',
    marginBottom: '30px',
  },
  timeSelection: {
    marginTop: '15px',
  },
  timeButtons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    margin: '10px 0',
  },
  timeBtn: {
    padding: '8px 16px',
    border: 'none',
    borderRadius: '5px',
    color: 'white',
    cursor: 'pointer',
  },
  selectedTime: {
    color: '#007bff',
    fontWeight: 'bold',
    marginTop: '10px',
  },
  screen: {
    backgroundColor: '#333',
    color: 'white',
    textAlign: 'center',
    padding: '15px',
    margin: '30px auto',
    width: '80%',
    borderRadius: '10px',
  },
  screenText: {
    letterSpacing: '5px',
    fontSize: '24px',
    fontWeight: 'bold',
  },
  legend: {
    display: 'flex',
    justifyContent: 'center',
    gap: '30px',
    margin: '30px 0',
    flexWrap: 'wrap',
  },
  legendItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  legendBox: {
    width: '20px',
    height: '20px',
    borderRadius: '3px',
  },
  summary: {
    maxWidth: '500px',
    margin: '30px auto',
  },
  summaryCard: {
    backgroundColor: 'white',
    padding: '25px',
    borderRadius: '10px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
  },
  summaryDetails: {
    margin: '20px 0',
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 0',
    borderBottom: '1px solid #eee',
  },
  totalAmount: {
    color: '#28a745',
    fontWeight: 'bold',
    fontSize: '20px',
  },
  proceedBtn: {
    width: '100%',
    padding: '15px',
    fontSize: '18px',
    marginTop: '20px',
  },
  navigation: {
    textAlign: 'center',
    marginTop: '20px',
  },
};

export default SeatSelection;