import { FaMotorcycle, FaCar, FaTruck, FaBus } from "react-icons/fa";
import { useState } from "react";

export default function TrafficSummary() {
  const todayData = [100, 100, 100, 100];
  const yesterdayData = [100, 100, 100, 100];

  const [currentDate, setCurrentDate] = useState(new Date("2025-01-07"));

  // Fungsi untuk mengubah tanggal
  const changeDate = (days: number) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + days);
    setCurrentDate(newDate);
  };

  const formattedDate = currentDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="bg-gray-100 p-6 rounded-xl shadow-md w-full max-w-md mx-1">
      <div className="flex items-center justify-center mb-6">
        <button
          className="text-gray-500 hover:text-black px-2"
          onClick={() => changeDate(-1)}
        >
          &lt;
        </button>
        <h1 className="text-center text-lg font-bold text-gray-700 mb px-4 py-2 rounded-md border border-[#c7d7ff] bg-[#eaf1ff]">
          {formattedDate}
        </h1>
        <button
          className="text-gray-500 hover:text-black px-2"
          onClick={() => changeDate(1)}
        >
          &gt;
        </button>
      </div>
      <div className="space-y-6">
        {/* Today */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
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
            <div className=" .text-center">
              <FaBus size={24} className="text-gray-600 mb-2" />
              <span className="text-blue-600 font-bold">{todayData[3]}</span>
            </div>
          </div>
        </div>
        {/* Yesterday */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
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