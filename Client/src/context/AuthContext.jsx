import { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import API from "../api/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // ✅ Auto-fetch user on page refresh
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await API.get("/api/auth/profile", { withCredentials: true });
                setUser(res.data);
            } catch {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    // ✅ Register
    const register = async (data) => {
        try {
            const res = await API.post("/api/auth/register", data, { withCredentials: true });
            setUser(res.data);
            toast.success(`Welcome, ${res.data.name}!`);
            return true;
        } catch (err) {
            toast.error(err.response?.data?.message || "Registration failed");
            return false;
        }
    };

    // ✅ Login
    const login = async (data) => {
        try {
            const res = await API.post("/api/auth/login", data, { withCredentials: true });
            setUser(res.data);
            toast.success(`Welcome back, ${res.data.name}!`);
            return true;
        } catch (err) {
            toast.error(err.response?.data?.message || "Login failed");
            return false;
        }
    };

    // ✅ Logout
    const logout = async () => {
        try {
            await API.post("/api/auth/logout", {}, { withCredentials: true });
            setUser(null);
            toast.success("Logged out successfully");
        } catch {
            toast.error("Logout failed");
        }
    };

    return (
        <AuthContext.Provider value={{ user, register, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
