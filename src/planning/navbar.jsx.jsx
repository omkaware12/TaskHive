import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { Search, User, Bell, Settings, ChevronDown, Home, Users, UserPlus, Plus, Menu, X } from 'lucide-react';
import { FaTasks } from 'react-icons/fa';
import { ProjectContext } from '../contextAPI/projectcontext';

const ProjectNavbar = ({ projectId }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { project, getProjects } = useContext(ProjectContext);
  const [currentProjectData, setCurrentProjectData] = useState({
    projectName: "Project Name",
    projectType: "Software project"
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  
  // Use effect to fetch project data from multiple sources
  useEffect(() => {
    // First try to get project from localStorage (set by Dashboard)
    try {
      const storedProject = localStorage.getItem('currentProject');
      if (storedProject) {
        const parsedProject = JSON.parse(storedProject);
        setCurrentProjectData(parsedProject);
        return; // If we found it in localStorage, we're done
      }
    } catch (error) {
      console.error("Error reading from localStorage:", error);
    }
    
    // If not in localStorage, try to get from location state
    if (location.state?.projectData) {
      setCurrentProjectData(location.state.projectData);
      return; // If we found it in location state, we're done
    }
    
    // If not in location state, try to get from context
    if (getProjects && (!project || project.length === 0)) {
      getProjects();
    }
    
    // Find the current project from context or use index as fallback
    if (project && Array.isArray(project)) {
      // First try to find by ID
      let foundProject = project.find(p => p.id === projectId || p.id?.toString() === projectId);
      
      // If not found by ID, try to use the index
      if (!foundProject && !isNaN(parseInt(projectId))) {
        const index = parseInt(projectId);
        if (index >= 0 && index < project.length) {
          foundProject = project[index];
        }
      }
      
      if (foundProject) {
        setCurrentProjectData(foundProject);
      }
    }
  }, [project, projectId, getProjects, location.state]);

  // Close mobile menu when navigating
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <nav className="bg-white border-b border-gray-200 px-3 sm:px-4 py-2 fixed w-full z-50 flex items-center h-14">
      {/* Mobile menu button */}
      <button 
        className="md:hidden mr-2 text-gray-500"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Left side - Logo and primary navigation */}
      <div className="flex items-center">
        <div 
          className="flex items-center mr-4 sm:mr-6 cursor-pointer" 
          onClick={() => navigate('/dashboard')}
        >
          <div className="bg-blue-600 p-1.5 rounded-sm mr-2">
            <FaTasks size={16} className="text-white" />
          </div>
          <span className="text-lg font-semibold">TaskHive</span>
        </div>

        {/* Desktop Navigation */}
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
              <span className="font-medium truncate max-w-[120px]">{currentProjectData.projectName}</span>
              <ChevronDown size={14} className="ml-1 flex-shrink-0" />
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
        
        {/* Create Epic Button - Hide on small screens */}
        <button 
          className="hidden sm:flex bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-sm text-sm font-medium ml-2 sm:ml-4 items-center"
          onClick={() => {/* Add your create epic functionality here */}}
        >
          <Plus size={14} className="mr-1" />
          Create Epic
        </button>
      </div>

      {/* Right side - Search and profile */}
      <div className="flex items-center ml-auto">
        {/* Mobile search toggle */}
        <button 
          className="md:hidden mr-2 text-gray-500"
          onClick={() => setSearchVisible(!searchVisible)}
        >
          <Search size={20} />
        </button>

        {/* Search bar - hidden on mobile unless toggled */}
        <div className={`${searchVisible ? 'flex' : 'hidden'} md:flex relative mr-2 sm:mr-4`}>
          <div className="flex items-center bg-gray-100 hover:bg-gray-200 rounded-md border border-transparent focus-within:bg-white focus-within:border-gray-300">
            <Search className="ml-2 text-gray-500" size={16} />
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent border-none py-1.5 px-2 text-sm focus:outline-none w-40 sm:w-60 md:w-80"
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

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setMobileMenuOpen(false)}>
          <div className="bg-white w-64 h-full overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center">
                <div className="bg-blue-600 p-1.5 rounded-sm mr-2">
                  <FaTasks size={16} className="text-white" />
                </div>
                <span className="text-lg font-semibold">TaskHive</span>
              </div>
            </div>
            <div className="p-4">
              <div className="mb-4">
                <p className="text-xs text-gray-500 mb-2">PROJECT</p>
                <p className="font-medium">{currentProjectData.projectName}</p>
              </div>
              <button 
                onClick={() => navigate('/dashboard')}
                className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md flex items-center mb-2"
              >
                <Home size={16} className="mr-2" />
                <span>Projects</span>
              </button>
              <button 
                className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md flex items-center mb-2"
              >
                <Users size={16} className="mr-2" />
                <span>Teams</span>
              </button>
              <div className="mt-4">
                <p className="text-xs text-gray-500 mb-2">PROJECT NAVIGATION</p>
                <a href="#" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md mb-1">Board</a>
                <a href="#" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md mb-1">Timeline</a>
                <a href="#" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md mb-1">Backlog</a>
                <a href="#" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md mb-1">Reports</a>
              </div>
              <button 
                className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-sm font-medium flex items-center justify-center"
                onClick={() => {/* Add your create epic functionality here */}}
              >
                <Plus size={16} className="mr-1" />
                Create Epic
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default ProjectNavbar;