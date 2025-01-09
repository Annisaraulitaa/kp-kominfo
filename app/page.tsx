import Navbar from "./component/navbar";
import Peak_time from "./component/peakTime";
import Crowd_est from "./component/crowd";
import Live from "./component/liveVideo";


export default function Home() {
  return (
    <div className="w-screen h-screen bg-gray-700">
      <Navbar/>

      <div className="container mx-auto">
        <div className="flex justify-between items-center gap-8 p-6 rounded-lg shadow-md flex-wrap">
          <Peak_time/> 
          <div className="w-full md:w-1/3 mt-4 md:mt-0">
            <Live/>
          </div>
          <Crowd_est/>
        </div>
      </div>

    </div>
  );
}
