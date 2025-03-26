import React, { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ProjectContext } from '../contextAPI/projectcontext';
import BackNavbar from '../planning/navbar.jsx';
import ProjectSidebar from '../planning/sidebar';
import { Menu, Plus, Search, MoreHorizontal, Settings, ChevronDown, Check } from 'lucide-react';

const Board = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { project } = useContext(ProjectContext);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [validProjectId, setValidProjectId] = useState(projectId);
  
  // Board state
  const [columns, setColumns] = useState([
    { id: 'todo', title: 'TO DO', items: [] },
    { id: 'inprogress', title: 'IN PROGRESS', items: [] },
    { id: 'done', title: 'DONE', items: [] }
  ]);
  
  // Check for valid project ID on mount
  useEffect(() => {
    // If projectId is undefined, try to get it from localStorage
    if (projectId === 'undefined' || !projectId) {
      const storedProjectId = localStorage.getItem('currentProjectId');
      const storedProject = localStorage.getItem('currentProject');
      
      if (storedProjectId) {
        setValidProjectId(storedProjectId);
        // Redirect to the correct URL
        navigate(`/project/${storedProjectId}/board`, { replace: true });
      } else if (storedProject) {
        try {
          const parsedProject = JSON.parse(storedProject);
          if (parsedProject.id) {
            setValidProjectId(parsedProject.id);
            // Redirect to the correct URL
            navigate(`/project/${parsedProject.id}/board`, { replace: true });
          }
        } catch (error) {
          console.error("Error parsing stored project:", error);
        }
      }
    }
  }, [projectId, navigate]);
  
  // Find the current project from context
  const currentProject = project && Array.isArray(project) ? 
    project.find(p => p.id === validProjectId || p.id?.toString() === validProjectId) : null;
  
  const projectName = currentProject?.projectName || `Project ${validProjectId}`;
  const projectType = currentProject?.projectType || "Software project";
  
  // Toggle sidebar on small screens
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  // Close sidebar on small screens when clicking outside
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };
    
    // Set initial state based on screen size
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Navigate to backlog
  const goToBacklog = () => {
    navigate(`/project/${projectId}/backlog`);
  };

  // Add a new column
  const addColumn = () => {
    const newColumn = {
      id: `column-${Date.now()}`,
      title: 'NEW COLUMN',
      items: []
    };
    setColumns([...columns, newColumn]);
  };

  return (
    <div className="flex flex-col h-screen">
      <BackNavbar projectName={projectName} />
      
      <div className="flex flex-1 pt-14 relative">
        {/* Mobile sidebar toggle button */}
        <button 
          className="md:hidden fixed top-16 left-4 z-40 p-2 rounded-md bg-white shadow-md"
          onClick={toggleSidebar}
          aria-label="Toggle project sidebar"
        >
          <Menu size={20} />
        </button>
        
        {/* Sidebar with responsive classes */}
        <div className={`
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:translate-x-0 transform transition-transform duration-300 ease-in-out
          fixed md:static z-30 h-[calc(100vh-56px)] md:h-auto
        `}>
          <ProjectSidebar 
            projectId={projectId} 
            isMobileOpen={sidebarOpen}
            onCloseMobile={() => setSidebarOpen(false)}
          />
        </div>
        
        {/* Overlay to close sidebar on mobile */}
        {sidebarOpen && (
          <div 
            className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-20"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        
        {/* Board content */}
        <div className="flex-1 p-3 md:p-6 overflow-auto bg-gray-50 w-full">
          <div className="max-w-7xl mx-auto">
            {/* Board header with breadcrumbs and actions */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
              <div>
                <div className="text-sm text-gray-500 mb-1">
                  <span className="hover:underline cursor-pointer">Projects</span> / 
                  <span className="hover:underline cursor-pointer ml-1">{projectName}</span>
                </div>
                <h1 className="text-xl md:text-2xl font-bold">SCRUM board</h1>
              </div>
              
              <div className="flex items-center space-x-2 mt-2 md:mt-0">
                <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-md">
                  <MoreHorizontal size={20} />
                </button>
              </div>
            </div>
            
            {/* Search and filters */}
            <div className="flex flex-col md:flex-row items-start md:items-center mb-6 gap-2">
              <div className="relative flex-grow max-w-md w-full">
                <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
                <input 
                  type="text" 
                  placeholder="Search" 
                  className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div className="flex items-center space-x-2 flex-wrap gap-2 w-full md:w-auto">
                <div className="flex -space-x-2 mr-2">
                  <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white text-sm border-2 border-white">
                    OK
                  </div>
                </div>
                
                <div className="flex items-center">
                  <span className="text-sm text-gray-600 mr-2">GROUP BY</span>
                  <button className="px-3 py-1.5 border border-gray-300 rounded-md bg-white text-sm font-medium flex items-center">
                    None <ChevronDown size={16} className="ml-1" />
                  </button>
                </div>
                
                <button className="px-3 py-1.5 border border-gray-300 rounded-md bg-white text-sm font-medium flex items-center">
                  <Settings size={14} className="mr-1" /> View settings
                </button>
              </div>
            </div>
            
            {/* Board columns */}
            <div className="flex space-x-4 overflow-x-auto pb-4">
              {columns.map((column) => (
                <div 
                  key={column.id} 
                  className="flex-shrink-0 w-72 bg-gray-100 rounded-md"
                >
                  <div className="p-2 font-medium text-sm flex items-center justify-between border-b border-gray-200">
                    <div className="flex items-center">
                      {column.id === 'done' && <Check size={16} className="mr-1 text-green-500" />}
                      {column.title}
                    </div>
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreHorizontal size={16} />
                    </button>
                  </div>
                  
                  <div className="p-2 min-h-[200px]">
                    {column.id === 'todo' && column.items.length === 0 && (
                      <div className="bg-white p-4 rounded-md shadow-sm text-center">
                        <div className="mb-2">
                          <img 
                            src="https://wac-cdn.atlassian.com/dam/jcr:23a10eac-abf8-4f84-9d97-d902e333a214/empty-state-board.svg?cdnVersion=1195" 
                            alt="Get started" 
                            className="w-24 h-24 mx-auto"
                          />
                        </div>
                        <h3 className="font-medium text-sm mb-1">Get started in the backlog</h3>
                        <p className="text-xs text-gray-500 mb-3">Plan and start a sprint to see issues here.</p>
                        <button 
                          onClick={goToBacklog}
                          className="bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs py-1 px-3 rounded-md"
                        >
                          Go to Backlog
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {/* Add column button */}
              <div className="flex-shrink-0 w-10 flex items-center justify-center">
                <button 
                  onClick={addColumn}
                  className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                  aria-label="Add column"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Board;