import { useAuth } from "../context/AuthContext";

const Profile = () => {
    const { user, logout } = useAuth();

    if (!user) {
        return (
            <div className="flex justify-center items-center min-h-screen text-gray-600 text-lg">
                Loading profile...
            </div>
        );
    }

    const firstLetter = user.name ? user.name.charAt(0).toUpperCase() : "?";

    return (
        <div className="flex justify-center items-center min-h-screen bg-blue-50 px-4">
            <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center">
                {/* Avatar */}
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-r from-pink-500 to-orange-400 flex items-center justify-center text-white text-4xl font-bold">
                    {firstLetter}
                </div>

                {/* User Info */}
                <h2 className="text-2xl font-semibold text-gray-800">{user.name}</h2>
                <p className="text-gray-600 mt-1">{user.email}</p>

                {/* Divider */}
                <div className="border-t my-6"></div>

                {/* Logout Button */}
                <button
                    onClick={logout}
                    className="bg-gradient-to-r from-pink-500 to-orange-400 text-white px-6 py-2 rounded-full text-lg font-semibold hover:opacity-90 transition cursor-pointer"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Profile;
