"use client";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaDownload } from "react-icons/fa6";

export default function DownloadHistory() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [isOpen, setIsOpen] = useState(false);

    // Fungsi untuk mengunduh data dalam format CSV berdasarkan tanggal dan menampilkan per jam
    const handleDownload = () => {
        const formattedDate = selectedDate.toISOString().split("T")[0];
        const data = [["Date", "Hour", "Vehicle", "Quantity", "Change"],];
    
        for (let hour = 0; hour < 24; hour++) {
            const formattedHour = hour.toString().padStart(2, "0") + ":00:00";
            data.push([formattedDate, formattedHour, "Motorcycle", String(112), "+17"]);
            data.push([formattedDate, formattedHour, "Car", String(112), "+17"]);
            data.push([formattedDate, formattedHour, "Truck", String(112), "+17"]);
            data.push([formattedDate, formattedHour, "Bus", String(112), "+17"]);
        }

        const csvContent =
            "data:text/csv;charset=utf-8," +
            data.map((row) => row.join(",")).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `traffic_data_${formattedDate}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="fixed bottom-6 right-6">
            <button
            onClick={() => setIsOpen(!isOpen)}
            className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition flex items-center justify-center w-14 h-14"
            >
                <FaDownload className="w-6 h-6" />
            </button>
            {isOpen && (
                <div className="absolute bottom-16 right-0 p-4 bg-white shadow-lg rounded-lg">
                    <label className="text-gray-700 font-medium block mb-2">Select Date:</label>
                    <DatePicker
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date || new Date())}
                        dateFormat="yyyy-MM-dd"
                        className="p-2 border rounded-md w-44 text-center text-black shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    />
                    <button
                        onClick={handleDownload}
                        className="mt-2 w-full bg-blue-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-700 transition"
                    >
                        Download CSV
                    </button>
                </div>
            )}
        </div>
    );
}
