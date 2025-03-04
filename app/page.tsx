"use client";

import Navbar from "./component/navbar";
import Peak_time from "./component/peakTime";
import Crowd_est from "./component/crowd";
import Live from "./component/liveVideo";
import TrafficSummary from "./component/trafficSummary";
import Chart from "./component/chart";
import Lane from "./component/lane";
import DownloadButton from "./component/downloadButton";

export default function Home() {
  return (
    <div className="w-screen min-h-screen bg-gray-200">
      {/* Navbar */}
      <Navbar />

      {/* Tambahkan padding-top agar konten tidak tertutup navbar */}
      <div className="pt-20 py-3 px-2 sm:py-5 sm:px-4 md:py-8">
        <div className="grid grid-cols-1 gap-3 w-full max-w-7xl mx-auto">

          {/* Top Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 sm:gap-4 md:gap-6">
            {/* Lane (Kiri Atas) */}
            <div className="sm:col-span-3 lg:col-span-3 md:col-span-3">
              <div className="bg-white rounded-lg shadow-sm p-4 w-full place-items-center">
                <Lane />
              </div>
            </div>

            {/* Live Video (Tengah Atas) */}
            <div className="w-full sm:col-span-3 lg:col-span-6 order-first sm:order-none md:col-span-3">
              <div className="bg-white rounded-lg shadow-sm p-4 w-full">
                <Live />
              </div>
            </div>

            {/* Traffic Summary (Kanan Atas) */}
            <div className="w-full sm:col-span-3 lg:col-span-3 md:col-span-3">
              <div className="bg-white rounded-lg shadow-sm p-4 w-full place-items-center">
                <TrafficSummary />
              </div>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 sm:gap-4 md:gap-6">
            {/* Peak Time (Kiri Bawah) */}
            <div className="w-full sm:col-span-3 lg:col-span-3 md:col-span-3">
              <div className="bg-white rounded-lg shadow-sm p-4 w-full">
                <Peak_time />
              </div>
            </div>

            {/* Chart (Tengah Bawah) */}
            <div className="bg-white w-full rounded-lg shadow-sm sm:col-span-3 lg:col-span-6 order-first sm:order-none md:col-span-3">
              {/* Outer box (full column width, with shadow & background) */}
              <div className="w-full">
                {/* Inner scroll container (only the chart area scrolls horizontally) */}
                <div className="bg-white overflow-x-auto shadow-sm rounded-lg">
                  <div className="bg-white inline-block p-4 min-w-max rounded-lg">
                    {/* Your Chart component */}
                    <Chart />
                  </div>
                </div>
              </div>
            </div>



            {/* Crowd Estimation (Kanan Bawah) */}
            <div className="w-full sm:col-span-1 lg:col-span-3 md:col-span-3">
              <div className="bg-white rounded-lg shadow-sm p-4 w-full">
                <Crowd_est />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Tambahkan komponen DownloadButton */}
      <DownloadButton />
    </div>
  );
}
