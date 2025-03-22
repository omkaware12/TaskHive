import React from "react";
import { Search, User, Plus, Download } from "lucide-react";
import { FaTasks } from 'react-icons/fa'
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const goToProfile = () => {
    navigate('/profile');
  };

  return (
    <div className="flex h-screen bg-white text-gray-900">
      {/* Sidebar */}
      <aside className="w-60 bg-white text-black flex flex-col px-4 py-6">
        {/* Logo */}
        <div className="flex items-center mb-6">
          <div className="bg-blue-600 p-1.5 rounded-lg mr-2">
            <FaTasks size={18} className="text-white" />
          </div>
          <h1 className="text-xl font-bold">TaskHive</h1>
        </div>

        {/* New Project Button */}
        

        {/* Navigation Links */}
      
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation Bar */}
        <header className="flex items-center justify-between p-4 bg-white shadow-sm">
          {/* Search Bar */}
          <div className="relative w-2/3">
            <input
              type="text"
              placeholder="Search for a project or a component"
              className="w-full border rounded-lg pl-12 pr-4 py-3 text-base focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-4 top-3 text-gray-500" size={22} />
          </div>

          {/* Top Buttons */}
          <div className="flex gap-4">
            <button className="flex items-center gap-2 bg-white text-gray-800 border px-6 py-2 rounded-lg shadow-sm hover:bg-gray-100">
              <Download size={16} /> Import from URL
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg">
              New Project
            </button>
            <button 
              onClick={goToProfile}
              className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 cursor-pointer"
            >
              <User className="text-gray-700" size={24} />
            </button>
          </div>
        </header>

        {/* Content Section */}
        <main className="flex-1 p-6 bg-white">
          {/* Project Section */}
          <h2 className="text-lg font-semibold mb-4">Recent Projects</h2>

          {/* Project Card */}
          
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
