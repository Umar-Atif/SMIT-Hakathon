import React, { useEffect, useState } from "react";
import API from "../api/axios";

const Timeline = () => {
    const [entries, setEntries] = useState([]);

    useEffect(() => {
        const fetchTimeline = async () => {
            try {
                const res = await API.get("/health/timeline");
                setEntries(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchTimeline();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Your Health Timeline</h1>
            <div className="space-y-4">
                {entries.map((e) => (
                    <div key={e.id} className="bg-white p-4 rounded-2xl shadow">
                        <p className="text-gray-500 text-sm">{new Date(e.date).toLocaleString()}</p>
                        {e.type === "file" ? (
                            <>
                                <img src={e.fileUrl} alt="Uploaded file" className="mb-2 w-10   " />
                                <p>AI Summary: {JSON.stringify(e.aiSummary)}</p>
                            </>
                        ) : (
                            <>
                                <p>BP: {e.bp}</p>
                                <p>Sugar: {e.sugar}</p>
                                <p>Weight: {e.weight}</p>
                                <p>Notes: {e.notes}</p>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Timeline;
