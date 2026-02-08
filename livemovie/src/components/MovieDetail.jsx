import React from 'react';
import { useNavigate } from 'react-router-dom';

const MovieDetail = ({ movie }) => {
  const navigate = useNavigate();

  if (!movie) {
    return (
      <div className="container">
        <div className="card">
          <h2>No movie selected</h2>
          <button onClick={() => navigate('/')} className="btn btn-secondary">
            Back to Movies
          </button>
        </div>
      </div>
    );
  }

  const handleProceedToSeats = () => {
    navigate('/select-seats');
  };

  return (
    <div className="container">
      <button onClick={() => navigate('/')} className="btn btn-secondary" style={styles.backBtn}>
        ← Back to Movies
      </button>
      
      <div style={styles.movieDetail}>
        <div style={styles.posterContainer}>
          <img src={movie.poster} alt={movie.title} style={styles.detailPoster} />
        </div>
        
        <div style={styles.infoContainer}>
          <h1>{movie.title}</h1>
          <div style={styles.metaInfo}>
            <span style={styles.rating}>⭐ {movie.rating}/10</span>
            <span style={styles.duration}>⏱ {movie.duration}</span>
            <span style={styles.genre}>🎭 {movie.genre}</span>
            <span style={styles.language}>🎬 {movie.language}</span>
          </div>
          
          <div style={styles.description}>
            <h3>Synopsis</h3>
            <p>{movie.description}</p>
          </div>
          
          <div style={styles.director}>
            <strong>Director:</strong> {movie.director}
          </div>
          
          <div style={styles.showtimesSection}>
            <h3>🎟 Available Showtimes</h3>
            <div style={styles.showtimeGrid}>
              {movie.showtimes.map((time, index) => (
                <div key={index} style={styles.showtimeCard}>
                  <div style={styles.timeDisplay}>{time}</div>
                  <button 
                    onClick={handleProceedToSeats}
                    className="btn btn-primary"
                    style={styles.selectTimeBtn}
                  >
                    Select
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          <button onClick={handleProceedToSeats} className="btn btn-success" style={styles.bookBtn}>
            🎫 Proceed to Seat Selection
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  backBtn: {
    marginBottom: '20px',
  },
  movieDetail: {
    display: 'flex',
    gap: '40px',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
  posterContainer: {
    flex: '0 0 300px',
  },
  detailPoster: {
    width: '100%',
    borderRadius: '10px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
  },
  infoContainer: {
    flex: '1',
    minWidth: '300px',
  },
  metaInfo: {
    display: 'flex',
    gap: '15px',
    margin: '20px 0',
    fontSize: '16px',
    color: '#666',
    flexWrap: 'wrap',
  },
  description: {
    margin: '30px 0',
    backgroundColor: '#f8f9fa',
    padding: '20px',
    borderRadius: '8px',
    lineHeight: '1.6',
  },
  director: {
    fontSize: '16px',
    color: '#555',
    marginBottom: '20px',
  },
  showtimesSection: {
    margin: '30px 0',
  },
  showtimeGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
    gap: '15px',
    marginTop: '15px',
  },
  showtimeCard: {
    backgroundColor: 'white',
    padding: '15px',
    borderRadius: '8px',
    textAlign: 'center',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  },
  timeDisplay: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  selectTimeBtn: {
    width: '100%',
  },
  bookBtn: {
    padding: '15px 30px',
    fontSize: '18px',
    marginTop: '20px',
  },
};

export default MovieDetail;