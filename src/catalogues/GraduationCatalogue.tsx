import React from 'react'


const GraduationCatalogue = () => {


  const products = [
    { id: 301, name: 'Graduation Cap Bouquet', price: 89.99, description: 'Flowers arranged in graduation cap design' },
    { id: 302, name: 'Diploma Rose Bundle', price: 129.99, description: 'Roses with miniature diploma scroll' },
    { id: 303, name: 'School Colors Arrangement', price: 99.99, description: 'Flowers in your school colors' },
    { id: 304, name: 'Achievement Sunflowers', price: 79.99, description: 'Bright sunflowers for celebration' },
    { id: 305, name: 'Success Lily Bouquet', price: 149.99, description: 'Elegant lilies for graduation success' },
    { id: 306, name: 'Future Bright Roses', price: 119.99, description: 'Mixed roses for bright future ahead' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 pt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Graduation Collection
            </span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Celebrate academic achievements with our special graduation bouquets
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-white/20 hover:shadow-lg transition-all">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-blue-100 to-indigo-100 mb-4 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-indigo-400"></div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-blue-600">${product.price}</span>
                <button className="px-6 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold hover:from-blue-600 hover:to-indigo-600 transition-all">
                  Order Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default GraduationCatalogue