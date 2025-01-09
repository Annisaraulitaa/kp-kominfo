import Navbar from "./component/navbar";
import Peak_time from "./component/peakTime";
import Crowd_est from "./component/crowd";
import Live from "./component/liveVideo";


export default function Home() {
  return (
    <div className="w-screen h-screen bg-gray-700">
      {/* Navbar */}
      <Navbar/>

      <div className="min-h-screen bg-gray-900 py-8 px-4">
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
        </div>
      </div>
    </div>
  );
}
