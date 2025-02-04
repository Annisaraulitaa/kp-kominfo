"use client"
import React, { useState } from 'react';

export default function CrowdEstimation() {
  // State untuk slider
  const [rightLaneValue, setRightLaneValue] = useState(50);
  const [leftLaneValue, setLeftLaneValue] = useState(50);


  return (
    <div className='flex justify-center h-full'>
      <div className='bg-white shadow-md rounded-lg px-6 pt-8 w-full max-w-md'>
        {/* Judul */}
        <div className='text-center mb-4'>
          <p className='text-sm bg-blue-100 text-blue-600 font-semibold px-4 py-2 rounded-lg inline-block'>
            Crowd Estimation An Hour Ago
          </p>
        </div>

        {/* Right Lane */}
        <div className='mb-6'>
          <h2 className='text-gray-700 font-bold mt-8 mb-2'>Right Lane</h2>
          <input
          type='range'
          min='0'
          max='100'
          value={rightLaneValue}
          onChange={(e) => setRightLaneValue(Number(e.target.value))}
          className='w-full h-2 bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 rounded-lg appearance-none cursor-pointer'
          />
          <div className='flex justify-between text-sm font-medium text-gray-600 mt-1'>
            <span>fluent</span>
            <span>slow</span>
          </div>
          <h3 className='flex text-sm text-gray-500'>Dideteksi terdapat ... kendaraan </h3>
        </div>

        {/* Left Lane */}
        <div>
          <h2 className='text-gray-700 font-bold mt-8 mb-2'>Left Lane</h2>
          <input
          type='range'
          min='0'
          max='100'
          value={leftLaneValue}
          onChange={(e) => setLeftLaneValue(Number(e.target.value))}
          className='w-full h-2 bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 rounded-lg appearance-none cursor-pointer'
          />
          <div className='flex justify-between text-sm font-medium text-gray-600 mt-1'>
            <span>fluent</span>
            <span>slow</span>
          </div>
          <h3 className='flex text-sm text-gray-500'>Dideteksi terdapat ... kendaraan </h3>
        </div>
      </div>
    </div>
  )
}
