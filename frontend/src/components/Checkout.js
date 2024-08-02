import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import banner from '../assets/media/photo.png';

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
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/addresses/${userId}`);
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
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/addresses`, {
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
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/addresses/${addressId}`, {
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
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/payment/checkout`, {
        Email : userEmail,
        products : cartItems,
        amount,
        address:addresses[0].addressLine1
      });

      if (response.status === 200) {
        console.log('Order placed successfully:', response.data);
        // Clear the cart and redirect to a success page
        localStorage.removeItem('cartItems');
        window.location.href = '/order-success'; 
        toast.success("Order SuccessFully Created");// Assuming you have an order success page
      } else {
        console.error('Failed to place order:', response.statusText);
        toast.error("Failed to Create Your Order Kindly try after some time");
      }
    } catch (error) {
      console.error('Error placing order:', error);
    }
  }

  return (
    <div className="container mx-auto p-4" style={{ backgroundImage: `url(${banner})`, backgroundSize:"cover" }}>
      <div className="flex flex-col lg:flex-row lg:space-x-4">
        <div className="lg:w-2/3 mt-4">
          <h2 className="text-center">Shipping Address</h2>
          <p className="text-center">*Please save only one address at a time*</p>
          <form onSubmit={handleAddressSubmit} className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-center font-bold">Email: {userEmail}</h3>
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
          <div className="address-list mt-5 bg-gray-100 p-4 rounded-lg shadow-md">
            <ul>
              {addresses.map((address) => (
                <li key={address._id} className="mb-4 p-2 border-b border-gray-200">
                  <div className="save_data">
                    <p className="font-bold text-xl my-2">{`${address.name}`}</p>
                    <p>{`${address.addressLine1}`}</p>
                    <p>{`${address.city}, ${address.state}, ${address.country}, ${address.postalCode}, ${address.phoneNo}`}</p>
                    <p><span className="font-medium">Phone Number: </span>{`${address.phoneNo}`}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteAddress(address._id)}
                    className="w-full bg-red-800 text-white py-1 mt-2 rounded hover:bg-red-700"
                  >
                    Delete Address
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <h2 className="text-green-800 font-bold text-xl underline underline-offset-4 decoration-wavy my-7 text-center">
            Order Summary
          </h2>
          <div className="total-price bg-gray-100 p-4 rounded-lg shadow-md">
            <div>Total Price: ₹{amount}</div>
          </div>
          <button className="w-full bg-yellow-800 text-white py-2 mt-4 rounded hover:bg-yellow-700" onClick={handleCheckout}>
            Cash On Delivery
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
