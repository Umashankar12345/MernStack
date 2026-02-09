# Movie App - How It Works 🎬

## App Flow Diagram

```
START
  ↓
[HOME PAGE] - Browse Featured Movies
  ↓
┌─────────────────────────┬──────────────────────┐
│                         │                      │
v                         v                      v
[Search Movies]    [View All Movies]      [Need Account?]
  ↓                       ↓                      ↓
Find by Title        Browse & Filter       [REGISTER]
Find by Genre        View Details          └─→ Enter Name & Email
Find by Actor        Click "Book Tickets"      Enter Password
  │                       │                     Create Account
  └───────────┬───────────┘                     ↓
              ↓                              [LOGIN PAGE]
        [CLICK MOVIE]                        Enter Email & Password
              ↓                              ↓ (if already registered)
      [BOOKING PAGE]                     [Return to Movie]
       Movie Details                         ↓
       ↓                                 [BOOKING PAGE]
    STEP 1: Select Theater
    ├─ PVR Cinemas, Jalandhar
    ├─ INOX, Jalandhar
    ├─ Cinepolis, Jalandhar
    └─ Wave Cinemas, Jalandhar
       ↓
    STEP 2: Select Date & Time
    ├─ Pick any date
    └─ Choose from: 14:00, 16:00, 18:00, 20:00, 22:00
       ↓
    STEP 3: Select Number of Seats
    ├─ Use +/- buttons or direct input
    ├─ Range: 1-10 seats
    └─ Price: ₹250 per seat
       ↓
    STEP 4: Select Payment Method
    ├─ Credit Card 💳
    ├─ Debit Card 🏦
    ├─ UPI 📱
    └─ Net Banking 🌐
       ↓
    Review Price Summary
    ├─ Ticket Price = Seats × ₹250
    ├─ Convenience Fee = ₹42
    └─ Total = Ticket Price + Convenience Fee
       ↓
    [CONFIRM BOOKING]
    Pay ₹{Total Amount}
       ↓
[SUCCESS PAGE] ✅
├─ Booking Confirmation
├─ Booking ID: BMS{timestamp}
├─ Download/Print Receipt
├─ Share Booking
└─ Return to Movies
       ↓
      END
```

---

## Data Flow

### User Registration Flow
```javascript
User Input (Name, Email, Password)
           ↓
      Validation
           ↓
    AuthContext.register()
           ↓
   Save to localStorage
   (bookmyshow_user, bookmyshow_token, bookmyshow_token_expiry)
           ↓
        setUser()
           ↓
      Navigate to Home
```

### Movie Booking Flow
```javascript
Click Movie on List/Home
           ↓
    useParams() gets movieId
           ↓
BookingContext.getMovieById(movieId)
           ↓
 Fetch from TVMaze API
           ↓
  Display Movie Details
           ↓
  Multi-step Form (Theater → Date/Time → Seats → Payment)
           ↓
BookingContext.saveBooking(bookingData)
           ↓
 Save to localStorage (bookings array)
           ↓
 Navigate to Success Page
           ↓
 Display Confirmation & Booking Details
```

---

## Component Architecture

```
<App>
  ├─ <AuthProvider> → AuthContext
  ├─ <MovieProvider> → MovieContext (TVMaze movies)
  ├─ <BookingProvider> → BookingContext (user bookings)
  │
  ├─ <Navbar> (Navigation & Auth buttons)
  ├─ <Routes>
  │  ├─ / → <HomePage>
  │  │     ├─ <HeroSection>
  │  │     ├─ <FeaturedMovies> (6 movies from MovieContext)
  │  │     ├─ <ComingSoon>
  │  │     └─ <UserDashboard> (if logged in)
  │  │
  │  ├─ /movies → <MoviesPage>
  │  │     ├─ <MovieList> (all movies with search)
  │  │     └─ <MovieFilter> (by genre)
  │  │
  │  ├─ /register → <RegisterPage>
  │  │     └─ <Register> (form)
  │  │
  │  ├─ /login → <LoginPage>
  │  │     └─ <Login> (email/password form)
  │  │
  │  ├─ /booking/:movieId → <BookingPage>
  │  │     └─ <Booking> (4-step booking component)
  │  │
  │  ├─ /profile → <ProfilePage> (user's bookings)
  │  │
  │  └─ /success → <SuccessPage> (confirmation)
  │
  └─ <Footer>
```

---

## Data Structures

### User Object (Stored in localStorage as 'bookmyshow_user')
```javascript
{
  name: "John Doe",
  email: "john@example.com",
  password: "encrypted",
  phone: "9876543210",
  dob: "1990-01-15",
  createdAt: "2024-01-20T10:30:00Z",
  bookings: []
}
```

### Movie Object (From TVMaze API)
```javascript
{
  score: 0.95,
  show: {
    id: 1,
    name: "Game of Thrones",
    language: "English",
    genres: ["Drama", "Adventure"],
    runtime: 60,
    rating: { average: 9.2 },
    image: {
      medium: "https://...",
      original: "https://..."
    },
    summary: "<p>Description...</p>",
    premiered: "2011-04-18",
    ended: "2019-05-19"
  }
}
```

### Booking Object (Saved in localStorage as 'bookings')
```javascript
{
  id: "1705748432000",
  createdAt: "2024-01-20T10:30:32.000Z",
  movie: {
    name: "Game of Thrones",
    image: "https://...",
    rating: 9.2,
    genres: ["Drama", "Adventure"]
  },
  user: {
    name: "John Doe",
    email: "john@example.com"
  },
  tickets: {
    seats: 2,
    date: "2024-02-15",
    time: "18:00",
    theater: "PVR Cinemas, Jalandhar",
    ticketPrice: 250,
    convenienceFee: 42,
    totalPrice: 542
  },
  paymentMethod: "upi"
}
```

---

## API Usage

### TVMaze API Endpoints Used

1. **Search Movies** (with random shuffle)
   ```
   GET /search/shows?q=all
   Returns: Array of { score, show: {...} }
   ```

2. **Get Movie Details**
   ```
   GET /shows/{id}
   Returns: { id, name, genres, rating, image, summary, ... }
   ```

3. **Search Movies by Term**
   ```
   GET /search/shows?q={searchTerm}
   Returns: Array of { score, show: {...} }
   ```

---

## Key Features Implemented

✅ **User Authentication**
- Register with email & password
- Login session management
- Token expiry (24 hours)
- Logout functionality

✅ **Movie Management**
- Browse movies from TVMaze
- Search by title
- Filter by genre
- View movie details

✅ **Booking System**
- Select theater location
- Choose date & time
- Pick number of seats
- Select payment method
- Generate booking ID

✅ **Data Persistence**
- localStorage for user data
- localStorage for bookings
- Session expiry handling

---

## Testing the App

### Test Case 1: Register & Login
1. Go to `/register`
2. Enter Name: "John Doe", Email: "john@test.com", Password: "password123"
3. Click "Create Account"
4. Should redirect to Home
5. Click "Sign In" in Navbar
6. Enter same email & password
7. Should show "Welcome back, John Doe"

### Test Case 2: Browse & Search
1. Go to `/movies`
2. In search bar, type "Breaking"
3. Should show filtered results
4. Click on a movie

### Test Case 3: Complete Booking
1. On movie detail page, click "Book Tickets"
2. **Step 1:** Select a theater, click "Next"
3. **Step 2:** Pick a date, select a time, click "Next"
4. **Step 3:** Select number of seats (try 2), click "Next"
5. **Step 4:** Select payment method, click "Pay ₹542"
6. Should show Success Page with booking details

### Test Case 4: Logout
1. Click on your name in Navbar
2. Click "Logout"
3. Should redirect to Home
4. Navbar should show "Sign In" & "Sign Up" buttons

---

## Troubleshooting

**Issue:** "useAuth must be used within AuthProvider"
- **Solution:** Ensure App.jsx has `<AuthProvider>` wrapping everything

**Issue:** Movies not loading
- **Solution:** Check internet connection (TVMaze API requires it)
- **Solution:** Try refreshing page

**Issue:** Booking not saving
- **Solution:** Make sure you're logged in before booking
- **Solution:** Check browser's localStorage is enabled

**Issue:** Search not working
- **Solution:** Type at least 1 character
- **Solution:** Try different search terms

---

## Development Notes

- **Tech Stack:** React 18 + React Router v6 + TailwindCSS + Vite
- **API:** TVMaze API (free, no authentication needed)
- **Storage:** Browser localStorage (no backend database)
- **State Management:** React Context API
- **UI Components:** Lucide-react icons

---

**Happy movie booking! Enjoy! 🎬🍿** 🎉
