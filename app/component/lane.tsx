import { FaMotorcycle, FaCar, FaTruck, FaBus } from 'react-icons/fa';

export default function LaneComponent() {
  const lanes = [
    {
      title: "RIGHT LANE",
      vehicles: [
        { icon: <FaMotorcycle size={24} />, count: 100 },
        { icon: <FaCar size={24} />, count: 100 },
        { icon: <FaTruck size={24} />, count: 100 },
        { icon: <FaBus size={24} />, count: 100 },
      ],
    },
    {
      title: "LEFT LANE",
      vehicles: [
        { icon: <FaMotorcycle size={24} />, count: 100 },
        { icon: <FaCar size={24} />, count: 100 },
        { icon: <FaTruck size={24} />, count: 100 },
        { icon: <FaBus size={24} />, count: 100 },
      ],
    },
  ];

  return (
    <div className="bg-gray-100 p-6 rounded-xl shadow-md w-full max-w-md mx-auto">
      <div className="flex items-center justify-center mb-6">
        <button className="text-gray-500 hover:text-black">&lt;</button>
        <div className="px-4 py-2 mx-2 rounded-md border border-[#c7d7ff] bg-[#eaf1ff] text-black font-semibold">
          JANUARY 24, 2024
        </div>
        <button className="text-gray-500 hover:text-black">&gt;</button>
      </div>

      {lanes.map((lane, index) => (
        <div
          key={index}
          className="bg-white shadow-md rounded-lg p-4 mb-4 w-full max-w-md"
        >
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            {lane.title}
          </h2>
          <div className="flex justify-between items-center">
            {lane.vehicles.map((vehicle, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className="text-gray-600">{vehicle.icon}</div>
                <div className="text-blue-600 font-bold text-lg">
                  {vehicle.count}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
