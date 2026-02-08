import React from 'react'
import { useMovies } from '../../context/MovieContext'
import { Filter } from 'lucide-react'

function MovieFilter() {
  const { filterMoviesByGenre } = useMovies()
  const [activeFilter, setActiveFilter] = React.useState('all')

  const filters = [
    { id: 'all', label: 'All Movies' },
    { id: 'action', label: 'Action' },
    { id: 'drama', label: 'Drama' },
    { id: 'comedy', label: 'Comedy' },
    { id: 'thriller', label: 'Thriller' },
    { id: 'sci-fi', label: 'Sci-Fi' },
  ]

  const handleFilter = (filterId) => {
    setActiveFilter(filterId)
    filterMoviesByGenre(filterId)
  }

  return (
    <div className="flex items-center space-x-2 overflow-x-auto pb-2">
      <Filter className="w-4 h-4 text-gray-500 flex-shrink-0" />
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => handleFilter(filter.id)}
          className={`px-4 py-2 whitespace-nowrap rounded-full text-sm font-medium transition-colors ${
            activeFilter === filter.id
              ? 'bg-bms-red text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  )
}

export default MovieFilter