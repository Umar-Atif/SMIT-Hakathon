import React from 'react';

function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-50 to-purple-50 p-6">
      <h1 className="text-5xl font-bold text-gray-800 mb-4 text-center">
        Welcome to HealthMate
      </h1>
      <p className="text-lg text-gray-600 text-center">
        Your one-stop solution for managing health records.
      </p>
    </div>
  );
}

export default Home;
