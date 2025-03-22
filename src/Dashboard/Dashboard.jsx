import React, { useState } from "react";
import { Search, User, Download } from "lucide-react";
import { FaTasks } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const goToProfile = () => {
    navigate("/profile");
  };

  return (
    <div className="flex h-screen bg-white text-gray-900">
      {/* Sidebar */}
      <aside className="w-60 bg-white text-black flex flex-col px-4 py-6">
        <div className="flex items-center mb-6">
          <div className="bg-blue-600 p-1.5 rounded-lg mr-2">
            <FaTasks size={18} className="text-white" />
          </div>
          <h1 className="text-xl font-bold">TaskHive</h1>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col relative">
        {/* Top Navigation Bar */}
        <header className="flex items-center justify-between p-4 bg-white shadow-sm">
          <div className="relative w-2/3">
            <input
              type="text"
              placeholder="Search for a project or a component"
              className="w-full border rounded-lg pl-12 pr-4 py-3 text-base focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-4 top-3 text-gray-500" size={22} />
          </div>

          <div className="flex gap-4">
            <button className="flex items-center gap-2 bg-white text-gray-800 border px-6 py-2 rounded-lg shadow-sm hover:bg-gray-100">
              <Download size={16} /> Import from URL
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
            >
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
          <h2 className="text-lg font-semibold mb-4">Recent Projects</h2>
        </main>

        {/* Modal - New Project */}
        {isModalOpen && (
          <div className="fixed inset-0 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-xl w-[400px] border border-gray-200">
              <h2 className="text-2xl font-semibold mb-6 text-center">Create New Project</h2>

              {/* Form */}
              <form>
                <div className="mb-5">
                  <label className="block text-sm font-medium text-gray-700">
                    Project Name
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
                    placeholder="Enter project name"
                  />
                </div>

                <div className="mb-5">
                  <label className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
                    placeholder="Brief description"
                    rows="3"
                  ></textarea>
                </div>

                <div className="mb-5">
                  <label className="block text-sm font-medium text-gray-700">
                    Deadline
                  </label>
                  <input
                    type="date"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700">
                    Category
                  </label>
                  <select className="w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-300">
                    <option>Development</option>
                    <option>Design</option>
                    <option>Marketing</option>
                  </select>
                </div>

                {/* Buttons */}
                <div className="flex justify-between">
                  <button
                    type="button"
                    className="px-5 py-3 bg-gray-400 text-white rounded-md hover:bg-gray-500"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Create
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
