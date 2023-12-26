import React from 'react'
import Hourly from './Hourly'
import Day from './Day'
import Condition from './Condition'
import TempHigh from './TempHigh'
import TempLow from './TempLow'
import DenverPic from '../assets/denver.jpeg'
import Sunny from '../assets/Sunny 2.svg'
import TempUp from '../assets/Up Arrow.svg'
import TempDown from '../assets/Down Arrow.svg'

function Forecast() {
  return (
    <main className="min-h-[30em] row-span-2 md:col-span-2 bg-turq-gradient-to-b shadow-md rounded-2xl border-2 border-turquiose flex flex-col lg:flex-row lg:flex-wrap justify-center items-center gap-4 lg:gap-10 py-8">
    <div className="text-offWhite font-dm-sans flex flex-col justify-start items-center gap-4 ">
        <section className="justify-center items-center gap-8 lg:gap-16 inline-flex">
          <div className="flex-col justify-start items-center gap-2 inline-flex">
            <div className="">2 PM</div>
            <div className="">
              <img src={Sunny} className='h-[20px] lg:h-full' />
            </div>
            <div className="text-xl">63°</div>
          </div>
          <div className="flex-col justify-start items-center gap-2 inline-flex">
            <div className="">2 PM</div>
            <div className="">
              <img src={Sunny} className='h-[20px] lg:h-full'/>
            </div>
            <div className="text-xl">63°</div>
          </div>
          <div className="flex-col justify-start items-center gap-2 inline-flex">
            <div className="">2 PM</div>
            <div className="">
              <img src={Sunny} className='h-[20px] lg:h-full'/>
            </div>
            <div className="text-xl">63°</div>
          </div>
          <div className="flex-col justify-start items-center gap-2 inline-flex">
            <div className="">2 PM</div>
            <div className="">
              <img src={Sunny} className='h-[20px] lg:h-full'/>
            </div>
            <div className="text-xl">63°</div>
          </div>
        </section>
        <section className="border-t-2 border-t-turquiose p-4 lg:p-8 justify-center text-sm lg:text-xl items-center gap-4 lg:gap-6 inline-flex">
          <div className="h-[130px] lg:h-[150px] flex-col justify-between items-center inline-flex py-2 lg:py-1">
            <div className="">Mon</div>
            <div className="">Tues</div>
            <div className="">Wed</div>
          </div>
          <div className="h-[130px] lg:h-[150px] flex-col justify-between items-start inline-flex">
            <div className="justify-center items-center gap-2 inline-flex">
              <img src={Sunny} />
              <div className="">Sunny</div>
            </div>
            <div className="justify-center items-center gap-2 inline-flex">
              <img src={Sunny} />
              <div className="">Sunny</div>
            </div>
            <div className="justify-center items-center gap-2 inline-flex">
              <img src={Sunny} />
              <div className="">Sunny</div>
            </div>
          </div>
          <div className="h-[130px] lg:h-[150px] flex-col justify-between items-start inline-flex">
            <div className="justify-center items-center gap-2 inline-flex">
              <div className="">
                <img src={TempUp} />
              </div>
              <div className="">68°</div>
            </div>
            <div className="justify-center items-center gap-2 inline-flex">
              <div className="">
                <img src={TempUp} />
              </div>
              <div className="">68°</div>
            </div>
            <div className="justify-center items-center gap-2 inline-flex">
              <div className="">
                <img src={TempUp} />
              </div>
              <div className="">68°</div>
            </div>
          </div>
          <div className="h-[130px] lg:h-[150px] flex-col justify-between items-start inline-flex">
            <div className="justify-center items-center gap-2 inline-flex">
              <div className="">
                <img src={TempUp} />
              </div>
              <div className="">68°</div>
            </div>
            <div className="justify-center items-center gap-2 inline-flex">
              <div className="">
                <img src={TempUp} />
              </div>
              <div className="">68°</div>
            </div>
            <div className="justify-center items-center gap-2 inline-flex">
              <div className="">
                <img src={TempUp} />
              </div>
              <div className="">68°</div>
            </div>
          </div>
        </section>
      </div>
      <div className="w-5/6 h-full lg:w-[450px] lg:h-[340px] relative rounded-[5px] overflow-hidden shadow lg:order-last">
        <img src={DenverPic} alt="Denver Image" className="absolute w-full h-full object-cover" />
      </div>
    </main>
  )
}

export default Forecast
