import React, { useState, useEffect } from 'react'

import MoneyBouquet from '../catalogues/MoneyBouquet'
import { getAvailableCategories, generateProductsFromAssets } from '../utils/imageLoader'

interface ShopProps {
  setCurrentPage?: (page: string) => void
}

const Shop: React.FC<ShopProps> = ({ setCurrentPage }) => {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedCatalogue, setSelectedCatalogue] = useState('')
  const [categories, setCategories] = useState<string[]>(['All'])
  const [products, setProducts] = useState<Array<{
    id: number
    category: string
    image: string
  }>>([])

  useEffect(() => {
    const availableCategories = getAvailableCategories()
    setCategories(['All', ...availableCategories])
    setProducts(generateProductsFromAssets())
  }, [])

  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(product => product.category.trim() === selectedCategory.trim())

  const renderCatalogue = () => {
    switch (selectedCatalogue) {
      case 'money':
        return <MoneyBouquet />
      default:
        return null
    }
  }

  if (selectedCatalogue) {
    return (
      <div>
        <div className="fixed top-20 left-6 z-40">
          <button
            onClick={() => setSelectedCatalogue('')}
            className="px-4 py-2 rounded-xl bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-gray-100 border border-white/20 transition-all"
          >
            ← Back to Shop
          </button>
        </div>
        {renderCatalogue()}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 pt-20">
      {/* Hero Section */}
      <div className="relative py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Our
            <span className="block bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
              Collection
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Premium floral arrangements crafted with love and attention to detail
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-20">
    

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg'
                  : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-gradient-to-r hover:from-rose-50 hover:to-pink-50 border border-white/20'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group cursor-pointer"
            >
              <div className="relative">
                <div className="aspect-square rounded-3xl bg-gradient-to-br from-rose-100 to-pink-100 overflow-hidden mb-6 group-hover:scale-105 transition-transform duration-300">
                  <img 
                    src={product.image} 
                    alt="Floral arrangement"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.style.display = 'none'
                      target.parentElement!.innerHTML = '<div class="w-full h-full flex items-center justify-center"><div class="w-20 h-20 rounded-full bg-white/50 backdrop-blur-sm flex items-center justify-center"><div class="w-10 h-10 rounded-full bg-gradient-to-br from-rose-400 to-pink-400"></div></div></div>'
                    }}
                  />
                </div>
              </div>
              
              <div className="text-center">
                <button 
                  onClick={() => setCurrentPage?.('contact')}
                  className="w-full px-4 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold hover:from-rose-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
                >
                  Contact Us
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-20 text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 border border-white/20">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Can't find what you're looking for?
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Our expert florists can create custom arrangements tailored to your specific needs and preferences.
            </p>
            <button 
              onClick={() => setCurrentPage?.('contact')}
              className="px-10 py-4 rounded-2xl text-lg font-semibold text-white bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Contact Us for Custom Design
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Shop