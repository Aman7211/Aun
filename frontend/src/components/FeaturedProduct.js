import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AppContext } from '../authcontext/AppContext';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
const FeaturedProduct = () => {
  const { authdetails } = useContext(AppContext);
  const [classicalProducts, setClassicalProducts] = useState([]);
  const [patentProducts, setPatentProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('Patent');

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/products', {
          headers: {
            Authorization: `Bearer ${authdetails.token}`,
          },
        });

        if (response.status === 200) {
          const products = response.data;

          const classical = products.filter(product => product.category === 'classical').slice(0, 6);
          const patent = products.filter(product => product.category === 'patent').slice(0, 6);

          setClassicalProducts(classical);
          setPatentProducts(patent);
        } else {
          console.error('Failed to fetch featured products');
        }
      } catch (error) {
        console.error('Error fetching featured products:', error);
      }
    };

    fetchFeaturedProducts();
  }, [authdetails.token]);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  const productsToDisplay = activeCategory === 'Classical' ? classicalProducts : patentProducts;

  return (
    <div className="flex mt-10">
      <div className="flex w-1/4 p-4 text-xl items-center ">
        <ul>
          <li className={`mb-2 text-3xl text-left mx-4 ${activeCategory === 'Patent' ? 'font-bold text-[#9D003F]' : ''}`}>
            <button onClick={() => handleCategoryClick('Patent')}>Patent Products</button>
          </li>
          <li className={`mb-2 text-3xl my-8 text-left mx-5 ${activeCategory === 'Classical' ? 'font-bold text-[#9D003F]' : ''}`}>
            <button onClick={() => handleCategoryClick('Classical')}>Classical Products</button>
          </li>
        </ul>
      </div>
      <div className="w-3/4 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {productsToDisplay.map((product) => (
            <div key={product._id} className="border rounded-lg overflow-hidden shadow-lg">
              <Link to={`/products/${product._id}`}>
                <img
                  src={product.picture}
                  alt={product.name}
                  className="h-56 w-full object-cover"
                />
                <div className="p-4 text-center">
                  <div className="font-medium text-xl mb-2">{product.name}</div>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <Link to={'/products'}>
      <button className='mt-8 p-3 bg-[#9D003F] text-white text-lg px-5 rounded-xl'>See More <ArrowForwardIosIcon/></button>
      </Link>
      </div>
    </div>
  );
};

export default FeaturedProduct;
