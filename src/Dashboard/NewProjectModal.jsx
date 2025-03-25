import React from "react";

const NewProjectModal = ({ isOpen, onClose, formData, setFormData, onProjectCreate }) => {
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
    
    // Create a copy of the form data
    const projectData = {...formData};
    
    // If custom project type is selected, use the custom value
    if (projectData.projectType === 'custom' && projectData.customProjectType) {
      projectData.projectType = projectData.customProjectType;
      delete projectData.customProjectType;
    }
    
    // Add creation date and generate an ID for the project
    const newProject = {
      ...projectData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    
    console.log("Form submitted:", newProject);
    
    // Call the onProjectCreate function to pass the new project data to parent
    onProjectCreate(newProject);
    
    // Reset form data
    setFormData({
      projectName: "",
      projectDescription: "",
      projectType: "",
      startDate: "",
      priority: "medium",
      customProjectType: ""
    });
    
    onClose();
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="bg-white p-5 sm:p-8 rounded-lg shadow-xl w-full max-w-[400px] border border-gray-200">
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
              required
            />
          </div>

          <div className="mb-4 sm:mb-5">
            <label className="block text-sm font-medium text-gray-700">
              Project Description
            </label>
            <textarea
              name="projectDescription"
              className="w-full p-2 sm:p-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
              placeholder="Brief description"
              rows="3"
              value={formData.projectDescription}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="mb-4 sm:mb-5">
            <label className="block text-sm font-medium text-gray-700">
              Project Type
            </label>
            <select 
              name="projectType"
              className="w-full p-2 sm:p-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
              value={formData.projectType}
              onChange={handleChange}
              required
            >
              <option value="">Select a project type</option>
              <option value="Blockchain">Blockchain</option>
              <option value="AIML">AIML</option>
              <option value="DevOps">DevOps</option>
              <option value="Backend">Backend</option>
              <option value="Frontend">Frontend</option>
              <option value="Full Stack">Full Stack</option>
              <option value="custom">Custom (Type below)</option>
            </select>
            {formData.projectType === 'custom' && (
              <input
                type="text"
                name="customProjectType"
                className="w-full mt-2 p-2 sm:p-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
                placeholder="Enter custom project type"
                value={formData.customProjectType || ''}
                onChange={handleChange}
                required
              />
            )}
          </div>
          <div className="mb-4 sm:mb-5">
            <label className="block text-sm font-medium text-gray-700">
              Start Date
            </label>
            <input
              type="date"
              name="startDate"
              className="w-full p-2 sm:p-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
              value={formData.startDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-5 sm:mb-6">
            <label className="block text-sm font-medium text-gray-700">
              Priority
            </label>
            <select 
              name="priority"
              className="w-full p-2 sm:p-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
              value={formData.priority}
              onChange={handleChange}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
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