import React from 'react';
import { X, Plus, CheckCircle, Circle } from 'lucide-react';

const TaskCreationModal = ({
  isOpen,
  onClose,
  story,
  taskInput,
  setTaskInput,
  currentTasks,
  onAddTask,
  onRemoveTask,
  onToggleComplete,
  onSaveTasks
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-medium">Add tasks to {story?.title}</h3>
          <button 
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-4">
          <div className="mb-4">
            <div className="flex items-center">
              <input
                type="text"
                className="flex-grow border-b border-gray-300 py-2 focus:outline-none focus:border-blue-500"
                placeholder="Add a task..."
                value={taskInput}
                onChange={(e) => setTaskInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && taskInput.trim()) {
                    onAddTask();
                  }
                }}
              />
              <button 
                className="ml-2 bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                onClick={onAddTask}
                disabled={!taskInput.trim()}
              >
                <Plus size={16} />
              </button>
            </div>
          </div>
          
          {currentTasks.length > 0 ? (
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {currentTasks.map((task, index) => (
                <div key={index} className="flex items-center group">
                  <button 
                    className="mr-2"
                    onClick={() => onToggleComplete(index)}
                  >
                    {task.completed ? (
                      <CheckCircle size={18} className="text-green-500" />
                    ) : (
                      <Circle size={18} className="text-gray-400" />
                    )}
                  </button>
                  <span className={`flex-grow ${task.completed ? 'line-through text-gray-500' : ''}`}>
                    {task.text}
                  </span>
                  <button 
                    className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100"
                    onClick={() => onRemoveTask(index)}
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-gray-500 text-center py-4">
              No tasks added yet
            </div>
          )}
        </div>
        
        <div className="flex justify-end p-4 border-t">
          <button 
            className="px-4 py-2 text-gray-600 hover:text-gray-800 mr-2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button 
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={onSaveTasks}
          >
            Save tasks
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCreationModal;