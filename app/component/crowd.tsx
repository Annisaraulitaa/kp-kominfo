import React, { useState } from 'react';

export default function CrowdEstimation() {
  // State untuk slider
  const [rightLaneValue, setRightLaneValue] = useState(50);
  const [leftLaneValue, setLeftLaneValue] = useState(50);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
      {/* Right Lane */}
      <div className="bg-white shadow-md rounded-lg p-5">
        <h2 className="text-lg font-semibold">Crowd Estimation (Right Lane)</h2>
        <div className="mt-3">
          <input
            type="range"
            min="0"
            max="100"
            value={rightLaneValue}
            onChange={(e) => setRightLaneValue(e.target.value)}
            className="w-full accent-red-500"
          />
          <p className="text-right mt-2 text-sm text-gray-600">
            Value: {rightLaneValue}%
          </p>
        </div>
      </div>

      {/* Left Lane */}
      <div className="bg-white shadow-md rounded-lg p-5">
        <h2 className="text-lg font-semibold">Crowd Estimation (Left Lane)</h2>
        <div className="mt-3">
          <input
            type="range"
            min="0"
            max="100"
            value={leftLaneValue}
            onChange={(e) => setLeftLaneValue(e.target.value)}
            className="w-full accent-blue-500"
          />
          <p className="text-right mt-2 text-sm text-gray-600">
            Value: {leftLaneValue}%
          </p>
        </div>
      </div>
    </div>
  )
}

