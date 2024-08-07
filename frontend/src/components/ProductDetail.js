import React, { useState, useEffect, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import banner from '../assets/media/photo.png';
import toast from "react-hot-toast";
import { AppContext } from "../authcontext/AppContext";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Footer from "./Footer";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const { authdetails } = useContext(AppContext);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:4000/api/products/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (response.status === 200) {
          setProduct(response.data);
        } else {
          toast.error('Failed to fetch product details');
        }
      } catch (error) {
        toast.error('Error fetching product details:', error);
      }
    };

    fetchProductDetails();
  }, [id]);

  const addToCart = async (productId) => {
    try {
      const token = authdetails.token;
      if (!token) {
        toast.error("Please login to add products to your cart.");
        return;
      }

      const payload = {
        userId: authdetails.userId,
        productId,
        quantity: 1,
      };

      const response = await axios.post(`http://localhost:4000/api/cart/add-to-cart`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response) {
        toast.success("Product added to cart successfully!");
      } else {
        toast.error("Error in adding Product Kindly try again");
      }
    } catch (error) {
      toast.error("Error adding product to cart:", error);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen p-4 hero mb-[-20px]" style={{ backgroundImage: `url(${banner})`, backgroundSize:"cover" }}>
        <button onClick={() => navigate(-1)} className="absolute flex left-10 top-10 bg-red-900 text-white p-2 rounded-full">
          <ArrowBackIcon />
        </button>

        <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl w-full">
          {product ? (
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex justify-center">
                <img src={product.picture} alt={product.name} className="rounded-lg max-h-100 object-cover" />
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-900">{product.name}</h2>
                <p><strong>Gender:</strong> {product.gender}</p>
                <div>
                  <span className="font-bold">Description</span>:
                  <ul className="list-disc pl-5 mt-1">
                    {product.description.split('\n').map((line, index) => (
                      <li key={index}>{line}</li>
                    ))}
                  </ul>
                </div>
                <p><strong>Benefits:</strong> {product.benefits}</p>
                <p><strong>Dosage:</strong> {product.dosage}</p>
                <p className="text-xl font-semibold"><strong>Price:</strong> ₹{product.price}</p>
                <button 
                  className="bg-green-800 text-white px-4 py-2 rounded-md hover:bg-green-900 transition duration-200"
                  onClick={() => addToCart(product._id)}
                >
                  Add to Cart
                </button>
                <button 
                  onClick={() => navigate(-1)}
                  className="bg-red-800 text-white px-4 py-2 mx-3 rounded-md hover:bg-red-900 transition duration-200"
                >
                  Go Back
                </button>
              </div>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default ProductDetails;
