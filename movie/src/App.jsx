import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { MovieProvider } from './context/MovieContext'
import { BookingProvider } from './context/BookingContext'
import Navbar from './components/Navigation/Navbar'
import Footer from './components/Footer/Footer'
import HomePage from './page/HomePage'
import MoviesPage from './page/MoviesPage'
import RegisterPage from './page/RegisterPage'
import LoginPage from './page/LoginPage'
import BookingPage from './page/BookingPage'
import ProfilePage from './page/ProfilePage'
import SuccessPage from './page/SuccessPage'
import './App.css'

function App() {
  return (
    <AuthProvider>
      <MovieProvider>
        <BookingProvider>
          <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            <main className="flex-grow pt-16">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/movies" element={<MoviesPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/booking/:movieId" element={<BookingPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/success" element={<SuccessPage />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BookingProvider>
      </MovieProvider>
    </AuthProvider>
  )
}

export default App