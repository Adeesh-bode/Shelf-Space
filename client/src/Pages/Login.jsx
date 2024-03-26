import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaExternalLinkAlt } from "react-icons/fa";
import Connect from "../assets/connect.gif";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import axios from 'axios';


const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [hide, setHide] = useState(false);

  const handleHide = () => {
    setHide(!hide);
  };

  const handleChange = (e) => {
   setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [e.target.name]: e.target.value,
   }));
  };

  const handleSubmit = async (e) => {
   e.preventDefault();

   await axios.post("http://localhost:5555/user/login", credentials) // put server deployment url instead of localhost
   .then((response)=>{
      console.log(response);

      if(response.status ==200){
         navigate('/');
      }
      else if( response.status ==201){
         console.log("Field Missing");
      }
      else if( response.status ==202){
         console.log("Incorrect Credentials");
      }
      
   }) 
   .catch((error)=>{
      console.log(error);
   })
    
  };

  const handleGoogleSignin = async () => {
    try {
        ///////////////////////////
      console.log("User created and todos document initialized!");

      console.log("Document successfully written!");
    } catch (error) {
      console.error("Error with Google sign-in: ", error);
    }
  };

  useEffect(() => {
    //   if (user) {
    //     navigate("/");
    //     console.log("User is signed in:", user);
    //   } else {
    //     console.log("User is not signed in");
    //   }
    // return () => unsubscribe(); // Cleanup subscription on component unmount
  }, [navigate]);

  return (
   <div className="min-h-screen w-screen flex  items-center justify-center bg-[#121215]">
      <div className='bg-[#18181C] rounded-xl p-2 md:p-4 w-5/6 md:w-1/2 shadow-md flex flex-col gap-3 md:gap-5 justify-evenly items-center md:flex-row'>
         <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2 md:gap-4">
               <h1 className="py-2 text-4xl text-teal-400 font-semibold text-center">
               Login
               </h1>
               <input
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  onChange={handleChange}
                  className="py-2 px-4 w-full rounded-lg bg-[#302D36] focus:outline-none caret-slate-100 font-medium text-[#F5F8FF]"
               />

               <div className="flex gap-4">
                  <input
                     type={hide ? "text" : "password"}
                     placeholder="Enter password"
                     name="password"
                     onChange={handleChange}
                     className="py-2 px-4 w-full rounded-lg bg-[#302D36] focus:outline-none caret-slate-100 font-medium text-[#F5F8FF]"
                  />
                  {/* <button className="text-zinc-200 bg-[#84849D] hover:bg-[#835FF5] px-4 py-2 rounded-lg" type="button" onClick={handleHide}>
                     {hide ? "Hide" : "Show"}
                  </button> */}
                  <button className="text-zinc-200 bg-[#84849D] hover:bg-teal-400 px-4 py-2 rounded-lg" type="button" onClick={handleHide}>
                     {hide? <FaEyeSlash/> : <FaEye />} 
                  </button>
               </div>

               <input
                  type="submit"
                  value='Login' 
                  className="text-zinc-200 bg-teal-400 hover:bg-transparent hover: border hover:border-white px-4 py-2 rounded-lg cursor-pointer"/>
               
               <button type='button' onClick={handleGoogleSignin} className='text-white justify-center flex items-center gap-2 bg-teal-400 hover:bg-transparent hover: border hover:border-white  px-4 py-2 rounded-lg'>
                  <FcGoogle size={30} />
                  Sign in with Google
               </button>

               <div onClick={() => navigate('/signup')} className='text-teal-400 flex justify-center gap-2 items-center cursor-pointer'>
                  <FaExternalLinkAlt />
                  Don't have an account?
               </div>
            </div>
         </form>
         <div className='w-fit h-fit flex flex-col justify-between items-center'>
            <div className="text-teal-400">Let's Connect</div>
            <img src={Connect} alt='interactive-img' />
         </div>
      </div>
   </div>
   );
};

export default Login;
