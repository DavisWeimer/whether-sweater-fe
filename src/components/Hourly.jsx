import React from 'react'

function Hourly() {
  return (
    <div className="flex-col justify-start items-center gap-[5px] inline-flex">
      <div className="text-stone-200 text-base font-bold font-['DM Sans']">3 PM</div>
        <div className="w-[50px] h-[50px] relative">
          <div className="w-[46.09px] h-[43.21px] left-[1.95px] top-[3.40px] absolute">
          </div>
        </div>
      <div className="text-stone-200 text-xl font-normal font-['DM Sans']">63°</div>
    </div>
  )
}

export default Hourly