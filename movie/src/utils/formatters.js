export const formatMovieDuration = (minutes) => {
  if (!minutes) return '2h 0m'
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return `${hours}h ${mins}m`
}

export const formatMovieGenres = (genres) => {
  if (!genres || !Array.isArray(genres)) return 'N/A'
  return genres.join(' • ')
}

export const formatMovieRating = (rating) => {
  if (!rating) return 'N/A'
  return rating.average ? rating.average.toFixed(1) : 'N/A'
}

export const formatBookingSummary = (booking) => {
  return {
    movie: booking.movie.name,
    date: booking.tickets.date,
    time: booking.tickets.time,
    theater: booking.tickets.theater,
    seats: booking.tickets.seats,
    total: booking.tickets.totalPrice,
    bookingId: booking.bookingId
  }
}

export const formatSeatNumbers = (seatCount) => {
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G']
  const seats = []
  
  for (let i = 1; i <= seatCount; i++) {
    const row = rows[Math.floor((i - 1) / 10)]
    const seatNum = ((i - 1) % 10) + 1
    seats.push(`${row}${seatNum}`)
  }
  
  return seats.join(', ')
}