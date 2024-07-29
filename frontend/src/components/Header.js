import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/media/aun_logo.png';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

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
      <div className="container mx-auto flex items-center justify-between py-4 px-4 md:px-0">
        <button
          id="menuToggle"
          onClick={handleToggleMenu}
          className="block md:hidden focus:outline-none"
        >
         <MenuIcon/>
        </button>
        <nav
          id="menu"
          className={`fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 transform ${
            menuOpen ? 'translate-x-0' : '-translate-x-full'
          } transition-transform duration-300 md:relative md:w-auto md:h-auto md:bg-transparent md:translate-x-0 md:flex md:items-center space-x-4 md:space-x-0`}
        >
          <ul className="flex flex-col md:flex-row md:space-x-6 items-center justify-center h-full md:h-auto font-medium text-lg">
            <li>
              <Link to="/" className="hover:text-gray-400 py-2 md:py-0">
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
              <Link to="/brand" className="hover:text-gray-400 py-2 md:py-0">
                Brands
              </Link>
            </li>
          </ul>
        </nav>
        <div className="absolute left-1/2 transform -translate-x-1/2">
        <Link to={'/'}>
          <img src={logo} alt="Logo" className="h-28" />
          </Link>
        </div>
        <nav className="hidden md:flex md:items-center md:space-x-6">
          <ul className="flex flex-col md:flex-row md:space-x-6 items-center justify-center h-full md:h-auto">
            <li>
              <Link to="/contact" className="hover:text-gray-400 py-2 md:py-0 font-medium text-lg">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-gray-400 py-2 md:py-0 text-2xl">
                <AccountCircleIcon/>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
