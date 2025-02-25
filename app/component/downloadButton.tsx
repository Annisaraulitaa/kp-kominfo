"use client";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaDownload } from "react-icons/fa6";

export default function DownloadHistory() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);

    // Fungsi untuk mengunduh data dalam format CSV berdasarkan tanggal
    const handleDownload = () => {
        const formattedDate = selectedDate.toISOString().split("T")[0];
        const data = [
        ["Date", "Vehicle", "Quantity", "Change"],
        [formattedDate, "Motorcycle", 112, "+17"],
        [formattedDate, "Car", 112, "+17"],
        [formattedDate, "Truck", 112, "+17"],
        [formattedDate, "Bus", 112, "+17"],
        ];

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
            onClick={() => setShowDatePicker(!showDatePicker)}
            className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition flex items-center justify-center w-14 h-14 relative"
            >
                <FaDownload className="w-6 h-6" />
            </button>
            {showDatePicker && (
                <div className="absolute bottom-16 right-0 bg-white p-4 shadow-lg rounded-lg">
                    <label className="text-gray-700 font-medium">Select Date:</label>
                    <DatePicker
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date || new Date())}
                        dateFormat="yyyy-MM-dd"
                        className="p-2 border rounded-md w-36 text-center text-black shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    />
                    <button
                        onClick={handleDownload}
                        className="mt-2 bg-blue-600 text-white p-2 rounded-lg shadow-md hover:bg-blue-700 transition w-full"
                    >
                    Download CSV
                    </button>
                </div>
            )}
        </div>
    );
}
