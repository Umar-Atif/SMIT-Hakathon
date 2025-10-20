import { Upload, Shield, Eye, Lock, Share2, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext"

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-orange-50 text-gray-900">
      {/* Hero Section */}
      <section className="text-center py-20 px-6">
        <div className="inline-block mb-4 px-4 py-1 rounded-full bg-pink-100 text-pink-700 font-medium text-sm">
          🤖 AI-powered Health Companion
        </div>
        {/* <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
          Manage your <span className="text-pink-600">health</span>,{" "}
          <span className="text-orange-500">reports</span> & <br />
          <span className="text-yellow-500">vitals</span> — beautifully
        </h1> */}
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
          Manage your health, reports & <br /> vitals — beautifully
        </h1>
        <p className="max-w-2xl mx-auto text-gray-600 mb-4">
          Upload your medical reports, get AI-powered explanations, and track your vitals — all in one colorful, easy experience.
        </p>
        <p className="max-w-2xl mx-auto text-pink-700 mb-8 font-medium">
          "HealthMate — Sehat ka smart dost."
        </p>
        <div className="flex justify-center gap-4">
          <Link to={user ? "/dashboard" : "/register"}>
            <button className="bg-gradient-to-r from-pink-500 to-orange-400 text-white px-6 py-3 rounded-full text-lg font-semibold hover:opacity-90 transition cursor-pointer">
              Start free
            </button>
          </Link>
          <Link to={user ? "/dashboard" : "/register"}>
            <button className="border border-pink-400 text-pink-600 px-6 py-3 rounded-full text-lg font-semibold hover:bg-pink-50 transition cursor-pointer">
              View live demo
            </button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-8 bg-white">
        <h2 className="text-3xl font-bold text-center mb-4">Why you'll love HealthMate</h2>
        <p className="max-w-2xl mx-auto text-gray-600 mb-12 text-center">
          Simple, vibrant, and secure — designed for families and caregivers.
        </p>
        <h2 className="text-3xl font-bold text-center mb-8">Why you'll love HealthMate</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            { icon: Upload, title: "One-click uploads", desc: "Upload PDFs or images — instantly accessible.", color: "text-pink-500" },
            { icon: FileText, title: "AI report explain", desc: "Gemini explains your health reports in simple words.", color: "text-orange-500" },
            { icon: Eye, title: "Manual vitals", desc: "Track BP, sugar, and weight — even without reports.", color: "text-yellow-500" },
            { icon: Shield, title: "Timeline view", desc: "View your full health history at a glance.", color: "text-green-500" },
            { icon: Share2, title: "Secure share", desc: "One link for doctors — privacy protected.", color: "text-blue-500" },
            { icon: Lock, title: "Privacy first", desc: "Encrypted storage with full data ownership.", color: "text-purple-500" },
          ].map((item, i) => (
            <div key={i} className="bg-white shadow-md rounded-2xl p-6 flex flex-col items-center text-center border border-gray-100 hover:shadow-lg transition">
              <item.icon className={`w-10 h-10 mb-4 ${item.color}`} />
              <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}