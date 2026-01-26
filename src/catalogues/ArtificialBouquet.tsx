const ArtificialBouquet = () => {


  const products = [
    { id: 101, name: 'Silk Rose Elegance', price: 89.99, description: 'Premium silk roses in classic arrangement' },
    { id: 102, name: 'Forever Peony', price: 129.99, description: 'Lifelike peonies that last forever' },
    { id: 103, name: 'Artificial Sunflower', price: 75.99, description: 'Bright artificial sunflowers' },
    { id: 104, name: 'Mixed Silk Bouquet', price: 159.99, description: 'Variety of silk flowers in elegant design' },
    { id: 105, name: 'Faux Orchid Arrangement', price: 195.99, description: 'Sophisticated artificial orchids' },
    { id: 106, name: 'Silk Tulip Bundle', price: 65.99, description: 'Colorful artificial tulips' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 pt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Artificial Bouquets
            </span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Beautiful artificial flowers that maintain their beauty forever
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-white/20 hover:shadow-lg transition-all">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-green-100 to-emerald-100 mb-4 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-emerald-400"></div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-green-600">${product.price}</span>
                <button className="px-6 py-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold hover:from-green-600 hover:to-emerald-600 transition-all">
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

export default ArtificialBouquet