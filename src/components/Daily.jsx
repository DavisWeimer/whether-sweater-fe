import React from 'react'
import Sunny from '../assets/Sunny 2.svg'
import TempUp from '../assets/Up Arrow.svg'
import TempDown from '../assets/Down Arrow.svg'

function Daily({ weatherData }) {
  console.log("weather props", weatherData)
  return (
    <div className="min-h-[20em] font-dm-sans bg-turq-gradient-to-t shadow-md rounded-2xl border-2 border-turquiose justify-evenly items-center inline-flex">
      <div className="p-4 flex-col justify-start items-center gap-3 inline-flex">
        <div className="self-stretch px-4 py-2.5 border-2 border-turquiose rounded-full justify-start items-center gap-3 inline-flex">
          <div className="text-offWhite text-sm font-bold font-dm-sans">{weatherData.current_weather?.condition}</div>
            
          <img src={weatherData.current_weather?.icon} className='w-[32px]' />
        </div>
            <div className="pr-6 py-3 text-sm border-r-2 border-turquiose justify-between items-center inline-flex">
                <div className="flex-col justify-center items-left gap-2.5 text-offWhite inline-flex">
                    <div>Feels Like:</div>
                    <div>Humidity:</div>
                    <div>Visibility:</div>
                    <div>Sunrise:</div>
                    <div>Sunset:</div>
                </div>
                <div className="flex-col justify-center items-center gap-2.5 text-offWhite font-dm-sans-bold inline-flex">
                    <div>{weatherData.current_weather?.feels_like}°</div>
                    <div>{weatherData.current_weather?.humidity}</div>
                    <div>{weatherData.current_weather?.visibility} miles</div>
                    <div>{weatherData.daily_weather?.[0].sunrise}</div>
                    <div>{weatherData.daily_weather?.[0].sunset}</div>
                </div>
            </div>
        </div>
        <div className="py-4 pr-4 rounded-full flex-col justify-start items-center gap-3 text-offWhite inline-flex">
            <div className="text-2xl lg:text-4xl ">Denver, CO</div>
            <div className="text-xl font-normal ">{weatherData.current_weather?.last_updated}</div>
            <div className="text-6xl md:text-8xl font-normal ">{weatherData.current_weather?.temperature}°</div>
            <div className="justify-start text-lg items-center gap-4 inline-flex">
            <div className="flex items-center gap-1"> 
              <img src={TempUp} className='w-[24px]'/>
              <span>{weatherData.daily_weather?.[0].max_temp}°</span>
            </div>
            <div className="flex items-center gap-1"> 
              <img src={TempDown} className='w-[24px]'/>
              <span>{weatherData.daily_weather?.[0].min_temp}°</span>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Daily;