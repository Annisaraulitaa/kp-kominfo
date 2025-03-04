"use client";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaDownload } from "react-icons/fa6";
import { fetchExportCsv } from "../api";

export default function DownloadHistory() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [isOpen, setIsOpen] = useState(false);

    // Build CSV from server data
    const handleDownload = async () => {
        try {
            const date = selectedDate.toISOString().split("T")[0];
            console.log(`Downloading CSV for date: ${date}`);
            const res = await fetchExportCsv(date);
            if (!res.ok) {
                throw new Error(`Failed to fetch Excel: ${res.statusText}`);
            }
            const blob = await res.blob();
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `traffic_data_${date}.xlsx`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error(error);
        }
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
