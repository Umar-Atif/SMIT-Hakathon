import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";
import toast from "react-hot-toast";

const ReportView = () => {
    const { reportId } = useParams();
    const [report, setReport] = useState(null);
    const [aiPrompts, setAiPrompts] = useState([]);

    useEffect(() => {
        fetchReport();
    }, []);

    const fetchReport = async () => {
        try {
            const res = await API.get(`/api/reports/${reportId}`, { withCredentials: true });
            setReport(res.data);
            generateAiPrompts(res.data);
        } catch (err) {
            console.error(err);
            toast.error("Failed to fetch report");
        }
    };

    const generateAiPrompts = (data) => {
        const prompts = [];

        // BP prompts
        if (data.bpSystolic && data.bpDiastolic) {
            if (data.bpSystolic > 140 || data.bpDiastolic > 90) {
                prompts.push("⚠️ High blood pressure detected. Consider lifestyle changes and consult a doctor.");
            } else if (data.bpSystolic < 90 || data.bpDiastolic < 60) {
                prompts.push("⚠️ Low blood pressure detected. Ensure proper hydration and consult a doctor if symptomatic.");
            }
        }

        // Sugar prompts
        if (data.fastingSugar) {
            if (data.fastingSugar > 110) {
                prompts.push("⚠️ Elevated fasting sugar. Monitor diet and consult for diabetes check-up.");
            } else if (data.fastingSugar < 70) {
                prompts.push("⚠️ Low blood sugar detected. Consider a small snack or consult your doctor.");
            }
        }

        // Temp prompts
        if (data.temp) {
            if (data.temp > 100.4) {
                prompts.push("🌡️ Fever detected. Rest and hydration recommended.");
            } else if (data.temp < 97) {
                prompts.push("🌡️ Low body temperature. Keep warm and monitor.");
            }
        }

        // BMI prompts
        if (data.height && data.weight) {
            const heightM = data.height / 100;
            const bmi = data.weight / (heightM * heightM);
            if (bmi >= 25) {
                prompts.push(`⚖️ BMI is ${bmi.toFixed(1)} (Overweight). Consider healthy diet and exercise.`);
            } else if (bmi < 18.5) {
                prompts.push(`⚖️ BMI is ${bmi.toFixed(1)} (Underweight). Consider nutrition consultation.`);
            } else {
                prompts.push(`✅ BMI is ${bmi.toFixed(1)} (Normal). Keep maintaining healthy habits.`);
            }
        }

        setAiPrompts(prompts);
    };

    if (!report) return <div className="text-center mt-24 text-gray-600">Loading...</div>;

    return (
        <div className="min-h-screen bg-blue-50 px-4 py-6">
            <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-6">
                {/* Left side: Report Details */}
                <div className="flex-1 bg-white rounded-2xl shadow p-6 space-y-4">
                    <h2 className="text-xl font-bold mb-4">Report Details</h2>
                    {report.files && report.files.length > 0 && (
                        <div className="mb-4">
                            <img src={report.files[0]} alt="report" className="w-full rounded-md object-cover max-h-64" />
                        </div>
                    )}
                    <p><strong>Title:</strong> {report.title || "-"}</p>
                    <p><strong>Test:</strong> {report.testName}</p>
                    <p><strong>Lab/Hospital:</strong> {report.hospital}</p>
                    <p><strong>Doctor:</strong> {report.doctor}</p>
                    <p><strong>Date:</strong> {new Date(report.date).toLocaleDateString()}</p>
                    <p><strong>Price:</strong> {report.price}</p>
                    <p><strong>Notes:</strong> {report.additionalNotes || "-"}</p>
                    {report.bpSystolic && report.bpDiastolic && (
                        <p><strong>BP:</strong> {report.bpSystolic}/{report.bpDiastolic} mmHg</p>
                    )}
                    {report.temp && <p><strong>Temp:</strong> {report.temp} °F</p>}
                    {report.fastingSugar && <p><strong>Fasting Sugar:</strong> {report.fastingSugar} mg/dL</p>}
                    {report.height && report.weight && <p><strong>Height/Weight:</strong> {report.height} cm / {report.weight} kg</p>}
                </div>

                {/* Right side: AI Prompts */}
                <div className="flex-1 bg-white rounded-2xl shadow p-6 space-y-4">
                    <h2 className="text-xl font-bold mb-4">AI Insights</h2>
                    {aiPrompts.length === 0 ? (
                        <p className="text-gray-600">No insights available for this report.</p>
                    ) : (
                        aiPrompts.map((prompt, idx) => (
                            <div
                                key={idx}
                                className="border-l-4 border-pink-500 bg-pink-50 p-3 rounded-md text-gray-700"
                            >
                                {prompt}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default ReportView;
