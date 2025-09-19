import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import { Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
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
import ProtectedRoutes from './utils/ProtectedRoutes'
import { getMeDetails } from './store/slice/userSlice'
import NotFound from './pages/NotFound'
function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getMeDetails());
  }, [dispatch]);

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
        {/* <Route path="/user" element={<UserDashboard/>}/> */}

        <Route path="/productDetail/:id" element={<ProductDetailView />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoutes />}>
          <Route path="/user" element={<UserDashboard />} />
          {/* Add more protected routes here */}
        </Route>

        <Route path='*' element={<NotFound />} />
      </Routes>

    </>
  )
}

export default App
