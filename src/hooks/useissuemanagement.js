import { useState, useEffect } from 'react';
import { useTaskManagement } from './usetaskmanagement';

export const useIssueManagement = (projectId) => {
  const [issues, setIssues] = useState([]);
  const [sprintIssues, setSprintIssues] = useState([]);
  const [isCreatingIssue, setIsCreatingIssue] = useState(false);
  const [isCreatingSprintStory, setIsCreatingSprintStory] = useState(false);
  const [backlogIssueInput, setBacklogIssueInput] = useState('');
  const [sprintStoryInput, setSprintStoryInput] = useState('');
  
  const {
    taskModalOpen,
    selectedStory,
    taskInput,
    currentTasks,
    setTaskInput,
    handleCreateTask,
    handleAddTask,
    handleRemoveTask,
    handleToggleTaskComplete,
    handleSaveTasks: saveTasksBase,
    handleCancelTasks
  } = useTaskManagement();

  // Handle saving tasks wrapper
  const handleSaveTasks = () => {
    saveTasksBase(issues, sprintIssues, setIssues, setSprintIssues);
  };

  // Handle creating a new issue in the backlog
  const handleCreateIssue = () => {
    setIsCreatingIssue(true);
  };

  const handleIssueCreated = (newIssue) => {
    setIssues([...issues, newIssue]);
    setIsCreatingIssue(false);
    setBacklogIssueInput('');
  };

  const handleCancelIssue = () => {
    setIsCreatingIssue(false);
    setBacklogIssueInput('');
  };

  // Handle creating a new story in the sprint
  const handleCreateSprintStory = () => {
    setIsCreatingSprintStory(true);
  };

  const handleSprintStoryCreated = (newStory) => {
    setSprintIssues([...sprintIssues, newStory]);
    setIsCreatingSprintStory(false);
    setSprintStoryInput('');
  };

  const handleCancelSprintStory = () => {
    setIsCreatingSprintStory(false);
    setSprintStoryInput('');
  };

  // Drag and drop functionality
  const handleDragStart = (e, issue) => {
    e.dataTransfer.setData("issueId", issue.id);
    e.dataTransfer.setData("sourceArea", issue.area || (issue.inSprint ? 'sprint' : 'backlog'));
    
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

  // Add CSS for drag and drop visual feedback
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .dragging {
        border: 2px dashed #3b82f6 !important;
        background-color: rgba(59, 130, 246, 0.05) !important;
      }
      
      .drag-over {
        background-color: rgba(59, 130, 246, 0.1);
        border: 2px dashed #3b82f6;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return {
    issues,
    sprintIssues,
    isCreatingIssue,
    isCreatingSprintStory,
    backlogIssueInput,
    sprintStoryInput,
    setBacklogIssueInput,
    setSprintStoryInput,
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
    handleDrop,
    // Task management
    taskModalOpen,
    selectedStory,
    taskInput,
    currentTasks,
    setTaskInput,
    // In the handleCreateTask function, modify it to directly add the task to the issue
    // instead of opening a modal:
    
    handleCreateTask: (story, taskText) => {
      // Find the story in either sprintIssues or issues
      const allIssues = [...sprintIssues, ...issues];
      const storyIndex = allIssues.findIndex(issue => issue.id === story.id);
      
      if (storyIndex !== -1) {
        // Create a copy of all issues
        const updatedIssues = [...allIssues];
        
        // Initialize tasks array if it doesn't exist
        if (!updatedIssues[storyIndex].tasks) {
          updatedIssues[storyIndex].tasks = [];
        }
        
        // Add the new task
        updatedIssues[storyIndex].tasks.push({
          id: `task-${Date.now()}`,
          text: taskText,
          completed: false
        });
        
        // Update the appropriate state based on where the story is located
        if (sprintIssues.some(issue => issue.id === story.id)) {
          setSprintIssues(updatedIssues.filter(issue => 
            sprintIssues.some(sprintIssue => sprintIssue.id === issue.id)
          ));
        } else {
          setIssues(updatedIssues.filter(issue => 
            issues.some(backlogIssue => backlogIssue.id === issue.id)
          ));
        }
      }
    },
    handleAddTask,
    handleRemoveTask,
    handleToggleTaskComplete,
    handleSaveTasks,
    handleCancelTasks
  };
};