import React from 'react'
import logo from "../assets/logo.jpg"

interface ContactProps {
  setCurrentPage?: (page: string) => void
}

const Contact: React.FC<ContactProps> = ({ setCurrentPage }) => {
  return (
    <div className="min-h-screen mt-[50px] bg-gradient-to-br from-rose-50 via-white to-pink-50 pt-20">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <div className="mb-12">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden shadow-xl border-4 border-white">
            <img src={logo} alt="Bloome Logo" className="w-full h-full object-cover" />
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
            Get In Touch
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Ready to bloom? Let's chat about your floral needs
          </p>
        </div>
        
        <div className="space-y-6">
          <a 
            href="https://wa.me/6281511229009" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#128C7E] text-white font-semibold py-6 px-10 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
            </svg>
            Chat on WhatsApp with +62 815-1122-9009
          </a>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-10 shadow-xl border border-white/30">
            <h3 className="text-2xl font-bold mb-8 text-gray-800">Why Choose Bloome?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-rose-100 to-rose-200 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl">
                  <span className="text-rose-600 text-2xl">🌸</span>
                </div>
                <p className="font-bold text-gray-800 mb-2">Artificial Flowers</p>
                <p className="text-gray-600">Long-lasting beauty</p>
              </div>
              <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl">
                  <span className="text-green-600 text-2xl">🚚</span>
                </div>
                <p className="font-bold text-gray-800 mb-2">Fast Delivery</p>
                <p className="text-gray-600">Same day delivery</p>
              </div>
              <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl">
                  <span className="text-purple-600 text-2xl">💝</span>
                </div>
                <p className="font-bold text-gray-800 mb-2">Custom Arrangements</p>
                <p className="text-gray-600">Personalized designs</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact