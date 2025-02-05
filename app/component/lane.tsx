import { FaMotorcycle, FaCar, FaTruck, FaBus, FaCalendarAlt } from "react-icons/fa";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function TrafficSummary() {
  const todayData = [100, 100, 100, 100];
  const yesterdayData = [100, 100, 100, 100];

  const [selectedDate, setSelectedDate] = useState(new Date("2025-01-07"));

  const formattedDate = selectedDate.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  // Fungsi untuk mengubah tanggal manual
  const changeDate = (days: number) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + days);
    setSelectedDate(newDate);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md mx-1">
      {/* Tanggal dengan Kalender */}
      <div className="flex items-center justify-center mb-6">
        {/* Tombol Kiri */}
        <button
          className="text-gray-500 hover:text-black px-2"
          onClick={() => changeDate(-1)}
        >
          &lt;
        </button>

        {/* Komponen DatePicker */}
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date!)}
          dateFormat="dd/MM/yyyy"
          showYearDropdown
          scrollableYearDropdown
          yearDropdownItemNumber={10}
          className="text-center text-lg font-bold text-gray-700 px-4 py-2 rounded-md border border-[#c7d7ff] bg-[#eaf1ff] cursor-pointer"
          customInput={
            <div className="flex items-center cursor-pointer">
              <h1 className="mr-2">{formattedDate}</h1>
              <FaCalendarAlt className="text-gray-600" size={20} />
            </div>
          }
        />

        {/* Tombol Kanan */}
        <button
          className="text-gray-500 hover:text-black px-2"
          onClick={() => changeDate(1)}
        >
          &gt;
        </button>
      </div>

      <div className="space-y-6">
        {/* Today */}
        <div className="bg-white p-4 rounded-lg shadow-md border">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-gray-700">RIGHT LANE</h2>
          </div>
          <div className="flex justify-around items-center">
            <div className="text-center">
              <FaMotorcycle size={24} className="text-gray-600 mb-2" />
              <span className="text-blue-600 font-bold">{todayData[0]}</span>
            </div>
            <div className="text-center">
              <FaCar size={24} className="text-gray-600 mb-2" />
              <span className="text-blue-600 font-bold">{todayData[1]}</span>
            </div>
            <div className="text-center">
              <FaTruck size={24} className="text-gray-600 mb-2" />
              <span className="text-blue-600 font-bold">{todayData[2]}</span>
            </div>
            <div className="text-center">
              <FaBus size={24} className="text-gray-600 mb-2" />
              <span className="text-blue-600 font-bold">{todayData[3]}</span>
            </div>
          </div>
        </div>
        {/* Yesterday */}
        <div className="bg-white p-4 rounded-lg shadow-md border">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-gray-700">LEFT LANE</h2>
          </div>
          <div className="flex justify-around items-center">
            <div className="text-center">
              <FaMotorcycle size={24} className="text-gray-600 mb-2" />
              <span className="text-blue-600 font-bold">{yesterdayData[0]}</span>
            </div>
            <div className="text-center">
              <FaCar size={24} className="text-gray-600 mb-2" />
              <span className="text-blue-600 font-bold">{yesterdayData[1]}</span>
            </div>
            <div className="text-center">
              <FaTruck size={24} className="text-gray-600 mb-2" />
              <span className="text-blue-600 font-bold">{yesterdayData[2]}</span>
            </div>
            <div className="text-center">
              <FaBus size={24} className="text-gray-600 mb-2" />
              <span className="text-blue-600 font-bold">{yesterdayData[3]}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
