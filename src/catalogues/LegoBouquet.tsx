const LegoBouquet = () => {


  const products = [
    { id: 401, name: 'LEGO Rose Bouquet', price: 199.99, description: 'Buildable LEGO roses that last forever' },
    { id: 402, name: 'Brick Flower Garden', price: 299.99, description: 'Complete LEGO flower garden set' },
    { id: 403, name: 'LEGO Sunflower', price: 149.99, description: 'Large buildable LEGO sunflower' },
    { id: 404, name: 'Mini LEGO Bouquet', price: 89.99, description: 'Small LEGO flower arrangement' },
    { id: 405, name: 'LEGO Tulip Set', price: 179.99, description: 'Colorful buildable LEGO tulips' },
    { id: 406, name: 'Custom LEGO Flowers', price: 249.99, description: 'Personalized LEGO flower creation' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 pt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
              LEGO Bouquets
            </span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Creative buildable flower arrangements that combine fun with beauty
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-white/20 hover:shadow-lg transition-all">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-red-100 to-orange-100 mb-4 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-400 to-orange-400"></div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-red-600">${product.price}</span>
                <button className="px-6 py-2 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold hover:from-red-600 hover:to-orange-600 transition-all">
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

export default LegoBouquet