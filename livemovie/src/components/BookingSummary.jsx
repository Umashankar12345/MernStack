import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BookingSummary = ({ movie, seats, user, onBookingComplete, posture }) => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [isProcessing, setIsProcessing] = useState(false);

  const calculateTotal = () => {
    if (posture && posture.priceMultiplier) {
      return Math.round(seats.length * 200 * posture.priceMultiplier);
    }
    return seats.length * 200;
  };

  const generateBookingId = () => {
    return `BK${Date.now()}${Math.floor(Math.random() * 1000)}`;
  };

  const handleConfirmBooking = () => {
    setIsProcessing(true);
    
    setTimeout(() => {
      const bookingData = {
        bookingId: generateBookingId(),
        movie: movie.title,
        seats: seats,
        totalAmount: calculateTotal() + 30,
        showtime: '6:00 PM',
        bookingDate: new Date().toLocaleDateString(),
        paymentMethod: paymentMethod,
        user: user.name,
        email: user.email,
        posture: posture
      };
      
      onBookingComplete(bookingData);
      setIsProcessing(false);
      
      alert(`🎉 Booking Successful!\nBooking ID: ${bookingData.bookingId}\nAmount Paid: ₹${bookingData.totalAmount}`);
      
      navigate('/');
    }, 2000);
  };

  if (!movie || seats.length === 0) {
    return (
      <div className="container">
        <div className="card">
          <h2>No booking information available</h2>
          <button onClick={() => navigate('/')} className="btn btn-primary">
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 style={styles.header}>✅ Booking Summary</h1>
      
      <div style={styles.content}>
        <div style={styles.bookingCard}>
          <div style={styles.successIcon}>🎟</div>
          <h2 style={styles.successTitle}>Ready to Complete Your Booking!</h2>
          
          <div style={styles.bookingDetails}>
            <div style={styles.detailSection}>
              <h3>🎬 Movie Details</h3>
              <div style={styles.detailRow}>
                <span>Movie:</span>
                <span>{movie.title}</span>
              </div>
              <div style={styles.detailRow}>
                <span>Showtime:</span>
                <span>Today, 6:00 PM</span>
              </div>
              <div style={styles.detailRow}>
                <span>Screen:</span>
                <span>Screen 1</span>
              </div>
            </div>
            
            <div style={styles.detailSection}>
              <h3>💺 Seat Details</h3>
              <div style={styles.detailRow}>
                <span>Selected Seats:</span>
                <span>{seats.join(', ')}</span>
              </div>
              <div style={styles.detailRow}>
                <span>Number of Seats:</span>
                <span>{seats.length}</span>
              </div>
              <div style={styles.detailRow}>
                <span>Price per Seat:</span>
                <span>
                  {posture ? `₹${Math.round(200 * posture.priceMultiplier)}-₹${Math.round(250 * posture.priceMultiplier)}` : '₹200'}
                </span>
              </div>
              
              {posture && (
                <div style={styles.detailRow}>
                  <span>Seating Type:</span>
                  <span style={{ fontWeight: 'bold' }}>
                    {posture.name} {posture.icon}
                    <span style={{ marginLeft: '8px', fontSize: '14px', color: '#666' }}>
                      (×{posture.priceMultiplier} multiplier)
                    </span>
                  </span>
                </div>
              )}
            </div>
            
            <div style={styles.detailSection}>
              <h3>👤 User Details</h3>
              <div style={styles.detailRow}>
                <span>Name:</span>
                <span>{user.name}</span>
              </div>
              <div style={styles.detailRow}>
                <span>Email:</span>
                <span>{user.email}</span>
              </div>
            </div>
            
            <div style={styles.detailSection}>
              <h3>💳 Payment Details</h3>
              <div style={styles.paymentMethods}>
                <label style={styles.paymentOption}>
                  <input
                    type="radio"
                    name="payment"
                    value="credit-card"
                    checked={paymentMethod === 'credit-card'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  Credit/Debit Card
                </label>
                <label style={styles.paymentOption}>
                  <input
                    type="radio"
                    name="payment"
                    value="upi"
                    checked={paymentMethod === 'upi'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  UPI
                </label>
                <label style={styles.paymentOption}>
                  <input
                    type="radio"
                    name="payment"
                    value="wallet"
                    checked={paymentMethod === 'wallet'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  Wallet
                </label>
              </div>
            </div>
            
            <div style={styles.totalSection}>
              <div style={styles.totalRow}>
                <span>Seat Charges ({seats.length} seats):</span>
                <span>₹{calculateTotal()}</span>
              </div>
              <div style={styles.totalRow}>
                <span>Convenience Fee:</span>
                <span>₹30</span>
              </div>
              <div style={{...styles.totalRow, ...styles.grandTotal}}>
                <span>Total Amount:</span>
                <span>₹{calculateTotal() + 30}</span>
              </div>
            </div>
          </div>

          <div style={styles.actionButtons}>
            <button
              onClick={() => navigate('/select-seats')}
              className="btn btn-secondary"
              style={styles.backBtn}
            >
              ← Back to Seats
            </button>
            <button
              onClick={handleConfirmBooking}
              className="btn btn-success"
              style={styles.confirmBtn}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <span style={styles.spinner}></span>
                  Processing Payment...
                </>
              ) : (
                `Confirm Payment - ₹${calculateTotal() + 30}`
              )}
            </button>
          </div>
          
          <p style={styles.note}>
            * Tickets will be sent to your email. Please arrive at least 30 minutes before showtime.
          </p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  header: {
    textAlign: 'center',
    margin: '30px 0',
    color: '#333',
  },
  content: {
    maxWidth: '600px',
    margin: '0 auto',
  },
  bookingCard: {
    backgroundColor: 'white',
    borderRadius: '15px',
    padding: '30px',
    boxShadow: '0 5px 25px rgba(0,0,0,0.1)',
  },
  successIcon: {
    fontSize: '60px',
    textAlign: 'center',
    marginBottom: '20px',
  },
  successTitle: {
    textAlign: 'center',
    color: '#28a745',
    marginBottom: '30px',
  },
  bookingDetails: {
    marginBottom: '30px',
  },
  detailSection: {
    marginBottom: '25px',
    paddingBottom: '25px',
    borderBottom: '1px solid #eee',
  },
  detailRow: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '10px 0',
    fontSize: '16px',
  },
  paymentMethods: {
    marginTop: '10px',
  },
  paymentOption: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    margin: '10px 0',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  totalSection: {
    backgroundColor: '#f8f9fa',
    padding: '20px',
    borderRadius: '10px',
    marginTop: '20px',
  },
  totalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '10px 0',
    fontSize: '16px',
  },
  grandTotal: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#28a745',
    marginTop: '20px',
    paddingTop: '20px',
    borderTop: '2px solid #ddd',
  },
  actionButtons: {
    display: 'flex',
    gap: '20px',
    marginTop: '30px',
  },
  backBtn: {
    flex: '1',
  },
  confirmBtn: {
    flex: '2',
    padding: '15px',
    fontSize: '18px',
  },
  note: {
    textAlign: 'center',
    color: '#666',
    fontSize: '14px',
    marginTop: '20px',
    fontStyle: 'italic',
  },
  spinner: {
    display: 'inline-block',
    width: '20px',
    height: '20px',
    border: '3px solid rgba(255,255,255,.3)',
    borderRadius: '50%',
    borderTopColor: '#fff',
    animation: 'spin 1s ease-in-out infinite',
    marginRight: '10px',
  },
};

export default BookingSummary;