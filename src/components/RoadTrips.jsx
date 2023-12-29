import React, { useState, useEffect, useRef, useContext } from 'react'
import { TailSpin } from 'react-loader-spinner'; 
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

  const [roadtTrip, setRoadtTrip] = useState([]);
  const [roadTripLoading, setRoadTripLoading] = useState(false);

  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    originRef.current.focus();
  }, [])

  useEffect(() => {
    setErrMsg('');
  }, [origin, destination])

  const handleSubmit = async (e) => {
  e.preventDefault();
    setRoadTripLoading(true);
    try {
      const response = await axios.post("api/v0/road_trips",
      JSON.stringify({
          origin: origin,
          destination: destination,
      }), 
      {
        headers: { 
          'Content-Type': 'application/json', 
          Authorization: authCreds.bearerToken
        },
        withCredentials: true
      }
    );
      setRoadtTrip(response.data?.data?.attributes)
      setRoadTripLoading(false);
    } catch(err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 422) {
        setErrMsg('Invalid Origin or Destination');
      } else if (err.response?.status === 422) {

      }
    }
    setIsSubmitted(true);
  }
  
  const handleNewTrip = () => {
    setIsSubmitted(false); 
    setOrigin(''); 
    setDestination('');
    setRoadtTrip({});
    setRoadTripLoading(false) 
    if (originRef.current) {
      originRef.current.focus();
    }
  };

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
          <button onClick={handleSubmit} disabled={!origin && !destination} className="bg-lightGray hover:bg-turquiose text-white flex justify-center hover:scale-105 ease-in duration-200 font-dm-sans py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed">
          {roadTripLoading ? 
                  <TailSpin
                    height="24"
                    width="24"
                    color="#E4E2DD"
                    ariaLabel="tail-spin-loading"
                    radius="1"
                  /> : 'Submit'}
          </button>
        </div>
      </form>}
      {isSubmitted && 
        <div className="flex-1 px-4 py-2.5 text-md rounded-md flex flex-col justify-evenly">
          {errMsg ? (
            <p ref={errRef} className='absolute shadow-md mt-4 left-1/2 transform -translate-x-1/2 -translate-y-20 z-20 py-2 px-2 w-3/4 text-offWhite font-dm-sans-bold text-center border-2 border-yellow-600 bg-darkGray rounded-xl'>{errMsg}</p>
          ) : (
            <section className="flex justify-between items-center gap-6">
            <div className="flex-col justify-center items-start gap-2.5 text-offWhite">
              <div>Origin:</div>
              <div>Destination:</div>
              <div>Travel Time:</div>
              <div>Forecast:</div>
            </div>
            <div className="flex-col justify-center items-center gap-2.5 text-offWhite font-dm-sans-bold">
              <div>{roadtTrip.start_city}</div>
              <div>{roadtTrip.end_city}</div>
              <div>{roadtTrip.travel_time}</div>
              {roadtTrip.weather_at_eta === "N/A" ? ( <div>N/A</div> ) : (<div>{roadtTrip.weather_at_eta?.condition}, {roadtTrip.weather_at_eta?.temperature}°</div>)}
            </div>
          </section>
          )}
          <button onClick={handleNewTrip} className="bg-lightGray hover:bg-turquiose text-white hover:scale-105 ease-in duration-200 font-dm-sans py-2 px-4 mb-4 rounded w-full focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed">New Road Trip</button>
        </div>
    }
    </div>
  )
}

export default RoadTrips