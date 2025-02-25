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
      <div className="pt-20 py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 max-w-7xl mx-auto">
          
          {/* Lane (Kiri Atas) */}
          <div className="col-span-3">
            <Lane />
          </div>

          {/* Live Video (Tengah Atas) */}
          <div className="col-span-6">
            <Live />
          </div>

          {/* Traffic Summary (Kanan Atas) */}
          <div className="col-span-3">
            <TrafficSummary />
          </div>

          {/* Peak Time (Kiri Bawah) */}
          <div className="col-span-3">
            <Peak_time />
          </div>

          {/* Chart (Tengah Bawah) */}
          <div className="col-span-6">
            <Chart />
          </div>

          {/* Crowd Estimation (Kanan Bawah) */}
          <div className="col-span-3">
            <Crowd_est />
          </div>
        </div>
      </div>

      {/* Tambahkan komponen DownloadButton */}
      <DownloadButton />
    </div>
  );
}
