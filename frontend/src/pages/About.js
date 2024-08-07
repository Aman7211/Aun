import React from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';

const About = () => {
  return (
    <>
      <Header />
      <div className=" min-h-screen flex flex-col items-center space-y-10 ">

        {/* Banner Section */}
        <div className="w-full hero1 h-80 md:h-96 flex items-center justify-start bg-cover bg-center relative" >
          <h1 className="text-white text-4xl md:text-6xl font-bold px-4 py-2 rounded-md pl-[80px] bg-opacity-60 bg-black">
            About Us
          </h1>
        </div>

        {/* Main Content Section */}
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md p-6 max-w-4xl mx-auto">
            <p className="text-black text-lg md:text-xl">
              Welcome to <span className="font-bold text-red-800">Aun Herbal</span>, where nature meets wellness. We are passionate about harnessing the power of nature to promote health and vitality through our range of herbal products.
            </p>
            <p className="text-black text-lg md:text-xl mt-4">
              At Aun Herbal, we believe in the healing potential of plants and their ability to support our well-being in a holistic way. Our journey into herbalism began with a deep respect for traditional knowledge and a desire to offer natural alternatives for modern health concerns.
            </p>
            <p className="text-lg md:text-xl text-gray-700 mt-4">
              Our range of herbal products spans a variety of categories, including skincare, dietary supplements, aromatherapy, and more. Whether you're looking to nourish your skin with botanical-infused creams and serums, enhance your wellness routine with herbal supplements, or create a soothing sanctuary with aromatherapy blends, we have something for everyone.
            </p>
          </div>
        </div>

        {/* Additional Content Section */}
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md p-6 max-w-4xl mx-auto space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Our Commitment to Sustainability</h2>
            <p className="text-lg md:text-xl text-gray-700">
              At Aun Herbal, sustainability is at the heart of everything we do. We believe in preserving the planet for future generations and are committed to minimizing our environmental impact. From eco-friendly packaging to sustainable farming practices, we strive to make a positive difference in the world.
            </p>
            <p className="text-lg md:text-xl text-gray-700">
              Join us on our journey to promote health, wellness, and environmental stewardship. Together, we can make a lasting impact on our well-being and the health of our planet.
            </p>
          </div>
        </div>

      </div>
      <Footer />
    </>
  )
}

export default About