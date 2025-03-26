import React, { useEffect, useState, useContext } from 'react'
import BackNavbar from "./navbar.jsx"
import ProjectSidebar from "./sidebar"
import EpicSidebar from "./EpicSidebar"
import { useParams } from 'react-router-dom'
import { ProjectContext } from '../contextAPI/projectcontext'
import { Menu, Search, ChevronDown, Plus, MoreHorizontal, Settings } from 'lucide-react'
import IssueManager from "./IssueManager"
import DraggableIssue from "./DraggableIssue"

const Back = () => {
  const { projectId } = useParams();
  const { project } = useContext(ProjectContext);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [epicExpanded, setEpicExpanded] = useState(false);
  const [sprintExpanded, setSprintExpanded] = useState(true);
  const [backlogExpanded, setBacklogExpanded] = useState(true);
  
  // Add missing state variables for issues
  const [issues, setIssues] = useState([]);
  const [isCreatingIssue, setIsCreatingIssue] = useState(false);
  
  // Add state for sprint issues
  const [sprintIssues, setSprintIssues] = useState([]);
  
  // Handle drag start
  const handleDragStart = (e, issue) => {
    e.dataTransfer.setData("issueId", issue.id);
  };
  
  // Handle drag over
  const handleDragOver = (e) => {
    e.preventDefault();
  };
  
  // Handle drop
  const handleDrop = (e, targetArea) => {
    e.preventDefault();
    const issueId = e.dataTransfer.getData("issueId");
    
    if (targetArea === 'sprint') {
      // Find the issue in the backlog
      const issueToMove = issues.find(issue => issue.id === issueId);
      if (issueToMove) {
        // Add to sprint issues
        setSprintIssues([...sprintIssues, issueToMove]);
        // Remove from backlog issues
        setIssues(issues.filter(issue => issue.id !== issueId));
      }
    } else if (targetArea === 'backlog') {
      // Find the issue in the sprint
      const issueToMove = sprintIssues.find(issue => issue.id === issueId);
      if (issueToMove) {
        // Add to backlog issues
        setIssues([...issues, issueToMove]);
        // Remove from sprint issues
        setSprintIssues(sprintIssues.filter(issue => issue.id !== issueId));
      }
    }
  };
  
  // Add missing functions for issue management
  const handleCreateIssue = () => {
    setIsCreatingIssue(true);
  };
  
  const handleIssueCreated = (newIssue) => {
    setIssues([...issues, newIssue]);
    setIsCreatingIssue(false);
  };
  
  const handleCancelIssue = () => {
    setIsCreatingIssue(false);
  };
  
  // Find the current project from context
  const currentProject = project && Array.isArray(project) ? 
    project.find(p => p.id === projectId || p.id?.toString() === projectId) : null;
  
  // Find the current project from context with improved logging
  useEffect(() => {
    console.log("Project context data:", project);
    console.log("Current project ID:", projectId);
    
    if (project && Array.isArray(project)) {
      const found = project.find(p => p.id === projectId || p.id?.toString() === projectId);
      console.log("Found project:", found);
    }
  }, [project, projectId]);
  
  // Improved project name resolution with multiple fallbacks
  const projectName = currentProject?.projectName || 
                     (localStorage.getItem('currentProject') ? 
                      JSON.parse(localStorage.getItem('currentProject'))?.projectName : 
                      `Project ${projectId}`);
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
  
  // Close epic sidebar when resizing to mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setEpicExpanded(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
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
            projectName={projectName} 
            projectType={projectType} 
            key={projectId}
          />
        </div>
        
        {/* Overlay to close sidebar on mobile */}
        {sidebarOpen && (
          <div 
            className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-20"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        
        {/* Epic sidebar */}
        <EpicSidebar isOpen={epicExpanded} onClose={() => setEpicExpanded(false)} />
        
        <div className="flex-1 p-3 md:p-6 overflow-auto bg-gray-50 w-full">
          <div className="max-w-7xl mx-auto">
            {/* Backlog header with breadcrumbs and actions */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
              <div>
                <div className="text-sm text-gray-500 mb-1">
                  <span className="hover:underline cursor-pointer">Projects</span> / 
                  <span className="hover:underline cursor-pointer ml-1">
                    {projectName !== "undefined" && projectName ? projectName : `Project ${projectId}`}
                  </span>
                </div>
                <h1 className="text-xl md:text-2xl font-bold">Backlog</h1>
              </div>
              
              <div className="flex items-center space-x-2 mt-2 md:mt-0 overflow-x-auto pb-2 md:pb-0">
                <button 
                  className="p-2 text-gray-500 hover:bg-gray-100 rounded-md"
                  onClick={() => setEpicExpanded(!epicExpanded)}
                  aria-label="Toggle epic sidebar"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line></svg>
                </button>
                <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-md">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                </button>
                <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-md">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6"></path><path d="M10 14 21 3"></path><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path></svg>
                </button>
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
                  className="pl-9 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div className="flex items-center space-x-2 flex-wrap gap-2 w-full md:w-auto">
                <div className="flex -space-x-2 mr-2">
                  <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white text-sm border-2 border-white">
                    OK
                  </div>
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 text-xs border-2 border-white">
                    <span>+1</span>
                  </div>
                </div>
                
                <button 
                  className="px-3 py-1.5 border border-gray-300 rounded-md bg-white text-sm font-medium flex items-center"
                  onClick={() => setEpicExpanded(!epicExpanded)}
                >
                  Epic <ChevronDown size={16} className="ml-1" />
                </button>
                
                <button className="px-3 py-1.5 border border-gray-300 rounded-md bg-white text-sm font-medium flex items-center">
                  <Settings size={14} className="mr-1" /> View settings
                </button>
              </div>
            </div>
            
            {/* Sprint section */}
            <div className="bg-white rounded-md shadow-sm mb-6 border border-gray-200">
              <div className="flex items-center justify-between p-3 border-b border-gray-200 cursor-pointer" onClick={() => setSprintExpanded(!sprintExpanded)}>
                <div className="flex items-center flex-wrap">
                  <button className="mr-2">
                    {sprintExpanded ? <ChevronDown size={16} /> : <ChevronDown size={16} className="transform -rotate-90" />}
                  </button>
                  <div className="font-medium">SCRUM Sprint 1</div>
                  <div className="text-xs text-gray-500 ml-2 hidden sm:inline">25 Mar - 8 Apr</div>
                  <div className="text-xs text-gray-500 ml-2">({sprintIssues.length} issues)</div>
                </div>
                
                <div className="flex items-center">
                  <div className="flex -space-x-1 mr-2 hidden sm:flex">
                    <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs border-2 border-white">{sprintIssues.length}</div>
                    <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-xs border-2 border-white">0</div>
                  </div>
                  <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 whitespace-nowrap">
                    Complete sprint
                  </button>
                  <button className="ml-2 text-gray-500">
                    <MoreHorizontal size={16} />
                  </button>
                </div>
              </div>
              
              {sprintExpanded && (
                <div 
                  className="min-h-[100px] transition-all duration-200"
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, 'sprint')}
                >
                  {sprintIssues.length === 0 ? (
                    <div className="p-6 text-center text-gray-500 border-2 border-dashed border-gray-300 m-4 rounded-md">
                      <p>Drag issues here to add them to this sprint</p>
                      <div className="mt-2">
                        <button className="flex items-center mx-auto text-blue-600 hover:text-blue-700 font-medium">
                          <Plus size={16} className="mr-1" /> Create issue
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      {sprintIssues.map((issue, index) => (
                        <DraggableIssue 
                          key={index} 
                          issue={issue} 
                          onDragStart={handleDragStart} 
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
            
            {/* Backlog section */}
            <div className="bg-white rounded-md shadow-sm border border-gray-200">
              <div className="flex items-center justify-between p-3 border-b border-gray-200 cursor-pointer" onClick={() => setBacklogExpanded(!backlogExpanded)}>
                <div className="flex items-center">
                  <button className="mr-2">
                    {backlogExpanded ? <ChevronDown size={16} /> : <ChevronDown size={16} className="transform -rotate-90" />}
                  </button>
                  <div className="font-medium">Backlog</div>
                  <div className="text-xs text-gray-500 ml-2">({issues.length} {issues.length === 1 ? 'issue' : 'issues'})</div>
                </div>
                
                <div className="flex items-center">
                  <div className="flex -space-x-1 mr-2 hidden sm:flex">
                    <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs border-2 border-white">{issues.length}</div>
                    <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-xs border-2 border-white">0</div>
                  </div>
                  <button className="px-3 py-1 bg-white border border-gray-300 text-sm rounded-md hover:bg-gray-50 whitespace-nowrap">
                    Create sprint
                  </button>
                  <button className="ml-2 text-gray-500">
                    <MoreHorizontal size={16} />
                  </button>
                </div>
              </div>
              
              {backlogExpanded && (
                <div
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, 'backlog')}
                >
                  {issues.length === 0 && !isCreatingIssue ? (
                    <div className="p-6 text-center text-gray-500">
                      Your backlog is empty.
                      <div className="mt-2">
                        <button 
                          className="flex items-center mx-auto text-blue-600 hover:text-blue-700 font-medium"
                          onClick={handleCreateIssue}
                        >
                          <Plus size={16} className="mr-1" /> Create issue
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      {/* Issue list */}
                      {issues.map((issue, index) => (
                        <DraggableIssue 
                          key={index} 
                          issue={issue} 
                          onDragStart={handleDragStart} 
                        />
                      ))}
                      
                      {/* Create issue input */}
                      {isCreatingIssue && (
                        <div className="border-b border-gray-200 bg-blue-50">
                          <div className="flex items-center p-3">
                            <input type="checkbox" className="mr-3 h-4 w-4 text-blue-600 rounded" disabled />
                            <div className="flex-grow">
                              <input
                                type="text"
                                placeholder="What needs to be done?"
                                className="w-full border-b border-gray-300 bg-transparent py-1 focus:outline-none focus:border-blue-500"
                                autoFocus
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    const newIssue = {
                                      id: `SCRUM-${issues.length + 1}`,
                                      title: e.target.value,
                                      status: 'TO DO',
                                      created: new Date().toISOString(),
                                      projectId: projectId
                                    };
                                    if (e.target.value.trim()) {
                                      handleIssueCreated(newIssue);
                                      e.target.value = '';
                                    }
                                  } else if (e.key === 'Escape') {
                                    handleCancelIssue();
                                  }
                                }}
                              />
                            </div>
                            <div className="ml-2 flex items-center">
                              <button 
                                className="text-gray-500 hover:text-gray-700 mr-2"
                                onClick={handleCancelIssue}
                              >
                                Cancel
                              </button>
                              <button 
                                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                                onClick={(e) => {
                                  const input = e.target.closest('div').previousSibling.querySelector('input');
                                  const newIssue = {
                                    id: `SCRUM-${issues.length + 1}`,
                                    title: input.value,
                                    status: 'TO DO',
                                    created: new Date().toISOString(),
                                    projectId: projectId
                                  };
                                  if (input.value.trim()) {
                                    handleIssueCreated(newIssue);
                                    input.value = '';
                                  }
                                }}
                              >
                                Create
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {/* Create issue button (when issues exist) */}
                      {!isCreatingIssue && (
                        <div className="p-3 border-b border-gray-200 hover:bg-gray-50">
                          <button 
                            className="flex items-center text-blue-600 hover:text-blue-700"
                            onClick={handleCreateIssue}
                          >
                            <Plus size={16} className="mr-1" /> Create issue
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Back;