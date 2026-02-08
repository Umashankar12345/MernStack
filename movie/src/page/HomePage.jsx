import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection/HeroSection';
import FeaturedMovies from '../components/Home/FeaturedMovies';
import ComingSoon from '../components/Home/ComingSoon';
import UserDashboard from '../components/Home/UserDashboard';
import { AuthContext } from '../context/AuthContext';
import { Film, Tv, Trophy, Calendar, Music, Globe } from 'lucide-react';

function HomePage() {
  const { user } = useContext(AuthContext);

  const categories = [
    { icon: Film, label: 'Movies', color: 'bg-red-100 text-red-600' },
    { icon: Tv, label: 'Stream', color: 'bg-blue-100 text-blue-600' },
    { icon: Trophy, label: 'Sports', color: 'bg-green-100 text-green-600' },
    { icon: Calendar, label: 'Events', color: 'bg-purple-100 text-purple-600' },
    { icon: Music, label: 'Plays', color: 'bg-yellow-100 text-yellow-600' },
    { icon: Globe, label: 'Activities', color: 'bg-indigo-100 text-indigo-600' },
  ];

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <HeroSection />

      {/* Quick Categories */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Browse By Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <Link
              key={index}
              to={`/${category.label.toLowerCase()}`}
              className="bg-white p-6 rounded-xl shadow-bms hover:shadow-bms-lg transition-shadow text-center"
            >
              <div className={`${category.color} w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3`}>
                <category.icon className="w-6 h-6" />
              </div>
              <span className="font-medium">{category.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Featured Movies */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Recommended Movies</h2>
              <Link to="/movies" className="text-bms-red hover:text-red-700 font-medium">
                View All →
              </Link>
            </div>
            <FeaturedMovies />
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Coming Soon */}
            <ComingSoon />

            {/* User Dashboard */}
            {user && <UserDashboard />}

            {/* Promotions */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-2xl">
              <h3 className="text-xl font-bold mb-3">Special Offer!</h3>
              <p className="mb-4">Get 50% off on your first booking</p>
              <button className="w-full py-2 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100">
                Claim Offer
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stream Section */}
      <div className="bg-gradient-to-r from-gray-900 to-black text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <Tv className="w-5 h-5" />
                <span className="font-medium">STREAM</span>
              </div>
              <h2 className="text-4xl font-bold mb-4">A hilarious adventure comes home to you!</h2>
              <p className="text-xl mb-8 text-gray-200">Watch the latest movies and shows from home</p>
              <button className="px-8 py-3 bg-white text-gray-900 font-bold rounded-lg hover:bg-gray-100 transition">
                Buy/Rent Online
              </button>
            </div>
            <div className="md:w-1/2">
              <div className="relative">
                <div className="w-64 h-96 bg-gradient-to-br from-red-500 to-yellow-500 rounded-2xl transform rotate-3 mx-auto"></div>
                <div className="w-64 h-96 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl absolute top-0 left-1/2 transform -translate-x-1/2 -rotate-3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;