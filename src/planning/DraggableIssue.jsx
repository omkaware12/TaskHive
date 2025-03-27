import React, { useState } from 'react';
import { ChevronDown, Plus, X } from 'lucide-react';

const DraggableIssue = ({ issue, onDragStart, onDragEnd, onCreateTask }) => {
  const [expanded, setExpanded] = useState(false);
  const [isAddingTasks, setIsAddingTasks] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [tasks, setTasks] = useState(issue.tasks || []);

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      const updatedTasks = [...tasks, { title: newTaskTitle, completed: false }];
      setTasks(updatedTasks);
      
      // Update the parent component
      if (onCreateTask) {
        onCreateTask(issue, updatedTasks);
      }
    }
  };

  const handleRemoveTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    
    // Update the parent component
    if (onCreateTask) {
      onCreateTask(issue, updatedTasks);
    }
  };

  const handleToggleComplete = (index) => {
    const updatedTasks = tasks.map((task, i) => 
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    
    // Update the parent component
    if (onCreateTask) {
      onCreateTask(issue, updatedTasks);
    }
  };

  return (
    <div 
      className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
      draggable
      onDragStart={(e) => onDragStart(e, issue)}
      onDragEnd={onDragEnd}
      data-issue-id={issue.id}
    >
      <div className="flex items-start p-3">
        <input type="checkbox" className="mt-1 mr-3 h-4 w-4 text-blue-600 rounded" />
        <div className="flex-grow">
          <div className="flex items-center issue-title">
            <div className="text-xs text-blue-600 font-medium mr-2">{issue.id}</div>
            <div className="font-medium">{issue.title}</div>
          </div>
          
          {/* Display epic name if available */}
          {issue.epicName && (
            <div className="mt-1 flex items-center epic-tag">
              <div className="w-2 h-2 rounded-sm bg-purple-500 mr-1"></div>
              <span className="text-xs text-purple-700 font-medium">{issue.epicName}</span>
            </div>
          )}
          
          {/* Task list */}
          {expanded && tasks.length > 0 && (
            <div className="mt-3 pl-4 border-l-2 border-gray-200">
              <ul className="space-y-2">
                {tasks.map((task, index) => (
                  <li key={index} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => handleToggleComplete(index)}
                      className="mr-2 h-4 w-4 text-blue-600"
                    />
                    <span className={`flex-grow ${task.completed ? 'line-through text-gray-500' : ''}`}>
                      {task.title}
                    </span>
                    <button
                      onClick={() => handleRemoveTask(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X size={14} />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Task creation form */}
          {expanded && isAddingTasks && (
            <div className="mt-3 pl-4 border-l-2 border-gray-200">
              <div className="flex items-center">
                <input
                  type="text"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  placeholder="Enter task title"
                  className="flex-grow p-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleAddTask();
                    }
                  }}
                />
                <button
                  onClick={handleAddTask}
                  className="ml-2 p-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex items-center ml-2">
          {expanded ? (
            <div className="flex space-x-2">
              {!isAddingTasks && (
                <button 
                  className="text-xs text-blue-600 hover:underline"
                  onClick={() => setIsAddingTasks(true)}
                >
                  Add task
                </button>
              )}
              {isAddingTasks && (
                <button 
                  className="text-xs text-gray-500 hover:underline"
                  onClick={() => setIsAddingTasks(false)}
                >
                  Cancel
                </button>
              )}
            </div>
          ) : null}
          <button 
            className="ml-2 text-gray-400 hover:text-gray-600"
            onClick={() => setExpanded(!expanded)}
          >
            <ChevronDown 
              size={16} 
              className={`transform transition-transform ${expanded ? 'rotate-180' : ''}`} 
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DraggableIssue;