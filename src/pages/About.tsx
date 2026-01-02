import React from 'react'
import logo from "../assets/logo.jpg"

interface AboutProps {
  setCurrentPage?: (page: string) => void
}

const About: React.FC<AboutProps> = ({ setCurrentPage }) => {
  const values = [
    {
      title: 'Quality',
      description: 'We source only the finest, freshest flowers from trusted growers worldwide.',
      color: 'from-rose-500 to-pink-500'
    },
    {
      title: 'Craftsmanship',
      description: 'Each arrangement is meticulously crafted by our skilled floral artisans.',
      color: 'from-amber-500 to-orange-500'
    },
    {
      title: 'Service',
      description: 'Exceptional customer service and attention to detail in every interaction.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Innovation',
      description: 'Constantly evolving our designs to bring you the latest floral trends.',
      color: 'from-purple-500 to-pink-500'
    }
  ]

  const team = [
    { name: 'Sarah Johnson', role: 'Master Florist & Founder', experience: '15+ years' },
    { name: 'Michael Chen', role: 'Creative Director', experience: '12+ years' },
    { name: 'Emma Rodriguez', role: 'Wedding Specialist', experience: '8+ years' },
    { name: 'David Kim', role: 'Event Coordinator', experience: '10+ years' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 pt-20">
      {/* Hero Section */}
      <div className="relative py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            About
            <span className="block bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
              Bloome
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 leading-relaxed">
            For over a decade, we've been creating moments of beauty and joy through the art of floral design
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-20">
        {/* Story Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 border border-white/20 mb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Founded in 2010 by master florist Sarah Johnson, Bloome began as a small neighborhood flower shop with a big dream: to bring the beauty and emotion of flowers into every special moment of life.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                What started as a passion project has grown into a premier floral design studio, serving thousands of customers and creating unforgettable arrangements for weddings, corporate events, and life's most precious celebrations.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Today, we continue to honor our founding principles of quality, creativity, and exceptional service while embracing new techniques and sustainable practices.
              </p>
            </div>
            <div className="aspect-square rounded-3xl bg-gradient-to-br from-rose-100 to-pink-100 p-12 flex items-center justify-center">
              <div className="w-32 h-32 rounded-full bg-white/50 backdrop-blur-sm flex items-center justify-center">
                <img src={logo} alt="" />
              </div>
            </div>
          </div>
        </div>

    

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-rose-500 to-pink-500 rounded-3xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Create Something Beautiful?</h2>
            <p className="text-rose-100 mb-8 max-w-2xl mx-auto">
              Let our experienced team help you create the perfect floral arrangement for your special occasion.
            </p>
            <button 
              onClick={() => setCurrentPage?.('shop')}
              className="px-10 py-4 rounded-2xl text-lg font-semibold text-rose-600 bg-white hover:bg-gray-50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Start Your Order
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About