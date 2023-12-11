import { useRef, useState, useEffect } from 'react'
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'  
import React from 'react'
import './Register.css'
import WhetherLogo from '../../assets/Whether-Sweater-Logo-1.svg'
import RainyVector from '../../assets/rainy-vector.svg'

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/register'; 

const Register = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, [])

  useEffect(() => {
    const result = EMAIL_REGEX.test(user);
    console.log("Valid? ", result);
    console.log("Email: ", user);
    setValidEmail(result);
  }, [user])

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    console.log("Valid? ", result);
    console.log("Password: ", pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd])
  
  useEffect(() => {
    setErrMsg('');
  }, [user, pwd, matchPwd])

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    const v1 = EMAIL_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
        setErrMsg("Invalid Entry");
        return;
    }
    try {
      const response = await axios.post(REGISTER_URL,
        JSON.stringify({ user, pwd }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );
      console.log(response?.data);
      console.log(response?.accessToken);
      console.log(JSON.stringify(response))
      setSuccess(true);
      //clear state and controlled inputs
      //need value attrib on inputs for this
      setUser('');
      setPwd('');
      setMatchPwd('');
    } catch (err) {
      if (!err?.response) {
          setErrMsg('No Server Response!');
      } else if (err.response?.status === 409) {
          setErrMsg('Username Taken!');
      } else {
          setErrMsg('Registration Failed!')
      }
      errRef.current.focus();
    }
  }

  return (
    <div className="flex justify-center items-center h-screen flex-col">
      {!success && (
        <div className="w-full max-w-xs relative">

          {/* Error Message */}
          <p ref={errRef} className={`absolute shadow-md mt-4 left-1/2 transform -translate-x-1/2 -translate-y-20 z-20 py-2 px-2 w-3/4 ${errMsg ? 'text-offWhite font-dm-sans-bold text-center border-2 border-yellow-600 bg-darkGray  rounded-xl' : 'invisible'}`} aria-live='assertive'>{errMsg}</p>

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="bg-turq-gradient-to-b border-2 border-turquiose shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">

            {/* Logo */}
            <img src={WhetherLogo} className='mb-6 mt-12' />

            {/* Form Title */}
            <h1 className="text-xl font-bold mb-6 text-center font-dm-sans text-offWhite">Create Account</h1>

            {/* Email Field */}
            <div className="mb-4 relative">
              <input
                type='text'
                id='email'
                ref={userRef}
                autoComplete='off'
                className="shadow appearance-none border rounded w-full py-2 px-3 pr-8 text-darkGray bg-offWhite font-dm-sans leading-tight focus:outline-none focus:shadow-outline"
                placeholder='Email'
                onChange={(e) => setUser(e.target.value)}
                required
                aria-invalid={validEmail ? "false" : "true"}
                aria-describedby='emailnote'
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
              />
              <FontAwesomeIcon icon={faCheck} className={`absolute right-2 top-1/2 transform -translate-y-1/2 ${validEmail ? "text-green-500" : "hidden"}`} />
              <FontAwesomeIcon icon={faTimes} className={`absolute right-2 top-1/2 transform -translate-y-1/2 ${validEmail || !user ? "hidden" : "text-red-500"}`} />
              <p id="emailnote" className={`text-xs italic absolute left-1/2 transform -translate-x-1/2 bottom-0 translate-y-full bg-black text-white px-3 py-2 rounded ${userFocus && user && !validEmail ? "z-10" : "invisible"}`}>
                <FontAwesomeIcon icon={faInfoCircle} />
                Must be a valid email address. Example: user@example.com
              </p>
            </div>

            {/* Password Field */}
            <div className="mb-4 relative">
              <input
                type="password"
                id="password"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                className="shadow appearance-none border rounded w-full py-2 px-3 pr-8 text-darkGray bg-offWhite font-dm-sans leading-tight focus:outline-none focus:shadow-outline"
                placeholder='Password'
                required
                aria-invalid={validPwd ? "false" : "true"}
                aria-describedby="pwdnote"
                onFocus={() => setPwdFocus(true)}
                onBlur={() => setPwdFocus(false)}
              />
              <FontAwesomeIcon icon={faCheck} className={`absolute right-2 top-1/2 transform -translate-y-1/2 ${validPwd ? "text-green-500" : "hidden"}`} />
              <FontAwesomeIcon icon={faTimes} className={`absolute right-2 top-1/2 transform -translate-y-1/2 ${validPwd || !pwd ? "hidden" : "text-red-500"}`} />
              <p id="pwdnote" className={`text-xs italic absolute left-1/2 transform -translate-x-1/2 bottom-0 translate-y-full bg-black text-white px-3 py-2 rounded ${pwdFocus && !validPwd ? "z-10" : "invisible"}`}>
                <FontAwesomeIcon icon={faInfoCircle} />
                8 to 24 characters. Must include uppercase and lowercase letters, a number, and a special character.
              </p>
            </div>

            {/* Confirm Password Field */}
            <div className="mb-4 relative">
              <input
                type="password"
                id="confirm_pwd"
                onChange={(e) => setMatchPwd(e.target.value)}
                value={matchPwd}
                className="shadow appearance-none border rounded w-full py-2 px-3 pr-8 text-darkGray bg-offWhite font-dm-sans leading-tight focus:outline-none focus:shadow-outline"
                placeholder='Confirm Password'
                required
                aria-invalid={validMatch ? "false" : "true"}
                aria-describedby="confirmnote"
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
              />
              <FontAwesomeIcon icon={faCheck} className={`absolute right-2 top-1/2 transform -translate-y-1/2 ${validMatch && matchPwd ? "text-green-500" : "hidden"}`} />
              <FontAwesomeIcon icon={faTimes} className={`absolute right-2 top-1/2 transform -translate-y-1/2 ${validMatch || !matchPwd ? "hidden" : "text-red-500"}`} />
              <p id="confirmnote" className={`text-xs italic absolute left-1/2 transform -translate-x-1/2 bottom-0 translate-y-full bg-black text-white px-3 py-2 rounded ${matchFocus && !validMatch ? "z-10" : "invisible"}`}>
                <FontAwesomeIcon icon={faInfoCircle} />
                Must match the first password input field.
              </p>
            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-between">
              <button disabled={!validEmail || !validPwd || !validMatch}
                      className="bg-lightGray hover:bg-turquiose text-white hover:scale-105 ease-in duration-200 font-dm-sans mt-5 py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed">
                Sign Up
              </button>
            </div>
          </form>

          {/* Sign In Link */}
          <p className="text-center text-sm font-dm-sans text-offWhite">
            Already have an account?
            <a href="#" className="inline-block align-baseline font-bold text-sm hover:scale-95 ease-in duration-200 text-turquiose hover:text-[#287d78] ml-1">Sign In</a>
          </p>
        </div>
      )}
      {success && (
        <div className="w-full max-w-xs">
          <h1 className="text-lg font-bold mb-4">Success!</h1>
          <p>
            <a href="#" className="text-blue-500 hover:text-blue-700">Sign In</a>
          </p>
        </div>
      )}
    </div>
  );
};

export default Register;