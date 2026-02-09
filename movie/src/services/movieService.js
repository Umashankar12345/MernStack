const API_BASE = 'https://api.tvmaze.com'

const movieCache = new Map()

export const getRandomMovies = async (limit = 8) => {
  try {
    const cacheKey = `movies_${limit}`
    if (movieCache.has(cacheKey)) {
      return movieCache.get(cacheKey)
    }

    const response = await fetch(`${API_BASE}/search/shows?q=all`)
    if (!response.ok) throw new Error('Failed to fetch movies')
    const data = await response.json()
    const shuffled = [...data].sort(() => 0.5 - Math.random())
    const movies = shuffled.slice(0, limit)
    
    movieCache.set(cacheKey, movies)
    return movies
  } catch (error) {
    console.error('Error fetching movies:', error)
    throw new Error('Failed to fetch movies. Please try again.')
  }
}

export const getMovieById = async (id) => {
  try {
    const cacheKey = `movie_${id}`
    if (movieCache.has(cacheKey)) {
      return movieCache.get(cacheKey)
    }

    const response = await fetch(`${API_BASE}/shows/${id}`)
    if (!response.ok) throw new Error('Failed to fetch movie details')
    const data = await response.json()
    movieCache.set(cacheKey, data)
    return data
  } catch (error) {
    console.error('Error fetching movie:', error)
    throw new Error('Failed to fetch movie details.')
  }
}

export const searchMovies = async (query) => {
  try {
    const response = await fetch(`${API_BASE}/search/shows?q=${encodeURIComponent(query)}`)
    if (!response.ok) throw new Error('Failed to search movies')
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error searching movies:', error)
    throw new Error('Failed to search movies.')
  }
}

export const getMoviesByGenre = async (genre) => {
  try {
    const response = await fetch(`${API_BASE}/search/shows?q=${genre}`)
    if (!response.ok) throw new Error('Failed to fetch movies')
    const data = await response.json()
    return data.slice(0, 10)
  } catch (error) {
    console.error('Error fetching movies by genre:', error)
    throw new Error('Failed to fetch movies.')
  }
}