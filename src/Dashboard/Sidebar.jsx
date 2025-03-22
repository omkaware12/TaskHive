import React from "react";
import { FaTasks } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";

const Sidebar = ({ activePage }) => {
  const navigate = useNavigate();

  return (
    <aside className="w-60 bg-white border-r border-gray-200 flex flex-col px-4 py-6">
      <div className="flex items-center mb-8">
        <div className="bg-blue-600 p-1.5 rounded-lg mr-2">
          <FaTasks size={18} className="text-white" />
        </div>
        <h1 className="text-xl font-bold">TaskHive</h1>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col gap-1 text-sm">
        <button 
          className={`text-left px-3 py-2 rounded ${activePage === 'account' ? 'bg-gray-100 font-medium' : 'hover:bg-gray-100'}`}
          onClick={() => navigate('/profile')}
        >
          Account
        </button>
        <button 
          className={`text-left px-3 py-2 rounded ${activePage === 'manage-plan' ? 'bg-gray-100 font-medium' : 'hover:bg-gray-100'}`}
          onClick={() => navigate('/manage-plan')}
        >
          Manage Plan
        </button>
      </nav>

      <div className="mt-auto">
        <button 
          onClick={() => navigate('/dashboard')}
          className="text-sm text-gray-600 hover:text-blue-600"
        >
          Go to Dashboard
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;