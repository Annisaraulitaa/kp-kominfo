"use client";
import React, { useState, useEffect } from "react";
import { FaMotorcycle, FaCarSide, FaBus, FaTruck } from "react-icons/fa6";
import { fetchVehicleTable } from "../api";
import { VehicleTableItem } from "../api/types";

export default function PeakTime() {
  const [dateOption, setDateOption] = useState<string>("today");
  const [timeOption, setTimeOption] = useState<string>("morning");
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState<boolean>(false);
  const [isTimeDropdownOpen, setIsTimeDropdownOpen] = useState<boolean>(false);

  // We'll store the 4 rows as an array of VehicleTableItem
  const [tableData, setTableData] = useState<VehicleTableItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  const POLL_INTERVAL = 3000; // 3 seconds

  // Function to load data
  const loadData = async () => {
    try {
      setError(null);
      const res: VehicleTableItem[] = await fetchVehicleTable(dateOption, timeOption);
      setTableData(res);
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Each time dateOption/timeOption changes, or we poll, we fetch
  useEffect(() => {
    loadData();
    const intervalId = setInterval(loadData, POLL_INTERVAL);
    return () => clearInterval(intervalId);
  }, [dateOption, timeOption]);

  // Handlers for the dropdown
  const handleDateSelect = (option: string) => {
    setDateOption(option);
    setIsDateDropdownOpen(false);
  };

  const handleTimeSelect = (option: string) => {
    setTimeOption(option);
    setIsTimeDropdownOpen(false);
  };

  if (error) {
    return <div style={{ color: "red" }}>Error: {error}</div>;
  }

  // We'll map over tableData => 4 rows
  // Example of tableData:
  // [
  //   { "vehicle": "motor", "quantity": 112, "difference": 17 },
  //   { "vehicle": "mobil", "quantity": 112, "difference": 17 },
  //   ...
  // ]

  // For icons, we match the vehicle name => icon
  function getVehicleIcon(vehicle: string) {
    switch (vehicle) {
      case "motor": 
      case "motorcycle":
        return <FaMotorcycle className="text-black w-6 h-6 mr-2" />;
      case "mobil":
      case "car":
        return <FaCarSide className="text-black w-6 h-6 mr-2" />;
      case "truk":
      case "truck":
        return <FaTruck className="text-black w-6 h-6 mr-2" />;
      case "bus":
        return <FaBus className="text-black w-6 h-6 mr-2" />;
      default:
        return <FaCarSide className="text-black w-6 h-6 mr-2" />;
    }
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-5 w-full max-w-lg mx-auto flex flex-col gap-5">
      {/* Dropdown Buttons */}
      <div className="flex flex-col sm:flex-row sm:justify-start gap-4 mb-5 w-full">
        {/* Date Dropdown */}
        <div className="relative w-full sm:w-1/2">
          <button
            className="bg-blue-100 text-blue-500 px-4 py-2 rounded-md text-sm font-medium w-full"
            onClick={() => setIsDateDropdownOpen(!isDateDropdownOpen)}
          >
            {dateOption}
          </button>
          {isDateDropdownOpen && (
            <div className="absolute bg-white shadow-md rounded-md mt-1 w-full z-10">
              <button
                className="w-full text-left px-4 py-2 hover:bg-blue-100 text-gray-700"
                onClick={() => handleDateSelect("today")}
              >
                TODAY
              </button>
              <button
                className="w-full text-left px-4 py-2 hover:bg-blue-100 text-gray-700"
                onClick={() => handleDateSelect("yesterday")}
              >
                YESTERDAY
              </button>
            </div>
          )}
        </div>

        {/* Time Dropdown */}
        <div className="relative w-full sm:w-1/2">
          <button
            className="bg-blue-100 text-blue-500 px-4 py-2 rounded-md text-sm font-medium w-full"
            onClick={() => setIsTimeDropdownOpen(!isTimeDropdownOpen)}
          >
            {timeOption}
          </button>
          {isTimeDropdownOpen && (
            <div className="absolute bg-white shadow-md rounded-md mt-1 w-full z-10">
              <button
                className="w-full text-left px-4 py-2 hover:bg-blue-100 text-gray-700"
                onClick={() => handleTimeSelect("morning")}
              >
                MORNING
              </button>
              <button
                className="w-full text-left px-4 py-2 hover:bg-blue-100 text-gray-700"
                onClick={() => handleTimeSelect("noon")}
              >
                NOON
              </button>
              <button
                className="w-full text-left px-4 py-2 hover:bg-blue-100 text-gray-700"
                onClick={() => handleTimeSelect("afternoon")}
              >
                AFTERNOON
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-gray-500 text-sm border-b">
              <th className="pb-3">Vehicle</th>
              <th className="pb-3 text-center">Quantity</th>
              <th className="pb-3 text-end">+/- with yesterday</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row) => (
              <tr className="border-b" key={row.vehicle}>
                <td className="flex items-center py-4">
                  {getVehicleIcon(row.vehicle)}
                  {row.vehicle}
                </td>
                <td className="text-center">{row.quantity}</td>
                <td
                  className={`text-center ${
                    row.difference >= 0 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {row.difference >= 0 ? `+${row.difference}` : row.difference}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
