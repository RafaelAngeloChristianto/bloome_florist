const MoneyBouquet = () => {


  const products = [
    { id: 201, name: 'Cash Rose Bouquet', price: 299.99, description: 'Elegant roses with cash bills arrangement' },
    { id: 202, name: 'Money Tree Deluxe', price: 459.99, description: 'Premium money tree with fresh flowers' },
    { id: 203, name: 'Dollar Bill Roses', price: 199.99, description: 'Creative roses made from dollar bills' },
    { id: 204, name: 'Graduation Money Lei', price: 149.99, description: 'Traditional lei with money and flowers' },
    { id: 205, name: 'Cash & Carnations', price: 179.99, description: 'Beautiful carnations with cash accents' },
    { id: 206, name: 'Money Sunflower', price: 229.99, description: 'Sunflower arrangement with money petals' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-amber-50 pt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent">
              Money Bouquets
            </span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Unique floral arrangements incorporating cash for special celebrations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-white/20 hover:shadow-lg transition-all">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-yellow-100 to-amber-100 mb-4 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-amber-400"></div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-yellow-600">${product.price}</span>
                <button className="px-6 py-2 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-500 text-white font-semibold hover:from-yellow-600 hover:to-amber-600 transition-all">
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

export default MoneyBouquet