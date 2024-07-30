import {Link} from 'react-router-dom';
import logo from '../assets/media/aun_logo.png';
import MailIcon from '@mui/icons-material/Mail';
import CallIcon from '@mui/icons-material/Call';
import { AiFillYoutube, AiFillGithub, AiFillInstagram, AiFillLinkedin } from 'react-icons/ai'
const Footer = () => {


  const socialLinks = [
    {
      path: "www.youtube.com",
      icon: <AiFillYoutube className='group-hover-white w-4 h-5'/>
    },
    {
      path: "www.github.com",
      icon: <AiFillGithub className='group-hover-white w-4 h-5'/>
    },
    {
      path: "www.instagram.com",
      icon: <AiFillInstagram className='group-hover-white w-4 h-5'/>
    },
    {
      path: "www.linkedin.com",
      icon: <AiFillLinkedin className='group-hover-white w-4 h-5'/>
    },
  ];

  const quickLinks01 = [
    {
      path: "/",
      display: "Home",
    },
    {
      path: "/about",
      display: "About Us",
    },
    {
      path: "/blog",
      display: "Blog",
    },
    {
      path: "/login",
      display: "My Account",
    }
  ];

  const quickLinks02 = [
    {
      path: "/products",
      display: "Classical",
    },
    {
      path: "/products",
      display: "Patents",
    },
    {
      path: "/cart",
      display: "Cart",
    },
    {
      path: "/checkout",
      display: "Checkout",
    }
   
  ];

  const year = new Date().getFullYear()

  return (
    <footer className='mt-5 pt-10 bg-[#030f14] text-white mb-0 pb-0'>
      <div className="container">
        <div className="flex md:justify-between flex-col md:flex-row flex-wrap gap-[30px] mb-12">
          <div className='md:h-[350px] md:ml-[80px] mt-[-40px] '>
            <img src={logo} alt="" style={{height:"180px"}} className='ml-[95px] md:ml-0'/>
            <p className='text-center md:text-left md:ml-[10px]'>We are not just a brand but a movement that <br/>
            is bringing health and happiness to every home <br/>
            it touches, creating a ripple effect of positivity<br/>
            and well-being in communities near and far. <br/> 
           </p>
          
          </div>
          <div className='mr-[40px]'>
            <h2 className='text-[20px] leading-[30px] font-[700] mb-2 md:mb-6 text-center md:text-left '>Shop</h2>
            
          <ul className='text-center'>
            {quickLinks02.map((item, index) => (
              <li key={index} className='mb-4'>
                <Link to={item.path} className='text-[16px] leading-7 font-[400] '>
                  {item.display}
                </Link>
              </li>
            ))}
          </ul>
          </div>

          <div className='mr-[40px]'> 
            <h2 className='text-[20px] leading-[30px] font-[700] mb-2 md:mb-6 text-center md:text-left'>Quick Links</h2>
            
          <ul className='text-center'>
            {quickLinks01.map((item, index) => (
              <li key={index} className='mb-4'>
                <Link to={item.path} className='text-[16px] leading-7 font-[400] '>
                  {item.display}
                </Link>
              </li>
            ))}
          </ul>
          </div>

          <div>
            <h2 className='text-[20px] leading-[30px] font-[700] mb-2 md:mb-6 text-center  '>Address & Support</h2>
            <ul className='text-center'>
       
           <li className='font-semibold my-2'>Registered Address: </li>
           <li>HinduPura kheda, Deepa Sarai, <br/>
           Sambhal, 244303, Uttar Pradesh, India</li>
           <li className='font-semibold mt-4 mb-2'>Office : </li>
           <li> A142, Sector 63, Noida, 201301</li>
           <li className="flex items-center mb-4 md:ml-6 mt-4 ml-[120px]">
            <MailIcon className="text-white mr-2" />
            <span >aunherbals@gmail.com</span>
          </li>
          <li className="flex items-center mb-4 md:ml-6 ml-[120px]">
            <CallIcon className="text-white mr-2" />
            <span >9355818985</span>
          </li>
          <li className="flex items-center mb-4 md:ml-6 ml-[120px]">
            <CallIcon className="text-white mr-2" />
            <span >9355818983</span>
          </li>
        </ul>
        
          </div>
        </div>
      </div>
      <div className='text-center border-t-2 bg-black text-white pb-2 '>
      <p className='text-[16px] leading-7 font-[400] pt-4'>
              Copyrght © {year} developed by Aun Herbal all rights reserved
            </p>
            <div className='flex items-center justify-center gap-3 mt-4 '>
              {socialLinks.map((link, index) => (
                <Link to={link.path}
                key={index}
                className='w-9 h-9 border border-solid border-white hover:bg-white hover:text-black rounded-full flex items-center justify-center group hover:bg-primaryColor hover:border-none'
                >
                  {link.icon}
                </Link>
              ))}
            </div>
            </div>
    </footer>
  )
              }

export default Footer



