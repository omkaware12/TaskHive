import React, { useState } from 'react';
import { Plus, ChevronDown } from 'lucide-react';

const IssueManager = ({ projectId }) => {
  const [stories, setStories] = useState([]);
  const [isCreatingStory, setIsCreatingStory] = useState(false);
  const [backlogExpanded, setBacklogExpanded] = useState(true);
  const [newStory, setNewStory] = useState({
    id: '',
    title: '',
    type: 'STORY',
    status: 'TO DO'
  });

  // Handle creating a new story
  const handleCreateStory = () => {
    setIsCreatingStory(true);
  };
  
  // Handle saving a new story
  const handleSaveStory = () => {
    if (newStory.title.trim() === '') return;
    
    const storyId = stories.length + 1;
    const storyWithId = {
      ...newStory,
      id: `STORY-${storyId}`,
      created: new Date().toISOString(),
      projectId: projectId
    };
    
    setStories([...stories, storyWithId]);
    setIsCreatingStory(false);
    setNewStory({
      id: '',
      title: '',
      type: 'STORY',
      status: 'TO DO'
    });
  };
  
  // Handle canceling story creation
  const handleCancelStory = () => {
    setIsCreatingStory(false);
    setNewStory({
      id: '',
      title: '',
      type: 'STORY',
      status: 'TO DO'
    });
  };
  
  // Handle input change for new story
  const handleStoryInputChange = (e) => {
    setNewStory({
      ...newStory,
      title: e.target.value
    });
  };

  return (
    <div className="bg-white rounded-md shadow-sm border border-gray-200">
      <div className="flex items-center justify-between p-3 border-b border-gray-200 cursor-pointer" onClick={() => setBacklogExpanded(!backlogExpanded)}>
        <div className="flex items-center">
          <button className="mr-2">
            {backlogExpanded ? <ChevronDown size={16} /> : <ChevronDown size={16} className="transform -rotate-90" />}
          </button>
          <div className="font-medium">Backlog</div>
          <div className="text-xs text-gray-500 ml-2">({stories.length} {stories.length === 1 ? 'story' : 'stories'})</div>
        </div>
        
        <div className="flex items-center">
          <div className="flex -space-x-1 mr-2 hidden sm:flex">
            <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs border-2 border-white">{issues.length}</div>
            <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-xs border-2 border-white">0</div>
          </div>
          <button className="px-3 py-1 bg-white border border-gray-300 text-sm rounded-md hover:bg-gray-50 whitespace-nowrap">
            Create sprint
          </button>
          <button className="ml-2 text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
          </button>
        </div>
      </div>
      
      {backlogExpanded && (
        <div>
          {stories.length === 0 && !isCreatingStory ? (
            <div className="p-6 text-center text-gray-500">
              Your backlog is empty.
              <div className="mt-2">
                <button 
                  className="flex items-center mx-auto text-blue-600 hover:text-blue-700 font-medium"
                  onClick={handleCreateStory}
                >
                  <Plus size={16} className="mr-1" /> Create story
                </button>
              </div>
            </div>
          ) : (
            <div>
              {/* Story list */}
              {stories.map((story, index) => (
                <div key={index} className="border-b border-gray-200 hover:bg-gray-50">
                  <div className="flex items-center p-3">
                    <input type="checkbox" className="mr-3 h-4 w-4 text-blue-600 rounded" />
                    <div className="flex items-center">
                      <span className="text-blue-600 text-sm font-medium mr-2">{story.id}</span>
                      <span className="text-gray-800">{story.title}</span>
                    </div>
                    <div className="ml-auto flex items-center">
                      <div className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                        {story.status}
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
              ))}
              
              {/* Create story input */}
              {isCreatingStory && (
                <div className="border-b border-gray-200 bg-blue-50">
                  <div className="flex items-center p-3">
                    <input type="checkbox" className="mr-3 h-4 w-4 text-blue-600 rounded" disabled />
                    <div className="flex-grow">
                      <input
                        type="text"
                        placeholder="What's your user story?"
                        className="w-full border-b border-gray-300 bg-transparent py-1 focus:outline-none focus:border-blue-500"
                        value={newStory.title}
                        onChange={handleStoryInputChange}
                        autoFocus
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            handleSaveStory();
                          } else if (e.key === 'Escape') {
                            handleCancelStory();
                          }
                        }}
                      />
                    </div>
                    <div className="ml-2 flex items-center">
                      <button 
                        className="text-gray-500 hover:text-gray-700 mr-2"
                        onClick={handleCancelStory}
                      >
                        Cancel
                      </button>
                      <button 
                        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                        onClick={handleSaveStory}
                      >
                        Create
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Create story button (when stories exist) */}
              {!isCreatingStory && (
                <div className="p-3 border-b border-gray-200 hover:bg-gray-50">
                  <button 
                    className="flex items-center text-blue-600 hover:text-blue-700"
                    onClick={handleCreateStory}
                  >
                    <Plus size={16} className="mr-1" /> Create story
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default IssueManager;