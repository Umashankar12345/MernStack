export const API_BASE_URL = 'https://api.tvmaze.com';

export const GENRES = [
  'Action', 'Adventure', 'Animation', 'Comedy', 'Crime',
  'Documentary', 'Drama', 'Family', 'Fantasy', 'History',
  'Horror', 'Music', 'Mystery', 'Romance', 'Science Fiction',
  'Thriller', 'War', 'Western'
];

export const LANGUAGES = [
  'English', 'Hindi', 'Tamil', 'Telugu', 'Malayalam',
  'Kannada', 'Bengali', 'Marathi', 'Gujarati', 'Punjabi'
];

export const CITIES = [
  'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai',
  'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur', 'Surat'
];

export const THEATER_CHAINS = [
  'PVR Cinemas',
  'INOX',
  'Cinepolis',
  'Carnival Cinemas',
  'Wave Cinemas',
  'Miraj Cinemas',
  'Asian Cinemas'
];

export const SEAT_PRICES = {
  'Standard': 250,
  'Premium': 350,
  'VIP': 500
};

export const PAYMENT_METHODS = [
  { id: 'credit', name: 'Credit Card', icon: '💳' },
  { id: 'debit', name: 'Debit Card', icon: '🏦' },
  { id: 'upi', name: 'UPI', icon: '📱' },
  { id: 'netbanking', name: 'Net Banking', icon: '🌐' },
  { id: 'wallet', name: 'Wallet', icon: '👛' }
];

export const UPI_APPS = [
  { id: 'googlepay', name: 'Google Pay', color: 'bg-gradient-to-r from-blue-400 to-purple-500' },
  { id: 'phonepay', name: 'PhonePe', color: 'bg-gradient-to-r from-purple-500 to-blue-600' },
  { id: 'paytm', name: 'Paytm', color: 'bg-gradient-to-r from-blue-500 to-blue-700' },
  { id: 'amazonpay', name: 'Amazon Pay', color: 'bg-gradient-to-r from-yellow-400 to-orange-500' }
];