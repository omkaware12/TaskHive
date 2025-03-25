import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ProjectContext } from '../contextAPI/projectcontext';
import { ArrowLeft } from 'lucide-react';
import ProjectNavbar from "./ProjectNavbar";
import ProjectSidebar from "./ProjectSideBar";

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { project } = useContext(ProjectContext);
  const [currentProject, setCurrentProject] = useState(null);

  useEffect(() => {
    const foundProject = project.find((p, index) => (p.id || index.toString()) === id);
    
    if (foundProject) {
      setCurrentProject(foundProject);
    } else {
      // If project not found, redirect back to dashboard
      navigate('/dashboard');
    }
  }, [id, project, navigate]);

  if (!currentProject) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'Not set';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Get priority color
  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-blue-100 text-blue-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'urgent': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ProjectNavbar projectName={currentProject.projectName} />
      
      <div className="flex h-screen pt-16">
        {/* Sidebar */}
        <ProjectSidebar projectId={id} />
        
        {/* Main Content */}
        <div className="flex-1 overflow-auto p-6">
          {/* Back button */}
          <div className="mb-6">
            <button 
              onClick={() => navigate('/dashboard')}
              className="flex items-center text-gray-600 hover:text-blue-600"
            >
              <ArrowLeft size={18} className="mr-2" />
              Back to Dashboard
            </button>
          </div>

          {/* Project header */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-800 mb-2 md:mb-0">
                {currentProject.projectName}
              </h1>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(currentProject.priority)}`}>
                {currentProject.priority.charAt(0).toUpperCase() + currentProject.priority.slice(1)} Priority
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-8 mb-6">
              <div>
                <p className="text-sm text-gray-500 mb-1">Project Type</p>
                <p className="font-medium">{currentProject.projectType || 'Not specified'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Start Date</p>
                <p className="font-medium">{formatDate(currentProject.startDate)}</p>
              </div>
            </div>
            
            <div>
              <h2 className="text-base font-semibold mb-2">Description</h2>
              <p className="text-gray-700">
                {currentProject.projectDescription || 'No description provided.'}
              </p>
            </div>
          </div>
          
          {/* Project details section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-6">Project Details</h2>
            
            <div className="border-t border-gray-200 pt-4">
              <p className="text-gray-500 text-center py-8">
                Additional project details will be displayed here.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;