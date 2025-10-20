import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api/axios";
import toast from "react-hot-toast";

const AddReport = () => {
    const navigate = useNavigate();
    const { memberId } = useParams(); 
    const [formData, setFormData] = useState({
        title: "",
        testName: "",
        hospital: "",
        doctor: "",
        date: "",
        price: "",
        additionalNotes: "",
        bpSystolic: "",
        bpDiastolic: "",
        temp: "",
        fastingSugar: "",
        height: "",
        weight: "",
    });
    const [files, setFiles] = useState([]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFiles(e.target.files);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = new FormData();

            // Append memberId
            data.append("member", memberId);

            // Append other form fields
            for (let key in formData) {
                if (formData[key]) data.append(key, formData[key]);
            }

            // Append files if any
            for (let i = 0; i < files.length; i++) {
                data.append("files", files[i]);
            }

            await API.post("/api/reports", data, {
                withCredentials: true,
                headers: { "Content-Type": "multipart/form-data" },
            });

            toast.success("Report added successfully");
            navigate(-1); // Back to member dashboard
        } catch (err) {
            console.error(err);
            toast.error("Failed to add report");
        }
    };

    return (
        <div className="min-h-screen bg-blue-50 px-4 py-6">
            <h2 className="text-2xl font-bold mb-6 text-center">Add New Report</h2>
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow p-6 space-y-6 max-w-3xl mx-auto">
                {/* Title & Test Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-700 mb-1">Title (optional)</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                            placeholder="e.g., Ultrasound Abdomen"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-1">Test Name</label>
                        <input
                            type="text"
                            name="testName"
                            value={formData.testName}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                            placeholder="Ultrasound / X-ray / CBC / ABG"
                            required
                        />
                    </div>
                </div>

                {/* Files */}
                <div>
                    <label className="block text-gray-700 mb-1">Files (optional, multiple)</label>
                    <input
                        type="file"
                        multiple
                        onChange={handleFileChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                </div>

                {/* Hospital & Doctor */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-700 mb-1">Hospital / Lab</label>
                        <input
                            type="text"
                            name="hospital"
                            value={formData.hospital}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                            placeholder="e.g., Agha Khan"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-1">Doctor</label>
                        <input
                            type="text"
                            name="doctor"
                            value={formData.doctor}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                            placeholder="e.g., Dr. Ahmed"
                            required
                        />
                    </div>
                </div>

                {/* Date & Price */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-700 mb-1">Date</label>
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-1">Price</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                            placeholder="e.g., 3500"
                            required
                        />
                    </div>
                </div>

                {/* Additional Notes */}
                <div>
                    <label className="block text-gray-700 mb-1">Additional Notes</label>
                    <textarea
                        name="additionalNotes"
                        value={formData.additionalNotes}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        placeholder="Symptoms, instructions, etc."
                    />
                </div>

                {/* Optional Manual Vitals */}
                <div>
                    <h3 className="font-semibold text-gray-700 mb-2">Optional: Add Manual Vitals</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-2">
                        <div>
                            <input
                                type="number"
                                name="bpSystolic"
                                value={formData.bpSystolic}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md px-3 py-2"
                                placeholder="BP Systolic"
                            />
                        </div>
                        <div>
                            <input
                                type="number"
                                name="bpDiastolic"
                                value={formData.bpDiastolic}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md px-3 py-2"
                                placeholder="BP Diastolic"
                            />
                        </div>
                        <div>
                            <input
                                type="number"
                                name="temp"
                                value={formData.temp}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md px-3 py-2"
                                placeholder="Temp (°F)"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                            <input
                                type="number"
                                name="fastingSugar"
                                value={formData.fastingSugar}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md px-3 py-2"
                                placeholder="Fasting Sugar"
                            />
                        </div>
                        <div>
                            <input
                                type="number"
                                name="height"
                                value={formData.height}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md px-3 py-2"
                                placeholder="Height (cm)"
                            />
                        </div>
                        <div>
                            <input
                                type="number"
                                name="weight"
                                value={formData.weight}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md px-3 py-2"
                                placeholder="Weight (kg)"
                            />
                        </div>
                    </div>
                </div>

                {/* Save Button */}
                <button
                    type="submit"
                    className="bg-gradient-to-r from-pink-500 to-orange-400 text-white px-5 py-2 rounded-full font-semibold hover:opacity-90 transition mt-4 cursor-pointer"
                >
                    Save
                </button>
            </form>
        </div>
    );
};

export default AddReport;
