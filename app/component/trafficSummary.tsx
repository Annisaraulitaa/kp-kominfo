import React, { useState, useEffect } from "react";
import { FaMotorcycle, FaCar, FaTruck, FaBus } from "react-icons/fa";
import { fetchTodayYesterday } from "../api";
import { TodayYesterdayResponse } from "../api/types";

export default function TrafficSummary() {
  // We'll store 4 numbers for "today": [motor, mobil, truk, bus]
  const [todayData, setTodayData] = useState<number[]>([0,0,0,0]);
  // Similarly for "yesterday"
  const [yesterdayData, setYesterdayData] = useState<number[]>([0,0,0,0]);
  // We'll store the dates returned by the API
  const [todayDate, setTodayDate] = useState<string>("");
  const [yesterdayDate, setYesterdayDate] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  // Polling interval (ms)
  const POLL_INTERVAL = 3000; // 3 seconds

  const loadData = async () => {
    try {
      setError(null);
      const res: TodayYesterdayResponse = await fetchTodayYesterday();

      // The "today" array => [motor, mobil, truk, bus]
      // We'll map by vehicle name
      // We'll assume the server returns in order: motor, mobil, truk, bus
      // Or we can do a small helper function
      const tMotor = res.today.find((item) => item.vehicle === "motor")?.quantity || 0;
      const tMobil = res.today.find((item) => item.vehicle === "mobil")?.quantity || 0;
      const tTruk  = res.today.find((item) => item.vehicle === "truk")?.quantity || 0;
      const tBus   = res.today.find((item) => item.vehicle === "bus")?.quantity  || 0;
      setTodayData([tMotor, tMobil, tTruk, tBus]);

      // Same for yesterday
      const yMotor = res.yesterday.find((item) => item.vehicle === "motor")?.quantity || 0;
      const yMobil = res.yesterday.find((item) => item.vehicle === "mobil")?.quantity || 0;
      const yTruk  = res.yesterday.find((item) => item.vehicle === "truk")?.quantity || 0;
      const yBus   = res.yesterday.find((item) => item.vehicle === "bus")?.quantity  || 0;
      setYesterdayData([yMotor, yMobil, yTruk, yBus]);

      // Store the date strings
      setTodayDate(res.today_date);
      setYesterdayDate(res.yesterday_date);

    } catch (err: any) {
      setError(err.message);
    }
  };

  useEffect(() => {
    loadData();
    const intervalId = setInterval(loadData, POLL_INTERVAL);
    return () => clearInterval(intervalId);
  }, []);

  if (error) {
    return <div style={{ color: "red" }}>Error: {error}</div>;
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md mx-1">
      <h1 className="text-center text-lg font-bold text-gray-700 mb-4 px-4 py-2 rounded-md border border-[#f6f6f6] bg-[#eaf1ff]">
        TOTAL QUANTITY
      </h1>
      <div className="space-y-6">
        {/* Today */}
        <div className="bg-white p-4 rounded-lg shadow-md border">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-gray-700">TODAY</h2>
            <span className="text-gray-500 text-xs">{todayDate}</span>
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
            <h2 className="font-semibold text-gray-700">YESTERDAY</h2>
            <span className="text-gray-500 text-xs">{yesterdayDate}</span>
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
