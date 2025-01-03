import Navbar from "./component/navbar";
import Peak_time from "./component/peakTime";
import Crowd_est from "./component/crowd";


export default function Home() {
  return (
    <div className="w-screen  h-screen bg-gray-700">
      <Navbar/>

      <div>
        <Peak_time/>
      </div>

    </div>
  );
}
