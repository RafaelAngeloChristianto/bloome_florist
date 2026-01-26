import React from 'react'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'

export const HomeScreen: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-rose-50">
            <NavBar currentPage="home" setCurrentPage={() => {}} />
            
            {/* Hero Section */}
            <section className="py-20 px-6 relative min-h-screen flex items-center">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="font-inter text-5xl md:text-6xl font-bold text-gray-800 mb-6">
                        Beautiful Flowers for
                        <span className="block text-gray-700">Every Occasion</span>
                    </h1>
                    <p className="font-inter text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                        Discover our stunning collection of fresh flowers, elegant arrangements, and personalized bouquets crafted with love
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="font-inter bg-gray-900 text-white px-8 py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors">
                            Shop Now
                        </button>
                        <button className="font-inter border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors">
                            View Gallery
                        </button>
                    </div>
                </div>
                
                {/* Scroll Indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center">
                    <p className="font-inter text-sm text-gray-500 mb-2">Scroll to explore</p>
                    <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center">
                        <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-bounce"></div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 px-6 bg-white">
                <div className="max-w-6xl mx-auto">
                    <h2 className="font-inter text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
                        Why Choose Bloome?
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center p-8 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                                <span className="text-2xl">🌸</span>
                            </div>
                            <h3 className="font-inter text-xl font-semibold text-gray-800 mb-3">Fresh Daily</h3>
                            <p className="font-inter text-gray-600">Hand-picked fresh flowers delivered daily from local growers</p>
                        </div>
                        <div className="text-center p-8 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                                <span className="text-2xl">🎨</span>
                            </div>
                            <h3 className="font-inter text-xl font-semibold text-gray-800 mb-3">Custom Designs</h3>
                            <p className="font-inter text-gray-600">Personalized arrangements crafted by our expert florists</p>
                        </div>
                        <div className="text-center p-8 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                                <span className="text-2xl">🚚</span>
                            </div>
                            <h3 className="font-inter text-xl font-semibold text-gray-800 mb-3">Fast Delivery</h3>
                            <p className="font-inter text-gray-600">Same-day delivery available for orders placed before 2 PM</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 px-6 bg-gray-900">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="font-inter text-3xl md:text-4xl font-bold text-white mb-4">
                        Ready to Brighten Someone's Day?
                    </h2>
                    <p className="font-inter text-xl text-gray-300 mb-8">
                        Browse our collection and find the perfect flowers for any occasion
                    </p>
                    <button className="font-inter bg-white text-gray-900 px-8 py-3 rounded-xl font-medium hover:bg-gray-100 transition-colors">
                        Explore Collection
                    </button>
                </div>
            </section>

            <Footer />
        </div>
    )
}

export default HomeScreen;