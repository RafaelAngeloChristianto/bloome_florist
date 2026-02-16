import { useState } from 'react'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Gallery from './pages/Gallery'
import Contact from './pages/Contact'
import About from './pages/About'

function App() {
  const [currentPage, setCurrentPage] = useState('home')

  const renderPage = () => {
    switch (currentPage) {
      case 'shop':
      case 'catalogues':
        return <Gallery setCurrentPage={setCurrentPage} />
      case 'contact':
        return <Contact setCurrentPage={setCurrentPage} />
      case 'about':
        return <About setCurrentPage={setCurrentPage} />
      default:
        return <Home setCurrentPage={setCurrentPage} />
    }
  }

  return (
    <div className="App">
      <NavBar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {renderPage()}
      <Footer setCurrentPage={setCurrentPage} />
    </div>
  )
}



export default App