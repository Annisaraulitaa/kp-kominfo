"use client"
import React, { useState } from 'react';
import { FaMotorcycle } from "react-icons/fa6";
import { FaCarSide } from "react-icons/fa6";
import { FaBus } from "react-icons/fa6";
import { FaTruck } from "react-icons/fa6";
    

export default function Peak_time(){
    // State untuk dropdown
    const [dateOption, setDateOption] = useState<string>('TODAY');
    const [timeOption, setTimeOption] = useState<string>('MORNING');
    const [isDateDropdownOpen, setIsDateDropdownOpen] = useState<boolean>(false);
    const [isTimeDropdownOpen, setIsTimeDropdownOpen] = useState<boolean>(false);

    // Fungsi untuk menangani pemilihan dropdown
    const handleDateSelect = (option: string) => {
    setDateOption(option);
    setIsDateDropdownOpen(false);
    };

    const handleTimeSelect = (option: string) => {
    setTimeOption(option);
    setIsTimeDropdownOpen(false);
    };

    return (
        <div className='bg-white shadow-md rounded-lg p-5 w-full max-w-md mx-auto m-60'>
            {/* Dropdown Buttons */}
            <div className='flex justify-between mb-5'>
                {/* Date Dropdown */}
                <div className='relative'>
                    <button
                        className='bg-blue-100 text-blue-500 px-4 py-2 rounded-md text-sm font-medium w-32'
                        onClick={() => setIsDateDropdownOpen(!isDateDropdownOpen)}>
                        {dateOption}
                    </button>
                    {isDateDropdownOpen && (
                        <div className='absolute bg-white shadow-md rounded-md mt-1 w-full z-10'>
                            <button
                                className='w-full text-left px-4 py-2 hover:bg-blue-100 text-gray-700'
                                onClick={() => handleDateSelect('TODAY')}>
                                TODAY
                            </button>
                            <button
                                className='w-full text-left px-4 py-2 hover:bg-blue-100 text-gray-700'
                                onClick={() => handleDateSelect('YESTERDAY')}>
                                YESTERDAY
                            </button>
                        </div>
                    )}
                </div>
                
                {/* Time Dropdown */}
                <div className='relative'>
                    <button
                        className='bg-blue-100 text-blue-500 px-4 py-2 rounded-md text-sm font-medium w-32'
                        onClick={() => setIsTimeDropdownOpen(!isTimeDropdownOpen)}>
                        {timeOption}
                    </button>
                    {isTimeDropdownOpen && (
                        <div className='absolute bg-white shadow-md rounded-md mt-1 w-full z-10'>
                            <button
                                className='w-full text-left px-4 py-2 hover:bg-blue-100 text-gray-700'
                                onClick={() => handleTimeSelect('MORNING')}>
                                MORNING
                            </button>
                            <button
                                className='w-full text-left px-4 py-2 hover:bg-blue-100 text-gray-700'
                                onClick={() => handleTimeSelect('NOON')}>
                                NOON
                            </button>
                            <button
                                className='w-full text-left px-4 py-2 hover:bg-blue-100 text-gray-700'
                                onClick={() => handleTimeSelect('AFTERNOON')}>
                                AFTERNOON
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Table */}
            <table className='w-full text-left'>
                <thead>
                    <tr className='text-gray-500 text-sm'>
                        <th className='pb-3'>Vehicle</th>
                        <th className='pb-3 text-center'>Quantity</th>
                        <th className='pb-3 text-center'>+/- with yesterday</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Motorcycle Row */}
                    <tr>
                        <td className='flex items-center py-3'>
                            <FaMotorcycle className='text-black w-6 h-6 mr-2'/>
                            Motorcycle
                        </td>
                        <td className='text-center'>112</td>
                        <td className='text-center text-green-500'>+17</td>
                    </tr>

                    {/* Car Row */}
                    <tr>
                        <td className='flex items-center py-3'>
                            <FaCarSide className='text-black w-6 h-6 mr-2'/>
                            Car
                        </td>
                        <td className='text-center'>112</td>
                        <td className='text-center text-green-500'>+17</td>
                    </tr>

                    {/* Truck Row */}
                    <tr>
                        <td className='flex items-center py-3'>
                            <FaTruck className='text-black w-6 h-6 mr-2'/>
                            Truck
                        </td>
                        <td className='text-center'>112</td>
                        <td className='text-center text-green-500'>+17</td>
                    </tr>

                    {/* Bus Row */}
                    <tr>
                        <td className='flex items-center py-3'>
                            <FaBus className='text-black w-6 h-6 mr-2'/>
                            Bus
                        </td>
                        <td className='text-center'>112</td>
                        <td className='text-center text-green-500'>+17</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}