import React from 'react'
import { Link } from 'react-router-dom'
import { Film, Tv, Trophy, Calendar, Music, Globe } from 'lucide-react'

function FooterLinks() {
  const footerCategories = [
    {
      title: 'Movies',
      icon: Film,
      links: [
        { name: 'In Theaters', path: '/movies' },
        { name: 'Coming Soon', path: '/movies?filter=coming-soon' },
        { name: 'Exclusives', path: '/movies?filter=exclusives' },
        { name: 'All Movies', path: '/movies?filter=all' }
      ]
    },
    {
      title: 'Stream',
      icon: Tv,
      links: [
        { name: 'Movies', path: '/stream/movies' },
        { name: 'TV Shows', path: '/stream/tv-shows' },
        { name: 'Sports', path: '/stream/sports' },
        { name: 'Music', path: '/stream/music' }
      ]
    },
    {
      title: 'Events',
      icon: Calendar,
      links: [
        { name: 'Concerts', path: '/events/concerts' },
        { name: 'Plays', path: '/events/plays' },
        { name: 'Comedy', path: '/events/comedy' },
        { name: 'Workshops', path: '/events/workshops' }
      ]
    },
    {
      title: 'Activities',
      icon: Globe,
      links: [
        { name: 'Adventure', path: '/activities/adventure' },
        { name: 'Food & Drinks', path: '/activities/food' },
        { name: 'Workshops', path: '/activities/workshops' },
        { name: 'Tours', path: '/activities/tours' }
      ]
    }
  ]

  const quickLinks = [
    { name: 'About Us', path: '/about' },
    { name: 'Contact Us', path: '/contact' },
    { name: 'FAQs', path: '/faqs' },
    { name: 'Terms & Conditions', path: '/terms' },
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'List Your Show', path: '/partner/list-show' },
    { name: 'Corporate', path: '/partner/corporate' },
    { name: 'Offers', path: '/offers' },
    { name: 'Gift Cards', path: '/gift-cards' }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {/* Categories */}
      {footerCategories.map((category) => (
        <div key={category.title} className="space-y-4">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-bms-red/10 rounded-lg flex items-center justify-center">
              <category.icon className="w-5 h-5 text-bms-red" />
            </div>
            <h4 className="font-bold text-lg">{category.title}</h4>
          </div>
          
          <ul className="space-y-2">
            {category.links.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className="text-gray-400 hover:text-white transition-colors block py-1"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}

      {/* Quick Links */}
      <div className="lg:col-span-4 mt-8 pt-8 border-t border-gray-800">
        <h4 className="font-bold text-lg mb-4">Quick Links</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {quickLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="text-gray-400 hover:text-white transition-colors text-sm py-1"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FooterLinks