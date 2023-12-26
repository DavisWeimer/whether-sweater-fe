import React from 'react'
import Sunny from '../assets/Sunny 2.svg'

function Daily(props) {
  console.log(props)
  return (
    <div className="min-h-[20em] font-dm-sans bg-turq-gradient-to-t shadow-md rounded-2xl border-2 border-turquiose justify-evenly items-center inline-flex">
      <div className="p-4 flex-col justify-start items-center gap-3 inline-flex">
        <div className="self-stretch px-4 py-2.5 border-2 border-turquiose rounded-full justify-start items-center gap-3 inline-flex">
          <div className="text-offWhite text-sm font-bold font-dm-sans">Partly Cloudy</div>
            
          <img src={Sunny} />
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
                    <div>45°</div>
                    <div>30%</div>
                    <div>20 mil</div>
                    <div>6:23 AM</div>
                    <div>8:09 PM</div>
                </div>
            </div>
        </div>
        <div className="py-4 pr-4 rounded-full flex-col justify-start items-center gap-3 text-offWhite inline-flex">
            <div className="text-2xl lg:text-4xl ">Denver, CO</div>
            <div className="text-xl font-normal ">2:21 PM, April 18</div>
            <div className="text-8xl font-normal ">65°</div>
            <div className="justify-start text-lg items-center gap-4 inline-flex">
                <div><span className='text-sm'>High:</span><span className=''> 68°</span></div>
                <div><span className='text-sm'>Low:</span><span className=''> 61°</span></div>
            </div>
        </div>
    </div>
  )
}

export default Daily;

