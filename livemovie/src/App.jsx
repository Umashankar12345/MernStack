import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import MovieDetail from './components/MovieDetail';
import SeatSelection from './components/SeatSelection';
import BookingSummary from './components/BookingSummary';
import UserAuth from './components/UserAuth';
import ProfilePage from './pages/ProfilePage';
import Navbar from './components/Navbar';
import movieAPI from './services/api';
import authService from './utils/auth';

function App() {
  const [user, setUser] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookingData, setBookingData] = useState(null);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem('movieAppUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('movieAppUser', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    setSelectedMovie(null);
    setSelectedSeats([]);
    setBookingData(null);
    localStorage.removeItem('movieAppUser');
  };

  const handleMovieSelect = (movie) => {
    setSelectedMovie(movie);
  };

  const handleSeatSelect = (seats) => {
    setSelectedSeats(seats);
  };

  const handleBookingComplete = (data) => {
    setBookingData(data);
    // Reset selections after booking
    setSelectedSeats([]);
  };

  return (
    <Router>
      <div className="App">
        <Navbar user={user} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<HomePage onMovieSelect={handleMovieSelect} />} />
          <Route path="/movie/:id" element={
            user ? <MovieDetail movie={selectedMovie} /> : <Navigate to="/auth" />
          } />
          <Route path="/select-seats" element={
            user && selectedMovie ? 
            <SeatSelection 
              movie={selectedMovie} 
              onSeatSelect={handleSeatSelect}
              selectedSeats={selectedSeats}
            /> : 
            <Navigate to="/" />
          } />
          <Route path="/booking-summary" element={
            user && selectedMovie && selectedSeats.length > 0 ?
            <BookingSummary 
              movie={selectedMovie}
              seats={selectedSeats}
              user={user}
              onBookingComplete={handleBookingComplete}
            /> :
            <Navigate to="/" />
          } />
          <Route path="/auth" element={
            !user ? 
            <UserAuth onLogin={handleLogin} /> : 
            <Navigate to="/" />
          } />
          <Route path="/profile" element={
            user ? 
            <ProfilePage user={user} /> : 
            <Navigate to="/auth" />
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;