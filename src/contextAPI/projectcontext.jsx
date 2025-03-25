import { createContext, useState } from "react";

export const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [project, setProjects] = useState([]);

  const addProject = (newProject) => {
    console.log("Context received project:", newProject);
    setProjects(prevProjects => [newProject, ...prevProjects]);
  };

  return (
    <ProjectContext.Provider value={{ project, addProject }}>
      {children}
    </ProjectContext.Provider>
  );
};
