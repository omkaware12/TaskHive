import React, { useState, useContext } from "react";
import { Search, User, Download, Menu } from "lucide-react";
import { FaTasks } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import NewProjectModal from "./NewProjectModal";
import { ProjectContext } from "../contextAPI/projectcontext";

const Dashboard = () => {
  const navigate = useNavigate();
  const { project, addProject } = useContext(ProjectContext);
  // Add a safety check to ensure project is an array
  const projectList = project || [];
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({
    projectName: "",
    projectDescription: "",
    projectType: "",
    startDate: "",
    priority: "medium"
  });

  const goToProfile = () => {
    navigate("/profile");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleProjectCreate = (newProject) => {
    console.log("Adding project to context:", newProject);
    addProject(newProject); // Store project in context API
    console.log("Project list after adding:", project); // This will help debug
  };

  // Function to get priority color
  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-blue-100 text-blue-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'urgent': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Function to format date
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-white text-gray-900">
      <button 
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow-md"
      >
        <Menu size={24} />
      </button>

      {/* Sidebar */}
      <aside className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 fixed md:static top-0 left-0 h-full z-40 w-60 bg-white text-black flex flex-col px-4 py-6 shadow-md md:shadow-none`}>
        <div className="flex items-center mb-6">
          <div className="bg-blue-600 p-1.5 rounded-lg mr-2">
            <FaTasks size={18} className="text-white" />
          </div>
          <h1 className="text-xl font-bold">TaskHive</h1>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col relative w-full">
        {/* Top Navigation Bar */}
        <header className="flex flex-col md:flex-row items-center justify-between p-4 bg-white shadow-sm gap-4">
          <div className="relative w-full md:w-2/3">
            <input
              type="text"
              placeholder="Search for a project or a component"
              className="w-full border rounded-lg pl-12 pr-4 py-3 text-base focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-4 top-3 text-gray-500" size={22} />
          </div>

          <div className="flex gap-2 md:gap-4 w-full md:w-auto justify-between md:justify-end">
            <button className="flex items-center gap-1 md:gap-2 bg-white text-gray-800 border px-3 md:px-6 py-2 rounded-lg shadow-sm hover:bg-gray-100 text-sm md:text-base">
              <Download size={16} /> <span className="hidden sm:inline">Import from URL</span>
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 md:px-6 py-2 rounded-lg text-sm md:text-base"
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
        <main className="flex-1 p-4 md:p-6 bg-white overflow-auto">
          <h2 className="text-lg font-semibold mb-4">Recent Projects</h2>
          
          {projectList.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              <p>No projects yet. Create your first project!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {projectList.map((proj, index) => (
                <div 
                  key={index} 
                  className="border border-pink-100 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-gradient-to-br from-white to-pink-50 cursor-pointer"
                  onClick={() => navigate(`/project/${proj.id || index}/backlog`)}
                >
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-lg truncate">{proj.projectName}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(proj.priority)}`}>
                        {proj.priority.charAt(0).toUpperCase() + proj.priority.slice(1)}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{proj.projectDescription}</p>
                    
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{proj.projectType}</span>
                      <span>Start: {formatDate(proj.startDate)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>

        {/* New Project Modal Component */}
        <NewProjectModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          formData={formData}
          setFormData={setFormData}
          onProjectCreate={handleProjectCreate}
        />
      </div>
    </div>
  );
};

export default Dashboard;
