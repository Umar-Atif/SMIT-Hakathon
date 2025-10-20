import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import API from "../api/axios";
import toast from "react-hot-toast";

const MemberDashboard = () => {
    const { memberId } = useParams();
    const [reports, setReports] = useState([]);

    useEffect(() => {
        fetchReports();
    }, []);

    const fetchReports = async () => {
        try {
            const res = await API.get(`/api/reports/member/${memberId}`, { withCredentials: true });
            setReports(res.data);
        } catch (err) {
            console.error(err);
            toast.error("Failed to fetch reports");
        }
    };

    return (
        <div className="min-h-screen bg-blue-50 px-4 py-6">
            {/* Top Right Add New Report */}
            <div className="flex justify-end mb-6">
                <Link
                    to={`/member/${memberId}/add-report`}
                    className="bg-gradient-to-r from-pink-500 to-orange-400 text-white px-5 py-2 rounded-full font-semibold hover:opacity-90 transition"
                >
                    + Add New Report
                </Link>
            </div>

            {/* Responsive Table */}
            {reports.length === 0 ? (
                <div className="text-center text-gray-600 text-lg mt-24">
                    No reports yet. Add one to get started!
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white rounded-2xl shadow overflow-hidden">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="text-left py-3 px-4 font-semibold">Title</th>
                                <th className="text-left py-3 px-4 font-semibold">Test</th>
                                <th className="text-left py-3 px-4 font-semibold">Lab/Hospital</th>
                                <th className="text-left py-3 px-4 font-semibold">Doctor</th>
                                <th className="text-left py-3 px-4 font-semibold">Date</th>
                                <th className="text-left py-3 px-4 font-semibold">Price</th>
                                <th className="text-left py-3 px-4 font-semibold">View</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reports.map((report) => (
                                <tr key={report._id} className="border-b hover:bg-gray-50">
                                    <td className="py-2 px-4">{report.title || "-"}</td>
                                    <td className="py-2 px-4">{report.testName}</td>
                                    <td className="py-2 px-4">{report.hospital}</td>
                                    <td className="py-2 px-4">{report.doctor}</td>
                                    <td className="py-2 px-4">{new Date(report.date).toLocaleDateString()}</td>
                                    <td className="py-2 px-4">{report.price}</td>
                                    <td className="py-2 px-4">
                                        <Link
                                            to={`/report/${report._id}`}
                                            className="text-pink-500 hover:underline font-medium"
                                        >
                                            View
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MemberDashboard;
