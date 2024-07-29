import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import banner1 from '../assets/media/banner10.png';
import banner3 from '../assets/media/1.png';
import banner2 from '../assets/media/2.png';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import img01 from '../assets/media/img01.png';
import style from '../assets/media/swoosh.png';
import Footer from '../components/Footer';
import FeaturedProduct from '../components/FeaturedProduct';
import TestimonialSection from '../components/TestimonialSection';

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
    <div>
      <Header />

      {/* Section 1 */}
      <div className="relative w-full overflow-hidden h-[370px] bg-gray-100">
        <div className="carousel w-full">
          {banners.map((banner, index) => (
            <div
              key={index}
              className={`carousel-item relative float-left w-full transition-transform duration-500 ${index === currentSlide ? 'block' : 'hidden'}`}
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
        <div className="md:text-4xl text-xl my-6 text-center font-serif ">Ancient science meets <span className='text-extrabold text-5xl text-[#9d003f] mx-3 '>Modern</span></div>


    {/* Section 3 */}
    <div  style={{ backgroundImage: `url(${banner3})` }} className='text-center bg-cover bg-center h-auto' >
         <h1 className=' text-[#9d003f] pt-12 mb-4 p text-3xl'>Unani <span className='text-green-800'>
          Medicine</span></h1>
          <p className='text-lg'>Unani medicine derives its goodness
from natural substances.</p>
<div className='flex justify-center h-64'>
    <img src={img01} alt="" />
    </div>
    <div className='mx-28 my-4'>
    At Aun Herbal, we believe in the healing potential of plants and their ability to support our well-being in a holistic way. Our journey into herbalism began with a deep respect for traditional knowledge and a desire to offer natural alternatives for modern health concerns.

Our range of herbal products spans a variety of categories, including skincare, dietary supplements, aromatherapy, and more. Whether you're looking to nourish your skin with botanical-infused creams and serums, enhance your wellness routine with herbal supplements, or create a soothing sanctuary with aromatherapy blends, we have something for everyone.
    </div>
    <button className='bg-[#9d003f] text-white p-2 text-lg px-4 rounded-xl my-5 mb-20'>
     Know More
    </button>
    </div>


    {/* Section4 */}
    <div className='flex container mx-auto'>
<div className='bg-cover bg-center w-[70%]'>
<p className='mt-20 text-5xl mx-10 font-extrabold'>Committed to </p>
<p className='text-5xl mt-4 relative mx-10 my-2 z-10 font-extrabold'><span className='text-[#9d003f] text-4xl'>Nation</span> Building </p>
<img src={style} alt="" className='mt-[-41px] '/>
</div>
<div lassName='w-[30%]'>
<p className=' mt-20 text-xl font-medium'>Welcome to Aun Herbal, where nature meets wellness. <br/>
We are passionate about harnessing the power of <br/>nature 
to promote health and vitality through our range of herbal products.</p>
<button className='bg-[#9d003f] p-3 text-white text-xl my-10 rounded-lg'>
  About Our Legacy
</button>
</div>

    </div>


    {/* Section5 */}

    <div className="text-center my-[60px]">
            <div>
              <h1 className="text-[40px] md:text-[40px] text-gray-800 font-extrabold ">Product Range</h1>
              <p className='mx-28 my-2 text-gray-800 mb-8'>We create some of the most well-known brands globally, and these brands are utilized by billions of people daily. Use this page to explore the complete list of Hamdard's brands and access more detailed information</p>
            </div>
            <div className="my-5">
              <FeaturedProduct />
            </div>
          </div>


          <div className="text-center mt-[50px]">
            <div>
              <h1 className="text-[30px] md:text-[40px] font-extrabold">What Our Customers Say</h1>
            </div>
            <div className="mt-4 mb-10">
              <TestimonialSection />
            </div>
          </div>



<Footer />
    </div>
  );
};

export default Home;
