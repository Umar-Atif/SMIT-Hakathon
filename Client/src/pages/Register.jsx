import React, { useState, useContext } from "react";
import { AiOutlineUser, AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Register = () => {
    const navigate = useNavigate();
    const { setUser } = useContext(AuthContext);
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const res = await API.post("/auth/register", form);
            setUser(res.data);
            navigate("/dashboard");
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong");
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Register</h2>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="flex items-center border px-3 py-2 rounded">
                        <AiOutlineUser className="text-gray-400 mr-2" />
                        <input type="text" name="name" placeholder="Full Name" value={form.name} onChange={handleChange} className="w-full outline-none" required />
                    </div>
                    <div className="flex items-center border px-3 py-2 rounded">
                        <AiOutlineMail className="text-gray-400 mr-2" />
                        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} className="w-full outline-none" required />
                    </div>
                    <div className="flex items-center border px-3 py-2 rounded">
                        <AiOutlineLock className="text-gray-400 mr-2" />
                        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} className="w-full outline-none" required />
                    </div>
                    <button type="submit" className="w-full bg-purple-500 text-white py-2 rounded hover:bg-purple-600 transition" disabled={loading}>
                        {loading ? "Registering..." : "Register"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
