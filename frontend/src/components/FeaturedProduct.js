import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const FeaturedProduct = () => {
  const [randomProducts, setRandomProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/products`);
        if (response.status === 200) {
          const fetchedProducts = response.data;
          console.log(response)
          
          // Select Six random products
          const selectedProducts = [fetchedProducts[4], fetchedProducts[6], fetchedProducts[7], fetchedProducts[5],fetchedProducts[11], fetchedProducts[16]];
          setRandomProducts(selectedProducts);
        } else {
          toast.error('Failed to fetch products');
        }
      } catch (error) {
        toast.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto my-10">
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {randomProducts.map((product) => (
          <div key={product._id} className="border rounded-lg overflow-hidden shadow-lg">
            <Link to={`/products/${product._id}`}>
              <img
                src={product.picture}
                alt={product.name}
                className="h-64 w-full object-cover"
              />
            </Link>
            <div className="p-4 text-center">
              <div className="font-bold text-xl mb-2">{product.name}</div>
              <div className="text-gray-700 text-base mb-2">
                <span className="font-bold">Gender</span>: {product.gender}
              </div>
              <div className="text-lg font-semibold mb-4">₹{product.price}</div>
            
            </div>
          </div>
        ))}
      </div>
      <Link to={'/products'}>
      <button className='p-3 px-5 bg-[#9D003F] text-white rounded-xl text-lg my-3 mt-12'>See More <ArrowForwardIcon/></button>
      </Link>  </div>
  );
};

export default FeaturedProduct;
