import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AppContext } from "../authcontext/AppContext";
import banner from "../assets/media/banner.jpg";
import toast from "react-hot-toast";
import Header from "../components/Header";
import Footer from "../components/Footer";

const useFetchProducts = (token, sortByPrice) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/products`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          let sortedProducts = response.data;
          if (sortByPrice === "ascending") {
            sortedProducts = sortedProducts.sort((a, b) => a.price - b.price);
          } else if (sortByPrice === "descending") {
            sortedProducts = sortedProducts.sort((a, b) => b.price - a.price);
          }
          setProducts(sortedProducts);
        } else {
          console.error("Failed to fetch products");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [sortByPrice, token]);

  return products;
};

const Product = () => {
  const { authdetails } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortByPrice, setSortByPrice] = useState("");
  const [activeCategory, setActiveCategory] = useState("patent");

  const products = useFetchProducts(authdetails.token, sortByPrice);

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
      console.error("Error adding product to cart:", error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSortByPrice = (event) => {
    setSortByPrice(event.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const classicalProducts = filteredProducts.filter(product => product.category === 'classical');
  const patentProducts = filteredProducts.filter(product => product.category === 'patent');

  const productsToDisplay = activeCategory === 'patent' ?  patentProducts : classicalProducts;

  return (
    <>
      <Header />
      <img src={banner} alt="banner" className="h-[400px] w-[100%]"/>
      <div className="container mx-auto">
        <div className="my-4 mt-[-290px] text-center">
          <input
            type="text"
            placeholder="Search Here"
            value={searchTerm}
            onChange={handleSearch}
            className="p-3 px-[50px] md:px-[200px] outline-none border-2 border-gray-500 rounded-full bg-green-50 placeholder-gray-800 placeholder-font-medium"
          />
        </div>
        <div className="mt-[290px] mb-6 text-right">
          <select
            value={sortByPrice}
            onChange={handleSortByPrice}
            className="mx-2 p-3 bg-green-800 text-white rounded-full font-bold"
          >
            <option value="">Sort by Price</option>
            <option value="ascending">Low to High</option>
            <option value="descending">High to Low</option>
          </select>
        </div>

        <div className="text-center my-6 mb-12">
          <button
            className={`mx-2 p-3 bg-green-800 text-white rounded-xl font-semibold ${activeCategory === 'patent' ? 'bg-red-900' : ''}`}
            onClick={() => setActiveCategory('patent')}
          >
            Patent Products
          </button>
          <button
            className={`mx-2 p-3 bg-green-800 text-white rounded-xl font-semibold ${activeCategory === 'classical' ? 'bg-red-900' : ''}`}
            onClick={() => setActiveCategory('classical')}
          >
            Classical Products
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {productsToDisplay.map((product) => (
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
                <button
                  onClick={() => addToCart(product._id)}
                  className="bg-green-800 text-white py-2 px-4 rounded-full hover:bg-green-700"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Product;
