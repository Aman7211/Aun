import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import banner from '../assets/media/photo.png';
import Header from './Header';
import Footer from './Footer';

const CheckoutPage = () => {
  const totalPrice = parseFloat(localStorage.getItem('totalPrice')) || 0;
  const tax = parseFloat(localStorage.getItem('taxamount')) || 0;
  const userEmail = localStorage.getItem("userEmail");
  const amount = totalPrice + tax;
  const [cartItems, setCartItems] = useState([]);
  const [address, setAddress] = useState({
    name: '',
    phoneNo: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    email: userEmail, 
  });
  const [savedAddress, setSavedAddress] = useState(null);
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    fetchSavedAddresses();
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(storedCartItems);
  }, []);

  const fetchSavedAddresses = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const response = await fetch(`http://localhost:4000/api/addresses/${userId}`);
      if (response.ok) {
        const data = await response.json();
        setAddresses(data);
      } else {
        console.error('Failed to fetch addresses:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching addresses:', error);
    }
  };

  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem('userId');
      const response = await fetch(`http://localhost:4000/api/addresses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...address, userId }),
      });
      if (response.ok) {
        const data = await response.json();
        setSavedAddress(data);
        setAddress({
          name: '',
          phoneNo: '',
          addressLine1: '',
          addressLine2: '',
          city: '',
          state: '',
          postalCode: '',
          country: '',
          email: userEmail, 
        });
        localStorage.setItem('userAddress', JSON.stringify(data));
        fetchSavedAddresses();
      } else {
        console.error('Failed to save address:', response.statusText);
      }
    } catch (error) {
      console.error('Error saving address:', error);
    }
  };

  const handleDeleteAddress = async (addressId) => {
    try {
      const response = await fetch(`http://localhost:4000/api/addresses/${addressId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchSavedAddresses();
      } else {
        console.error('Failed to delete address:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting address:', error);
    }
  }

  const handleCheckout = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const response = await axios.post(`http://localhost:4000/payment/checkout`, {
        Email: userEmail,
        products: cartItems,
        amount,
        address: addresses[0].addressLine1,
      });

      if (response.status === 200) {
        console.log('Order placed successfully:', response.data);
        toast.success("Order Successfully Created");
        
        // Clear the cart
        localStorage.removeItem('cartItems');
        setCartItems([]);
        console.log('Cart items after clearing:', JSON.parse(localStorage.getItem('cartItems')));
        
        // Redirect to the order success page
        window.location.href = '/order-success';
      } else {
        console.error('Failed to place order:', response.statusText);
        toast.error("Failed to Create Your Order. Kindly try after some time");
      }
    } catch (error) {
      console.error('Error placing order:', error);
    }
  }

  return (
    <>
      <Header />
      <div className="" style={{ backgroundImage: `url(${banner})`, backgroundSize:"cover" }}>
        <div className="p-8 container mx-auto flex flex-col lg:flex-row lg:space-x-4">
          <div className="lg:w-2/3 mt-4">
            <h2 className="text-center">Shipping Address</h2>
            <p className="text-center">*Please save only one address at a time*</p>
            <form onSubmit={handleAddressSubmit} className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-center font-bold my-4">Email: {userEmail}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-group">
                  <label htmlFor="name">Full Name:</label>
                  <input
                    type="text"
                    id="name"
                    value={address.name}
                    onChange={(e) => setAddress({ ...address, name: e.target.value })}
                    required
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phoneNo">Phone Number:</label>
                  <input
                    type="text"
                    id="phoneNo"
                    value={address.phoneNo}
                    onChange={(e) => setAddress({ ...address, phoneNo: e.target.value })}
                    required
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="addressLine1">Address Line 1:</label>
                  <input
                    type="text"
                    id="addressLine1"
                    value={address.addressLine1}
                    onChange={(e) => setAddress({ ...address, addressLine1: e.target.value })}
                    required
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="addressLine2">Address Line 2:</label>
                  <input
                    type="text"
                    id="addressLine2"
                    value={address.addressLine2}
                    onChange={(e) => setAddress({ ...address, addressLine2: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="city">City:</label>
                  <input
                    type="text"
                    id="city"
                    value={address.city}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                    required
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="state">State:</label>
                  <input
                    type="text"
                    id="state"
                    value={address.state}
                    onChange={(e) => setAddress({ ...address, state: e.target.value })}
                    required
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="postalCode">Postal Code:</label>
                  <input
                    type="text"
                    id="postalCode"
                    value={address.postalCode}
                    onChange={(e) => setAddress({ ...address, postalCode: e.target.value })}
                    required
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="country">Country:</label>
                  <input
                    type="text"
                    id="country"
                    value={address.country}
                    onChange={(e) => setAddress({ ...address, country: e.target.value })}
                    required
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
              </div>
              <button type="submit" className="w-full bg-green-800 text-white py-2 mt-4 rounded hover:bg-green-900">
                Save Address
              </button>
            </form>
          </div>

          <div className="lg:w-1/3 mt-4">
            <h2 className="text-green-800 font-bold text-xl underline underline-offset-4 decoration-wavy text-center">
              Saved Addresses
            </h2>
            <div className="address-list mt-5">
              {addresses.map((address) => (
                <div key={address._id} className="bg-white p-4 rounded-lg shadow-md my-4">
                  <p className="font-bold">{address.name}</p>
                  <p>{address.phoneNo}</p>
                  <p>{address.addressLine1}</p>
                  <p>{address.addressLine2}</p>
                  <p>{address.city}, {address.state}, {address.postalCode}</p>
                  <p>{address.country}</p>
                  <button onClick={() => handleDeleteAddress(address._id)} className="w-full bg-red-500 text-white py-2 mt-4 rounded hover:bg-red-700">
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="p-8 container mx-auto">
        <div className="bg-white p-4 rounded-lg shadow-md mt-8">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="flex justify-between mb-2">
            <span>Items Total:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Tax:</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Total:</span>
            <span>${amount.toFixed(2)}</span>
          </div>
          <button
            onClick={handleCheckout}
            className="w-full bg-green-800 text-white py-2 mt-4 rounded hover:bg-green-900"
          >
            Checkout
          </button>
        </div>
      </div>
    <Footer />
    </>
  );
};

export default CheckoutPage;
