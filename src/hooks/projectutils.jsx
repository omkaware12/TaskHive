import { useState, useEffect } from 'react';

export const useProjectUtils = (project, projectId) => {
  const [currentProject, setCurrentProject] = useState(null);

  useEffect(() => {
    console.log("Project context data:", project);
    console.log("Current project ID:", projectId);
    
    if (project && Array.isArray(project)) {
      const found = project.find(p => p.id === projectId || p.id?.toString() === projectId);
      console.log("Found project:", found);
      setCurrentProject(found);
    }
  }, [project, projectId]);

  const projectName = currentProject?.projectName || 
                     (localStorage.getItem('currentProject') ? 
                      JSON.parse(localStorage.getItem('currentProject'))?.projectName : 
                      `Project ${projectId}`);
  const projectType = currentProject?.projectType || "Software project";

  return {
    currentProject,
    projectName,
    projectType
  };
};