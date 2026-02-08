// Simulates API calls for authentication
export const loginUser = async (email, password) => {
  // In a real app, this would be an API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const storedUser = localStorage.getItem('user')
      if (storedUser) {
        const user = JSON.parse(storedUser)
        if (user.email === email && user.password === password) {
          resolve(user)
        } else {
          reject(new Error('Invalid email or password'))
        }
      } else {
        reject(new Error('User not found. Please register first.'))
      }
    }, 1000)
  })
}

export const registerUser = async (userData) => {
  // In a real app, this would be an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      localStorage.setItem('user', JSON.stringify(userData))
      resolve(userData)
    }, 1000)
  })
}

export const logoutUser = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, 500)
  })
}