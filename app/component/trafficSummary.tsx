import { FaMotorcycle, FaCar, FaTruck, FaBus } from "react-icons/fa";

export default function TrafficSummary() {
  const todayData = [100, 100, 100, 100];
  const yesterdayData = [100, 100, 100, 100];

  return (
    <div className="bg-gray-100 p-6 rounded-xl shadow-md w-full max-w-md mx-1">
      <h1 className="text-center text-lg font-bold text-gray-700 mb-4 px-4 py-2 rounded-md border border-[#c7d7ff] bg-[#eaf1ff]">
        TOTAL QUANTITY
      </h1>
      <div className="space-y-6">
        {/* Today */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-gray-700">TODAY</h2>
            <span className="text-gray-500 text-xs">24/01/2024</span>
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
            <h2 className="font-semibold text-gray-700">YESTERDAY</h2>
            <span className="text-gray-500 text-xs">23/01/2024</span>
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