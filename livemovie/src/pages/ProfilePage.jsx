import React from 'react';

const ProfilePage = ({ user }) => {
  const bookingHistory = [
    { id: 1, movie: "Spider-Man: No Way Home", date: "2024-01-15", seats: "A1, A2", amount: 400 },
    { id: 2, movie: "The Batman", date: "2024-01-10", seats: "B3, B4", amount: 400 },
    { id: 3, movie: "Avatar 2", date: "2024-01-05", seats: "C5", amount: 200 },
  ];

  return (
    <div className="container">
      <h1 style={styles.header}>👤 My Profile</h1>
      
      <div style={styles.profileGrid}>
        <div style={styles.profileCard}>
          <div style={styles.avatar}>
            {user.name.charAt(0).toUpperCase()}
          </div>
          <h2 style={styles.userName}>{user.name}</h2>
          <div style={styles.userInfo}>
            <div style={styles.infoRow}>
              <span style={styles.label}>Email:</span>
              <span style={styles.value}>{user.email}</span>
            </div>
            <div style={styles.infoRow}>
              <span style={styles.label}>Member Since:</span>
              <span style={styles.value}>{user.joinDate || 'January 2024'}</span>
            </div>
            <div style={styles.infoRow}>
              <span style={styles.label}>Total Bookings:</span>
              <span style={styles.value}>{bookingHistory.length}</span>
            </div>
          </div>
        </div>

        <div style={styles.historyCard}>
          <h2 style={styles.sectionTitle}>📜 Booking History</h2>
          {bookingHistory.length > 0 ? (
            <div style={styles.historyList}>
              {bookingHistory.map(booking => (
                <div key={booking.id} style={styles.bookingItem}>
                  <div style={styles.bookingHeader}>
                    <h3 style={styles.bookingMovie}>{booking.movie}</h3>
                    <span style={styles.bookingDate}>{booking.date}</span>
                  </div>
                  <div style={styles.bookingDetails}>
                    <span>Seats: {booking.seats}</span>
                    <span>Amount: ₹{booking.amount}</span>
                  </div>
                  <div style={styles.bookingStatus}>
                    <span style={styles.statusCompleted}>Completed</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p style={styles.noHistory}>No booking history yet.</p>
          )}
        </div>

        <div style={styles.preferencesCard}>
          <h2 style={styles.sectionTitle}>⚙️ Preferences</h2>
          <div style={styles.preferenceItem}>
            <span>Email Notifications</span>
            <label style={styles.switch}>
              <input type="checkbox" defaultChecked />
              <span style={styles.slider}></span>
            </label>
          </div>
          <div style={styles.preferenceItem}>
            <span>SMS Notifications</span>
            <label style={styles.switch}>
              <input type="checkbox" defaultChecked />
              <span style={styles.slider}></span>
            </label>
          </div>
          <div style={styles.preferenceItem}>
            <span>Preferred Language</span>
            <select style={styles.select}>
              <option>English</option>
              <option>Hindi</option>
              <option>Other</option>
            </select>
          </div>
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
  profileGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '30px',
  },
  profileCard: {
    backgroundColor: 'white',
    borderRadius: '15px',
    padding: '30px',
    textAlign: 'center',
    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
  },
  avatar: {
    width: '100px',
    height: '100px',
    backgroundColor: '#007bff',
    color: 'white',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '36px',
    fontWeight: 'bold',
    margin: '0 auto 20px',
  },
  userName: {
    fontSize: '28px',
    marginBottom: '20px',
    color: '#333',
  },
  userInfo: {
    textAlign: 'left',
  },
  infoRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 0',
    borderBottom: '1px solid #eee',
  },
  label: {
    color: '#666',
    fontWeight: 'bold',
  },
  value: {
    color: '#333',
  },
  historyCard: {
    backgroundColor: 'white',
    borderRadius: '15px',
    padding: '30px',
    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
  },
  preferencesCard: {
    backgroundColor: 'white',
    borderRadius: '15px',
    padding: '30px',
    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
  },
  sectionTitle: {
    marginBottom: '20px',
    color: '#333',
    fontSize: '22px',
  },
  historyList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  bookingItem: {
    backgroundColor: '#f8f9fa',
    padding: '15px',
    borderRadius: '8px',
    borderLeft: '4px solid #28a745',
  },
  bookingHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
  },
  bookingMovie: {
    fontSize: '16px',
    margin: 0,
  },
  bookingDate: {
    color: '#666',
    fontSize: '14px',
  },
  bookingDetails: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '14px',
    color: '#555',
    marginBottom: '10px',
  },
  bookingStatus: {
    textAlign: 'right',
  },
  statusCompleted: {
    backgroundColor: '#28a745',
    color: 'white',
    padding: '3px 10px',
    borderRadius: '3px',
    fontSize: '12px',
  },
  noHistory: {
    textAlign: 'center',
    color: '#666',
    fontStyle: 'italic',
  },
  preferenceItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 0',
    borderBottom: '1px solid #eee',
  },
  switch: {
    position: 'relative',
    display: 'inline-block',
    width: '50px',
    height: '24px',
  },
  slider: {
    position: 'absolute',
    cursor: 'pointer',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#ccc',
    transition: '.4s',
    borderRadius: '34px',
  },
  select: {
    padding: '8px 12px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    backgroundColor: 'white',
    fontSize: '14px',
  },
};

export default ProfilePage;