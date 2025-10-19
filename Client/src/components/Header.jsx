import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Header() {
    const { user, logout } = useContext(AuthContext);

    return (
        <header className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 shadow-md sticky top-0 z-50">
            <div className="max-w-6xl mx-auto flex justify-between items-center">
                <Link to="/"><h1 className="font-extrabold text-2xl tracking-wide">HealthMate</h1></Link>
                <nav className="flex items-center gap-6">
                    {user ? (
                        <>
                            <p>👤 {user && user.name}</p>
                            <Link className="hover:text-yellow-300 transition" to="/dashboard">Dashboard</Link>
                            <Link className="hover:text-yellow-300 transition" to="/timeline">Timeline</Link>
                            <button
                                onClick={logout}
                                className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded shadow cursor-pointer transition"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link className="hover:text-yellow-300 transition" to="/login">Login</Link>
                            <Link className="hover:text-yellow-300 transition" to="/register">Register</Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
}
