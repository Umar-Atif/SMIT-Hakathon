import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="bg-gradient-to-r from-pink-50 to-orange-50 py-8 px-6 md:px-16 rounded-t-3xl">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-10">

                {/* Left Section - CTA */}
                <div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-3 text-gray-900">
                        Start managing your health smarter
                    </h2>
                    <p className="text-gray-600 mb-6 max-w-md">
                        All your reports, vitals, and AI insights — one place, one click.
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <Link to="/register">
                            <button className="bg-gradient-to-r from-pink-500 to-orange-400 text-white px-6 py-3 rounded-full text-base font-semibold hover:opacity-90 transition cursor-pointer">
                                Create free account
                            </button>
                        </Link>
                        <a href="#"><button className="border border-pink-400 text-pink-600 px-6 py-3 rounded-full text-base font-semibold hover:bg-pink-50 transition cursor-pointer">
                            Talk to us
                        </button></a>
                    </div>
                </div>

                {/* Right Section - What You Get */}
                <div className="bg-white border border-pink-100 shadow-sm rounded-2xl p-6 md:p-8">
                    <h3 className="text-lg font-semibold text-pink-600 mb-4 flex items-center gap-2">
                        <span className="bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-sm font-medium">What you get</span>
                    </h3>
                    <ul className="list-disc ml-5 space-y-3 text-gray-700 text-sm md:text-base">
                        <li>Unlimited uploads during hackathon</li>
                        <li>Bilingual summaries (EN + Roman Urdu)</li>
                        <li>Manual vitals tracker</li>
                        <li>Secure sharing for doctors</li>
                    </ul>
                </div>
            </div>
            <div className="mt-12 pt-6 border-t border-pink-200 text-center text-sm text-gray-500">
                © {new Date().getFullYear()} <span className="font-semibold text-pink-600">HealthMate</span>. All rights reserved.
            </div>
        </footer>
    );
}
