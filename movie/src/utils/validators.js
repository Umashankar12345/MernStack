export const validateRegistration = (data) => {
  const errors = {}

  if (!data.name?.trim()) {
    errors.name = 'Name is required'
  } else if (data.name.length < 2) {
    errors.name = 'Name must be at least 2 characters'
  }

  if (!data.roll?.trim()) {
    errors.roll = 'Roll number is required'
  }

  if (!data.email?.trim()) {
    errors.email = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Please enter a valid email address'
  }

  if (!data.password) {
    errors.password = 'Password is required'
  } else if (data.password.length < 6) {
    errors.password = 'Password must be at least 6 characters'
  }

  if (data.password !== data.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match'
  }

  return errors
}

export const validateLogin = (data) => {
  const errors = {}

  if (!data.email?.trim()) {
    errors.email = 'Email is required'
  }

  if (!data.password) {
    errors.password = 'Password is required'
  }

  return errors
}

export const validateBooking = (data) => {
  const errors = {}

  if (!data.theater) {
    errors.theater = 'Please select a theater'
  }

  if (!data.date) {
    errors.date = 'Please select a date'
  } else {
    const selectedDate = new Date(data.date)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    if (selectedDate < today) {
      errors.date = 'Please select a future date'
    }
  }

  if (!data.time) {
    errors.time = 'Please select a show time'
  }

  if (!data.seats || data.seats < 1) {
    errors.seats = 'Please select at least 1 seat'
  } else if (data.seats > 10) {
    errors.seats = 'Maximum 10 seats per booking'
  }

  if (!data.paymentMethod) {
    errors.paymentMethod = 'Please select a payment method'
  }

  return errors
}