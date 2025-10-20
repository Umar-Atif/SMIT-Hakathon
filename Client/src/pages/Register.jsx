import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        agreeTerms: false,
    });

    const { register } = useAuth();
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

        if (formData.password !== formData.confirmPassword) {
            return toast.error("Passwords do not match");
        }
        if(formData.password.length < 8) {
            return toast.error("Password must be at least 8 characters");
        }
        if (!formData.agreeTerms) {
            return toast.error("Please agree to terms & privacy");
        }

        const success = await register({
            name: formData.name,
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
                            Create your account
                        </h1>
                        <p className="text-gray-600">
                            One place for reports, vitals and AI insights. <span className="text-pink-600 font-medium">Bilkul asaan.</span>
                        </p>
                    </div>

                    <ul className="space-y-3 mb-6 text-gray-600 text-sm">
                        <li>✅ Upload PDFs & photos of reports — Gemini explains in EN + Roman Urdu.</li>
                        <li>✅ Track manual <b>Vitals</b> (BP, Sugar, Weight) with reminders.</li>
                        <li>✅ Privacy first: encrypted storage, signed links for doctors.</li>
                    </ul>

                    <div className="bg-white p-4 rounded-md shadow-md">
                        <p className="font-medium text-pink-600 mb-2">We respect your privacy.</p>
                        <p className="text-gray-700">HealthMate shares nothing without your permissions. You own your data.</p>
                    </div>
                </div>

                {/* Right Section */}
                <form
                    onSubmit={handleSubmit}
                    className="bg-white p-8 rounded-2xl shadow-md space-y-5"
                >
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Full Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="e.g. Ayesha Khan"
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        />
                    </div>

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
                            placeholder="At least 8 characters"
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Re-enter password"
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        />
                    </div>

                    <div className="flex items-start">
                        <input
                            type="checkbox"
                            name="agreeTerms"
                            checked={formData.agreeTerms}
                            onChange={handleChange}
                            className="w-4 h-4 text-blue-600 border-gray-400 rounded focus:ring-blue-500 mt-0.5 mr-2"
                        />
                        <label className="text-gray-700 text-sm">
                            I agree to the{" "}
                            <span className="font-medium text-pink-600 underline">
                                Terms
                            </span>{" "}
                            &{" "}
                            <span className="font-medium text-pink-600 underline">
                                Privacy
                            </span>
                            .
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="bg-gradient-to-r from-pink-500 to-orange-400 text-white font-semibold rounded-full px-4 py-2 hover:opacity-90 transition cursor-pointer w-full"
                    >
                        Create account
                    </button>

                    <div className="text-center mt-4">
                        <p className="text-gray-600 text-sm">
                            Already have an account?{" "}
                            <span
                                onClick={() => navigate("/login")}
                                className="text-pink-600 font-medium cursor-pointer hover:underline"
                            >
                                Sign in
                            </span>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
