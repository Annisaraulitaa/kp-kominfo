import Navbar from "./component/navbar";
import Peak_time from "./component/peakTime";
import Crowd_est from "./component/crowd";


export default function Home() {
  return (
    <div className="w-screen h-700 bg-gray-700">
      <Navbar/>

      <div className="container mx-auto p-4">
        <div className="flex flex-col items-center justify-center gap-4 p-6 rounded-lg shadow-md">
          {/* <Live/> */}
          <Peak_time/> 
          <Crowd_est/>
        </div>
      </div>

    </div>
  );
}
