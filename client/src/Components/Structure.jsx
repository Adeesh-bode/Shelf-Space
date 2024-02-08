import React from 'react';
import { Link } from 'react-router-dom'


export default function Structure({ heading }) {
  return (
    <div className='flex flex-col justify-start items-center px-6 md:px-12 w-screen gap-3 md:gap-5'>
      <div className='w-full mx-4 text-xl'>
        <Link to='/' >
          Back
        </Link>
      </div>
      <div className='font-medium text-2xl md:text-3xl  '>{ heading }</div>
    </div>
  )
}
