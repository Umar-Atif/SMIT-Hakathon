import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import API from "../api/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddMember = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({ name: "", relation: "", customId: "" });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.name || !form.relation) {
            return toast.error("Name and Relation are required");
        }
        setLoading(true);
        try {
            const res = await API.post("/api/members", form, { withCredentials: true });
            toast.success("Family member added successfully!");
            navigate("/dashboard"); // redirect back to dashboard
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || "Failed to add member");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-blue-50 flex justify-center items-start pt-20 px-4">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Add Family Member</h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
                            placeholder="e.g., Ammi"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Relation</label>
                        <input
                            type="text"
                            name="relation"
                            value={form.relation}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
                            placeholder="e.g., Mother"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Custom ID (Optional)</label>
                        <input
                            type="text"
                            name="customId"
                            value={form.customId}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
                            placeholder="e.g., Mother"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-gradient-to-r from-pink-500 to-orange-400 text-white px-6 py-2 rounded-full font-semibold text-lg hover:opacity-90 transition mt-2 cursor-pointer "
                    >
                        {loading ? "Saving..." : "Save"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddMember;
