import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { User, Mail, Phone, MapPin, Calendar, Ticket, Edit, Save, X } from 'lucide-react';

function ProfilePage() {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    location: user?.location || '',
  });

  if (!user) {
    return <Navigate to="/login" />;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone || '',
      location: user.location || '',
    });
    setIsEditing(false);
  };

  const recentBookings = user.bookings?.slice(0, 3) || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">My Profile</h1>
          <p className="text-gray-600">Manage your account and view booking history</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Profile Card */}
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <User className="w-10 h-10 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">{user.name}</h2>
                    <p className="text-gray-600">Member since {new Date().getFullYear()}</p>
                  </div>
                </div>
                
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center space-x-2 px-4 py-2 border border-bms-red text-bms-red rounded-lg hover:bg-red-50"
                  >
                    <Edit className="w-4 h-4" />
                    <span>Edit Profile</span>
                  </button>
                ) : (
                  <div className="flex space-x-2">
                    <button
                      onClick={handleSubmit}
                      className="flex items-center space-x-2 px-4 py-2 bg-bms-red text-white rounded-lg hover:bg-red-700"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save</span>
                    </button>
                    <button
                      onClick={handleCancel}
                      className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                    >
                      <X className="w-4 h-4" />
                      <span>Cancel</span>
                    </button>
                  </div>
                )}
              </div>

              <form onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <User className="inline w-4 h-4 mr-2" />
                      Full Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="input-field"
                        required
                      />
                    ) : (
                      <div className="text-lg font-medium">{user.name}</div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Mail className="inline w-4 h-4 mr-2" />
                      Email Address
                    </label>
                    {isEditing ? (
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="input-field"
                        required
                      />
                    ) : (
                      <div className="text-lg font-medium">{user.email}</div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Phone className="inline w-4 h-4 mr-2" />
                      Phone Number
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="input-field"
                      />
                    ) : (
                      <div className="text-lg font-medium">{user.phone || 'Not provided'}</div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <MapPin className="inline w-4 h-4 mr-2" />
                      Location
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="input-field"
                      />
                    ) : (
                      <div className="text-lg font-medium">{user.location || 'Not provided'}</div>
                    )}
                  </div>
                </div>
              </form>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t">
                <div className="text-center">
                  <div className="text-2xl font-bold text-bms-red">{user.bookings?.length || 0}</div>
                  <div className="text-sm text-gray-600">Total Bookings</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-bms-red">
                    {recentBookings.length}
                  </div>
                  <div className="text-sm text-gray-600">Recent</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-bms-red">₹{
                    user.bookings?.reduce((total, booking) => total + (booking.totalPrice || 0), 0) || 0
                  }</div>
                  <div className="text-sm text-gray-600">Total Spent</div>
                </div>
              </div>
            </div>

            {/* Recent Bookings */}
            <div className="card">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <Ticket className="w-5 h-5 mr-2" />
                Recent Bookings
              </h3>
              
              {recentBookings.length > 0 ? (
                <div className="space-y-4">
                  {recentBookings.map((booking, index) => (
                    <div key={index} className="border rounded-lg p-4 hover:bg-gray-50">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold text-gray-800">{booking.movieTitle}</h4>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mt-2">
                            <span className="flex items-center">
                              <Calendar className="w-3 h-3 mr-1" />
                              {new Date(booking.bookingDate).toLocaleDateString()}
                            </span>
                            <span>{booking.theater}</span>
                            <span>{booking.showTime}</span>
                          </div>
                          <div className="flex items-center mt-2">
                            {booking.seats.map((seat, idx) => (
                              <span key={idx} className="mr-2 px-2 py-1 bg-gray-100 rounded text-sm">
                                {seat}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-bms-red">₹{booking.totalPrice}</div>
                          <div className="text-sm text-gray-500">{booking.seats.length} seats</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Ticket className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-600">No bookings yet</p>
                  <a
                    href="/movies"
                    className="inline-block mt-3 text-bms-red hover:text-red-700"
                  >
                    Browse Movies
                  </a>
                </div>
              )}
              
              {user.bookings?.length > 3 && (
                <div className="text-center mt-6 pt-6 border-t">
                  <a
                    href="#"
                    className="text-bms-red hover:text-red-700 font-medium"
                  >
                    View All Bookings →
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Quick Actions */}
          <div className="space-y-6">
            <div className="card">
              <h3 className="font-bold text-gray-800 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <a
                  href="/movies"
                  className="block p-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-center"
                >
                  Book Tickets
                </a>
                <a
                  href="#"
                  className="block p-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-center"
                >
                  View Offers
                </a>
                <a
                  href="#"
                  className="block p-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-center"
                >
                  Gift Cards
                </a>
                <a
                  href="#"
                  className="block p-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-center"
                >
                  Help Center
                </a>
              </div>
            </div>

            <div className="card bg-gradient-to-r from-blue-50 to-cyan-50">
              <h3 className="font-bold text-gray-800 mb-4">Account Settings</h3>
              <div className="space-y-3">
                <a
                  href="#"
                  className="block p-3 hover:bg-white/50 rounded-lg"
                >
                  Change Password
                </a>
                <a
                  href="#"
                  className="block p-3 hover:bg-white/50 rounded-lg"
                >
                  Notification Settings
                </a>
                <a
                  href="#"
                  className="block p-3 hover:bg-white/50 rounded-lg"
                >
                  Privacy Settings
                </a>
              </div>
            </div>

            <div className="card">
              <h3 className="font-bold text-gray-800 mb-4">Preferences</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span>Email Notifications</span>
                  <label className="switch">
                    <input type="checkbox" defaultChecked />
                    <span className="slider"></span>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <span>SMS Notifications</span>
                  <label className="switch">
                    <input type="checkbox" />
                    <span className="slider"></span>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <span>Promotional Offers</span>
                  <label className="switch">
                    <input type="checkbox" defaultChecked />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;