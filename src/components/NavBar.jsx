import React from 'react'
import WhetherLogo from '../assets/Whether-Sweater-Logo-1.svg'

function NavBar({ logOut, changeLocation }) {
  return (
    <main className="shadow-md bg-darkGray rounded-b-2xl p-5 mx-auto mb-4 flex items-center justify-between">
    <img src={WhetherLogo} className='w-[100px] lg:w-[150px]' alt="Whether Logo"/>
    <div className="flex lg:gap-2 text-md">
      <button onClick={changeLocation} className="w-[100px] bg-darkGray hover:bg-turquiose text-white hover:scale-105 ease-in duration-200 font-dm-sans py-2 px-4 rounded"> Location</button>
      <button onClick={logOut} className="w-[100px] bg-darkGray hover:bg-turquiose text-white hover:scale-105 ease-in duration-200 font-dm-sans py-2 px-4 rounded">Logout</button>
    </div>
</main>
  )
}

export default NavBar