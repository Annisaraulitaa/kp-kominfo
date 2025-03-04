"use client";
import React, { useState, useEffect } from "react";
import { fetchCrowdEstimation } from "../api";
import { CrowdEstimationItem } from "../api/types";

export default function CrowdEstimation() {
  const [rightLaneValue, setRightLaneValue] = useState(0);
  const [leftLaneValue, setLeftLaneValue] = useState(0);
  const [rightLaneCount, setRightLaneCount] = useState(0);
  const [leftLaneCount, setLeftLaneCount] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const POLL_INTERVAL = 3000; // 3 seconds

  // Convert vehicle_count to a discrete slider position: 0, 50, or 100
  function getSliderValue(count: number): number {
    if (count <= 14) return 0;     // lancar
    if (count <= 25) return 50;    // normal
    return 100;                    // padat
  }

  const loadData = async () => {
    try {
      setError(null);
      const data: CrowdEstimationItem[] = await fetchCrowdEstimation();
      // lane_id=1 => left, lane_id=2 => right (adjust if your DB differs)
      const leftLane = data.find((item) => item.lane_id === 1);
      const rightLane = data.find((item) => item.lane_id === 2);

      if (leftLane) {
        setLeftLaneCount(leftLane.vehicle_count);
        setLeftLaneValue(getSliderValue(leftLane.vehicle_count));
      }
      if (rightLane) {
        setRightLaneCount(rightLane.vehicle_count);
        setRightLaneValue(getSliderValue(rightLane.vehicle_count));
      }
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
    <div className="flex justify-center h-full">
      <div className="bg-white shadow-md rounded-lg px-6 pt-8 w-full max-w-md">
        <div className="text-center mb-4">
          <p className="text-sm bg-blue-100 text-blue-600 font-semibold px-4 py-2 rounded-lg inline-block">
            Crowd Estimation
          </p>
        </div>

        {/* Right Lane */}
        <div className="mb-6">
          <h2 className="text-gray-700 font-bold mt-8 mb-2">Right Lane</h2>
          <input
            type="range"
            min="0"
            max="100"
            value={rightLaneValue}
            readOnly
            className="w-full h-2 bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-sm font-medium text-gray-600 mt-1">
            <span>lancar</span>
            <span>padat</span>
          </div>
          {/* <h3 className="flex text-sm text-gray-500">
            Detected {rightLaneCount} vehicles
          </h3> */}
        </div>

        {/* Left Lane */}
        <div>
          <h2 className="text-gray-700 font-bold mt-8 mb-2">Left Lane</h2>
          <input
            type="range"
            min="0"
            max="100"
            value={leftLaneValue}
            readOnly
            className="w-full h-2 bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-sm font-medium text-gray-600 mt-1">
            <span>lancar</span>
            <span>padat</span>
          </div>
          {/* <h3 className="flex text-sm text-gray-500">
            Detected {leftLaneCount} vehicles
          </h3> */}
        </div>
      </div>
    </div>
  );
}
