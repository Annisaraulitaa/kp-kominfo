import { FaMotorcycle, FaCar, FaTruck, FaBus, FaCalendarAlt } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { fetchLaneCounts } from "../api";
import { LaneCountsResponse } from "../api/types";

export default function TrafficSummary() {
  const [todayData, setTodayData] = useState<number[]>([0,0,0,0]);
  const [yesterdayData, setYesterdayData] = useState<number[]>([0,0,0,0]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [error, setError] = useState<string | null>(null);

  const POLL_INTERVAL = 3000; // 30 seconds

  function formatDate(date: Date): string {
    return date.toISOString().split("T")[0];
  }

  const loadData = async () => {
    try {
      setError(null);
      const dateStr = formatDate(selectedDate);
      const res: LaneCountsResponse = await fetchLaneCounts(dateStr);
      // Right lane => todayData
      setTodayData([res.right_lane.motor, res.right_lane.mobil, res.right_lane.truk, res.right_lane.bus]);
      // Left lane => yesterdayData
      setYesterdayData([res.left_lane.motor, res.left_lane.mobil, res.left_lane.truk, res.left_lane.bus]);
    } catch (err: any) {
      setError(err.message);
    }
  };

  useEffect(() => {
    loadData();
    const intervalId = setInterval(loadData, POLL_INTERVAL);
    return () => clearInterval(intervalId);
  }, [selectedDate]); // re-run if user changes the date

  // Functions to shift date
  const changeDate = (days: number) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + days);
    setSelectedDate(newDate);
  };

  const formattedDate = selectedDate.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  if (error) {
    return <div style={{ color: "red" }}>Error: {error}</div>;
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md mx-1">
      {/* Date with Calendar */}
      <div className="flex items-center justify-center mb-6">
        <button
          className="text-gray-500 hover:text-black px-2"
          onClick={() => changeDate(-1)}
        >
          &lt;
        </button>

        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date!)}
          dateFormat="dd/MM/yyyy"
          showYearDropdown
          scrollableYearDropdown
          yearDropdownItemNumber={10}
          maxDate={new Date()}
          className="text-center text-lg font-bold text-gray-700 px-4 py-2 rounded-md border border-[#c7d7ff] bg-[#eaf1ff] cursor-pointer"
          customInput={
            <div className="flex items-center cursor-pointer">
              <h1 className="mr-2">{formattedDate}</h1>
              <FaCalendarAlt className="text-gray-600" size={20} />
            </div>
          }
        />

        <button
          className="text-gray-500 hover:text-black px-2"
          onClick={() => {
            const now = new Date();
            // If user is already on today's date, do nothing
            if (
              selectedDate.getDate() === now.getDate() &&
              selectedDate.getMonth() === now.getMonth() &&
              selectedDate.getFullYear() === now.getFullYear()
            ) {
              return;
            }
            changeDate(1);
          }}
        >
          &gt;
        </button>
      </div>

      <div className="space-y-6">
        {/* Right Lane */}
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
        {/* Left Lane */}
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
