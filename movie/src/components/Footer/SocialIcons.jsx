import React from 'react'
import { Facebook, Twitter, Instagram, Youtube, Linkedin, Mail } from 'lucide-react'

function SocialIcons() {
  const socialLinks = [
    { icon: Facebook, label: 'Facebook', url: 'https://facebook.com/bookmyshow' },
    { icon: Twitter, label: 'Twitter', url: 'https://twitter.com/bookmyshow' },
    { icon: Instagram, label: 'Instagram', url: 'https://instagram.com/bookmyshow' },
    { icon: Youtube, label: 'YouTube', url: 'https://youtube.com/bookmyshow' },
    { icon: Linkedin, label: 'LinkedIn', url: 'https://linkedin.com/company/bookmyshow' },
    { icon: Mail, label: 'Email', url: 'mailto:support@bookmyshow.com' }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h4 className="font-bold text-lg mb-4">Connect With Us</h4>
        <p className="text-gray-400 mb-4">
          Follow us on social media for the latest updates, offers, and movie news.
        </p>
      </div>
      
      <div className="flex flex-wrap gap-3">
        {socialLinks.map((social) => (
          <a
            key={social.label}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 px-4 py-2 bg-gray-800 rounded-lg hover:bg-bms-red transition-colors group"
            aria-label={social.label}
          >
            <social.icon className="w-5 h-5 text-gray-400 group-hover:text-white" />
            <span className="text-sm text-gray-300 group-hover:text-white">{social.label}</span>
          </a>
        ))}
      </div>

      {/* Newsletter Subscription */}
      <div className="mt-8 p-6 bg-gray-800/50 rounded-xl">
        <h5 className="font-bold text-lg mb-3">Subscribe to Newsletter</h5>
        <p className="text-gray-400 text-sm mb-4">
          Get the latest movie updates and exclusive offers directly in your inbox.
        </p>
        <div className="flex gap-2">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-bms-red text-white"
          />
          <button className="px-4 py-2 bg-bms-red text-white rounded-lg hover:bg-red-700 transition-colors">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  )
}

export default SocialIcons