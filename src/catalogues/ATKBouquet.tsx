import React from 'react'


const ATKBouquet = () => {


  const products = [
    { id: 501, name: 'ATK Special Rose', price: 159.99, description: 'Signature ATK rose arrangement' },
    { id: 502, name: 'ATK Premium Mix', price: 229.99, description: 'Premium mixed flower ATK bouquet' },
    { id: 503, name: 'ATK Elegant White', price: 189.99, description: 'Pure white flowers in ATK style' },
    { id: 504, name: 'ATK Romantic Red', price: 199.99, description: 'Passionate red roses ATK arrangement' },
    { id: 505, name: 'ATK Pastel Dream', price: 179.99, description: 'Soft pastel colors in ATK design' },
    { id: 506, name: 'ATK Luxury Collection', price: 299.99, description: 'Ultimate luxury ATK bouquet' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-violet-50 pt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
              ATK Bouquets
            </span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Exclusive ATK collection featuring premium floral arrangements
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-white/20 hover:shadow-lg transition-all">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-purple-100 to-violet-100 mb-4 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 to-violet-400"></div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-purple-600">${product.price}</span>
                <button className="px-6 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-violet-500 text-white font-semibold hover:from-purple-600 hover:to-violet-600 transition-all">
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

export default ATKBouquet