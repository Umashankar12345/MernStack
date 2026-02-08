import React from 'react';
import HeroSection from '../components/HeroSection/HeroSection';
import FeaturedMovies from '../components/Home/FeaturedMovies';
import UserDashboard from '../components/Home/UserDashboard';
import ComingSoon from '../components/Home/ComingSoon';
import PromoBanner from '../components/HeroSection/PromoBanner';
import StreamingHero from '../components/HeroSection/StreamingHero';

function HomePage() {
  return (
    <div className="space-y-8">
      <HeroSection />
      <PromoBanner />
      
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - User Dashboard */}
          <div className="lg:col-span-1">
            <UserDashboard />
            <div className="mt-8">
              <ComingSoon />
            </div>
          </div>
          
          {/* Right Column - Featured Movies */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Featured Movies</h2>
              <a
                href="/movies"
                className="text-bms-red hover:text-red-700 font-medium"
              >
                View All →
              </a>
            </div>
            <FeaturedMovies />
          </div>
        </div>
        
        <div className="mt-12">
          <StreamingHero />
        </div>
        
        {/* Additional Sections */}
        <div className="mt-12 grid md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Why Choose BookMyShow?</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-green-600">✓</span>
                </div>
                <span>Secure & Hassle-free Booking</span>
              </li>
              <li className="flex items-center">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-green-600">✓</span>
                </div>
                <span>Instant Ticket Confirmation</span>
              </li>
              <li className="flex items-center">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-green-600">✓</span>
                </div>
                <span>Best Price Guarantee</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Download Our App</h3>
            <p className="text-gray-600 mb-6">
              Get exclusive offers, early access to tickets, and seamless booking experience on our mobile app.
            </p>
            <div className="flex space-x-4">
              <button className="flex items-center space-x-2 px-4 py-2 bg-black text-white rounded-lg">
                <span>📱</span>
                <div className="text-left">
                  <div className="text-xs">Download on</div>
                  <div className="font-bold">App Store</div>
                </div>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-black text-white rounded-lg">
                <span>📱</span>
                <div className="text-left">
                  <div className="text-xs">Get it on</div>
                  <div className="font-bold">Google Play</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;