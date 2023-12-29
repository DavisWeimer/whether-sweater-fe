import React from 'react'

const Missing = () => {
  return (
    <div className='fixed w-full h-screen bg-gradient-to-t from-turquiose to-darkGray font-dm-sans flex flex-col justify-center items-center z-20'>
      <h1 className='bg-lightGray hover:bg-turquiose text-white flex justify-center text-8xl font-dm-sans-bold py-2 px-4 rounded w-1/4 focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed'> 404</h1>
      <h2 className='p-2 text-xl'>Nothing to see here!</h2>
    </div>
  )
}

export default Missing