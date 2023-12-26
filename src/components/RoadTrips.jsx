import React, { useState, useEffect, useRef, useContext } from 'react'
import axios from '../api/axios';

function RoadTrips({ authCreds })  {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const originRef = useRef();
  const destRef = useRef();
  const errRef = useRef();

  const [origin, setOrigin] = useState('');
  const [originFocus, setOriginFocus] = useState(false);

  const [destination, setDestination] = useState('');
  const [destFocus, setDestFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    originRef.current.focus();
  }, [])

  useEffect(() => {
    setErrMsg('');
  }, [origin, destination])

  const handleSubmit = async (e) => {
  e.preventDefault();

    // try {
    //   const response = await axios.post("api/v0/road_trips", 
    //   {
    //     headers: { 
    //       'Content-Type': 'application/json', 
    //       Authorization: authCreds.bearerToken
    //     },
    //     withCredentials: true
    //   }
    // );
    // } catch(err) {
    //   if (!err?.response) {
    //     setErrMsg('No Server Response');
    //   } else {
    //     setErrMsg('Request Failed');
    //   }
    //   errRef.current.focus();
    // }
    setIsSubmitted(true);
  }
  
  const handleNewTrip = () => {
    setIsSubmitted(false); // Reset to show form again and hide the section
    setOrigin(''); // Reset origin field
    setDestination(''); // Reset destination field
    // Focus on the first input after reset if you wish
    originRef.current.focus();
  };
  console.log("HI")
  return (
    <div className="min-h-[20em] flex flex-col bg-turq-gradient-to-t shadow-md rounded-2xl items-center border-2 border-turquiose text-offWhite font-dm-sans">
    <h1 className="font-dm-sans text-4xl mt-12">Road Trip Planner</h1>
    {!isSubmitted && <form className='flex-1 lg:px-8 pb-4 flex flex-col justify-center w-3/4'>
        <div className="mb-3">
          <label htmlFor="origin"></label>
          <input
            type='text'
            id='origin'
            ref={originRef}
            value={origin}
            autoComplete='off'
            className="shadow appearance-none border rounded w-full py-2 px-3 text-darkGray bg-offWhite font-dm-sans leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => setOrigin(e.target.value)}
            placeholder='Origin...'
            required
            onFocus={() => setOriginFocus(true)}
            onBlur={() => setOriginFocus(false)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="destination"></label>
          <input
            type='text'
            id='destination'
            ref={destRef}
            value={destination}
            autoComplete='off'
            className="shadow appearance-none border rounded w-full py-2 px-3 text-darkGray bg-offWhite font-dm-sans leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => setDestination(e.target.value)}
            placeholder='Destination...'
            required
            onFocus={() => setDestFocus(true)}
            onBlur={() => setDestFocus(false)}
          />
        </div>
        <div className="flex items-center justify-between">
          <button onClick={handleSubmit} disabled={!origin && !destination} className="bg-lightGray hover:bg-turquiose text-white hover:scale-105 ease-in duration-200 font-dm-sans py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed">
            Create Road Trip
          </button>
        </div>
      </form>}
      {isSubmitted && 
        <div className="flex-1 px-4 py-2.5 text-md rounded-md flex flex-col justify-evenly">
          <div className="flex justify-between items-center gap-6">
            <div className="flex-col justify-center items-start gap-2.5 text-offWhite">
              <div>Origin:</div>
              <div>Destination:</div>
              <div>Travel Time:</div>
              <div>Forecast:</div>
            </div>
            <div className="flex-col justify-center items-center gap-2.5 text-offWhite font-dm-sans-bold">
              <div>Denver, CO</div>
              <div>Dallas, TX</div>
              <div>04:23:59</div>
              <div>Overcast, 45.0</div>
            </div>
          </div>
          <button onClick={handleNewTrip} className="bg-lightGray hover:bg-turquiose text-white hover:scale-105 ease-in duration-200 font-dm-sans py-2 px-4 mb-4 rounded w-full focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed">New Road Trip</button>
        </div>
    }
    </div>
  )
}

export default RoadTrips