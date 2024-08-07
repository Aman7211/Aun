import React, { useContext, useState } from "react";
import { AppContext } from "../authcontext/AppContext";
import {  useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();
  const { login } = useContext(AppContext);
  const navigate = useNavigate();
  // Check if token is expired after one hour

  const handleLogin = async () => {
    const userDetails = {
      email,
      password,
    };
    console.log(userDetails);

    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetails),
      });

      const data = await response.json();

      if (response.ok) {
        const token = data.token;
        console.log(token);
        console.log(data);
        login(data.token, data.userId);
        localStorage.setItem("token", token);
        localStorage.setItem("userEmail", email);
        toast.success("User logged in Successfully");
        navigate("/");
      } else {
        console.error("Login failed:", data.error);
        toast.error("Login Failed !!   Please create your account.");
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
              Mobile Number <sup className="text-red-500 text-sm">*</sup>
            </p>
            <input
              required
              type="number"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Mobile  Number"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5 border-2 border-blue-50"
            />
  
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
