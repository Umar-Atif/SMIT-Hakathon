import React, { useState, useRef } from "react";
import API from "../api/axios";
import { AiOutlineUpload } from "react-icons/ai";

const Dashboard = () => {
    const [file, setFile] = useState(null);
    const [bp, setBp] = useState("");
    const [sugar, setSugar] = useState("");
    const [weight, setWeight] = useState("");
    const [notes, setNotes] = useState("");
    const [message, setMessage] = useState("");

    const fileInputRef = useRef(null); // hidden file input reference

    const handleFileChange = (e) => setFile(e.target.files[0]);

    // Open file dialog on button click
    const handleUploadClick = () => {
        fileInputRef.current.click();
    };

    // Upload selected file
    const handleUpload = async () => {
        if (!file) return setMessage("Please select a file first");
        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await API.post("/health/add", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setMessage("Report uploaded successfully!");
            console.log(res.data);
        } catch (err) {
            setMessage(err.response?.data?.message || "Upload failed");
        }
    };

    // Add manual vitals
    const handleAddVitals = async () => {
        try {
            const res = await API.post("/health/add", { bp, sugar, weight, notes });
            setMessage("Vitals added successfully!");
            console.log(res.data);
        } catch (err) {
            setMessage(err.response?.data?.message || "Adding vitals failed");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 p-6">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Welcome to HealthMate</h1>
            {message && <p className="text-green-600 mb-4">{message}</p>}

            <div className="grid md:grid-cols-2 gap-6">
                {/* Upload Report */}
                <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center">
                    <h2 className="text-xl font-semibold mb-4">Upload Medical Report</h2>

                    {/* Hidden file input */}
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                    />

                    {/* Upload button triggers file dialog */}
                    <button
                        onClick={handleUploadClick}
                        className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition mb-3"
                    >
                        <AiOutlineUpload /> Select File
                    </button>

                    {/* Submit selected file */}
                    <button
                        onClick={handleUpload}
                        disabled={!file}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                    >
                        Upload Report
                    </button>

                    {file && <p className="mt-2 text-gray-700 text-sm">Selected file: {file.name}</p>}
                </div>

                {/* Add Manual Vitals */}
                <div className="bg-white p-6 rounded-2xl shadow-lg">
                    <h2 className="text-xl font-semibold mb-4">Add Manual Vitals</h2>
                    <div className="grid gap-3">
                        <input
                            type="text"
                            placeholder="BP (e.g., 120/80)"
                            value={bp}
                            onChange={(e) => setBp(e.target.value)}
                            className="border px-3 py-2 rounded"
                        />
                        <input
                            type="number"
                            placeholder="Sugar (mg/dL)"
                            value={sugar}
                            onChange={(e) => setSugar(e.target.value)}
                            className="border px-3 py-2 rounded"
                        />
                        <input
                            type="number"
                            placeholder="Weight (kg)"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            className="border px-3 py-2 rounded"
                        />
                        <textarea
                            placeholder="Notes"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            className="border px-3 py-2 rounded"
                        />
                        <button
                            onClick={handleAddVitals}
                            className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition"
                        >
                            Add Vitals
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
