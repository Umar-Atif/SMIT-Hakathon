import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        rememberMe: false,
    });

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await login({
            email: formData.email,
            password: formData.password,
        });
        if (success) navigate("/dashboard");
    };

    return (
        <div className="min-h-screen bg-blue-50 p-6 flex justify-center items-center">
            <div className="max-w-5xl w-full grid md:grid-cols-2 gap-10 p-8 rounded-2xl">
                {/* Left Section */}
                <div>
                    <div className="text-left mb-8">
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">
                            Welcome back 👋
                        </h1>
                        <p className="text-gray-600">
                            Access your health insights, vitals, and reports — all in one safe
                            place.
                        </p>
                    </div>

                    <ul className="space-y-3 mb-6 text-gray-700 text-sm">
                        <li>✅ AI-driven report explanations — English + Roman Urdu.</li>
                        <li>✅ Track daily vitals & reminders.</li>
                        <li>✅ Your data stays private & secure.</li>
                    </ul>
                </div>

                {/* Right Section */}
                <form
                    onSubmit={handleSubmit}
                    className="bg-white p-8 rounded-2xl shadow-md space-y-5"
                >
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="you@example.com"
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                name="rememberMe"
                                checked={formData.rememberMe}
                                onChange={handleChange}
                                className="w-4 h-4 text-blue-600 border-gray-400 rounded focus:ring-blue-500 mr-2"
                            />
                            <label className="text-gray-700 text-sm">Remember me</label>
                        </div>
                        <p className="text-sm text-pink-600 font-medium cursor-pointer hover:underline">
                            Forgot password?
                        </p>
                    </div>

                    <button
                        type="submit"
                        className="bg-gradient-to-r from-pink-500 to-orange-400 text-white font-semibold rounded-full px-4 py-2 hover:opacity-90 transition cursor-pointer w-full"
                    >
                        Log in
                    </button>

                    <div className="text-center mt-4">
                        <p className="text-gray-600 text-sm">
                            Don’t have an account?{" "}
                            <span
                                onClick={() => navigate("/register")}
                                className="text-pink-600 font-medium cursor-pointer hover:underline"
                            >
                                Create one
                            </span>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
