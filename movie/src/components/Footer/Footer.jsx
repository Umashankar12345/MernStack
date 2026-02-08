import React from 'react'
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react'

function Footer() {
  const footerLinks = {
    'Movies': ['In Theaters', 'Coming Soon', 'Exclusives', 'All Movies'],
    'Stream': ['Movies', 'TV Shows', 'Sports', 'Music'],
    'Events': ['Concerts', 'Plays', 'Comedy', 'Workshops'],
    'Help': ['About Us', 'Contact Us', 'FAQs', 'Terms & Conditions'],
    'Partner': ['List Your Show', 'Corporate', 'Offers', 'Gift Cards']
  }

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-bms-red rounded-md"></div>
              <span className="text-2xl font-bold">bookmyshow</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              India's biggest entertainment platform. Book movie tickets, stream content, 
              and discover exciting events near you.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-bms-red transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-bold text-lg mb-4">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Info */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-400">Email</p>
                <p>support@bookmyshow.com</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-400">Phone</p>
                <p>+91 1800 123 4567</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-400">Location</p>
                <p>Jalandhar, Punjab, India</p>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400">
            © 2024 BookMyShow Clone. All rights reserved. | 
            <a href="#" className="hover:text-white ml-2">Privacy Policy</a> | 
            <a href="#" className="hover:text-white ml-2">Terms of Service</a>
          </p>
          <p className="text-gray-500 text-sm mt-2">
            This is a demo project for educational purposes only.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer