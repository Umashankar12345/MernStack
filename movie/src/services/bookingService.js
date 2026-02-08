export const createBooking = async (bookingData) => {
  // In a real app, this would be an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const bookingId = `BMS${Date.now()}${Math.floor(Math.random() * 1000)}`
      const booking = {
        ...bookingData,
        bookingId,
        status: 'confirmed',
        createdAt: new Date().toISOString()
      }
      
      // Store in localStorage
      const bookings = JSON.parse(localStorage.getItem('bookings') || '[]')
      bookings.push(booking)
      localStorage.setItem('bookings', JSON.stringify(bookings))
      
      resolve(booking)
    }, 1500)
  })
}

export const getBookingsByUser = async (userId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const bookings = JSON.parse(localStorage.getItem('bookings') || '[]')
      const userBookings = bookings.filter(booking => booking.user.email === userId)
      resolve(userBookings)
    }, 1000)
  })
}

export const cancelBooking = async (bookingId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const bookings = JSON.parse(localStorage.getItem('bookings') || '[]')
      const updatedBookings = bookings.filter(booking => booking.bookingId !== bookingId)
      localStorage.setItem('bookings', JSON.stringify(updatedBookings))
      resolve(true)
    }, 1000)
  })
}