import React, { useEffect, useState, useContext } from 'react'
import BackNavbar from "./navbar.jsx"
import ProjectSidebar from "./sidebar"
import { useParams } from 'react-router-dom'
import { ProjectContext } from '../contextAPI/projectcontext'

const Back = () => {
  const { projectId } = useParams();
  const { project } = useContext(ProjectContext);
  
  // Find the current project from context
  const currentProject = project && Array.isArray(project) ? 
    project.find(p => p.id === projectId || p.id?.toString() === projectId) : null;
  
  const projectName = currentProject?.projectName || `Project ${projectId}`;
  const projectType = currentProject?.projectType || "Software project";
  
  return (
    <div className="flex flex-col h-screen">
      <BackNavbar projectName={projectName} />
      
      <div className="flex flex-1 pt-14">
        <ProjectSidebar 
          projectId={projectId} 
          projectName={projectName} 
          projectType={projectType} 
          key={projectId}
        />
        
        <div className="flex-1 p-6 overflow-auto bg-gray-50">
          {/* Backlog content will go here */}
          <h1 className="text-2xl font-bold mb-4">Backlog</h1>
          <p>Your backlog items will appear here.</p>
        </div>
      </div>
    </div>
  )
}

export default Back