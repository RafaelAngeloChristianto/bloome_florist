import React, { useState, useRef, useEffect } from "react"
import logo from "../assets/logo.jpg"
import bouquetImage from "../assets/bouquet_homepage.jpeg"
import { getAvailableCategories } from "../utils/imageLoader"

interface NavBarProps {
  currentPage: string
  setCurrentPage: (page: string) => void
}

const NavBar: React.FC<NavBarProps> = ({ currentPage, setCurrentPage }) => {
  const [isFlowersOpen, setIsFlowersOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobileBouquetOpen, setIsMobileBouquetOpen] = useState(false)
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024)
  const [catalogueItems, setCatalogueItems] = useState<Array<{name: string, desc: string}>>([])

  const timeoutRef = useRef(null)

  useEffect(() => {
    const categories = getAvailableCategories()
    const items = categories.map(category => ({
      name: category,
      desc: `${category} arrangements`
    }))
    setCatalogueItems(items)
  }, [])

  // ✔ Update desktop/mobile state on resize
  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const openDropdown = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    if (isDesktop) setIsFlowersOpen(true)
  }

  const closeDropdown = () => {
    if (!isDesktop) return
    timeoutRef.current = setTimeout(() => setIsFlowersOpen(false), 120)
  }

  useEffect(() => {
    return () => timeoutRef.current && clearTimeout(timeoutRef.current)
  }, [])



  return (
    <nav className="w-full fixed top-0 z-50 bg-white/90 backdrop-blur-md border-b border-white/20">
      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        <div className="flex justify-between items-center py-2 sm:py-4">
          {/* Logo Section */}
          <button 
            onClick={() => setCurrentPage('home')}
            className="flex items-center gap-2 sm:gap-4"
          >
            <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-rose-100 to-pink-100 p-0.5 sm:p-1">
              <img src={logo} className="w-full h-full object-cover rounded-lg sm:rounded-xl" />
            </div>
            <div>
              <h1 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                BLOOME
              </h1>
              <p className="text-[10px] sm:text-xs text-rose-400 tracking-[0.15em] sm:tracking-[0.2em] font-medium">
                FLORIST
              </p>
            </div>
          </button>

          {/* DESKTOP MENU */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            <button 
              onClick={() => setCurrentPage('home')}
              className={`relative px-3 xl:px-4 py-2 text-sm font-medium transition-all group ${
                currentPage === 'home' ? 'text-rose-600' : 'text-gray-700 hover:text-rose-600'
              }`}
            >
              HOME
              <span className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-rose-500 to-pink-500 transition-all duration-300 ${
                currentPage === 'home' ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </button>

            {/* Bouquet Dropdown */}
            <div
              className="relative"
              onMouseEnter={openDropdown}
              onMouseLeave={closeDropdown}
            >
              <button className="relative px-3 xl:px-4 py-2 text-sm font-semibold text-rose-600 flex items-center gap-2 group">
                BOUQUETS
                <svg className={`w-4 h-4 transition-transform duration-300 ${isFlowersOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-rose-500 to-pink-500 group-hover:w-full transition-all duration-300"></span>
              </button>

              {/* Mega Menu */}
              <div
                className={`fixed top-full left-0 right-0 pt-4 transition-all duration-500 z-50 ${
                  isFlowersOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
                }`}
              >
                <div className="max-w-7xl mx-auto px-6">
                  <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
                    <div className="grid grid-cols-4 gap-0">
                      <div className="relative overflow-hidden">
                        <img src={bouquetImage} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                        <div className="absolute bottom-4 left-4 text-white">
                          <p className="text-sm font-semibold">Premium Bouquets</p>
                          <p className="text-xs opacity-90">Handcrafted with love</p>
                        </div>
                      </div>

                      <div className="col-span-3 p-8">
                        <div className="flex items-center gap-2 mb-6">
                          <div className="w-1 h-4 bg-gradient-to-b from-rose-500 to-pink-500 rounded-full"></div>
                          <p className="text-xs font-bold text-rose-500 uppercase tracking-wider">Our Catalogues</p>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                          {catalogueItems.map((item, idx) => (
                            <button 
                              key={idx} 
                              onClick={() => setCurrentPage('shop')}
                              className="flex items-center gap-4 p-3 rounded-xl hover:bg-gradient-to-r hover:from-rose-50 hover:to-pink-50 transition-all duration-300 group hover:cursor-pointer"
                            >
                              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-100 to-rose-200 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <div className="w-3 h-3 rounded-full bg-gradient-to-br from-rose-500 to-pink-500"></div>
                              </div>
                              <div className="text-left">
                                <p className="text-sm font-semibold text-gray-800 group-hover:text-rose-600 transition-colors">{item.name}</p>
                                <p className="text-xs text-gray-500">{item.desc}</p>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="px-8 py-6 bg-gradient-to-r from-rose-50/50 to-pink-50/50 border-t border-white/20 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-gray-800">Need help choosing?</p>
                        <p className="text-xs text-gray-500">Our floral experts are here to help</p>
                      </div>
                      <button 
                        onClick={() => setCurrentPage('shop')}
                        className="px-6 py-3 rounded-2xl text-sm font-semibold text-white bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:cursor-pointer"
                      >
                        View All
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button 
              onClick={() => setCurrentPage('catalogues')}
              className={`relative px-3 xl:px-4 py-2 text-sm font-medium transition-all group ${
                currentPage === 'catalogues' ? 'text-rose-600' : 'text-gray-700 hover:text-rose-600'
              }`}
            >
              CATALOGUES
              <span className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-rose-500 to-pink-500 transition-all duration-300 ${
                currentPage === 'catalogues' ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </button>

            <button 
              onClick={() => setCurrentPage('about')}
              className={`relative px-3 xl:px-4 py-2 text-sm font-medium transition-all group ${
                currentPage === 'about' ? 'text-rose-600' : 'text-gray-700 hover:text-rose-600'
              }`}
            >
              ABOUT
              <span className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-rose-500 to-pink-500 transition-all duration-300 ${
                currentPage === 'about' ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </button>

            <button 
              onClick={() => setCurrentPage('contact')}
              className={`relative px-3 xl:px-4 py-2 text-sm font-medium transition-all group ${
                currentPage === 'contact' ? 'text-rose-600' : 'text-gray-700 hover:text-rose-600'
              }`}
            >
              CONTACT
              <span className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-rose-500 to-pink-500 transition-all duration-300 ${
                currentPage === 'contact' ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </button>

            <button 
              onClick={() => setCurrentPage?.('contact')}
              className="px-6 xl:px-8 py-3 rounded-2xl text-sm font-semibold text-white bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Contact Us
            </button>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            className="lg:hidden text-rose-600 p-2 rounded-lg hover:bg-rose-50 transition"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div className={`lg:hidden overflow-hidden transition-all duration-300 ${isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="bg-white/95 backdrop-blur-md border-t border-gray-200 px-3 sm:px-6 py-4 space-y-3">
          <button 
            onClick={() => setCurrentPage('home')}
            className={`block w-full text-left py-2 text-sm rounded-lg hover:bg-rose-50 px-2 ${
              currentPage === 'home' ? 'text-rose-600' : 'text-gray-700 hover:text-rose-600'
            }`}
          >
            HOME
          </button>

          <div>
            <button
              className="flex justify-between w-full text-rose-600 font-semibold py-2 px-2 text-sm rounded-lg hover:bg-rose-50"
              onClick={() => setIsMobileBouquetOpen(!isMobileBouquetOpen)}
            >
              BOUQUETS
              <svg className={`w-4 h-4 transition-transform ${isMobileBouquetOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <div className={`overflow-hidden transition-all duration-200 ${isMobileBouquetOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"}`}>
              <div className="mt-2 ml-4 space-y-2 border-l-2 border-rose-100 pl-3">
                {catalogueItems.map((item, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => {
                      setCurrentPage('shop')
                      setIsMobileMenuOpen(false)
                      setIsMobileBouquetOpen(false)
                    }}
                    className="block w-full text-left text-gray-700 hover:text-rose-600 text-sm py-1.5 px-2 rounded hover:bg-rose-50 cursor-pointer"
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button 
            onClick={() => setCurrentPage('catalogues')}
            className={`block w-full text-left py-2 px-2 text-sm font-medium rounded-lg hover:bg-rose-50 ${
              currentPage === 'catalogues' ? 'text-rose-600' : 'text-gray-700 hover:text-rose-600'
            }`}
          >
            CATALOGUES
          </button>
          <button 
            onClick={() => setCurrentPage('about')}
            className={`block w-full text-left py-2 px-2 text-sm font-medium rounded-lg hover:bg-rose-50 ${
              currentPage === 'about' ? 'text-rose-600' : 'text-gray-700 hover:text-rose-600'
            }`}
          >
            ABOUT
          </button>
          <button 
            onClick={() => setCurrentPage('contact')}
            className={`block w-full text-left py-2 px-2 text-sm font-medium rounded-lg hover:bg-rose-50 ${
              currentPage === 'contact' ? 'text-rose-600' : 'text-gray-700 hover:text-rose-600'
            }`}
          >
            CONTACT
          </button>

          <button 
            onClick={() => {
              setCurrentPage('contact')
              setIsMobileMenuOpen(false)
            }}
            className="w-full px-6 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 mt-4"
          >
            Contact Us
          </button>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
