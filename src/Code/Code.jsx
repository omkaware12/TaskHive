import React, { useState, useEffect, useContext } from "react";
import { useParams } from 'react-router-dom';
import BackNavbar from "../planning/navbar.jsx";
import ProjectSidebar from "../planning/sidebar";
import { ProjectContext } from '../contextAPI/projectcontext';
import { Menu } from 'lucide-react';

const Code = () => {
  const { projectId } = useParams();
  const { project } = useContext(ProjectContext);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [username, setUsername] = useState("");
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState("");

  // Find the current project from context
  const currentProject = project && Array.isArray(project) ? 
    project.find(p => p.id === projectId || p.id?.toString() === projectId) : null;
  
  // Project name resolution with fallbacks
  const projectName = currentProject?.projectName || 
                     (localStorage.getItem('currentProject') ? 
                      JSON.parse(localStorage.getItem('currentProject'))?.projectName : 
                      `Project ${projectId}`);

  // Toggle sidebar on small screens
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  // Handle responsive sidebar
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

  const fetchGitHubRepos = async () => {
    if (!username) {
      setError("Please enter a GitHub username.");
      return;
    }

    setError("");
    const url = `https://api.github.com/users/${username}/repos`;

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("User not found");
      const data = await response.json();
      setRepos(data);
    } catch (err) {
      setRepos([]);
      setError(err.message);
    }
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
        
        {/* Main content */}
        <div className="flex-1 p-3 md:p-6 overflow-auto bg-gray-50 w-full">
          <div className="max-w-7xl mx-auto">
            {/* Page header with breadcrumbs */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
              <div>
                <div className="text-sm text-gray-500 mb-1">
                  <span className="hover:underline cursor-pointer">Projects</span> / 
                  <span className="hover:underline cursor-pointer ml-1">{projectName}</span>
                </div>
                <h1 className="text-xl md:text-2xl font-bold">Code</h1>
              </div>
            </div>
            
            {/* GitHub Repo Finder */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">GitHub Repo </h2>
              <div className="flex flex-col md:flex-row gap-2 mb-4">
                <input
                  type="text"
                  placeholder="Enter GitHub Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="border p-2 flex-grow rounded"
                />
                <button
                  onClick={fetchGitHubRepos}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Search
                </button>
              </div>

              {error && <p className="text-red-500 mb-4">{error}</p>}

              <div className="mt-4">
                {repos.length > 0 ? (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Repositories for {username}</h3>
                    <ul className="divide-y divide-gray-200">
                      {repos.map((repo) => (
                        <li key={repo.id} className="py-3">
                          <div className="flex flex-col">
                            <a
                              href={repo.html_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline font-medium"
                            >
                              {repo.name}
                            </a>
                            <p className="text-sm text-gray-600 mt-1">
                              {repo.description || "No description available"}
                            </p>
                            <div className="flex items-center mt-2 text-xs text-gray-500">
                              <span className="mr-3">⭐ {repo.stargazers_count}</span>
                              <span className="mr-3">🍴 {repo.forks_count}</span>
                              <span>{repo.language}</span>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  !error && username && <p>No repositories found.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Code;
