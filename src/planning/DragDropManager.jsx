// This file contains functions for handling drag and drop operations

export const handleDragStart = (e, issue, sprintIssues) => {
  e.dataTransfer.setData("issueId", issue.id);
  e.dataTransfer.setData("sourceArea", issue.area || (sprintIssues.some(i => i.id === issue.id) ? 'sprint' : 'backlog'));
  
  // Add visual feedback for dragging
  e.currentTarget.classList.add('opacity-50');
  setTimeout(() => {
    e.currentTarget.classList.add('dragging');
  }, 0);
};

export const handleDragEnd = (e) => {
  e.currentTarget.classList.remove('opacity-50', 'dragging');
};

export const handleDragOver = (e) => {
  e.preventDefault();
  // Add visual indication of drop target
  e.currentTarget.classList.add('bg-blue-50');
};

export const handleDragLeave = (e) => {
  e.currentTarget.classList.remove('bg-blue-50');
};

export const handleDrop = (e, targetArea, epicName, issues, setIssues, sprintIssues, setSprintIssues) => {
  e.preventDefault();
  e.currentTarget.classList.remove('bg-blue-50');
  
  const issueId = e.dataTransfer.getData("issueId");
  const sourceArea = e.dataTransfer.getData("sourceArea");
  
  // If source and target are the same and no epic name, do nothing
  if (sourceArea === targetArea && !epicName) return;
  
  if (targetArea === 'sprint') {
    // Find the issue in the backlog
    const issueToMove = issues.find(issue => issue.id === issueId);
    if (issueToMove) {
      // Add area property to track where the issue belongs
      const issueWithArea = { 
        ...issueToMove, 
        area: 'sprint',
        // If epic name is provided, add it to the issue
        ...(epicName && { epicName })
      };
      
      // Add to sprint issues
      setSprintIssues([...sprintIssues, issueWithArea]);
      // Remove from backlog issues
      setIssues(issues.filter(issue => issue.id !== issueId));
    }
  } else if (targetArea === 'backlog') {
    // Find the issue in the sprint
    const issueToMove = sprintIssues.find(issue => issue.id === issueId);
    if (issueToMove) {
      // Add area property to track where the issue belongs
      const issueWithArea = { 
        ...issueToMove, 
        area: 'backlog',
        // If epic name is provided, add it to the issue
        ...(epicName && { epicName })
      };
      
      // Add to backlog issues
      setIssues([...issues, issueWithArea]);
      // Remove from sprint issues
      setSprintIssues(sprintIssues.filter(issue => issue.id !== issueId));
    }
  } else if (targetArea === 'epic' && epicName) {
    // Handle dropping on an epic
    if (sourceArea === 'sprint') {
      // Update the issue in sprint issues
      setSprintIssues(sprintIssues.map(issue => 
        issue.id === issueId ? { ...issue, epicName } : issue
      ));
    } else {
      // Update the issue in backlog issues
      setIssues(issues.map(issue => 
        issue.id === issueId ? { ...issue, epicName } : issue
      ));
    }
  }
};