"use client";

import Navbar from "./component/navbar";
import Peak_time from "./component/peakTime";
import Crowd_est from "./component/crowd";
import TrafficSummary from "./component/trafficSummary";
import Chart from "./component/chart";
import Lane from "./component/lane";

export default function Home() {
  return (
    <div className="w-screen h-screen bg-gray-700">
      <Navbar />

      <div className="mt-4 flex flex-col items-center">
        {/* Baris 1: Peak Time di tengah */}
        <div className="w-full flex justify-center mb-6">
          <Peak_time />
        </div>

        {/* Baris 2: Traffic Summary (kiri), Chart (tengah), Lane (kanan) */}
        <div className="w-full flex justify-between">
          {/* Traffic Summary di kiri */}
          <div className="w-1/4 flex justify-start">
            <TrafficSummary />
          </div>

          {/* Chart di tengah */}
          <div className="w-1/2 flex justify-center">
            <Chart />
          </div>

          {/* Lane di kanan */}
          <div className="w-1/4 flex justify-end">
            <Lane />
          </div>
        </div>
      </div>
    </div>
  );
}
