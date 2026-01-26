


const TeachersDay = () => {


  const products = [
    { id: 601, name: 'Thank You Teacher', price: 79.99, description: 'Appreciation bouquet for teachers' },
    { id: 602, name: 'Apple Blossom Special', price: 99.99, description: 'Apple-themed arrangement for educators' },
    { id: 603, name: 'Wisdom Roses', price: 119.99, description: 'Elegant roses to honor teachers' },
    { id: 604, name: 'Knowledge Sunflowers', price: 89.99, description: 'Bright sunflowers for bright minds' },
    { id: 605, name: 'Educator\'s Choice', price: 149.99, description: 'Premium mixed bouquet for teachers' },
    { id: 606, name: 'Classroom Carnations', price: 69.99, description: 'Cheerful carnations for the classroom' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50 pt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
              Teachers Day Collection
            </span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Show appreciation to educators with our special Teachers Day bouquets
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-white/20 hover:shadow-lg transition-all">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-teal-100 to-cyan-100 mb-4 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-teal-400 to-cyan-400"></div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-teal-600">${product.price}</span>
                <button className="px-6 py-2 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold hover:from-teal-600 hover:to-cyan-600 transition-all">
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

export default TeachersDay