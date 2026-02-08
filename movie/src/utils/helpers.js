import { format } from 'date-fns';

// Format currency
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0
  }).format(amount);
};

// Format date
export const formatDate = (dateString, formatString = 'dd MMM yyyy') => {
  if (!dateString) return '';
  try {
    return format(new Date(dateString), formatString);
  } catch (error) {
    return dateString;
  }
};

// Generate random booking ID
export const generateBookingId = () => {
  const prefix = 'BMS';
  const timestamp = Date.now().toString().slice(-8);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `${prefix}${timestamp}${random}`;
};

// Truncate text
export const truncateText = (text, maxLength = 100) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

// Validate email
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// Validate phone number
export const validatePhone = (phone) => {
  const re = /^\d{10}$/;
  return re.test(phone);
};

// Generate seat layout
export const generateSeatLayout = (rows = 8, seatsPerRow = 10) => {
  const rowsArray = 'ABCDEFGHIJKLMNOP'.split('').slice(0, rows);
  const seatLayout = [];
  
  for (let i = 0; i < rowsArray.length; i++) {
    const row = rowsArray[i];
    const seats = [];
    
    for (let j = 1; j <= seatsPerRow; j++) {
      const seatId = `${row}${j}`;
      const isPremium = i >= Math.floor(rows / 2);
      const isAvailable = Math.random() > 0.3; // 70% seats available
      
      seats.push({
        id: seatId,
        row,
        number: j,
        isPremium,
        isAvailable,
        price: isPremium ? 350 : 250
      });
    }
    
    seatLayout.push({
      row,
      seats
    });
  }
  
  return seatLayout;
};

// Calculate total price
export const calculateTotal = (seats, pricePerSeat = 250, convenienceFee = 42) => {
  return (seats * pricePerSeat) + convenienceFee;
};

// Get random movie
export const getRandomMovie = (movies) => {
  if (!movies || movies.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * movies.length);
  return movies[randomIndex];
};