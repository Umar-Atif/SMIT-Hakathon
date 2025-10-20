import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Heart } from "lucide-react";
import { useAuth } from "../context/AuthContext"

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const { user, logout } = useAuth();

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 text-xl font-semibold text-pink-600">
                    🩺 HealthMate
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-6 text-gray-700 font-medium">
                    {!user ? (
                        <>
                            <a href="#" className="hover:text-pink-600">Features</a>
                            <a href="#" className="hover:text-pink-600">How it works</a>
                            <a href="#" className="hover:text-pink-600">FAQ</a>
                            <a href="#" className="hover:text-pink-600">Get started</a>
                        </>
                    ) : (
                        <>
                            <Link to="/" className="hover:text-pink-600">Home</Link>
                            <Link to="/dashboard" className="hover:text-pink-600">Dashboard</Link>
                            <Link to="/profile" className="hover:text-pink-600">Profile</Link>
                        </>
                    )}
                </nav>

                {/* Desktop Buttons */}
                <div className="hidden md:flex gap-3">
                    {!user ? (
                        <>
                            <Link
                                to="/login"
                                className="px-4 py-2 text-pink-600 font-medium rounded-full hover:bg-pink-50 transition"
                            >
                                Sign in
                            </Link>
                            <Link
                                to="/register"
                                className="bg-gradient-to-r from-pink-500 to-orange-400 text-white font-semibold rounded-full px-4 py-2 hover:opacity-90 transition"
                            >
                                Create account
                            </Link>
                        </>
                    ) : (
                        <button
                            onClick={logout}
                            className="bg-gradient-to-r from-pink-500 to-orange-400 text-white px-6 py-2 rounded-full text-lg font-semibold hover:opacity-90 transition cursor-pointer"
                        >
                            Logout
                        </button>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="md:hidden text-pink-600 focus:outline-none"
                >
                    {menuOpen ? <X size={26} /> : <Menu size={26} />}
                </button>
            </div>

            {/* Mobile Dropdown */}
            {menuOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 shadow-sm animate-slideDown">
                    <nav className="flex flex-col items-center gap-4 py-4">
                        {!user ? (
                            <>
                                <a href="#" className="text-gray-700 hover:text-pink-600">Features</a>
                                <a href="#" className="text-gray-700 hover:text-pink-600">How it works</a>
                                <a href="#" className="text-gray-700 hover:text-pink-600">FAQ</a>
                                <a href="#" className="text-gray-700 hover:text-pink-600">Get started</a>
                                <Link to="/login" onClick={() => setMenuOpen(false)} className="text-pink-600 font-medium">Sign in</Link>
                                <Link
                                    to="/register"
                                    onClick={() => setMenuOpen(false)}
                                    className="bg-gradient-to-r from-pink-500 to-orange-400 text-white px-4 py-2 rounded-full font-semibold hover:opacity-90 transition"
                                >
                                    Create account
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link to="/" onClick={() => setMenuOpen(false)} className="text-gray-700 hover:text-pink-600">Home</Link>
                                <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="text-gray-700 hover:text-pink-600">Dashboard</Link>
                                <Link to="/profile" onClick={() => setMenuOpen(false)} className="text-gray-700 hover:text-pink-600">Profile</Link>
                                <button
                                    onClick={() => {
                                        logout();
                                        setMenuOpen(false);
                                    }}
                                    className="text-white bg-pink-500 px-4 py-2 rounded-full font-medium hover:bg-pink-600 transition"
                                >
                                    Logout
                                </button>
                            </>
                        )}
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Header;
