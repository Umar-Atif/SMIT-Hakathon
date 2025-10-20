import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";
import toast from "react-hot-toast";
import ReactMarkdown from "react-markdown";

const ReportView = () => {
  const { reportId } = useParams();
  const [report, setReport] = useState(null);
  const [aiPrompts, setAiPrompts] = useState([]);
  const [loadingAI, setLoadingAI] = useState(false);

  const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY; // Tumhara key

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

  const generateAiPrompts = async (data) => {
    setLoadingAI(true);
    try {
      const promptText = `
**Title:** ${data.title || "N/A"}  
**Test:** ${data.testName}  
**Lab/Hospital:** ${data.hospital}  
**Doctor:** ${data.doctor}  
**Date:** ${new Date(data.date).toLocaleDateString()}  
**Price:** ${data.price}  
**Notes:** ${data.additionalNotes || "N/A"}  
**BP:** ${data.bpSystolic || "-"} / ${data.bpDiastolic || "-"} mmHg  
**Temp:** ${data.temp || "-"} °F  
**Fasting Sugar:** ${data.fastingSugar || "-"} mg/dL  
**Height/Weight:** ${data.height || "-"} cm / ${data.weight || "-"} kg  

Analyze these results and generate a detailed health insight, highlighting any high/low vitals, BMI info, and give recommendations in a professional AI-generated style. Use bullet points, bold important terms, and make it readable like a real AI assistant in Roman Urdu.
`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: promptText }] }],
          }),
        }
      );

      const dataAI = await response.json();
      const aiText = dataAI.candidates?.[0]?.content?.parts?.[0]?.text || "No insights generated";
      setAiPrompts([aiText]);
    } catch (err) {
      console.error("Gemini AI error:", err);
      setAiPrompts(["❌ AI Insights could not be generated."]);
    }
    setLoadingAI(false);
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
        <div className="flex-1 bg-gray-50 rounded-2xl shadow p-6 space-y-4">
          <h2 className="text-xl font-bold mb-4">AI Insights</h2>
          {loadingAI ? (
            <p className="text-gray-600">Generating AI insights...</p>
          ) : (
            aiPrompts.map((prompt, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-200 p-4 rounded-md text-gray-800 shadow-sm whitespace-pre-wrap"
              >
                <ReactMarkdown>{prompt}</ReactMarkdown>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportView;
