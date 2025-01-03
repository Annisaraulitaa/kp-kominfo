import React from 'react';
import { FaLocationDot } from "react-icons/fa6";


export default function Navbar() {
  return (
    <div className='flex items-center bg-white shadow-md text-black p-5 h-16'>
      {/* Logo */}
      <a href="/" className="flex items-center">
        <img src="\images\logo-pemkot.png" alt="Logo" className="w-12 h-auto mr-4"/>
      </a>

      {/* Judul */}
      <h1 className="text-gray-500 text-l justify-center w-96">Vehicle Counting</h1>

      {/* Lokasi */}
      <div className='flex items-center ml-auto'>
        <FaLocationDot className='text-red-600 w-6 h-6 mr-2 '/>
        <p className="text-gray-600 text-base">Pettarani Andi Djemma</p>
      </div>
    </div>
  )
}
