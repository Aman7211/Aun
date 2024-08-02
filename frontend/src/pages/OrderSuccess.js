import React from 'react';
import { Link } from 'react-router-dom';
import banner from '../assets/media/photo.png';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
const OrderSuccess = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 hero mb-[-20px]" style={{ backgroundImage: `url(${banner})`, backgroundSize:"cover"}} >
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <CheckCircleIcon className='text-green-800 my-4'style={{ fontSize: '50px' }}/>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Order Placed Successfully!</h1>
        <p className="text-gray-600 mb-6">Thank you for your purchase. Your order has been placed successfully.</p>
        <p className="text-gray-600 mb-6">We Will Send You Confirmation Mail Shortly.</p>
        <Link to="/products" className="block w-full bg-green-800 text-white py-2 px-4 rounded hover:bg-green-700 transition duration-300">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;
