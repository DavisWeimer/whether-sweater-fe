import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth'
import WhetherLogo from '../assets/Whether-Sweater-Logo-1.svg'
import axios from '../api/axios'
import useRedirectIfAuthenticated from '../hooks/useRedirectIfAuthenticated';

const Login = () => {
  useRedirectIfAuthenticated();
  
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    userRef.current.focus();
  }, [])

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd])

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/login",
        JSON.stringify({
          user: {
            email: user, 
            password: pwd 
          }
        }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );
      console.log(response)
      
      const bearerToken = response?.headers?.authorization;
      const loggedInUser = response?.data?.data;

      setAuth({ loggedInUser, bearerToken });
      setPwd('');
      setUser('');
      navigate('/dashboard')

    } catch(err) {
      if (!err?.response) {
        setErrMsg('No Server Response')
      } else if (err.response?.status === 400) {
        setErrMsg('Missing Email or Password')
      } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized ⚠️')
      } else {
        setErrMsg('Login Failed')
      }
      errRef.current.focus();
    }
    
  }
  
  return (
    <section className="flex justify-center items-center h-screen flex-col">
        <div className="w-full max-w-xs relative">

          {/* Error Message */}
          <p ref={errRef} className={`absolute shadow-md mt-4 left-1/2 transform -translate-x-1/2 -translate-y-20 z-20 py-2 px-2 w-3/4 ${errMsg ? 'text-offWhite font-dm-sans-bold text-center border-2 border-yellow-600 bg-darkGray rounded-xl' : 'invisible'}`} aria-live='assertive'>{errMsg}</p>

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="bg-turq-gradient-to-b border-2 border-turquiose shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 h-[450px]">

            {/* Logo */}
            <img src={WhetherLogo} className='mb-6 mt-12' />

            {/* Form Title */}
            <h1 className="text-xl font-bold mb-6 text-center font-dm-sans text-offWhite">Log In</h1>

            {/* Email Field */}
            <div className="mb-4 relative">
              <label htmlFor="email"></label>
              <input
                type='text'
                id='email'
                ref={userRef}
                autoComplete='off'
                className="shadow appearance-none border rounded w-full py-2 px-3 pr-8 text-darkGray bg-offWhite font-dm-sans leading-tight focus:outline-none focus:shadow-outline"
                placeholder='Email'
                onChange={(e) => setUser(e.target.value)}
                value={user}
                required
              />
            </div>

            {/* Password Field */}
            <div className="mb-4 relative">
              <label htmlFor="password"></label>
              <input
                type="password"
                id="password"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                className="shadow appearance-none border rounded w-full py-2 px-3 pr-8 text-darkGray bg-offWhite font-dm-sans leading-tight focus:outline-none focus:shadow-outline"
                placeholder='Password'
                required
              />
            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-between">
              <button disabled={!user && !pwd} className="bg-lightGray hover:bg-turquiose text-white hover:scale-105 ease-in duration-200 font-dm-sans mt-5 py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed">
                Submit
              </button>
            </div>
          </form>

          {/* Sign In Link */}
          <p className="text-center text-sm font-dm-sans text-offWhite">
            Need an account?
            <Link to="/signup" className="inline-block align-baseline text-sm hover:scale-95 ease-in duration-200 text-turquiose hover:text-[#287d78] ml-1">Sign Up</Link>
          </p>
      </div>
    </section>
  )
}

export default Login