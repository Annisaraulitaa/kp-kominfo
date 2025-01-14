import React from 'react';
import { FaLocationDot } from "react-icons/fa6";


export default function Navbar() {
  return (
    <nav className='flex items-center bg-white shadow-md p-4 h-16'>
      {/* Logo */}
      <a href="/" className="flex items-center">
        <img 
        src="\images\logo-pemkot.png" 
        alt="Logo" 
        className="w-12 h-auto mr-3"
        />
      </a>

      {/* Judul */}
      <h1 className="text-gray-600 text-lg font-semibold flex-grow text-center">Vehicle Counting</h1>

      {/* Lokasi */}
      <div className='flex items-center'>
        <FaLocationDot className='text-red-600 w-6 h-6 mr-2 '/>
        <p className="text-gray-600 text-sm sm:text-base">Pettarani Andi Djemma</p>
      </div>
    </nav>
  )
}
