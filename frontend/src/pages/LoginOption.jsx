import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';
import image from '../assets/media/1.jpg';
import frameImg from '../assets/media/2.jpg'; 
import Header from '../components/Header';
import Footer from '../components/Footer';
// import toast from 'react-hot-toast';

export default function LoginOption() {
    const [formType, setFormType] = useState('login'); // State to toggle between login and signup forms
    const title = "Welcome Back";
    const description1 = "Order Ayurvedic Herbal from Aun Herbal at Your Convienence anytime & anywhere";
    const description2 = "Herbal is the best ever medicine from anyone";

    const handleFormTypeChange = (type) => {
        setFormType(type);
    };

    return (
        <>
        <Header/>
                <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center border-t-2 ">
                    <div className="mx-auto flex w-11/12 max-w-maxContent flex-col-reverse justify-between gap-y-12 py-12 md:flex-row md:gap-y-0 md:gap-x-12">
                        <div className="mx-auto w-11/12 max-w-[450px] md:mx-0">
                            <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
                                {title}
                            </h1>
                            <p className="mt-4 text-[1.125rem] leading-[1.625rem]">
                                <span className="text-blue-700 font-semibold ">{description1}</span>{" "}
                                <div className="font-edu-sa font-semibold italic text-[#9d003f] mt-2">
                                    {description2}
                                </div>
                            </p>
                            {formType === "signup" ? <Signup /> : <Login />}
                            {formType === "login" ? (
                                <p className=" mx-2 mt-4 text-sm">
                                    Don't have an account?{" "}
                                    <button
                                        className="text-[#9d003f] font-semibold"
                                        onClick={() => handleFormTypeChange("signup")}
                                    >
                                        Create Account
                                    </button>
                                </p>
                            ) : (
                                <p className=" mx-2 mt-4 text-sm">
                                    Already have an account?{" "}
                                    <button
                                        className="text-[#9D003F] font-semibold"
                                        onClick={() => handleFormTypeChange("login")}
                                    >
                                        Log In
                                    </button>
                                </p>
                            )}
                        </div>
                        <div className="relative mx-auto w-11/12 max-w-[450px] md:mx-0 mt-5">
                            <img
                                src={frameImg}
                                alt="Pattern"
                                width={558}
                                height={504}
                                loading="lazy"
                                className='rounded-xl -top-[20px] md:top-[0px] ' 
                            />
                            <img
                                src={image}
                                alt="herbal"
                                width={558}
                                height={304}
                                loading="lazy"
                                className="absolute -top-[40px] right-[20px] md:right-[80px] z-10 rounded-xl "
                            />
                        </div>
                    </div>
                </div>
                <Footer/>
        </>
    )
}
