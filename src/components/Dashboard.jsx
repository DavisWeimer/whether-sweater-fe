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
  const [location, setLocation] = useState(() => localStorage.getItem('location') || 'Denver, CO');
  const [locationSearch, setLocationSearch] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    localStorage.setItem('location', location);
    fetchWeather();
    setLocationSearch(false);
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

  const fetchBackground = async () => {
    setBackgroundLoading(true);
    try {
      const response = await axios.get("/api/v0/backgrounds", {
        params: { location },
        headers: { Authorization: auth.bearerToken },
        withCredentials: true
      });
      setBackground(response.data?.data?.attributes); 
      setBackgroundLoading(false);
    } catch (err) {
      console.error('Fetching background failed:', err);
      setErrMsg('Failed to load background');
    }
  };

  const fetchWeather = async () => {
    if (!location || !auth.bearerToken) {
      console.log('Missing location or bearer token, skipping weather fetch.');
      return;
    }

    setLocationLoading(true);
    try {
      const response = await axios.get("/api/v0/forecast", {
        params: { location },
        headers: { Authorization: auth.bearerToken },
        withCredentials: true
      });
      setWeather(response.data?.data?.attributes);
      fetchBackground();
      setLocationLoading(false);
    } catch (err) {
      console.error('Fetching weather failed:', err);
      setErrMsg('Failed to load weather');
    }
  };

  useEffect(() => {
    fetchWeather();
  }, [location, auth.bearerToken]);

  const changeLocation = () => {
    setLocationSearch(!locationSearch);
  };

  return (
    <>
      {locationSearch ? (
        <div className='fixed w-full h-screen bg-gradient-to-t from-turquiose to-darkGray flex flex-col justify-center items-center z-20'>
          <form onSubmit={handleSubmit} className='flex-1 lg:px-8 pb-4 flex flex-col justify-center w-3/4'>
            <Select options={cities} onChange={(selectedOption) => setLocation(selectedOption.value)} />
            <button type="submit" disabled={!location} className="bg-lightGray hover:bg-turquiose text-white flex justify-center hover:scale-105 ease-in duration-200 font-dm-sans py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed">
              {locationLoading ? (
                <TailSpin height="24" width="24" color="#E4E2DD" ariaLabel="tail-spin-loading" radius="1" />
              ) : 'Submit'}
            </button>
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
