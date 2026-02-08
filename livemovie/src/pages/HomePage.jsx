import React from 'react';
import MovieList from '../components/MovieList';

const HomePage = ({ onMovieSelect }) => {
  return (
    <div>
      <div style={styles.hero}>
        <div className="container">
          <h1 style={styles.heroTitle}>Welcome to MovieApp</h1>
          <p style={styles.heroSubtitle}>Book tickets for the latest movies in just a few clicks!</p>
        </div>
      </div>
      <MovieList onMovieSelect={onMovieSelect} />
    </div>
  );
};

const styles = {
  hero: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    padding: '60px 0',
    textAlign: 'center',
  },
  heroTitle: {
    fontSize: '48px',
    marginBottom: '20px',
  },
  heroSubtitle: {
    fontSize: '20px',
    opacity: 0.9,
  },
};

export default HomePage;