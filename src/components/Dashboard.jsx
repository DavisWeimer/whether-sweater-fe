import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom'; 
import AuthContext from '../context/AuthProvider'; 
import axios from '../api/axios';

const Dashboard = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    console.log(auth.bearerToken)
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
      <div className="shadow-md bg-darkGray rounded-b-2xl p-5 mx-auto mb-4">
        NavBar
      </div>
      <section className="grid md:grid-cols-2 gap-4 mb-4">
        <div className="min-h-[20em] bg-turq-gradient-to-t shadow-md rounded-2xl border-2 border-turquiose">
          Daily
        </div>
        <div className="min-h-[20em] bg-turq-gradient-to-t shadow-md rounded-2xl border-2 border-turquiose">
          Details
        </div>
        <div className="min-h-[30em] row-span-2 md:col-span-2 bg-turq-gradient-to-b shadow-md rounded-2xl border-2 border-turquiose">
          Forecast
        </div>
      </section>
    </section>
  );
};

export default Dashboard;


{/* <section className='max-w-[1040px] m-auto p-4 py-16'>
      <div className='grid sm:grid-cols-2 gap-12 bg-turq-gradient-to-b'>
      Daily
      Daily
      Daily
      </div>
      <div className='grid sm:grid-cols-2 gap-12 bg-turq-gradient-to-b'>
      Details
      Details
      Details
      </div>
      <div className='grid sm:grid-cols-2 gap-12 bg-turq-gradient-to-t'>
      Forecast
      Forecast
      Forecast
      </div>
    </section> */}