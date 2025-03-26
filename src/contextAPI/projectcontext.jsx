import React, { createContext, useState, useEffect } from 'react';

export const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  // Initialize with empty array and try to load from localStorage
  const [project, setProject] = useState(() => {
    try {
      const savedProjects = localStorage.getItem('projects');
      return savedProjects ? JSON.parse(savedProjects) : [];
    } catch (error) {
      console.error("Error loading projects from localStorage:", error);
      return [];
    }
  });

  // Save to localStorage whenever project changes   
  useEffect(() => {
    try {
      localStorage.setItem('projects', JSON.stringify(project));
    } catch (error) {
      console.error("Error saving projects to localStorage:", error);
    }
  }, [project]);

  // Add a new project
  const addProject = (newProject) => {
    setProject(prevProjects => [...prevProjects, newProject]);
  };

  // Get all projects (useful for refreshing data)
  const getProjects = () => {
    try {
      const savedProjects = localStorage.getItem('projects');
      if (savedProjects) {
        setProject(JSON.parse(savedProjects));
      }
    } catch (error) {
      console.error("Error getting projects from localStorage:", error);
    }
    return project;
  };

  // Get a specific project by ID
  const getProjectById = (id) => {
    return project.find(p => p.id === id || p.id?.toString() === id);
  };

  return (
    <ProjectContext.Provider value={{ 
      project, 
      addProject, 
      getProjects,
      getProjectById 
    }}>
      {children}
    </ProjectContext.Provider>
  );
};
