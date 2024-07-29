import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import LoginOption from './pages/LoginOption';
import RegisterPage from './pages/Signup';
import ProductDetails from './components/ProductDetail';
import './App.css'
import Product from './pages/Products';
import About from './pages/About';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="/login" element={<LoginOption />} />
        <Route path="/signup" element={<RegisterPage/>} />
        <Route path="/products" element={<Product />} />
        <Route path="/about" element={<About />} />

        <Route path="/products/:id" element={<ProductDetails />} />
      </Routes>
</div>
  )
}

export default App