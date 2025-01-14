import { SetStateAction, useState } from "react";
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

const data = [
  { time: "09:00", Motorcycle: 65, Car: 35, Truck: 20, Bus: 10 },
  { time: "09:30", Motorcycle: 50, Car: 45, Truck: 25, Bus: 15 },
  { time: "10:00", Motorcycle: 70, Car: 55, Truck: 30, Bus: 20 },
  { time: "10:30", Motorcycle: 40, Car: 20, Truck: 15, Bus: 10 },
  { time: "11:00", Motorcycle: 75, Car: 60, Truck: 35, Bus: 25 },
];

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"];

export default function ChartComponent() {
  const [chartType, setChartType] = useState("Histogram");

  const handleChartChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setChartType(event.target.value);
  };

  return (
    <div className="p-4 bg-white rounded shadow-lg">
      {/* Dropdown */}
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

      {/* Conditional Rendering for Charts */}
      {chartType === "Histogram" && (
        <BarChart
          width={500}
          height={300}
          data={data}
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
          data={data}
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
            data={data}
            dataKey="Motorcycle"
            nameKey="time"
            cx="50%"
            cy="50%"
            outerRadius={50}
            fill="#8884d8"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Pie
            data={data}
            dataKey="Car"
            nameKey="time"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#82ca9d"
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Pie
            data={data}
            dataKey="Truck"
            nameKey="time"
            cx="50%"
            cy="50%"
            innerRadius={90}
            outerRadius={110}
            fill="#ffc658"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Pie
            data={data}
            dataKey="Bus"
            nameKey="time"
            cx="50%"
            cy="50%"
            innerRadius={120}
            outerRadius={140}
            fill="#ff8042"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      )}
    </div>
  );
}