import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, User, Bell, Settings, ChevronDown, Home, Users, UserPlus } from 'lucide-react';
import { FaTasks } from 'react-icons/fa';

const ProjectNavbar = ({ projectName = "Project Name" }) => {
  const navigate = useNavigate();

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-2.5 fixed w-full z-50">
      <div className="flex flex-wrap items-center">
        {/* Left side - Logo and project navigation */}
        <div className="flex items-center mr-4">
          <div 
            className="flex items-center mr-6 cursor-pointer" 
            onClick={() => navigate('/dashboard')}
          >
            <div className="bg-blue-600 p-1.5 rounded-lg mr-2">
              <FaTasks size={18} className="text-white" />
            </div>
            <span className="text-xl font-bold">TaskHive</span>
          </div>

          <div className="hidden md:flex items-center space-x-1">
            <button 
              onClick={() => navigate('/dashboard')}
              className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md flex items-center"
            >
              <Home size={16} className="mr-1" />
              Projects
            </button>
            
            {/* Team dropdown */}
            <div className="relative group">
              <button className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md flex items-center">
                <Users size={16} className="mr-1" />
                <span className="font-medium">Teams</span>
                <ChevronDown size={16} className="ml-1" />
              </button>
              
              {/* Team dropdown menu */}
              <div className="absolute left-0 mt-1 w-48 bg-white rounded-md shadow-lg hidden group-hover:block z-50">
                <div className="py-1">
                  <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <div className="flex items-center">
                      <UserPlus size={16} className="mr-2" />
                      Invite people to TaskHive
                    </div>
                  </button>
                  <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <div className="flex items-center">
                      <Users size={16} className="mr-2" />
                      Create a team
                    </div>
                  </button>
                </div>
              </div>
            </div>
            
            <div className="relative group">
              <button className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md flex items-center">
                <span className="font-medium">{projectName}</span>
                <ChevronDown size={16} className="ml-1" />
              </button>
              
              {/* Dropdown for project navigation */}
              <div className="absolute left-0 mt-1 w-48 bg-white rounded-md shadow-lg hidden group-hover:block">
                <div className="py-1">
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Board</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Timeline</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Backlog</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Reports</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search bar - moved to the left */}
        <div className="relative flex-grow max-w-xl hidden sm:block">
          <input
            type="text"
            placeholder="Search"
            className="border border-gray-300 rounded-md pl-8 pr-4 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          />
          <Search className="absolute left-2.5 top-2 text-gray-500" size={16} />
        </div>
        
        {/* User profile - pushed to the right */}
        <div className="ml-auto">
          <button 
            onClick={() => navigate('/profile')}
            className="p-1.5 bg-gray-200 rounded-full hover:bg-gray-300"
          >
            <User size={20} className="text-gray-700" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default ProjectNavbar;