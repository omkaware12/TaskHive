import React from 'react';

const DraggableIssue = ({ issue, onDragStart }) => {
  return (
    <div 
      className="border-b border-gray-200 hover:bg-gray-50 cursor-move"
      draggable
      onDragStart={(e) => onDragStart(e, issue)}
    >
      <div className="flex items-center p-3">
        <input type="checkbox" className="mr-3 h-4 w-4 text-blue-600 rounded" />
        <div className="flex items-center">
          <span className="text-blue-600 text-sm font-medium mr-2">{issue.id}</span>
          <span className="text-gray-800">{issue.title}</span>
        </div>
        <div className="ml-auto flex items-center">
          <div className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
            {issue.status}
          </div>
          <div className="ml-2">
            <img 
              src="https://ui-avatars.com/api/?name=User&background=random" 
              alt="Assignee" 
              className="w-8 h-8 rounded-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DraggableIssue;