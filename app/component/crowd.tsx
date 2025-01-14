"use client"
import React, { useState } from 'react';

export default function CrowdEstimation() {
  // State untuk slider
  const [rightLaneValue, setRightLaneValue] = useState(50);
  const [leftLaneValue, setLeftLaneValue] = useState(50);


  return (
    <div className='flex justify-center py-6'>
      <div className='bg-white shadow-md rounded-lg p-6 w-full max-w-md'>
        {/* Judul */}
        <div className='text-center mb-4'>
          <p className='text-sm bg-blue-100 text-blue-600 font-semibold px-3 py-1 rounded-full inline-block'>
            Crowd Estimation An Hour Ago
          </p>
        </div>

        {/* Right Lane */}
        <div className='mb-6'>
          <h2 className='text-gray-700 font-bold mb-2'>Right Lane</h2>
          <input
          type='range'
          min='0'
          max='100'
          value={rightLaneValue}
          onChange={(e) => setRightLaneValue(Number(e.target.value))}
          className='w-full h-2 bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 rounded-lg appearance-none cursor-pointer'
          />
          <div className='flex justify-between text-sm text-gray-500 mt-1'>
            <span>fluent</span>
            <span>slow</span>
          </div>
        </div>

        {/* Left Lane */}
        <div>
          <h2 className='text-gray-700 font-bold mb-2'>Left Lane</h2>
          <input
          type='range'
          min='0'
          max='100'
          value={leftLaneValue}
          onChange={(e) => setLeftLaneValue(Number(e.target.value))}
          className='w-full h-2 bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 rounded-lg appearance-none cursor-pointer'
          />
          <div className='flex justify-between text-sm text-gray-500 mt-1'>
            <span>fluent</span>
            <span>slow</span>
          </div>
        </div>
      </div>
    </div>
  )
}
