import React, { useState, useEffect, useMemo } from 'react'
import { getAvailableCategories, generateProductsFromAssets } from '../utils/imageLoader'
import { 
  Search, Filter, X, ChevronRight, 
  ShoppingBag, ZoomIn, Sparkles, Grid, List 
} from 'lucide-react'

interface GalleryProps {
  setCurrentPage?: (page: string) => void
}

interface Product {
  id: number
  category: string
  image: string
  title: string
  price: number
  description: string
  isFeatured: boolean
}

interface SortOption {
  label: string
  value: string
  icon: React.ReactNode
}

// Product title dictionary
const productTitles = [
  "Elegant Rose Bouquet",
  "Classic Lily Arrangement",
  "Sunflower Paradise",
  "Orchid Elegance",
  "Tulip Symphony",
  "Lavender Dream",
  "Carnation Delight",
  "Daisy Meadow",
  "Peony Perfection",
  "Hydrangea Harmony",
  "Gerbera Joy",
  "Alstroemeria Beauty",
  "Chrysanthemum Classic",
  "Iris Inspiration",
  "Anemone Charm",
  "Ranunculus Romance",
  "Freesia Fantasy",
  "Statice Serenity",
  "Gypsophila Cloud",
  "Protea Majesty"
]

// Product description dictionary
const productDescriptions = [
  "Beautiful handcrafted arrangement perfect for special occasions",
  "Fresh seasonal flowers arranged by our expert florists",
  "Elegant design that brings natural beauty to any space",
  "Carefully selected premium blooms for lasting freshness",
  "Artistic floral composition with perfect color harmony",
  "Luxury arrangement featuring the finest quality flowers",
  "Modern floral design with timeless elegance",
  "Romantic bouquet that captures hearts",
  "Vibrant colors that brighten any room",
  "Sophisticated arrangement for corporate events",
  "Charming bouquet for celebrations and gifts",
  "Professional floral design for weddings",
  "Exquisite centerpiece for dining tables",
  "Thoughtful gift arrangement for loved ones",
  "Minimalist yet impactful floral art",
  "Lush bouquet with mixed seasonal varieties",
  "Premium arrangement with imported flowers",
  "Sustainable locally-sourced flower composition",
  "Customizable design to match your preferences",
  "Signature arrangement from our master florist"
]

// Round prices to nearest 5,000 or 10,000 IDR
const generateRealisticPrice = (index: number): number => {
  // Base price between 250,000 and 500,000
  const basePrice = 250000 + (index % 10) * 25000; // Creates variety
  
  // Round to nearest 5,000
  const roundedPrice = Math.round(basePrice / 5000) * 5000;
  
  // Ensure it's between 250k and 500k
  return Math.min(Math.max(roundedPrice, 250000), 500000);
}

const Gallery: React.FC<GalleryProps> = ({ setCurrentPage }) => {
  const [categories, setCategories] = useState<string[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState('default')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [priceRange, setPriceRange] = useState<[number, number]>([250000, 500000])
  const [isLoading, setIsLoading] = useState(true)

  // Sort options
  const sortOptions: SortOption[] = [
    { label: 'Default', value: 'default', icon: <Sparkles size={16} /> },
    { label: 'Price: Low to High', value: 'price-asc', icon: <ChevronRight size={16} /> },
    { label: 'Price: High to Low', value: 'price-desc', icon: <ChevronRight size={16} className="rotate-180" /> },
    { label: 'Newest First', value: 'newest', icon: <Sparkles size={16} /> },
  ]

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true)
      try {
        const availableCategories = getAvailableCategories()
        const generatedProducts = generateProductsFromAssets()
        
        // Map to proper product objects with realistic data
        const productsData: Product[] = generatedProducts.map((product, index) => {
          const titleIndex = index % productTitles.length;
          const descIndex = index % productDescriptions.length;
          
          return {
            id: index + 1,
            category: product.category || 'Uncategorized',
            image: product.image,
            title: productTitles[titleIndex],
            price: generateRealisticPrice(index),
            description: productDescriptions[descIndex],
            isFeatured: index < 5 || index % 7 === 0 // First 5 and every 7th product are featured
          }
        })
        
        setCategories(availableCategories)
        setProducts(productsData)
      } catch (error) {
        console.error('Error loading products:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    loadProducts()
  }, [])

  const filteredProducts = useMemo(() => {
    let filtered = products
    
    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(product => 
        product.category.trim().toLowerCase() === selectedCategory.trim().toLowerCase()
      )
    }
    
    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(product => 
        product.title.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      )
    }
    
    // Filter by price range
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && 
      product.price <= priceRange[1]
    )
    
    // Sort products
    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'newest':
        filtered.sort((a, b) => b.id - a.id)
        break
      default:
        // Default: alphabetical/numerical order by image filename
        filtered.sort((a, b) => {
          // Extract filename from image path for sorting
          const getFileName = (imagePath: string) => {
            const parts = imagePath.split('/')
            return parts[parts.length - 1] || ''
          }
          
          const fileNameA = getFileName(a.image)
          const fileNameB = getFileName(b.image)
          
          // For numerical filenames (like 1.jpeg, 2.jpeg), sort numerically
          const numA = parseInt(fileNameA.match(/^(\d+)/)?.[1] || '0')
          const numB = parseInt(fileNameB.match(/^(\d+)/)?.[1] || '0')
          
          if (!isNaN(numA) && !isNaN(numB) && numA !== numB) {
            return numA - numB
          }
          
          // Otherwise sort alphabetically
          return fileNameA.localeCompare(fileNameB)
        })
    }
    
    return filtered
  }, [products, selectedCategory, searchQuery, sortBy, priceRange])

  const handleQuickView = (product: Product) => {
    setSelectedProduct(product)
    document.body.style.overflow = 'hidden'
  }

  const closeQuickView = () => {
    setSelectedProduct(null)
    document.body.style.overflow = 'auto'
  }

  const handleInquiry = (product?: Product) => {
    if (product) {
      localStorage.setItem('selectedProduct', JSON.stringify(product))
    }
    setCurrentPage?.('contact')
  }

  // Format IDR currency
  const formatIDR = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-rose-200 to-pink-200 animate-pulse flex items-center justify-center">
            <Sparkles className="text-rose-500 animate-spin" size={32} />
          </div>
          <p className="text-lg text-gray-600">Loading beautiful arrangements...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 pt-20">
      {/* Hero Section with Search */}
      <div className="relative py-16 px-6">
        <div className="absolute inset-0 bg-gradient-to-r from-rose-500/5 via-transparent to-pink-500/5" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Our
              <span className="block bg-gradient-to-r from-rose-600 via-pink-600 to-rose-600 bg-clip-text text-transparent animate-gradient-x">
                Gallery
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Discover our stunning collection of handcrafted floral arrangements
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-rose-500 transition-colors" size={20} />
                <input
                  type="text"
                  placeholder="Search arrangements..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-transparent transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-rose-500 transition-colors"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <p className="text-sm text-gray-500">Total Items</p>
              <p className="text-2xl font-bold text-gray-800">{products.length}</p>
            </div>
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <p className="text-sm text-gray-500">Categories</p>
              <p className="text-2xl font-bold text-gray-800">{categories.length}</p>
            </div>
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <p className="text-sm text-gray-500">Price Range</p>
              <p className="text-2xl font-bold text-gray-800">IDR 250K-500K</p>
            </div>
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <p className="text-sm text-gray-500">Filtered</p>
              <p className="text-2xl font-bold text-gray-800">{filteredProducts.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="sticky top-20 z-10 bg-white/80 backdrop-blur-sm border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 text-white hover:from-rose-600 hover:to-pink-600 transition-all"
              >
                <Filter size={18} />
                Filters
              </button>
              
              {/* View Toggle */}
              <div className="flex bg-white/50 rounded-xl p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === 'grid' 
                      ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white' 
                      : 'text-gray-600 hover:text-rose-600'
                  }`}
                >
                  <Grid size={20} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === 'list' 
                      ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white' 
                      : 'text-gray-600 hover:text-rose-600'
                  }`}
                >
                  <List size={20} />
                </button>
              </div>
            </div>
            
            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 rounded-xl bg-white/50 backdrop-blur-sm border border-white/20 appearance-none pr-10 focus:outline-none focus:ring-2 focus:ring-rose-500/50"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    Sort: {option.label}
                  </option>
                ))}
              </select>
              <ChevronRight className="absolute right-3 top-1/2 transform -translate-y-1/2 rotate-90 text-gray-400" size={16} />
            </div>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="mt-4 p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 animate-slideDown">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Range: {formatIDR(priceRange[0])} - {formatIDR(priceRange[1])}
                  </label>
                  <input
                    type="range"
                    min="250000"
                    max="500000"
                    step="5000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full h-2 bg-gradient-to-r from-rose-200 to-pink-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-2">
                    <span>{formatIDR(250000)}</span>
                    <span>{formatIDR(375000)}</span>
                    <span>{formatIDR(500000)}</span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Categories
                  </label>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className={`block w-full text-left px-3 py-2 rounded-lg transition-all ${
                        selectedCategory === null
                          ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white'
                          : 'hover:bg-rose-50'
                      }`}
                    >
                      All Categories
                    </button>
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`block w-full text-left px-3 py-2 rounded-lg transition-all ${
                          selectedCategory === category
                            ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white'
                            : 'hover:bg-rose-50'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quick Actions
                  </label>
                  <div className="space-y-2">
                    <button
                      onClick={() => {
                        setPriceRange([250000, 350000])
                        setSelectedCategory(null)
                      }}
                      className="w-full px-4 py-2 text-left rounded-lg bg-gradient-to-r from-rose-50 to-pink-50 hover:from-rose-100 hover:to-pink-100 transition-all"
                    >
                      Budget Friendly (under {formatIDR(350000)})
                    </button>
                    <button
                      onClick={() => {
                        // For demo, you could set a state for featured filter
                        // This is a placeholder for actual featured filter implementation
                      }}
                      className="w-full px-4 py-2 text-left rounded-lg bg-gradient-to-r from-rose-50 to-pink-50 hover:from-rose-100 hover:to-pink-100 transition-all"
                    >
                      Featured Only
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Categories Quick Select */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-wrap gap-3 justify-center">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 ${
              selectedCategory === null
                ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg shadow-rose-500/25'
                : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-gradient-to-r hover:from-rose-50 hover:to-pink-50 border border-white/20 hover:border-rose-200'
            }`}
          >
            <Sparkles size={16} />
            All ({products.length})
          </button>
          
          {categories.slice(0, 8).map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full backdrop-blur-sm border transition-all duration-300 group flex items-center gap-2 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg shadow-rose-500/25 border-transparent'
                  : 'bg-white/80 border-white/20 hover:bg-gradient-to-br hover:from-rose-50 hover:to-pink-50 hover:border-rose-200'
              }`}
            >
              <span className={`font-semibold transition-colors ${
                selectedCategory === category
                  ? 'text-white'
                  : 'text-gray-800 group-hover:text-rose-600'
              }`}>
                {category}
              </span>
              <span className={`text-sm px-2 py-1 rounded-full ${
                selectedCategory === category
                  ? 'bg-white/20 text-white'
                  : 'bg-rose-50 text-rose-600'
              }`}>
                {products.filter(p => p.category.trim() === category.trim()).length}
              </span>
            </button>
          ))}
          
          {categories.length > 8 && (
            <button
              onClick={() => setShowFilters(true)}
              className="px-6 py-3 rounded-full bg-white/80 backdrop-blur-sm border border-white/20 text-gray-700 hover:bg-gradient-to-r hover:from-rose-50 hover:to-pink-50 hover:border-rose-200 transition-all flex items-center gap-2"
            >
              More
              <ChevronRight size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Gallery Grid/List */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-rose-100 to-pink-100 flex items-center justify-center">
              <Search className="text-rose-400" size={32} />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">No arrangements found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your filters or search terms</p>
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory(null)
                setPriceRange([250000, 500000])
              }}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold hover:from-rose-600 hover:to-pink-600 transition-all"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className={`${viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
            : 'space-y-6'
          } gap-6`}>
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className={`group cursor-pointer ${
                  viewMode === 'list' 
                    ? 'flex gap-6 bg-white/50 backdrop-blur-sm rounded-3xl p-6 border border-white/20 hover:border-rose-200 transition-all'
                    : ''
                }`}
              >
                {/* Product Image */}
                <div className={`
                  relative overflow-hidden rounded-3xl mb-4 transition-transform duration-500
                  ${viewMode === 'list' ? 'w-48 h-48 flex-shrink-0' : 'aspect-square'}
                  ${viewMode === 'grid' ? 'group-hover:scale-105' : ''}
                `}>
                  <div className="absolute inset-0 bg-gradient-to-br from-rose-100 to-pink-100" />
                  <img 
                    src={product.image} 
                    alt={product.title}
                    className="w-full h-full object-cover relative z-10"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.style.display = 'none'
                    }}
                  />
                  
                  {/* Image Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-20" />
                  
                  {/* Quick Actions */}
                  <div className="absolute top-4 right-4 z-30 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleQuickView(product)}
                      className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-all shadow-lg"
                    >
                      <ZoomIn size={20} className="text-gray-600" />
                    </button>
                  </div>
                  
                  {product.isFeatured && (
                    <div className="absolute top-4 left-4 z-30">
                      <span className="px-3 py-1 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs font-semibold">
                        Featured
                      </span>
                    </div>
                  )}
                </div>
                
                {/* Product Info */}
                <div className={viewMode === 'list' ? 'flex-1' : ''}>
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-gray-800 text-lg mb-1">
                        {product.title}
                      </h3>
                      <p className="text-gray-500 text-sm mb-2">
                        {product.category}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-2xl bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                        {formatIDR(product.price)}
                      </p>
                      <p className="text-gray-400 text-sm">Starting from</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  
                  <div className="flex gap-3">
                    <button 
                      onClick={() => handleInquiry(product)}
                      className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold hover:from-rose-600 hover:to-pink-600 transition-all transform hover:scale-105 flex items-center justify-center gap-2"
                    >
                      <ShoppingBag size={18} />
                      Inquire Now
                    </button>
                    <button 
                      onClick={() => handleQuickView(product)}
                      className="px-4 py-3 rounded-xl bg-white/80 backdrop-blur-sm border border-white/20 text-gray-700 hover:bg-gradient-to-r hover:from-rose-50 hover:to-pink-50 transition-all flex items-center gap-2"
                    >
                      <ZoomIn size={18} />
                      {viewMode === 'grid' ? 'Quick View' : 'Details'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Load More Button */}
        {filteredProducts.length > 0 && filteredProducts.length < products.length && (
          <div className="text-center mt-12">
            <button
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-rose-50 to-pink-50 border border-rose-200 text-rose-600 font-semibold hover:from-rose-100 hover:to-pink-100 transition-all flex items-center gap-3 mx-auto group"
            >
              Load More Arrangements
              <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}
      </div>

      {/* Quick View Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeQuickView}
          />
          <div className="relative bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white p-6 border-b flex justify-between items-center z-10">
              <h2 className="text-2xl font-bold text-gray-800">
                {selectedProduct.title}
              </h2>
              <button
                onClick={closeQuickView}
                className="w-10 h-10 rounded-full bg-rose-50 hover:bg-rose-100 transition-colors flex items-center justify-center"
              >
                <X size={20} className="text-rose-600" />
              </button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 p-8">
              <div>
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-rose-100 to-pink-100 overflow-hidden mb-4">
                  <img 
                    src={selectedProduct.image} 
                    alt={selectedProduct.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  onClick={() => handleInquiry(selectedProduct)}
                  className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold hover:from-rose-600 hover:to-pink-600 transition-all"
                >
                  Request Custom Quote
                </button>
              </div>
              
              <div>
                <div className="mb-6">
                  <span className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white text-sm font-semibold mb-4">
                    {selectedProduct.category}
                  </span>
                  <h3 className="text-3xl font-bold text-gray-800 mb-4">
                    {selectedProduct.title}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {selectedProduct.description}
                  </p>
                  <div className="text-4xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent mb-6">
                    {formatIDR(selectedProduct.price)}
                  </div>
                </div>
                
                <div className="space-y-4">
                  {selectedProduct.category === 'Money Bouquet' ? (
                    <div className="p-4 rounded-xl bg-green-50 border border-green-100">
                      <h4 className="font-semibold text-gray-800 mb-3">PEMBUATAN BUKET</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                        <div>10 lembar = Rp 100.000</div>
                        <div>15 lembar = Rp 125.000</div>
                        <div>20 lembar = Rp 150.000</div>
                        <div>25 lembar = Rp 175.000</div>
                        <div>30 lembar = Rp 200.000</div>
                        <div>40 lembar = Rp 250.000</div>
                        <div>50 lembar = Rp 350.000</div>
                        <div>60 lembar = Rp 375.000</div>
                      </div>
                      <div className="border-t border-green-200 pt-3">
                        <h5 className="font-medium mb-2">CONTOH</h5>
                        <div className="text-sm space-y-2">
                          <div className="p-2 bg-white rounded">
                            <p>Pesan Total Uang Rp 200.000 pakai uang pecahan Rp 10.000</p>
                            <p>→ Biaya jasa 20 lembar : Rp 150.000</p>
                            <p>→ Jasa + Uang dalam buket = Rp 150.000 + Rp 200.000 = Rp 350.000</p>
                          </div>
                          <div className="p-2 bg-white rounded">
                            <p>Pesan Total Uang Rp 3 Juta pakai uang pecahan Rp 100.000</p>
                            <p>→ Biaya jasa 30 lembar : Rp 200.000</p>
                            <p>→ Jasa + Uang dalam buket = Rp 200.000 + Rp 3.000.000 = Rp 3.200.000</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 rounded-xl bg-rose-50 border border-rose-100">
                      <h4 className="font-semibold text-gray-800 mb-2">What's Included</h4>
                      <ul className="space-y-2 text-gray-600">
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-rose-500" />
                          Handcrafted floral arrangement
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-rose-500" />
                          Premium seasonal flowers
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-rose-500" />
                          Professional delivery available
                        </li>
                      </ul>
                    </div>
                  )}
                  
                  <div className="p-4 rounded-xl bg-pink-50 border border-pink-100">
                    <h4 className="font-semibold text-gray-800 mb-2">Customization Options</h4>
                    <p className="text-gray-600">
                      Contact us to customize colors, size, or add personalized elements to this arrangement.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Gallery