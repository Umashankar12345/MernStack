import React, { useState } from 'react';
import { useMovies } from '../context/MovieContext';
import MovieList from '../components/MovieList/MovieList';
import MovieFilter from '../components/MovieList/MovieFilter';
import { Search, Filter, Grid, List } from 'lucide-react';

function MoviesPage() {
  const { filterMovies } = useMovies();
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  
  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    filterMovies({ search: term });
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Browse Movies</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover the latest movies, book tickets in advance, and enjoy exclusive offers.
          Your perfect movie experience starts here.
        </p>
      </div>
      
      {/* Search and Filter Bar */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search movies by title, genre, or actor..."
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-bms-red"
            />
          </div>
          
          {/* View Toggle */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-3 rounded-lg ${
                viewMode === 'grid'
                  ? 'bg-bms-red text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-3 rounded-lg ${
                viewMode === 'list'
                  ? 'bg-bms-red text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {/* Genre Filter */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center text-gray-600">
            <Filter className="w-4 h-4 mr-2" />
            <span className="font-medium">Filter by:</span>
          </div>
          <MovieFilter />
        </div>
      </div>
      
      {/* Movie List */}
      <div className={viewMode === 'grid' 
        ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
        : 'space-y-4'
      }>
        <MovieList />
      </div>
      
      {/* Stats */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-bms-red">1000+</div>
            <div className="text-gray-600">Movies Available</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-bms-red">50+</div>
            <div className="text-gray-600">Genres</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-bms-red">100+</div>
            <div className="text-gray-600">Theaters</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-bms-red">24/7</div>
            <div className="text-gray-600">Support</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MoviesPage;