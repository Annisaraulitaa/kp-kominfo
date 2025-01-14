"use client";

import Navbar from "./component/navbar";
import Peak_time from "./component/peakTime";
import Crowd_est from "./component/crowd";
import Live from "./component/liveVideo";
import TrafficSummary from "./component/trafficSummary";
import Chart from "./component/chart";
import Lane from "./component/lane";


export default function Home() {
  return (
    <div className="w-screen h-screen bg-gray-400">
      {/* Navbar */}
      <Navbar/>

      <div className="min-h-screen bg-gray-400 py-8 px-4">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
          
          {/* Komponen Peak Time */}
          <div className="col-span-1">
            <Peak_time />
          </div>

          {/* Komponen Live Video */}
          <div className="col-span-1">
            <Live />
          </div>

          {/* Komponen Crowd Estimation */}
          <div className="col-span-1">
            <Crowd_est />
          </div>
          
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
