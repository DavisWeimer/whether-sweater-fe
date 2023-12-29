import React, { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { TailSpin } from 'react-loader-spinner';
import cities from '../hooks/citiesArray';
import Select from 'react-select';
import AuthContext from '../context/AuthProvider'; 
import axios from '../api/axios';
import Daily from './Daily';
import Forecast from './Forecast';
import RoadTrips from './RoadTrips';
import NavBar from './NavBar';

const Dashboard = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [weather, setWeather] = useState([]);
  const [background, setBackground] = useState([]);
  const [backgroundLoading, setBackgroundLoading] = useState(false);

  const locRef = useRef();
  const [locationSearch, setLocationSearch] = useState(false);
  const [location, setLocation] = useState('');
  const [locFocus, setLocFocus] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);

  const errRef = useRef();
  const [errMsg, setErrMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (locationSearch && locRef.current) {
      locRef.current.focus();
    }
  }, [locationSearch])

  useEffect(() => {
    setErrMsg('');
  }, [location])
  
  const fetchBackground = async () => {
    setBackgroundLoading(true)
    try {
      const response = await axios.get("/api/v0/backgrounds", {
        params: { location: location },
        headers: { Authorization: auth.bearerToken },
        withCredentials: true
      });
      setBackground(response.data?.data?.attributes); 
      setBackgroundLoading(false)
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else {
        setErrMsg('Request Failed');
      }
    }
  };

  const fetchWeather = async () => {
    setLocationLoading(true)
    try {
      const response = await axios.get("/api/v0/forecast", {
        params: { location: location },
        headers: { Authorization: auth.bearerToken },
        withCredentials: true
      });
      setWeather(response.data?.data?.attributes);
      fetchBackground(); 
      setLocationLoading(false)
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else {
        setErrMsg('Request Failed');
      }
    }
  };

  const handleLogout = async () => {
    try {
      await axios.delete('/logout', {
        headers: { Authorization: auth.bearerToken },
        withCredentials: true
      });
      setAuth({});
      sessionStorage.removeItem("authData");
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      setAuth({});
      sessionStorage.removeItem("authData");
      navigate('/login');
    }
  };

  const changeLocation = () => {
    setLocationSearch(!locationSearch);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    sessionStorage.setItem('location', location);
    fetchWeather(location); 
    setLocationSearch(false);
  }

  useEffect(() => {
    if (location) {  // Check if location is not an empty string
      fetchWeather(location);  // Fetch weather using the location
    }
  }, [location]);

  useEffect(() => {
    const savedLocation = sessionStorage.getItem('location') || 'Denver,CO';
    setLocation(savedLocation);
    fetchWeather(savedLocation);
  }, [auth.bearerToken]);

  console.log("dashboard loc:", location)
  return (
    <>
      {
        locationSearch ? (
          <div className='fixed w-full h-screen bg-gradient-to-t from-turquiose to-darkGray flex flex-col justify-center items-center z-20'>
            <form className='flex-1 lg:px-8 pb-4 flex flex-col justify-center w-3/4'>
              <div className="mb-3">
                <Select
                  options={cities}
                  onChange={(selectedOption) => setLocation(selectedOption.value)}
                />
              </div>  
            <div className="flex items-center justify-between">
              <button onClick={handleSubmit} disabled={!location} className="bg-lightGray hover:bg-turquiose text-white flex justify-center hover:scale-105 ease-in duration-200 font-dm-sans py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed">
              {locationLoading ? 
                <TailSpin
                  height="24"
                  width="24"
                  color="#E4E2DD"
                  ariaLabel="tail-spin-loading"
                  radius="1"
                /> : 'Submit'}
              </button>
              </div>
            </form>
          </div>
        ) : (
      <section className='max-w-[1040px] m-auto px-4'>
        <NavBar 
          logOut={handleLogout}
          changeLocation={changeLocation}
        />
        <section className="grid md:grid-cols-2 gap-4 mb-4">
          <Daily 
            loading={isLoading}
            weatherData={weather}
            location={location}
            />
          <RoadTrips
            loading={isLoading}
            weatherData={weather}
            authCreds={auth} 
            />
          <Forecast
            loading={isLoading}
            backgroundLoading={backgroundLoading}
            weatherData={weather}
            backgroundPic={background}
          />
        </section>
      </section>
      )}
    </>
  );
};

export default Dashboard;