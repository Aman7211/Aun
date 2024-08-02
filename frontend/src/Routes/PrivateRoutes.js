import React, {  useEffect, useState , useContext } from 'react'
import { AppContext } from '../authcontext/AppContext'
import { Link, useNavigate } from 'react-router-dom';
import banner from '../assets/media/photo.png';
import Footer from '../components/Footer';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const PrivateRoutes = ({children}) => {
    const navigate = useNavigate();
    const {authdetails} = useContext(AppContext);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      setLoading(false); // Mark loading as false once the component mounts
    }, []);

    if (loading) {
      // Render a loading indicator while checking authentication state
      return <div>Loading...</div>;
    }
  

if(!authdetails.authState){

   return (
    <>
      <button onClick={() => navigate(-1)} className="absolute flex left-10 top-10 bg-red-900 text-white p-2 rounded-full">
          <ArrowBackIcon />
        </button>

    <div className="flex flex-col items-center justify-center h-[100vh] bg-gray-200 hero mb-[-20px]" style={{ backgroundImage: `url(${banner})`, backgroundSize:"cover"}} >
    <div className="text-center p-8 bg-white rounded-lg shadow-lg ">
      <div className="text-6xl mb-4">😔</div>
      <div className="text-xl font-semibold mb-2">Please log in first</div>
      <p className="text-gray-600">You need to be logged in to add items to your cart and checkout.</p>
      <Link to={"/login"}>
      <button className="mt-4 bg-green-800 text-white px-6 py-2 rounded-full hover:bg-green-700 transition duration-300">
        Log In
      </button>
      </Link>
    </div>
  </div>
  <Footer/>
  </>
  
  )
};

  return children
}

export default PrivateRoutes