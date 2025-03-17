import React, { useState } from "react";

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    jobTitle: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const show = (event) => {
    event.preventDefault();
    console.log(formData);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-xl flex flex-col md:flex-row w-full max-w-4xl overflow-hidden">
        <div className="w-full md:w-1/2 p-6 md:p-10">
          <h2 className="text-2xl md:text-3xl font-bold text-black mb-6">Sign up</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="firstName" className="block text-gray-700 text-sm mb-1">First name</label>
              <input
                type="text"
                id="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-gray-700 text-sm mb-1">Last name</label>
              <input
                type="text"
                id="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300"
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="jobTitle" className="block text-gray-700 text-sm mb-1">Job Title</label>
            <input
              type="text"
              id="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm mb-1">Email</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm mb-1">Password</label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <button 
            onClick={show} 
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition"
          >
            Create an account
          </button>

          <p className="text-gray-600 text-xs mt-4 leading-relaxed">
            By clicking "Create account" above, you acknowledge that you will receive updates from our team and that you have read, understood, and agreed to our <a href="#" className="text-gray-800 hover:underline">Terms & Conditions</a>, <a href="#" className="text-gray-800 hover:underline">Licensing Agreement</a> and <a href="#" className="text-gray-800 hover:underline">Privacy Policy</a>.
          </p>

          <div className="mt-6 flex items-center justify-between">
            <p className="text-gray-600 text-sm">
              Already have an account?
            </p>
            <a href="#" className="text-blue-500 hover:underline text-sm">Log in</a>
          </div>
        </div>

        {/* Right Section - Branding */}
        <div className="w-full md:w-1/2 bg-gray-100 flex flex-col justify-center items-center p-6 md:p-10 text-center">
          <div className="mb-6">
            <img 
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
              alt="Profile" 
              className="w-16 h-16 rounded-full object-cover"
            />
          </div>
          <p className="text-lg font-medium text-gray-700 max-w-xs mb-4">
          Efficient project management is the key to success! Streamline your workflow, enhance team collaboration, and deliver projects on time with our intuitive tools and strategies
          </p>
          <p className="text-blue-500 font-medium text-sm md:text-base">@omkaware, @yashvadnere, @nilaynikam</p>
          <p className="text-gray-600 text-sm">founders, TaskHive</p>
          
          <div className="mt-8 md:mt-10">
            <p className="text-blue-500 font-medium mb-4 text-sm md:text-base">400,000+ designers & developers have used our platform to build websites faster.</p>
            <div className="flex flex-wrap justify-center gap-6">
              {/* Placeholder for company logos */}
              {/* <div className="w-16 h-8 bg-gray-300 rounded"></div>
              <div className="w-16 h-8 bg-gray-300 rounded"></div>
              <div className="w-16 h-8 bg-gray-300 rounded"></div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;