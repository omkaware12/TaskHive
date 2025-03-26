import React, { useState } from 'react';
import { X } from 'lucide-react';

const CreateEpic = ({ isOpen, onClose, onCreateEpic }) => {
  const [epicName, setEpicName] = useState('');
  const [epicSummary, setEpicSummary] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!epicName.trim()) return;
    
    setIsSubmitting(true);
    
    // Create new epic object
    const newEpic = {
      id: Date.now().toString(),
      name: epicName,
      summary: epicSummary,
      createdAt: new Date(),
      issues: []
    };
    
    // Call the parent component's function to add the epic
    onCreateEpic(newEpic);
    
    // Reset form and close modal
    setEpicName('');
    setEpicSummary('');
    setIsSubmitting(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Modal */}
        <div 
          className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden"
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
            <h2 className="text-lg font-medium">Create epic</h2>
            <button 
              className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
              onClick={onClose}
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
          </div>
          
          {/* Form */}
          <form onSubmit={handleSubmit} className="p-4">
            <div className="mb-4">
              <label htmlFor="epicName" className="block text-sm font-medium text-gray-700 mb-1">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                id="epicName"
                type="text"
                value={epicName}
                onChange={(e) => setEpicName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="What needs to be done?"
                required
                autoFocus
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="epicSummary" className="block text-sm font-medium text-gray-700 mb-1">
                Summary
              </label>
              <textarea
                id="epicSummary"
                value={epicSummary}
                onChange={(e) => setEpicSummary(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Add a summary to provide additional context"
                rows={4}
              />
            </div>
            
            {/* Footer */}
            <div className="flex justify-end space-x-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!epicName.trim() || isSubmitting}
                className={`px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                  (!epicName.trim() || isSubmitting) ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? 'Creating...' : 'Create'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateEpic;