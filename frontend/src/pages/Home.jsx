import React from "react";
import Dashboard from "./Dashboard/Dashboard";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-500 to-sky-300 flex flex-col items-center justify-center p-10">
      
      {/* 3D Glassmorphic Card */}
      <div className="bg-white/20 backdrop-blur-lg shadow-lg shadow-blue-200 p-8 rounded-3xl w-full max-w-4xl text-center border border-white/40">
        
        {/* Title */}
        <h1 className="text-5xl font-bold text-white drop-shadow-lg">
          Welcome to <span className="text-blue-200">Doct-i</span>
        </h1>
        <p className="text-white/80 mt-4 text-lg">
          Your smart AI-driven doctor consultation platform.
        </p>

        {/* 3D Button */}
        <div className="mt-6">
          <button className="bg-white text-sky-600 px-6 py-3 rounded-full text-lg font-semibold shadow-lg hover:scale-105 transform transition-all duration-300 hover:shadow-xl">
            Get Started
          </button>
        </div>
      </div>

       
      
    </div>
  );
};

export default Home;
