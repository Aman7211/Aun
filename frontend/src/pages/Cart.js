import banner from '../assets/media/photo.png';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from 'react-hot-toast';
const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:4000/api/cart/cart-items/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCartItems(response.data);
      calculateTotalPrice(response.data); // Calculate total price separately
    } catch (error) {
      toast.error("Error fetching cart items:", error);
    }
  };

  const calculateTotalPrice = (items) => {
    const total = items.reduce((acc, item) => {
      if (item.productId && item.productId.price) {
        return acc + item.productId.price * item.quantity;
      }
      return acc;
    }, 0);
    setTotalPrice(total);
    localStorage.setItem("totalPrice", total);
  };

  const updateQuantity = async (productId, newQuantity) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`http://localhost:4000/api/cart/update-cart-item-quantity`,
        { userId, productId, quantity: newQuantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchCartItems();
    } catch (error) {
      toast.error("Error updating quantity:", error);
    }
  };

  const incrementQuantity = (productId) => {
    const updatedCartItems = cartItems.map((item) => {
      if (
        item.productId &&
        item.productId._id === productId &&
        item.quantity > 1
      ) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCartItems(updatedCartItems);
    updateQuantity(
      productId,
      updatedCartItems.find(
        (item) =>
          item.productId && item.productId._id === productId
      ).quantity
    );
  };

  const decrementQuantity = (productId) => {
    const updatedCartItems = cartItems.map((item) => {
      if (
        item.productId &&
        item.productId._id === productId &&
        item.quantity > 1
      ) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCartItems(updatedCartItems);
    updateQuantity(
      productId,
      updatedCartItems.find(
        (item) =>
          item.productId && item.productId._id === productId
      ).quantity
    );
  };

  const calculateTaxes = (totalPrice) => {
    // Assuming tax rate is 12%
    const taxRate = 0.12;
    const taxes = totalPrice * taxRate;
    localStorage.setItem("taxamount", taxes.toFixed(2));
    return taxes.toFixed(2); // Round to two decimal places
  };

  const calculateGrandTotal = (totalPrice) => {
    const gstAmount = calculateTaxes(totalPrice);
    const grandTotal = totalPrice + parseFloat(gstAmount);
    return grandTotal.toFixed(2);
  };

  const removeCartItem = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `http://localhost:4000/api/cart/remove-from-cart/${userId}/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchCartItems();
    } catch (error) {
      toast.error("Error removing cart item:", error);
    }
  };

  const handleCheckout = () => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    localStorage.setItem("totalPrice", totalPrice);
  
  };

  return (
    <div className="flex flex-col items-center p-4 min-h-screen" style={{ backgroundImage: `url(${banner})`, backgroundSize:"cover" }}>
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-6 text-center text-brown-400">CART</h1>
        <ul className="space-y-4">
          {cartItems.map((item) => (
            <li
              key={item._id}
              className="flex flex-col sm:flex-row items-center bg-green-50 p-4 rounded-lg shadow-sm"
            >
              <div className="w-24 h-24">
                {item.productId && item.productId.picture && (
                  <img
                    src={item.productId.picture}
                    alt={item.productId.name}
                    className="w-full h-[150px] object-cover rounded-lg mt-[-10px]"
                  />
                )}
              </div>
              <div className="ml-0 sm:ml-4 mt-4 sm:mt-0 flex-1">
                <div className="text-lg font-semibold">
                  {item.productId
                    ? item.productId.name
                    : "Product Name Not Available"}
                </div>
                <div className="text-gray-600">
                  Price: ₹
                  {item.productId && item.productId.price
                    ? item.productId.price
                    : "Price Not Available"}
                </div>
                <div className="flex items-center mt-2">
                  <button
                    onClick={() => decrementQuantity(item.productId._id)}
                    disabled={item.quantity === 1 || !item.productId}
                    className="px-3 py-1 bg-gray-200 rounded-md disabled:opacity-50"
                  >
                    -
                  </button>
                  <span className="mx-2">{item.quantity}</span>
                  <button
                    onClick={() => incrementQuantity(item.productId._id)}
                    disabled={!item.productId}
                    className="px-3 py-1 bg-gray-200 rounded-md disabled:opacity-50"
                  >
                    +
                  </button>
                </div>
                <div className="text-gray-600 mt-2">
                  Total Price: ₹
                  {item.productId && item.productId.price
                    ? item.productId.price * item.quantity
                    : "Total Price Not Available"}
                </div>
                <button
                  onClick={() => removeCartItem(item.productId._id)}
                  className="mt-2 text-red-500 hover:text-red-700">
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-5 py-5 text-right h-[150px] bg-gray-100 rounded-xl flex flex-col items-end sm:items-center sm:flex-row sm:justify-between sm:ml-0 pr-[20px]">
          <h3 className="text-xl font-semibold">
            <span className="text-red-800 ml-4">Grand Total : </span> ₹
            {calculateGrandTotal(totalPrice)}
          </h3>
          <p className="text-sm text-gray-600">
            Taxes: ₹{calculateTaxes(totalPrice)}
          </p>
          <Link to="/Checkout" className="w-full sm:w-auto">
            <button
              className="mt-4 sm:mt-0 px-6 py-2 bg-green-800 text-white rounded-md hover:bg-green-700 w-full sm:w-auto"
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage
