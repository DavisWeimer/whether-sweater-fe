import React, { useState } from 'react'
import TempHigh from './TempHigh'
import TempLow from './TempLow'
import DenverPic from '../assets/denver.jpeg'
import TempUp from '../assets/Up Arrow.svg'
import TempDown from '../assets/Down Arrow.svg'
import { ProgressBar } from 'react-loader-spinner'

function Forecast({ weatherData, loading, backgroundPic, backgroundLoading }) {
  const [imageLoading, setImageLoading] = useState(true);
  
  const handleImageLoad = () => {
    setImageLoading(false);
  };

  return (
    <main className="min-h-[30em] row-span-2 md:col-span-2 bg-turq-gradient-to-b shadow-md rounded-2xl border-2 border-turquiose flex flex-col lg:flex-row lg:flex-wrap justify-center items-center gap-4 lg:gap-10 py-">
    {loading ? 
    <ProgressBar
      barColor="#00C6BA"
      borderColor='#8F8F8F'
      ariaLabel="progress-bar-loading"
      wrapperStyle={{}}
      wrapperClass=""
    /> : <>
    <div className="text-offWhite font-dm-sans flex flex-col justify-start items-center gap-4 ">
        <section className="justify-center items-center gap-3 pt-3 lg:gap-6 inline-flex">
          {weatherData.hourly_weather?.map((hourlyData, index) => (
            <div key={index} className="flex-col justify-start items-center inline-flex">
              <div className="lg:text-lg">{hourlyData.time}</div>
              <img src={hourlyData.icon} className='w-[24px] lg:w-[48px]' />
              <div className="text-xl">{hourlyData.temperature}°</div>
            </div>
          ))}
        </section>
        <section className="border-t-2 border-t-turquiose p-1 lg:p-6 w-5/6 justify-start text-sm lg:text-xl items-start gap-4 lg:gap-6 inline-flex">
          <div className="h-[130px] lg:h-[150px] flex-col justify-between items-start inline-flex py-2 lg:py-1">
            {weatherData.daily_weather?.map((daily, index) => (
              <div key={index}>{daily.date}</div>
            ))}
          </div>
          <div className="h-[130px] lg:h-[150px] flex-col justify-between items-start inline-flex">
            {weatherData.daily_weather?.map((daily, index) => (
              <div key={index} className="justify-start items-center gap-2 inline-flex">
                <img src={daily.icon} className='w-[32px]' />
                <div className='text-sm'>{daily.condition}</div>
              </div>
            ))}
          </div>
          <div className="h-[130px] lg:h-[150px] flex-col justify-between items-start inline-flex">
            {weatherData.daily_weather?.map((daily, index) => (
              <div key={index} className="justify-center items-center gap-2 inline-flex">
                <img src={TempUp} className='w-[16px]'/>
                <div>{daily.max_temp}°</div>
              </div>
            ))}
          </div>
          <div className="h-[130px] lg:h-[150px] flex-col justify-between items-start inline-flex">
            {weatherData.daily_weather?.map((daily, index) => (
              <div key={index} className="justify-start items-center gap-2 inline-flex">
                <img src={TempDown} className='w-[16px]' />
                <div>{daily.min_temp}°</div>
              </div>
            ))}
          </div>
        </section>
      </div>
      {backgroundLoading ? 
        <ProgressBar
          width='32px'
          height='32px'
          barColor="#00C6BA"
          borderColor='#8F8F8F'
          ariaLabel="progress-bar-loading"
          wrapperStyle={{}}
          wrapperClass=""
        /> :
      <div className="w-5/6 h-1/2 lg:w-[420px] lg:h-[340px] relative rounded-[5px] overflow-hidden shadow lg:order-last mb-3">
        <img src={backgroundPic.image?.image_url}  className="absolute w-full h-full object-cover" />
      </div>}
    </>}
    </main>
  )
}

export default Forecast
