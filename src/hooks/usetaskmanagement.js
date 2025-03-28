import { useState } from 'react';

export const useTaskManagement = () => {
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [selectedStory, setSelectedStory] = useState(null);
  const [taskInput, setTaskInput] = useState('');
  const [currentTasks, setCurrentTasks] = useState([]);

  const handleCreateTask = (story) => {
    setSelectedStory(story);
    setCurrentTasks(story.tasks || []);
    setTaskInput(''); // Ensure input is empty when opening modal
    setTaskModalOpen(true);
  };

  const handleAddTask = () => {
    if (taskInput.trim()) {
      setCurrentTasks([...currentTasks, { title: taskInput, completed: false }]);
      setTaskInput(''); // Clear input after adding task
    }
  };

  const handleRemoveTask = (index) => {
    setCurrentTasks(currentTasks.filter((_, i) => i !== index));
  };

  const handleToggleTaskComplete = (index) => {
    setCurrentTasks(currentTasks.map((task, i) => 
      i === index ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleSaveTasks = (issues, sprintIssues, setIssues, setSprintIssues) => {
    if (selectedStory) {
      if (selectedStory.area === 'sprint' || sprintIssues.some(i => i.id === selectedStory.id)) {
        // Update sprint issues
        setSprintIssues(sprintIssues.map(issue => 
          issue.id === selectedStory.id ? { ...issue, tasks: currentTasks } : issue
        ));
      } else {
        // Update backlog issues
        setIssues(issues.map(issue => 
          issue.id === selectedStory.id ? { ...issue, tasks: currentTasks } : issue
        ));
      }
      setTaskModalOpen(false);
      setTaskInput(''); // Clear input when closing modal
    }
  };

  const handleCancelTasks = () => {
    setTaskModalOpen(false);
    setTaskInput(''); // Clear input when canceling
  };

  return {
    taskModalOpen,
    selectedStory,
    taskInput,
    currentTasks,
    setTaskInput,
    handleCreateTask,
    handleAddTask,
    handleRemoveTask,
    handleToggleTaskComplete,
    handleSaveTasks,
    handleCancelTasks
  };
};