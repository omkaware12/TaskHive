import React from 'react';

export default function LandingPage() {
  return (
    <div className="bg-gradient-to-b from-white to-blue-100 min-h-screen flex flex-col items-center justify-center text-center p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
          Give Your Managers the <span className="text-blue-600">Tools They Need to Excel</span>
        </h1>
        <p className="text-gray-600 mb-8 max-w-xl mx-auto">
          The all-in-one solution to transform management in your company
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg font-medium transition-colors">
            Learn more
          </button>
          <button className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg text-lg font-medium transition-colors">
            Get started
          </button>
        </div>
        <div className="w-full bg-white p-4 rounded-xl shadow-xl">
          <div className="bg-gray-100 rounded-lg p-2 mb-4 flex items-center">
            <div className="w-6 h-6 bg-blue-500 rounded-md flex items-center justify-center mr-2">
              <span className="text-white font-bold text-xs">P</span>
            </div>
            <span className="text-sm font-medium">ProjectHub Dashboard</span>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white p-3 rounded shadow-sm border border-gray-200">
              <h4 className="font-medium text-sm mb-2">Task Management</h4>
              <div className="h-20 bg-gray-50 rounded-md"></div>
            </div>
            <div className="bg-white p-3 rounded shadow-sm border border-gray-200">
              <h4 className="font-medium text-sm mb-2">Project Timeline</h4>
              <div className="h-20 bg-gray-50 rounded-md"></div>
            </div>
            <div className="bg-white p-3 rounded shadow-sm border border-gray-200">
              <h4 className="font-medium text-sm mb-2">Team Collaboration</h4>
              <div className="h-20 bg-gray-50 rounded-md"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
