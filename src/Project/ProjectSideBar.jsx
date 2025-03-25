import React, { useContext, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ProjectContext } from '../contextAPI/projectcontext';

import { 
  Globe, 
  Clock, 
  ListTodo, 
  LayoutGrid, 
  Calendar,
  Code,
  ChevronDown,
  ChevronRight
} from 'lucide-react';

const ProjectSideBar = ({ projectId }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { project } = useContext(ProjectContext);
  const [planningExpanded, setPlanningExpanded] = useState(true);
  const [developmentExpanded, setDevelopmentExpanded] = useState(true);
  
  // Find the current project from context
  const currentProject = project.find(p => p.id === projectId || p.id?.toString() === projectId);
  
  // Function to check if a link is active
  const isActive = (path) => {
    return location.pathname.includes(path);
  };

  // Navigation items - updated to include only the specified items
  const planningItems = [
    { name: 'Summary', icon: <Globe size={20} />, path: `/project/${projectId}/summary` },
    { name: 'Timeline', icon: <Clock size={20} />, path: `/project/${projectId}/timeline` },
    { name: 'Backlog', icon: <ListTodo size={20} />, path: `/project/${projectId}/backlog` },
    { name: 'Board', icon: <LayoutGrid size={20} />, path: `/project/${projectId}/board` },
    { name: 'Calendar', icon: <Calendar size={20} />, path: `/project/${projectId}/calendar` },
  ];

  const developmentItems = [
    { name: 'Code', icon: <Code size={20} />, path: `/project/${projectId}/code` },
  ];

  return (
    <div className="w-60 h-full bg-white border-r border-gray-200 overflow-y-auto pt-0">
      {/* Project Header */}
      <div className="px-4 py-4 border-b border-gray-200">
        <div className="flex items-center">
          <div className="bg-blue-500 text-white p-2 rounded mr-3">
            <span className="text-lg font-bold">{currentProject?.projectName?.charAt(0) || "T"}</span>
          </div>
          <div>
            <h2 className="font-semibold text-gray-800">
              {currentProject?.projectName || "TaskHive"}
            </h2>
            <p className="text-xs text-gray-500">
              {currentProject?.projectType || "Software project"}
            </p>
          </div>
        </div>
      </div>

      {/* Planning Section with collapsible header */}
      <div className="px-3 py-4">
        <div 
          className="flex items-center px-3 mb-2 cursor-pointer"
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
                    navigate(item.path);
                  }}
                  className={`flex items-center px-3 py-2 text-sm rounded-md mb-1 ${
                    isActive(item.path) 
                      ? 'bg-blue-50 text-blue-600' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span className={`mr-3 ${isActive(item.path) ? 'text-blue-600' : 'text-gray-500'}`}>
                    {item.icon}
                  </span>
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Development Section with collapsible header */}
      <div className="px-3 py-2">
        <div 
          className="flex items-center px-3 mb-2 cursor-pointer"
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
                    navigate(item.path);
                  }}
                  className={`flex items-center px-3 py-2 text-sm rounded-md mb-1 ${
                    isActive(item.path) 
                      ? 'bg-blue-50 text-blue-600' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span className={`mr-3 ${isActive(item.path) ? 'text-blue-600' : 'text-gray-500'}`}>
                    {item.icon}
                  </span>
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 py-3 mt-auto border-t border-gray-200 text-xs text-gray-500 text-center">
        You're in a team-managed project
        <div className="mt-1">
          <a href="#" className="text-blue-600 hover:underline">Learn more</a>
        </div>
      </div>
    </div>
  );
};

export default ProjectSideBar;