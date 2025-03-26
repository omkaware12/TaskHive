import React, { useContext, useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { ProjectContext } from '../contextAPI/projectcontext';
import { 
  Globe, 
  Clock, 
  ListTodo, 
  LayoutGrid, 
  Calendar,
  Code,
  ChevronDown,
  ChevronRight,
  X,
  Settings,
  GripVertical
} from 'lucide-react';
import { Link } from 'react-router-dom';

// In the ProjectSideBar component, add onViewChange to props
const ProjectSideBar = ({ projectId, isMobileOpen, onCloseMobile, onViewChange }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { project, getProjects } = useContext(ProjectContext);
  const [planningExpanded, setPlanningExpanded] = useState(true);
  const [developmentExpanded, setDevelopmentExpanded] = useState(true);
  const [currentProjectData, setCurrentProjectData] = useState({
    projectName: `Project ${projectId}`,
    projectType: "Software project"
  });
  
  // For resizable sidebar
  const [width, setWidth] = useState(240); // Default width (60 * 4 = 240px)
  const [isResizing, setIsResizing] = useState(false);
  const sidebarRef = useRef(null);
  const minWidth = 180; // Minimum width
  const maxWidth = 400; // Maximum width
  const [isMobile, setIsMobile] = useState(false);

  // Check if we're on mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
      
      // Reset width to default on mobile
      if (window.innerWidth < 768) {
        setWidth(240);
        if (sidebarRef.current) {
          sidebarRef.current.style.width = '240px';
        }
      }
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Handle mouse down on the resize handle
  const handleMouseDown = (e) => {
    if (isMobile) return; // Disable resizing on mobile
    
    e.preventDefault();
    setIsResizing(true);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  // Handle mouse move while resizing
  const handleMouseMove = (e) => {
    if (!isResizing) return;
    const newWidth = e.clientX;
    
    if (newWidth >= minWidth && newWidth <= maxWidth) {
      setWidth(newWidth);
      if (sidebarRef.current) {
        sidebarRef.current.style.width = `${newWidth}px`;
      }
    }
  };

  // Handle mouse up to stop resizing
  const handleMouseUp = () => {
    setIsResizing(false);
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
    
    // Save the width preference to localStorage
    localStorage.setItem('sidebarWidth', width);
  };

  // Load saved width from localStorage on component mount
  useEffect(() => {
    const savedWidth = localStorage.getItem('sidebarWidth');
    if (savedWidth) {
      setWidth(parseInt(savedWidth));
      if (sidebarRef.current) {
        sidebarRef.current.style.width = `${savedWidth}px`;
      }
    }
  }, []);
  
  // Use effect to fetch project data from multiple sources
  useEffect(() => {
    console.log("Current project ID:", projectId);
    
    // First try to get project from localStorage (set by Dashboard)
    try {
      const storedProject = localStorage.getItem('currentProject');
      if (storedProject) {
        const parsedProject = JSON.parse(storedProject);
        console.log("Found project in localStorage:", parsedProject);
        setCurrentProjectData(parsedProject);
        return; // If we found it in localStorage, we're done
      }
    } catch (error) {
      console.error("Error reading from localStorage:", error);
    }
    
    // If not in localStorage, try to get from location state
    if (location.state?.projectData) {
      console.log("Found project in location state:", location.state.projectData);
      setCurrentProjectData(location.state.projectData);
      return; // If we found it in location state, we're done
    }
    
    // If not in location state, try to get from context
    // Try to get projects if the function exists and array is empty
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
      
      console.log("Found project in context:", foundProject);
      if (foundProject) {
        setCurrentProjectData(foundProject);
      }
    }
  }, [project, projectId, getProjects, location.state]);
  
  // Function to check if a link is active
  const isActive = (path) => {
    return location.pathname.includes(path);
  };

  // Get project path with valid ID
  const getProjectPath = (viewName) => {
    const storedProjectId = localStorage.getItem('currentProjectId');
    const validProjectId = (projectId && projectId !== 'undefined') ? 
                          projectId : 
                          (storedProjectId || '');
    return `/project/${validProjectId}/${viewName}`;
  };

  // Navigation items - moved inside component to access projectId
  const planningItems = [
    { name: 'Summary', icon: <Globe size={20} />, path: getProjectPath('summary') },
    { name: 'Timeline', icon: <Clock size={20} />, path: getProjectPath('timeline') },
    { name: 'Backlog', icon: <ListTodo size={20} />, path: getProjectPath('backlog') },
    { name: 'Board', icon: <LayoutGrid size={20} />, path: getProjectPath('board') },
    { name: 'Calendar', icon: <Calendar size={20} />, path: getProjectPath('calendar') },
  ];

  const developmentItems = [
    { name: 'Code', icon: <Code size={20} />, path: getProjectPath('code') },
  ];

  // Handle navigation and close mobile sidebar if needed
  const handleNavigation = (path, view) => {
    // Get the current project ID from localStorage or from props
    const storedProjectId = localStorage.getItem('currentProjectId');
    const validProjectId = (projectId && projectId !== 'undefined') ? 
                           projectId : 
                           (storedProjectId || '');
    
    // Construct the correct path with the valid project ID
    const pathParts = path.split('/');
    const correctPath = `/project/${validProjectId}/${pathParts[pathParts.length - 1]}`;
    
    console.log("Navigating to:", correctPath);
    
    navigate(correctPath);
    if (onViewChange) {
      onViewChange(view);
    }
    if (onCloseMobile) {
      onCloseMobile();
    }
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-30 z-30 md:hidden"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}
      
      <div 
        ref={sidebarRef}
        style={{ width: isMobile ? '100%' : `${width}px` }}
        className={`h-full bg-white border-r border-gray-200 overflow-y-auto pt-0 
                  md:relative fixed md:translate-x-0 z-40 transition-all duration-300 ease-in-out
                  ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
      >
        {/* Close button for mobile */}
        {isMobileOpen && (
          <button 
            className="absolute top-4 right-4 md:hidden text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
            onClick={onCloseMobile}
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        )}
        
        {/* Project Header */}
        <div className="px-4 py-4 border-b border-gray-200">
          <div className="flex items-center">
            <div className="bg-blue-500 text-white p-2 rounded mr-3 flex-shrink-0">
              <span className={`${isMobile ? 'text-base' : 'text-lg'} font-bold`}>
                {currentProjectData?.projectName?.charAt(0) || projectId?.charAt(0) || "P"}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <h2 className={`font-semibold text-gray-800 truncate ${isMobile ? 'text-sm' : ''}`}>
                {currentProjectData?.projectName || `Project ${projectId}`}
              </h2>
              <p className="text-xs text-gray-500 truncate">
                {currentProjectData?.projectType || "Software project"}
              </p>
            </div>
            <button className="ml-2 p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full flex-shrink-0">
              <Settings size={isMobile ? 14 : 16} />
            </button>
          </div>
        </div>

        {/* Project Details Section */}
        <div className="px-4 py-3 border-b border-gray-200">
          <div className="text-xs text-gray-600">
            <div className="mb-1 flex items-center">
              <span className="font-medium mr-1">Priority: </span>
              <span className={`px-1.5 py-0.5 rounded-full text-xs ${
                currentProjectData?.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                currentProjectData?.priority === 'medium' ? 'bg-blue-100 text-blue-800' :
                currentProjectData?.priority === 'low' ? 'bg-green-100 text-green-800' :
                currentProjectData?.priority === 'urgent' ? 'bg-red-100 text-red-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {currentProjectData?.priority?.charAt(0).toUpperCase() + currentProjectData?.priority?.slice(1) || "Medium"}
              </span>
            </div>
            {currentProjectData?.startDate && (
              <div className="mb-1">
                <span className="font-medium">Start Date: </span>
                {new Date(currentProjectData.startDate).toLocaleDateString()}
              </div>
            )}
            {currentProjectData?.projectDescription && (
              <div className="mt-2">
                <p className="text-xs text-gray-600 line-clamp-2">{currentProjectData.projectDescription}</p>
              </div>
            )}
          </div>
        </div>

        {/* Planning Section with collapsible header */}
        <div className="px-3 py-4">
          <div 
            className="flex items-center px-3 mb-2 cursor-pointer hover:bg-gray-100 rounded-md py-1"
            onClick={() => setPlanningExpanded(!planningExpanded)}
          >
            {planningExpanded ? 
              <ChevronDown size={16} className="text-gray-500 mr-1 transition-transform duration-300" /> : 
              <ChevronRight size={16} className="text-gray-500 mr-1 transition-transform duration-300" />
            }
            <h3 className="text-xs font-semibold text-gray-500">PLANNING</h3>
          </div>
          
          <div className={`overflow-hidden transition-all duration-300 ease-in-out ${planningExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
            <ul>
              {planningItems.map((item) => (
                <li key={item.name}>
                  <a 
                    href={item.path}
                    onClick={(e) => {
                      e.preventDefault();
                      // Extract the view name from the path
                      const viewName = item.path.split('/').pop();
                      handleNavigation(item.path, viewName);
                    }}
                    className={`flex items-center px-3 py-2 text-sm rounded-md mb-1 ${
                      isActive(item.path) 
                        ? 'bg-blue-50 text-blue-600' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span className={`mr-3 flex-shrink-0 ${isActive(item.path) ? 'text-blue-600' : 'text-gray-500'}`}>
                      {item.icon}
                    </span>
                    <span className="truncate">{item.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Development Section with collapsible header */}
        <div className="px-3 py-2">
          <div 
            className="flex items-center px-3 mb-2 cursor-pointer hover:bg-gray-100 rounded-md py-1"
            onClick={() => setDevelopmentExpanded(!developmentExpanded)}
          >
            {developmentExpanded ? 
              <ChevronDown size={16} className="text-gray-500 mr-1 transition-transform duration-300" /> : 
              <ChevronRight size={16} className="text-gray-500 mr-1 transition-transform duration-300" />
            }
            <h3 className="text-xs font-semibold text-gray-500">DEVELOPMENT</h3>
          </div>
          
          <div className={`overflow-hidden transition-all duration-300 ease-in-out ${developmentExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
            <ul>
              {developmentItems.map((item) => (
                <li key={item.name}>
                  <a 
                    href={item.path}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavigation(item.path);
                    }}
                    className={`flex items-center px-3 py-2 text-sm rounded-md mb-1 ${
                      isActive(item.path) 
                        ? 'bg-blue-50 text-blue-600' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span className={`mr-3 flex-shrink-0 ${isActive(item.path) ? 'text-blue-600' : 'text-gray-500'}`}>
                      {item.icon}
                    </span>
                    <span className="truncate">{item.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 py-3 mt-auto border-t border-gray-200 text-xs text-gray-500 text-center">
          <p className="truncate">You're in a team-managed project</p>
          <div className="mt-1">
            <a href="#" className="text-blue-600 hover:underline">Learn more</a>
          </div>
        </div>

        {/* Resize handle - only show on desktop */}
        {!isMobile && (
          <div 
            className="absolute top-0 right-0 w-1 h-full cursor-ew-resize bg-transparent hover:bg-gray-300 transition-colors"
            onMouseDown={handleMouseDown}
            title="Drag to resize"
          >
            <div className="absolute top-1/2 right-0 transform -translate-y-1/2 text-gray-400 pointer-events-none">
              <GripVertical size={16} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

// Remove these lines that are causing the error
// const getProjectPath = (viewName) => { ... }
// const planningItems = [ ... ]
export default ProjectSideBar;