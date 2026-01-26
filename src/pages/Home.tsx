import React, { useState } from 'react'
import bouquetImage from '../assets/bouquet_homepage.jpeg'

interface HomeProps {
  setCurrentPage?: (page: string) => void
}

const Home: React.FC<HomeProps> = ({ setCurrentPage }) => {

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
      {/* HERO SECTION */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src={bouquetImage} 
            alt="Beautiful Bouquet" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
              Beautiful
              <span className="block bg-gradient-to-r from-rose-300 to-pink-300 bg-clip-text text-transparent">
                Bouquets
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
              Handcrafted floral arrangements that speak the language of love
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={() => setCurrentPage?.('shop')} 
              className="px-10 py-4 rounded-2xl text-lg font-semibold text-white bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105"
            >
              View Collection
            </button>
            <button 
              onClick={() => setCurrentPage?.('contact')}
              className="px-10 py-4 rounded-2xl text-lg font-semibold text-white border-2 border-white/30 hover:bg-white/10 backdrop-blur-sm transition-all duration-300"
            >
              Contact Us
            </button>
          </div>
          
          <div className="mt-12 text-sm text-gray-300">
            <p>Explore our premium collection of handcrafted floral arrangements</p>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-1/4 right-10 w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm animate-pulse"></div>
        <div className="absolute bottom-1/4 left-10 w-16 h-16 rounded-full bg-rose-300/20 backdrop-blur-sm animate-pulse delay-1000"></div>
      </div>
    </div>
  )
}

export default Home