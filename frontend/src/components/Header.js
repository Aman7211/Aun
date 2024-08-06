import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/media/aun_logo.png';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import { AppContext } from '../authcontext/AppContext';
import LogoutIcon from '@mui/icons-material/Logout';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const token = localStorage.getItem('token');
  const { logout } = useContext(AppContext);
  const handleToggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleClickOutside = (event) => {
    if (menuOpen && !event.target.closest('#menu') && !event.target.closest('#menuToggle')) {
      setMenuOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <header className="bg-[#fbf6e8] py-4 border-b-2">
      <div className="container mx-auto flex items-center justify-between py-4 px-4 md:px-0 ">
        <button
          id="menuToggle"
          onClick={handleToggleMenu}
          className="block md:hidden focus:outline-none"
        >
         <MenuIcon/>
        </button>
        <nav
          id="menu"
          className={`fixed top-0 left-0 w-[60%] md:w-full h-full bg-black text-[#FBF6E7] md:text-black bg-opacity-95 z-20 transform ${
            menuOpen ? 'translate-x-0' : '-translate-x-full'
          } transition-transform duration-300 md:relative md:w-auto md:h-auto md:bg-transparent md:translate-x-0 md:flex md:items-center space-x-4 md:space-x-0`}
        >
          <button onClick={handleToggleMenu} className='md:hidden font-bold text-2xl m-4 mt-5 bg-red-800 p-2 px-3 rounded-full'>
            X
          </button>
          <ul className="flex flex-col md:flex-row md:space-x-6 space-y-4 md:space-y-0 items-start m-5 py-0 md:py-0 md:m-0 md:items-center justify-start md:justify-center h-full md:h-auto font-medium text-xl md:text-lg">
            <li>
              <Link to="/" className="hover:text-gray-400 py-2 md:py-0 ">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-gray-400 py-2 md:py-0">
                About
              </Link>
            </li>
            <li>
              <Link to="/products" className="hover:text-gray-400 py-2 md:py-0">
                Products
              </Link>
            </li>
            <li>
              <Link to="/blog" className="hover:text-gray-400 py-2 md:py-0">
                Blogs
              </Link>
            </li>
            <li>
              <Link to="/ingredient" className="hover:text-gray-400 py-2 md:py-0">
                Our Ingredients
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-gray-400 py-2 md:hidden md:py-0">
               Contact us
              </Link>
            </li>
          </ul>
        </nav>
        <div className="absolute left-1/2 transform -translate-x-1/2">
        <Link to={'/'}>
          <img src={logo} alt="Logo" className="h-28" />
          </Link>
        </div>
        <nav className="flex md:items-center md:space-x-6">
          <ul className="flex flex-col md:flex-row md:space-x-6 items-center justify-center h-full md:h-auto">
            <li>
              <Link to="/contact" className="hidden md:block hover:text-gray-400 py-2 md:py-0 font-medium text-lg">
                Contact
              </Link>
            </li>
          {!token ? ( <li>
              <Link to="/login" className="hover:text-gray-400 py-2 md:py-0 text-2xl">
                <AccountCircleIcon/>
              </Link>
            </li>):(<li>
              <button onClick={()=>logout()} className="text-red-800 hover:text-red-900 py-2 md:py-0 text-2xl">
                <LogoutIcon/>
                <div></div>
              </button>
            </li>)} 
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
