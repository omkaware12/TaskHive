import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, User, Bell, Settings, ChevronDown, Home, Users, UserPlus, Plus } from 'lucide-react';
import { FaTasks } from 'react-icons/fa';

const ProjectNavbar = ({ projectName = "Project Name" }) => {
  const navigate = useNavigate();

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-2 fixed w-full z-50 flex items-center h-14">
      {/* Left side - Logo and primary navigation */}
      <div className="flex items-center">
        <div 
          className="flex items-center mr-6 cursor-pointer" 
          onClick={() => navigate('/dashboard')}
        >
          <div className="bg-blue-600 p-1.5 rounded-sm mr-2">
            <FaTasks size={16} className="text-white" />
          </div>
          <span className="text-lg font-semibold">TaskHive</span>
        </div>

        <div className="hidden md:flex items-center space-x-1">
          <button 
            onClick={() => navigate('/dashboard')}
            className="px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded-sm flex items-center"
          >
            <Home size={14} className="mr-1" />
            <span className="font-medium">Projects</span>
          </button>
          
          {/* Team dropdown */}
          <div className="relative group">
            <button className="px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded-sm flex items-center">
              <Users size={14} className="mr-1" />
              <span className="font-medium">Teams</span>
              <ChevronDown size={14} className="ml-1" />
            </button>
            
            {/* Team dropdown menu */}
            <div className="absolute left-0 mt-1 w-48 bg-white rounded-md shadow-lg hidden group-hover:block z-50">
              <div className="py-1">
                <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <div className="flex items-center">
                    <UserPlus size={14} className="mr-2" />
                    Invite people to TaskHive
                  </div>
                </button>
                <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <div className="flex items-center">
                    <Users size={14} className="mr-2" />
                    Create a team
                  </div>
                </button>
              </div>
            </div>
          </div>
          
          {/* Project dropdown */}
          <div className="relative group">
            <button className="px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded-sm flex items-center">
              <span className="font-medium">{projectName}</span>
              <ChevronDown size={14} className="ml-1" />
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
        
        {/* Create Epic Button */}
        <button 
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-sm text-sm font-medium ml-4 flex items-center"
          onClick={() => {/* Add your create epic functionality here */}}
        >
          <Plus size={14} className="mr-1" />
          Create Epic
        </button>
      </div>

      {/* Right side - Search and profile */}
      <div className="flex items-center ml-auto">
        {/* Search bar - styled like the image */}
        <div className="relative mr-4">
          <div className="flex items-center bg-gray-100 hover:bg-gray-200 rounded-md border border-transparent focus-within:bg-white focus-within:border-gray-300">
            <Search className="ml-2 text-gray-500" size={16} />
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent border-none py-1.5 px-2 text-sm focus:outline-none w-80"
            />
          </div>
        </div>
        
        {/* User profile */}
        <button 
          onClick={() => navigate('/profile')}
          className="p-1.5 bg-gray-200 rounded-full hover:bg-gray-300"
        >
          <User size={18} className="text-gray-700" />
        </button>
      </div>
    </nav>
  );
};

export default ProjectNavbar;