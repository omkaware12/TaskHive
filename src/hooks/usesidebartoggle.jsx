import { useState, useEffect } from 'react';

export const useSidebarToggle = (projectId) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [epicExpanded, setEpicExpanded] = useState(false);
  const [sprintExpanded, setSprintExpanded] = useState(true);
  const [backlogExpanded, setBacklogExpanded] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setEpicExpanded(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    sidebarOpen,
    epicExpanded,
    sprintExpanded,
    backlogExpanded,
    toggleSidebar,
    setSidebarOpen,
    setEpicExpanded,
    setSprintExpanded,
    setBacklogExpanded
  };
};