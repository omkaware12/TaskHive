import { useState } from 'react';

export const useIssueManagement = (projectId) => {
  const [issues, setIssues] = useState([]);
  const [sprintIssues, setSprintIssues] = useState([]);
  const [isCreatingIssue, setIsCreatingIssue] = useState(false);
  const [isCreatingSprintStory, setIsCreatingSprintStory] = useState(false);

  const handleCreateIssue = () => {
    setIsCreatingIssue(true);
  };

  const handleIssueCreated = (newIssue) => {
    setIssues([...issues, newIssue]);
    setIsCreatingIssue(false);
  };

  const handleCancelIssue = () => {
    setIsCreatingIssue(false);
  };

  const handleCreateSprintStory = () => {
    setIsCreatingSprintStory(true);
  };

  const handleSprintStoryCreated = (newStory) => {
    setSprintIssues([...sprintIssues, newStory]);
    setIsCreatingSprintStory(false);
  };

  const handleCancelSprintStory = () => {
    setIsCreatingSprintStory(false);
  };

  const handleDragStart = (e, issue) => {
    e.dataTransfer.setData("issueId", issue.id);
    e.dataTransfer.setData("sourceArea", issue.area || (sprintIssues.some(i => i.id === issue.id) ? 'sprint' : 'backlog'));
    
    // Add visual feedback for dragging
    e.currentTarget.classList.add('opacity-50');
    setTimeout(() => {
      e.currentTarget.classList.add('dragging');
    }, 0);
  };

  const handleDragEnd = (e) => {
    e.currentTarget.classList.remove('opacity-50', 'dragging');
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    // Add visual indication of drop target
    e.currentTarget.classList.add('bg-blue-50');
  };

  const handleDragLeave = (e) => {
    e.currentTarget.classList.remove('bg-blue-50');
  };

  const handleDrop = (e, targetArea) => {
    e.preventDefault();
    e.currentTarget.classList.remove('bg-blue-50');
    
    const issueId = e.dataTransfer.getData("issueId");
    const sourceArea = e.dataTransfer.getData("sourceArea");
    
    // If source and target are the same, do nothing
    if (sourceArea === targetArea) return;
    
    if (targetArea === 'sprint') {
      // Find the issue in the backlog
      const issueToMove = issues.find(issue => issue.id === issueId);
      if (issueToMove) {
        // Add area property to track where the issue belongs
        const issueWithArea = { ...issueToMove, area: 'sprint' };
        
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
        const issueWithArea = { ...issueToMove, area: 'backlog' };
        
        // Add to backlog issues
        setIssues([...issues, issueWithArea]);
        // Remove from sprint issues
        setSprintIssues(sprintIssues.filter(issue => issue.id !== issueId));
      }
    }
  };

  return {
    issues,
    sprintIssues,
    isCreatingIssue,
    isCreatingSprintStory,
    handleCreateIssue,
    handleIssueCreated,
    handleCancelIssue,
    handleCreateSprintStory,
    handleSprintStoryCreated,
    handleCancelSprintStory,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleDragLeave,
    handleDrop
  };
};