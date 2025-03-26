import React, { useState } from 'react';
import { X, Plus, ChevronRight } from 'lucide-react';

const EpicSidebar = ({ isOpen, onClose }) => {
  const [epics, setEpics] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [newEpicName, setNewEpicName] = useState('');

  const handleCreateEpic = (e) => {
    e.preventDefault();
    if (!newEpicName.trim()) return;
    
    const newEpic = {
      id: Date.now().toString(),
      name: newEpicName,
      createdAt: new Date(),
      issues: []
    };
    
    setEpics([...epics, newEpic]);
    setNewEpicName('');
    setIsCreating(false);
  };

  return (
    <div className={`${isOpen ? 'w-72 md:w-80 lg:w-96' : 'w-0'} transition-all duration-300 ease-in-out overflow-hidden bg-white border-r border-gray-200 h-[calc(100vh-56px)] fixed md:relative right-0 z-30`}>
      {isOpen && (
        <div className="p-4 h-full flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-medium text-lg">Epic</h2>
            <button className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100" onClick={onClose}>
              <X size={16} />
            </button>
          </div>

          {epics.length > 0 ? (
            <div className="flex-1 overflow-y-auto">
              {isCreating ? (
                <form onSubmit={handleCreateEpic} className="mb-4">
                  <input
                    type="text"
                    placeholder="What will the Epic be called?"
                    className="w-full px-3 py-2 border border-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newEpicName}
                    onChange={(e) => setNewEpicName(e.target.value)}
                    autoFocus
                  />
                </form>
              ) : (
                <button 
                  onClick={() => setIsCreating(true)}
                  className="flex items-center text-blue-600 hover:text-blue-700 mb-4"
                >
                  <Plus size={16} className="mr-1" /> Create epic
                </button>
              )}
              
              <div className="space-y-2 max-h-full">
                {epics.map(epic => (
                  <div key={epic.id} className="border border-gray-200 rounded-md hover:border-blue-200 transition-colors">
                    <div className="flex items-center p-3 hover:bg-gray-50 cursor-pointer">
                      <ChevronRight size={16} className="text-gray-400 mr-2 flex-shrink-0" />
                      <span className="text-sm font-medium text-gray-800 truncate">{epic.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center flex-1">
              <div className="w-24 h-24 mb-4">
                <img src="https://wac-cdn.atlassian.com/dam/jcr:223d82d4-6c72-4a96-96f2-235cea2f5bc4/Epics@2x.png?cdnVersion=1293" alt="Epic illustration" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-base font-medium mb-1">Plan and prioritize large chunks of work.</h3>
              <p className="text-sm text-gray-600 mb-4">Create your first epic to start capturing and breaking down work for your team.</p>
              
              {isCreating ? (
                <form onSubmit={handleCreateEpic} className="w-full">
                  <input
                    type="text"
                    placeholder="What will the Epic be called?"
                    className="w-full px-3 py-2 border border-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newEpicName}
                    onChange={(e) => setNewEpicName(e.target.value)}
                    autoFocus
                  />
                </form>
              ) : (
                <button 
                  onClick={() => setIsCreating(true)} 
                  className="flex items-center text-blue-600 hover:text-blue-700 font-medium"
                >
                  <Plus size={16} className="mr-1" /> Create epic
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EpicSidebar;