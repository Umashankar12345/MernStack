import React from 'react'
import { Gift, Tag, Clock, Shield, TrendingUp } from 'lucide-react'

function PromoBanner() {
  const offers = [
    {
      icon: Gift,
      title: "First Booking Offer",
      description: "Get 50% off on your first movie ticket booking",
      code: "FIRST50",
      validUntil: "2024-12-31"
    },
    {
      icon: Tag,
      title: "Weekend Special",
      description: "Flat ₹100 off on weekend movie bookings",
      code: "WEEKEND100",
      validUntil: "2024-03-31"
    },
    {
      icon: Shield,
      title: "Safe Booking",
      description: "Contactless tickets & safety assured theaters",
      code: null,
      validUntil: null
    },
    {
      icon: TrendingUp,
      title: "Trending Now",
      description: "Most booked movies this week",
      code: null,
      validUntil: null
    }
  ]

  return (
    <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(45deg, transparent 48%, white 50%, transparent 52%)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="container relative py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left Content */}
          <div className="md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Exclusive Offers & Promotions
            </h2>
            <p className="text-lg text-blue-100 mb-6">
              Unlock amazing discounts and special deals on movie tickets, food combos, and more!
            </p>
            
            <div className="flex items-center space-x-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold">24/7</div>
                <div className="text-sm">Support</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold">100+</div>
                <div className="text-sm">Theaters</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold">50K+</div>
                <div className="text-sm">Happy Customers</div>
              </div>
            </div>
          </div>

          {/* Offers Grid */}
          <div className="md:w-1/2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {offers.map((offer, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-colors border border-white/20"
                >
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-white/20 rounded-lg">
                      <offer.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-lg mb-1">{offer.title}</h4>
                      <p className="text-sm text-blue-100 mb-2">{offer.description}</p>
                      
                      {offer.code && (
                        <div className="flex items-center justify-between mt-2">
                          <div className="font-mono text-sm bg-white/20 px-3 py-1 rounded">
                            {offer.code}
                          </div>
                          <div className="flex items-center text-sm">
                            <Clock className="w-3 h-3 mr-1" />
                            Valid till {offer.validUntil}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center mt-8">
          <button className="px-8 py-3 bg-white text-blue-600 rounded-lg font-bold hover:bg-gray-100 transition-colors flex items-center justify-center mx-auto space-x-2">
            <Gift className="w-5 h-5" />
            <span>View All Offers</span>
          </button>
        </div>
      </div>

      {/* Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-8">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
                className="fill-current text-white"></path>
        </svg>
      </div>
    </div>
  )
}

export default PromoBanner