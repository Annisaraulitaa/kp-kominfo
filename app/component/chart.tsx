import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Data lengkap untuk 24 jam
const fullData = Array.from({ length: 24 }, (_, i) => ({
  time: `${i.toString().padStart(2, "0")}:00`,
  Motorcycle: Math.floor(Math.random() * 100),
  Car: Math.floor(Math.random() * 80),
  Truck: Math.floor(Math.random() * 50),
  Bus: Math.floor(Math.random() * 30),
}));

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"];

export default function ChartComponent() {
  const [chartType, setChartType] = useState("Histogram");

  const handleChartChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setChartType(event.target.value);
  };

  // Data agregasi untuk Pie Chart (total dari 24 jam)
  const aggregatedData = [
    {
      name: "Motorcycle",
      value: fullData.reduce((sum, entry) => sum + entry.Motorcycle, 0),
    },
    {
      name: "Car",
      value: fullData.reduce((sum, entry) => sum + entry.Car, 0),
    },
    {
      name: "Truck",
      value: fullData.reduce((sum, entry) => sum + entry.Truck, 0),
    },
    {
      name: "Bus",
      value: fullData.reduce((sum, entry) => sum + entry.Bus, 0),
    },
  ];

  return (
    <div className="p-4 bg-white rounded shadow-lg">
      {/* Dropdown untuk memilih jenis chart */}
      <div className="mb-4">
        <select
          value={chartType}
          onChange={handleChartChange}
          className="p-2 border rounded"
        >
          <option value="Histogram">Histogram Chart</option>
          <option value="Line">Line Chart</option>
          <option value="Pie">Pie Chart</option>
        </select>
      </div>

      {/* Conditional Rendering untuk Chart */}
      {chartType === "Histogram" && (
        <div
          className="relative w-full overflow-x-auto"
          style={{
            maxWidth: "100%", // Pastikan container tidak meluas di luar kolom
          }}
        >
          <BarChart
            width={fullData.length * 50}
            height={300}
            data={fullData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Motorcycle" fill="#8884d8" />
            <Bar dataKey="Car" fill="#82ca9d" />
            <Bar dataKey="Truck" fill="#ffc658" />
            <Bar dataKey="Bus" fill="#ff8042" />
          </BarChart>
        </div>
      )}

      {chartType === "Line" && (
        <div className="relative w-full">
          <LineChart
            width={500}
            height={300}
            data={fullData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Motorcycle" stroke="#8884d8" />
            <Line type="monotone" dataKey="Car" stroke="#82ca9d" />
            <Line type="monotone" dataKey="Truck" stroke="#ffc658" />
            <Line type="monotone" dataKey="Bus" stroke="#ff8042" />
          </LineChart>
        </div>
      )}

      {chartType === "Pie" && (
        <PieChart width={500} height={300}>
          <Pie
            data={aggregatedData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label={(entry) => `${entry.name}: ${entry.value}`} // Menampilkan label di luar pie
          >
            {aggregatedData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      )}
    </div>
  );
}
