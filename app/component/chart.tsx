// app/components/ChartComponent.tsx

import React, { useState, useEffect } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  LineChart, Line, PieChart, Pie, Cell,
} from "recharts";
import { fetchCharts } from "../api";
import { ChartsResponse, HourlyData } from "../api/types";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"];

export default function ChartComponent() {
  const [chartType, setChartType] = useState("Histogram");
  const [chartData, setChartData] = useState<HourlyData[]>([]);
  const [fullData, setFullData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Polling interval (ms)
  const POLL_INTERVAL = 3000; // 10 seconds

  // A function to load data from /charts
  const loadData = async () => {
    try {
      setError(null);
      const res: ChartsResponse = await fetchCharts();
      // Transform to Recharts shape
      const transformed = res.charts.map((item) => ({
        time: `${item.hour.toString().padStart(2, "0")}:00`,
        Motorcycle: item.motor,
        Car: item.mobil,
        Truck: item.truk,
        Bus: item.bus,
      }));
      setChartData(res.charts);
      setFullData(transformed);
    } catch (err: any) {
      setError(err.message);
    }
  };

  useEffect(() => {
    // 1) Initial load
    loadData();

    // 2) Polling with setInterval
    const intervalId = setInterval(loadData, POLL_INTERVAL);

    // Cleanup on unmount
    return () => clearInterval(intervalId);
  }, []); // no dependencies => runs once & sets interval

  // If you want the user to manually refresh:
  // const handleManualRefresh = () => {
  //   loadData();
  // };

  if (error) {
    return <div style={{ color: "red" }}>Error: {error}</div>;
  }

  // Aggregated data for Pie
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

  const handleChartChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setChartType(event.target.value);
  };

  return (
    <div className="p-4 bg-white rounded shadow-lg">
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

      {chartType === "Histogram" && (
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
      )}

      {chartType === "Line" && (
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
            label={(entry) => `${entry.name}: ${entry.value}`}
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
