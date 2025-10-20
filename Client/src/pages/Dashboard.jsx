import { useEffect, useState } from "react";
import { User, Edit2, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../api/axios";
import toast from "react-hot-toast";

const Dashboard = () => {
    const { user } = useAuth();
    const [members, setMembers] = useState([]);

    useEffect(() => {
        fetchMembers();
    }, []);

    const fetchMembers = async () => {
        try {
            const res = await API.get("/api/members", { withCredentials: true });
            setMembers(res.data);
        } catch (err) {
            console.error(err);
            toast.error("Failed to fetch members");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this member?")) return;
        try {
            await API.delete(`/api/members/${id}`, { withCredentials: true });
            setMembers((prev) => prev.filter((m) => m._id !== id));
            toast.success("Member deleted successfully");
        } catch (err) {
            console.error(err);
            toast.error("Failed to delete member");
        }
    };

    const handleEdit = async (id) => {
        const newName = prompt("Enter new name:");
        const newRelation = prompt("Enter new relation:");
        if (!newName || !newRelation) return;

        try {
            const res = await API.put(`/api/members/${id}`, {
                name: newName,
                relation: newRelation
            }, { withCredentials: true });

            setMembers((prev) => prev.map((m) => (m._id === id ? res.data : m)));
            toast.success("Member updated successfully");
        } catch (err) {
            console.error(err);
            toast.error("Failed to update member");
        }
    };

    return (
        <div className="min-h-screen bg-blue-50 px-4 py-6">
            <div className="flex justify-end mb-6">
                <Link
                    to="/add-member"
                    className="bg-gradient-to-r from-pink-500 to-orange-400 text-white px-5 py-2 rounded-full font-semibold hover:opacity-90 transition"
                >
                    + Add Family Member
                </Link>
            </div>

            {members.length === 0 ? (
                <div className="text-center text-gray-600 text-lg mt-24">
                    No family members yet. Add one to get started!
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {members.map((member) => (
                        <div key={member._id} className="bg-white rounded-2xl shadow p-4 flex flex-col justify-between">
                            {/* Upper Portion */}
                            <div className="flex justify-between mb-4">
                                {/* Left */}
                                <div className="flex items-center gap-3">
                                    <div className="w-14 h-14 rounded-full bg-gradient-to-r from-pink-500 to-orange-400 flex items-center justify-center text-white text-2xl font-bold">
                                        {member.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-800">{member.name}</h3>
                                        <p className="text-gray-600">{member.relation}</p>
                                    </div>
                                </div>

                                {/* Right */}
                                <div className="text-right text-gray-600">
                                    <p className="text-sm">Last activity</p>
                                    <p className="text-xs mt-1">{new Date(member.updatedAt).toLocaleString()}</p>
                                </div>
                            </div>

                            {/* Lower Portion */}
                            <div className="flex justify-between items-center mt-2">
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleEdit(member._id)}
                                        className="flex items-center gap-1 border border-gray-300 px-3 py-1 rounded-md text-pink-500 hover:bg-pink-50 transition cursor-pointer"
                                    >
                                        <Edit2 size={16} /> Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(member._id)}
                                        className="flex items-center gap-1 border border-gray-300 px-3 py-1 rounded-md text-pink-500 hover:bg-pink-50 transition cursor-pointer"
                                    >
                                        <Trash2 size={16} /> Delete
                                    </button>
                                </div>
                                <Link to={`/member/${member._id}`} className="text-pink-500 hover:underline font-medium">
                                    Open
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dashboard;
