import React from 'react'
import WhetherLogo from '../assets/Whether-Sweater-Logo-1.svg'
import useRedirectIfAuthenticated from '../hooks/useRedirectIfAuthenticated'
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  useRedirectIfAuthenticated();
  
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSignUpClick = () => {
    navigate('/signup');
  };

  return (
    <section className="flex justify-center items-center h-screen flex-col">
        <div className="w-full max-w-xs relative">

          {/* Registration Form */}
          <div className="bg-turq-gradient-to-b border-2 border-turquiose shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 h-[450px]">

            {/* Logo */}
            <img src={WhetherLogo} className='mb-6 mt-12' />

            {/* Form Title */}
            <h1 className="text-2xl font-bold mb-6 text-center font-dm-sans text-offWhite">Welcome!</h1>

            {/* Login Button */}
            <div className="flex items-center justify-between">
              <button onClick={handleLoginClick} className="bg-lightGray hover:bg-turquiose text-white hover:scale-105 ease-in duration-200 font-dm-sans text-lg mt-5 py-3 px-4 rounded w-full focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed">
                Log In
              </button>
            </div>

            {/* Sign Up Button */}
            <div className="flex items-center justify-between">
              <button onClick={handleSignUpClick} className="bg-lightGray hover:bg-turquiose text-white hover:scale-105 ease-in duration-200 font-dm-sans text-lg mt-8 py-3 px-4 rounded w-full focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed">
                Sign Up
              </button>
            </div>
          </div>
          <p className="text-center text-sm font-dm-sans text-offWhite">
            Built by  
            <a href="https://www.dw-portfolio.com/" target="_blank" rel="noopener noreferrer" className="inline-block align-baseline text-sm hover:scale-95 ease-in duration-200 text-turquiose hover:text-[#287d78] ml-1">Davis Weimer</a>
          </p>
      </div>
    </section>
  )
}

export default Welcome