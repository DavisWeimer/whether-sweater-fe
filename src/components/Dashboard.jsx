import React, { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; 
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
  const errRef = useRef();
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get("/api/v0/forecast", {
          params: { location: "denver,co" },
          headers: { Authorization: auth.bearerToken },
          withCredentials: true
        });
        setWeather(response.data.data.attributes); 
        console.log("weather data", weather);
      } catch (err) {
        if (!err?.response) {
          setErrMsg('No Server Response');
        } else {
          setErrMsg('Request Failed');
        }
      }
    };

    fetchWeather();
  }, [auth.bearerToken]); 

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

  return (
    <section className='max-w-[1040px] m-auto px-4'>
      <NavBar 
        logOut={handleLogout}
      />
      <section className="grid md:grid-cols-2 gap-4 mb-4">
        <Daily 
          weatherData={weather}
        />
        <RoadTrips
          authCreds={auth} 
        />
        <Forecast
          weatherData={weather}
          className="min-h-[30em] row-span-2 md:col-span-2 bg-turq-gradient-to-b shadow-md rounded-2xl border-2 border-turquiose"
        />
      </section>
    </section>
  );
};

export default Dashboard;