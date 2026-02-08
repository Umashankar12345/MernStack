// src/context/BookingContext.jsx
import React, { createContext, useState, useContext } from 'react';

export const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [bookings, setBookings] = useState([]);
  const [currentBooking, setCurrentBooking] = useState(null);

  const saveBooking = (bookingData) => {
    const newBooking = {
      ...bookingData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    
    const updatedBookings = [...bookings, newBooking];
    setBookings(updatedBookings);
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));
    
    return newBooking;
  };

  const getBookings = () => {
    const storedBookings = localStorage.getItem('bookings');
    if (storedBookings) {
      try {
        const parsedBookings = JSON.parse(storedBookings);
        setBookings(parsedBookings);
        return parsedBookings;
      } catch (error) {
        console.error('Error parsing bookings:', error);
        return [];
      }
    }
    return [];
  };

  const cancelBooking = (bookingId) => {
    const updatedBookings = bookings.filter(booking => booking.id !== bookingId);
    setBookings(updatedBookings);
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));
  };

  const value = {
    bookings,
    currentBooking,
    setCurrentBooking,
    saveBooking,
    getBookings,
    cancelBooking
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
};

// ✅ CORRECT: Export hook OUTSIDE the Provider function
export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};

// ❌ REMOVE: export default BookingContext;