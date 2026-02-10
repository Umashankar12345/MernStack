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

function App() {
  const [user, setUser] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedPosture, setSelectedPosture] = useState({
    id: 'standard',
    name: "Standard",
    icon: "🪑",
    description: "Regular seating with standard legroom",
    priceMultiplier: 1.0,
    features: ["Standard legroom", "Regular recline", "Basic amenities"],
    color: "#3B82F6",
    badge: "Most Popular"
  });
  const [bookingData, setBookingData] = useState(null);

  useEffect(() => {
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
    setSelectedPosture({
      id: 'standard',
      name: "Standard",
      icon: "🪑",
      description: "Regular seating with standard legroom",
      priceMultiplier: 1.0,
      features: ["Standard legroom", "Regular recline", "Basic amenities"],
      color: "#3B82F6",
      badge: "Most Popular"
    });
    setBookingData(null);
    localStorage.removeItem('movieAppUser');
  };

  const handleMovieSelect = (movie) => {
    setSelectedMovie(movie);
  };

  const handleSeatSelect = (seats) => {
    setSelectedSeats(seats);
  };

  const handlePostureUpdate = (postureId) => {
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

    const newPosture = postureTypes.find(p => p.id === postureId);
    if (newPosture) {
      setSelectedPosture(newPosture);
    }
  };

  const handleBookingComplete = (data) => {
    setBookingData(data);
    setSelectedSeats([]);
    setSelectedPosture({
      id: 'standard',
      name: "Standard",
      icon: "🪑",
      description: "Regular seating with standard legroom",
      priceMultiplier: 1.0,
      features: ["Standard legroom", "Regular recline", "Basic amenities"],
      color: "#3B82F6",
      badge: "Most Popular"
    });
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
              selectedSeats={selectedSeats}
              onSeatSelect={handleSeatSelect}
              initialPosture={selectedPosture.id}
              onPostureChange={handlePostureUpdate}
            /> : 
            <Navigate to="/" />
          } />
          <Route path="/booking-summary" element={
            user && selectedMovie && selectedSeats.length > 0 ?
            <BookingSummary 
              movie={selectedMovie}
              seats={selectedSeats}
              user={user}
              posture={selectedPosture}
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