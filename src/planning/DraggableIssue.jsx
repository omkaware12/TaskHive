import React, { useState } from 'react';
import { CheckCircle, Circle, ChevronDown, ChevronUp, Plus, X } from 'lucide-react';

const DraggableIssue = ({ issue, onDragStart, onDragEnd, onCreateTask }) => {
  const [expanded, setExpanded] = useState(false);
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTaskText, setNewTaskText] = useState('');

  const handleAddTask = () => {
    setIsAddingTask(true);
    setExpanded(true);
  };

  const handleSaveTask = () => {
    if (newTaskText.trim()) {
      onCreateTask(issue, newTaskText);
      setNewTaskText('');
      setIsAddingTask(false);
    }
  };

  const handleCancelAddTask = () => {
    setIsAddingTask(false);
    setNewTaskText('');
  };

  return (
    <div 
      className="border-b border-gray-200 hover:bg-gray-50"
      draggable
      onDragStart={(e) => onDragStart(e, issue)}
      onDragEnd={onDragEnd}
    >
      <div className="flex items-center p-3">
        <div className="mr-3">
          <Circle size={16} className="text-gray-400" />
        </div>
        <div className="flex-grow">
          <div className="flex items-center">
            <div className="text-sm font-medium">{issue.id}</div>
            <div className="ml-2 px-2 py-0.5 text-xs bg-blue-100 text-blue-800 rounded">Story</div>
          </div>
          <div className="mt-1">{issue.title}</div>
          
          {/* Task section toggle */}
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <button 
              className="flex items-center hover:text-gray-700"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              <span className="ml-1">Tasks</span>
            </button>
          </div>
        </div>
        
        <div>
          <button 
            className="text-blue-600 hover:text-blue-700 text-sm flex items-center"
            onClick={handleAddTask}
          >
            <Plus size={14} className="mr-1" /> Add task
          </button>
        </div>
      </div>
      
      {/* Expanded task section */}
      {expanded && (
        <div className="pl-10 pr-3 pb-3">
          {/* Task list */}
          {issue.tasks && issue.tasks.length > 0 ? (
            <div className="space-y-2 mb-3">
              {issue.tasks.map((task, index) => (
                <div key={index} className="flex items-center">
                  {task.completed ? (
                    <CheckCircle size={14} className="text-green-500 mr-2" />
                  ) : (
                    <Circle size={14} className="text-gray-400 mr-2" />
                  )}
                  <span className={task.completed ? "line-through text-gray-500" : ""}>
                    {task.text}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-sm text-gray-500 mb-3">No tasks yet</div>
          )}
          
          {/* Inline task input */}
          {isAddingTask && (
            <div className="flex items-center mb-2">
              <Circle size={14} className="text-gray-400 mr-2" />
              <input
                type="text"
                className="flex-grow border-b border-gray-300 py-1 focus:outline-none focus:border-blue-500 text-sm"
                placeholder="Add a task..."
                value={newTaskText}
                onChange={(e) => setNewTaskText(e.target.value)}
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSaveTask();
                  } else if (e.key === 'Escape') {
                    handleCancelAddTask();
                  }
                }}
              />
              <button 
                className="ml-2 text-gray-500 hover:text-gray-700"
                onClick={handleCancelAddTask}
              >
                <X size={14} />
              </button>
              <button 
                className="ml-2 text-blue-600 hover:text-blue-700"
                onClick={handleSaveTask}
              >
                Add
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DraggableIssue;