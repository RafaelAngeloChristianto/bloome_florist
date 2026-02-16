import { getImagesFromFolder } from '../utils/imageLoader'

const MoneyBouquet = () => {
  const images = getImagesFromFolder('Money Bouquet')
  
  // Sort images by filename number
  const sortedImages = Object.entries(images).sort(([a], [b]) => {
    const numA = parseInt(a.split('.')[0])
    const numB = parseInt(b.split('.')[0])
    return numA - numB
  })

  const products = sortedImages.map(([filename, imagePath], index) => ({
    id: index + 1,
    name: `Money Bouquet ${index + 1}`,
    image: imagePath,
    filename
  }))

  const pricingOptions = [
    { sheets: 10, price: 'Rp 100.000' },
    { sheets: 15, price: 'Rp 125.000' },
    { sheets: 20, price: 'Rp 150.000' },
    { sheets: 25, price: 'Rp 175.000' },
    { sheets: 30, price: 'Rp 200.000' },
    { sheets: 40, price: 'Rp 250.000' },
    { sheets: 50, price: 'Rp 350.000' },
    { sheets: 60, price: 'Rp 375.000' }
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
          
          {/* Pricing Section */}
          <div className="mt-8 text-left max-w-4xl mx-auto">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">PEMBUATAN BUKET</h3>
              <div className="space-y-1">
                {pricingOptions.map((option, index) => (
                  <div key={index} className="text-gray-700">
                    {option.sheets} lembar = {option.price}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h4 className="text-lg font-bold text-gray-800 mb-3">CONTOH</h4>
              <div className="space-y-4">
                <div className="text-gray-700">
                  <p>Pesan Total Uang Rp 200.000 pakai uang pecahan Rp 10.000</p>
                  <p>→ Biaya jasa 20 lembar : Rp 150.000</p>
                  <p>→ Jasa + Uang dalam buket = Rp 150.000 + Rp 200.000 = Rp 350.000</p>
                </div>
                <div className="text-gray-700">
                  <p>Pesan Total Uang Rp 3 Juta pakai uang pecahan Rp 100.000</p>
                  <p>→ Biaya jasa 30 lembar : Rp 200.000</p>
                  <p>→ Jasa + Uang dalam buket = Rp 200.000 + Rp 3.000.000 = Rp 3.200.000</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-white/20 hover:shadow-lg transition-all">
              <div className="aspect-square rounded-2xl overflow-hidden mb-4">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">{product.filename}</span>
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