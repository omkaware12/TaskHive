import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';

const TaskCreationModal = ({ isOpen, onClose, story, onSaveTasks }) => {
  const [tasks, setTasks] = useState(story?.tasks || []);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      setTasks([...tasks, { title: newTaskTitle, completed: false }]);
      setNewTaskTitle('');
    }
  };

  const handleRemoveTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const handleToggleComplete = (index) => {
    setTasks(tasks.map((task, i) => 
      i === index ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleSave = () => {
    onSaveTasks(tasks);
  };

  if (!isOpen) return null;

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-md shadow-md mb-4">
      <div className="flex items-center justify-between p-3 border-b border-blue-200">
        <h2 className="text-md font-medium">
          Add Tasks to {story?.title || 'Story'}
        </h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X size={18} />
        </button>
      </div>
      
      <div className="p-3">
        <div className="mb-3">
          <div className="flex items-center mb-2">
            <input
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="Enter task title"
              className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleAddTask();
                }
              }}
            />
            <button
              onClick={handleAddTask}
              className="ml-2 p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <Plus size={18} />
            </button>
          </div>
        </div>
        
        <div className="max-h-48 overflow-y-auto">
          {tasks.length === 0 ? (
            <p className="text-gray-500 text-center py-3 text-sm">No tasks yet. Add some tasks above.</p>
          ) : (
            <ul className="space-y-2">
              {tasks.map((task, index) => (
                <li key={index} className="flex items-center p-2 border border-gray-200 rounded-md bg-white">
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
                    <X size={16} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      
      <div className="flex justify-end p-3 border-t border-blue-200">
        <button
          onClick={onClose}
          className="px-3 py-1.5 border border-gray-300 rounded-md text-gray-700 mr-2 hover:bg-gray-50 bg-white text-sm"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
        >
          Save Tasks
        </button>
      </div>
    </div>
  );
};

export default TaskCreationModal;