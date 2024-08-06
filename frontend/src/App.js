import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import LoginOption from './pages/LoginOption';
import RegisterPage from './pages/Signup';
import ProductDetails from './components/ProductDetail';
import './App.css'
import Product from './pages/Products';
import About from './pages/About';
import Blog from './components/Blog';
import CartPage from './pages/Cart';
import PrivateRoutes from './Routes/PrivateRoutes';
import Checkout from './components/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import OurIngredients from './pages/OurIngredients';
import Contact from './pages/Contact';

const App = () => {
  return (
    <div className='overflow-hidden'>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="/login" element={<LoginOption />} />
        <Route path="/signup" element={<RegisterPage/>} />
        <Route path="/products" element={<Product />} />
        <Route path="/about" element={<About />} />
        <Route path='/blog' element={<Blog/>} />
        <Route path="/cart" element={<PrivateRoutes><CartPage /></PrivateRoutes>} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/Checkout" element={<PrivateRoutes><Checkout/></PrivateRoutes>} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/ingredient" element={<OurIngredients />} />
        <Route path="/products/:id" element={<ProductDetails />} />
      </Routes>
</div>
  )
}

export default App