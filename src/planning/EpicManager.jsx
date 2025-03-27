import React from 'react';
import { X, Plus } from 'lucide-react';

const EpicManager = ({ isOpen, onClose, onDragOver, onDragLeave, onDrop }) => {
  const epics = [
    { id: 'frontend', name: 'Frontend' },
    { id: 'backend', name: 'Backend' },
    { id: 'design', name: 'Design' },
    { id: 'documentation', name: 'Documentation' },
    { id: 'testing', name: 'Testing' }
  ];

  // Modified handleEpicDrop to work with your existing handleDrop function
  const handleEpicDrop = (e, epicName) => {
    e.preventDefault();
    
    // Get the issue ID from dataTransfer
    const issueId = e.dataTransfer.getData("issueId");
    const sourceArea = e.dataTransfer.getData("sourceArea");
    
    // Add epic name to the issue
    const issueElement = document.querySelector(`[data-issue-id="${issueId}"]`);
    if (issueElement) {
      // Add epic tag visually
      const epicTag = document.createElement('div');
      epicTag.className = 'mt-1 flex items-center';
      epicTag.innerHTML = `
        <div class="w-2 h-2 rounded-sm bg-purple-500 mr-1"></div>
        <span class="text-xs text-purple-700 font-medium">${epicName}</span>
      `;
      
      // Check if epic tag already exists
      const existingTag = issueElement.querySelector('.epic-tag');
      if (existingTag) {
        existingTag.remove();
      }
      
      // Add the new tag
      const titleElement = issueElement.querySelector('.issue-title');
      if (titleElement) {
        titleElement.after(epicTag);
      }
    }
    
    // Call the original onDrop function
    onDrop(e, sourceArea);
  };

  return (
    <div className={`fixed right-0 top-14 h-[calc(100vh-56px)] bg-white border-l border-gray-200 shadow-md transition-all duration-300 z-20 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`} style={{ width: '250px' }}>
      <div className="flex items-center justify-between p-3 border-b border-gray-200">
        <h2 className="font-medium">Epic</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X size={18} />
        </button>
      </div>
      
      <div className="p-3 border-b border-gray-200">
        <button className="flex items-center text-blue-600 hover:text-blue-700 w-full">
          <Plus size={16} className="mr-1" /> Create epic
        </button>
      </div>
      
      <div className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 120px)' }}>
        {epics.map(epic => (
          <div 
            key={epic.id}
            className="p-3 border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={(e) => handleEpicDrop(e, epic.name)}
            data-epic-id={epic.id}
            data-epic-name={epic.name}
          >
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-sm bg-purple-500 mr-2"></div>
              <span>{epic.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EpicManager;