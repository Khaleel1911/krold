import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToHash from './components/ScrollToHash'
import Home from './pages/Home'
import ServicesPage from './pages/ServicesPage'
import BlogPage from './pages/BlogPage'
import NriPage from './pages/NriPage'

function App() {
  return (
    <BrowserRouter>
      <ScrollToHash />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/nri" element={<NriPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
