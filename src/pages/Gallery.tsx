import React, { useState, useEffect } from 'react'
import { getAvailableCategories, generateProductsFromAssets } from '../utils/imageLoader'

interface GalleryProps {
  setCurrentPage?: (page: string) => void
}

const Gallery: React.FC<GalleryProps> = ({ setCurrentPage }) => {
  const [categories, setCategories] = useState<string[]>([])
  const [products, setProducts] = useState<Array<{
    id: number
    category: string
    image: string
  }>>([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  useEffect(() => {
    const availableCategories = getAvailableCategories()
    setCategories(availableCategories)
    setProducts(generateProductsFromAssets())
  }, [])

  const filteredProducts = selectedCategory 
    ? products.filter(product => product.category.trim() === selectedCategory.trim())
    : products

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 pt-20">
      {/* Hero Section */}
      <div className="relative py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Our
            <span className="block bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
              Gallery
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Discover our stunning collection of handcrafted floral arrangements
          </p>
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <div className="flex justify-center mb-8">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 mr-4 ${
              selectedCategory === null
                ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg'
                : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-gradient-to-r hover:from-rose-50 hover:to-pink-50 border border-white/20'
            }`}
          >
            All ({products.length} items)
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`p-4 rounded-2xl backdrop-blur-sm border border-white/20 transition-all duration-300 group ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg'
                  : 'bg-white/80 hover:bg-gradient-to-br hover:from-rose-50 hover:to-pink-50'
              }`}
            >
              <p className={`font-semibold transition-colors ${
                selectedCategory === category
                  ? 'text-white'
                  : 'text-gray-800 group-hover:text-rose-600'
              }`}>
                {category}
              </p>
              <p className={`text-sm ${
                selectedCategory === category
                  ? 'text-white/80'
                  : 'text-gray-500'
              }`}>
                {products.filter(p => p.category.trim() === category.trim()).length} items
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No images found in this category</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group cursor-pointer"
              >
                <div className="aspect-square rounded-3xl bg-gradient-to-br from-rose-100 to-pink-100 overflow-hidden mb-4 group-hover:scale-105 transition-transform duration-300">
                  <img 
                    src={product.image} 
                    alt="Floral arrangement"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.style.display = 'none'
                      target.parentElement!.innerHTML = '<div class="w-full h-full flex items-center justify-center"><div class="w-16 h-16 rounded-full bg-white/50 backdrop-blur-sm flex items-center justify-center"><div class="w-8 h-8 rounded-full bg-gradient-to-br from-rose-400 to-pink-400"></div></div></div>'
                    }}
                  />
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
        )}
      </div>
    </div>
  )
}

export default Gallery