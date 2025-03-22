import React from "react";

const NewProjectModal = ({ isOpen, onClose, formData, setFormData }) => {
  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="bg-white p-5 sm:p-8 rounded-lg shadow-xl w-full max-w-[400px] border border-gray-200 max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-center">Create New Project</h2>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4 sm:mb-5">
            <label htmlFor="projectName" className="block text-sm font-medium text-gray-700">
              Project Name
            </label>
            <input
              id="projectName"
              name="projectName"
              type="text"
              className="w-full p-2 sm:p-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
              placeholder="Enter project name"
              value={formData.projectName}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4 sm:mb-5">
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              className="w-full p-2 sm:p-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
              placeholder="Brief description"
              rows="3"
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="mb-4 sm:mb-5">
            <label className="block text-sm font-medium text-gray-700">
              Deadline
            </label>
            <input
              type="date"
              name="deadline"
              className="w-full p-2 sm:p-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
              value={formData.deadline}
              onChange={handleChange}
            />
          </div>

          <div className="mb-5 sm:mb-6">
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select 
              name="category"
              className="w-full p-2 sm:p-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="">Select a category</option>
              <option value="Development">Development</option>
              <option value="Design">Design</option>
              <option value="Marketing">Marketing</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-0 sm:justify-between">
            <button
              type="button"
              className="px-4 sm:px-5 py-2 sm:py-3 bg-gray-400 text-white rounded-md hover:bg-gray-500 order-2 sm:order-1"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 sm:px-5 py-2 sm:py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 order-1 sm:order-2"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewProjectModal;