import React, { useContext, useState } from "react";
import { AppContext } from "../authcontext/AppContext";
import {  useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AppContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false)
  // Check if token is expired after one hour

  const handleLogin = async () => {
    const userDetails = {
      email,
      password,
    };

    try {
      const response = await fetch(`http://localhost:4000/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetails),
      });

      const data = await response.json();

      if (response.ok) {
        const tokenExpiry = new Date().getTime() + 3600000; // One hour expiry time
        login(data.token, data.userId);
        localStorage.setItem("tokenExpiry", tokenExpiry);
        localStorage.setItem("userEmail", email);
        toast.success("User logged in Successfully and Logged is Valid only for 1 hour");
        navigate("/");
      } else {
        console.error("Login failed:", data.error);
        toast.error("Login Failed !! Please check the credential and logged in again.");
      }
    } catch (error) {
      console.log(error);
      toast.error("User can't be logged in Please Try Again.");
    }
  };

 
  return (
    <>
      <div className="flex">
          <div className="mt-6 flex w-full flex-col gap-y-4">
          <label htmlFor='exampleInputEmail1' className="w-full">
            <p className="mb-1 text-[1rem] leading-[1.375rem] font-medium ">
              Email Address <sup className="text-red-500 text-sm">*</sup>
            </p>
            <input
              required
              type="text"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email Address"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 border-2 border-blue-50 "
            />
          </label>
          <label className="relative">
            <p className="mb-1 text-[1rem] leading-[1.375rem]  font-medium">
              Password <sup className="text-red-500 text-sm">*</sup>
            </p>
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5 border-2 border-blue-50"
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
  
          </label>
          <button
            type="submit"
            className="mt-6 text-[20px] text-white font-semibold tracking-widest rounded-[8px] bg-[#9D003F] py-[8px] px-[12px]  "
             onClick={handleLogin}
          >
            Login Now !!
          </button>
        </div>
        {/* )} */}
      </div>
    
    </>
  );
};

export default Login;
