import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { Routes, Route } from 'react-router-dom'
import viteLogo from '/vite.svg'
import './index.css'
import Home from './pages/Home'
import AboutUs from './pages/AboutUs'
import ContactUs from './pages/ContactUs'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermCondition from './pages/TermCondition'
import ProductViewAll from './pages/ProductViewAll'
import UserDashboard from './pages/UserDashboard'
import ProductDetailView from './pages/ProductDetailView'

function App() {



  return (
    <>
      {/* <Home/> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/TermCondition" element={<TermCondition />} />
        <Route path="/productViewAll" element={<ProductViewAll />} />
        <Route path="/user" element={<UserDashboard />} />

        <Route path="/productDetail/:id" element={<ProductDetailView />} />

      </Routes>

    </>
  )
}

export default App
