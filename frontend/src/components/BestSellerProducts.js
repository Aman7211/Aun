import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
const BestSellerProducts = () => {
  const [products, setProducts] = useState([]);
  const [randomProducts, setRandomProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/products`);
        if (response.status === 200) {
          const fetchedProducts = response.data;
          setProducts(fetchedProducts);
          
          // Select three random products
          const selectedProducts = [fetchedProducts[0], fetchedProducts[1], fetchedProducts[8]];
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
    </div>
  );
};

export default BestSellerProducts;
