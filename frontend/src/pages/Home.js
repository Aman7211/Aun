import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import banner1 from '../assets/media/banner10.png';
import banner3 from '../assets/media/1.png';
import banner2 from '../assets/media/2.png';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import img01 from '../assets/media/img01.png';
// import style from '../assets/media/swoosh.png';
import Footer from '../components/Footer';
import FeaturedProduct from '../components/FeaturedProduct';
import TestimonialSection from '../components/TestimonialSection';
import BestSellerProducts from '../components/BestSellerProducts';
import GMP from '../assets/media/gmp.png'
import indianFederationLogo from '../assets/media/indis.jpg'
import ISO from '../assets/media/ISO.png'
import MINAyushLogo from '../assets/media/AAYUSH.png'
import { FeaturedImage } from '../components/FeaturedImage';
import InstagramIcon from '@mui/icons-material/Instagram';
const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const banners = [banner1, banner2];

  const handleNext = () => {
    setCurrentSlide((currentSlide + 1) % banners.length);
  };

  const handlePrev = () => {
    setCurrentSlide((currentSlide - 1 + banners.length) % banners.length);
  };

  useEffect(() => {
    // Set up the auto-play interval
    const intervalId = setInterval(handleNext, 2000); // Change slide every 3 seconds

    // Clear the interval on component unmount
    return () => clearInterval(intervalId);
  }, [currentSlide]);

  return (
    <>
      <Header />

      {/* Section 1 */}
      <div className="relative w-full overflow-hidden md:h-[370px] bg-gray-100">
        <div className="carousel w-full">
          {banners.map((banner, index) => (
            <div
              key={index}
              className={`carousel-item z-0 relative float-left w-full transition-transform duration-500 ${index === currentSlide ? 'block' : 'hidden'}`}
            >
              <img src={banner} className="block w-full h-full object-cover " alt={`banner${index + 1}`} />
            </div> 
          ))}
        </div>
        <button
          className="carousel-control-prev absolute top-1/2 left-0 transform -translate-y-1/2 p-2 "
          type="button"
          onClick={handlePrev}
        >
          <span className="inline-block font-bold" aria-hidden="true"><ArrowBackIosIcon/></span>

        </button>
        <button
          className="carousel-control-next absolute top-1/2 right-0 transform -translate-y-1/2 p-2"
          type="button"
          onClick={handleNext}
        >
          <span className="inline-block" aria-hidden="true" ><ArrowForwardIosIcon/></span>
        </button>
      </div>

      {/* Section 2 */}
        <div className="md:text-3xl text-xl my-7 text-center font-serif "><span className='text-extrabold text-4xl text-[#9d003f] mx-3 '>Welcome</span> to Aun Herbal Remedies, Where nature meets wellness</div>


    {/* Section 3 */}
    <div  style={{ backgroundImage: `url(${banner3})` }} className='text-center bg-cover bg-center h-auto' >
         <h1 className=' text-[#9d003f] pt-12 mb-2 text-3xl md:text-5xl font-bold'>Unani  <span className='text-green-800'>
          Medicines</span></h1>
          {/* <p className='text-lg'>Unani medicine derives its goodness
from natural substances.</p> */}
<div className='flex justify-center h-64'>
    <img src={img01} alt="" />
    </div>
    <div className='md:mx-28 mx-8 my-4'>
    A holistic healing system originating in India thousands of years ago, emphasizes the balance of mind, body, and spirit for overall well-being.
“Aun Herbal Remedies” is seeks to bring the ancient wisdom to everyone, making it easy and accessible for people to live healthier and happier lives. By providing a wide range of natural products based on Ayurvedic and Unani principles, Aun Herbal Remedies aims to help people achieve balance in their physical, mental, and emotional health. 
we believe that health is not merely the absence of disease but a state of complete physical, mental, and emotional well-being. Our mission is to empower individuals to take charge of their health through natural remedies, lifestyle modifications, and personalized wellness plans tailored to their unique constitution.
  </div>
    <button className='bg-[#9d003f] text-white p-2 text-lg px-4 rounded-xl my-5 mb-20'>
     Know More
    </button>
    </div>


    {/* Section4 */}

    <div className="text-center my-[60px]">
            <div>
              <h1 className="text-[40px] md:text-[40px] text-gray-800 font-extrabold ">Best Sellers</h1>
            </div>
            <div className="my-5">
              <BestSellerProducts />
            </div>
          </div>

    <div className="text-center my-[60px]">
            <div>
              <h1 className="text-[40px] mt-10 md:text-[40px] text-gray-800 font-extrabold ">Our Product Range</h1>
            </div>
            <div className="my-5">
              <FeaturedProduct />
            </div>
          </div>


          <div className='container md:mx-auto mb-8 md:mx-[100px]'>
          <h1 className="text-[20px] md:text-[30px] text-center font-bold my-5">Certified</h1>

                <div className='container mx-auto flex flex-row justify-evenly mt-5'>
                    <div>
                        <img src={ISO} alt="Gujarat State Yog Board Logo" title='Gujarat State Yog Board' className='h-[90px] md:h-[150px] grayscale hover:grayscale-0' />
                    </div>
                    <div className='brand'>
                        <img src={GMP} alt="Fit India Logo" title='Fit India' className='h-[90px] md:h-[150px] grayscale hover:grayscale-0'/>
                    </div>
                    <div className='brand'>
                        <img src={indianFederationLogo} alt="Indian Federation Logo" title='Indian Federation of Yoga' className='h-[90px] md:h-[150px] w-[150px] grayscale hover:grayscale-0 rounded-full'/>
                    </div>
                    <div className='brand'>
                        <img src={MINAyushLogo} alt="Ministry of Ayush Logo" title='Ministry of Ayush' className=' h-[90px] md:h-[150px] grayscale hover:grayscale-0' />
                    </div>
                </div>
            </div>


          <div className="text-center mt-[50px]">
            <div>
              <h1 className="text-[30px] md:text-[40px] font-extrabold">Our Happy Customers </h1>
            </div>
            <div className="mt-4 mb-10">
              <TestimonialSection />
            </div>
          </div>

<div className='font-bold text-center text-lg'>
  Tag us on <InstagramIcon/> @aunherbal remedies OR #aunherbalremedies to get featured on website and feed.
</div>


{/* Section6 */}
<div className='my-8'>
  <h1 className='text-center text-4xl font-bold my-4'>Recent Rewards</h1>
<FeaturedImage/>
</div>

{/* Section7  */}
<div className="my-8 mt-12 p-6">
      <h1 className="text-center text-4xl font-bold my-4 text-gray-800">Stay up to Date</h1>
      <p className="text-center text-gray-700 mb-6">
        Enter your mobile number to receive special offers, new product previews, and the latest healthcare routine updates.
      </p>
      <div className="flex justify-center items-center">
        <div className="mr-4 my-4">
          <input 
            type="number" 
            className="border-2 border-gray-300 p-3 rounded-lg w-full max-w-xs outline-none focus:border-red-800"
            placeholder="Enter your mobile number"
          />
        </div>
        <button className="bg-red-800 text-white px-6 py-3 rounded-lg hover:bg-red-900 transition duration-200">
          Subscribe
        </button>
      </div>
    </div>

<Footer />
    </>
  );
};

export default Home;
