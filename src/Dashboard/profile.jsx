import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contextAPI/index"; 
import Sidebar from "./Sidebar";

const AccountSettings = () => {
  const navigate = useNavigate();
  const { userData } = useAuth();  // Changed from Data to userData
  const [profileData, setProfileData] = useState(userData);  // Changed from Data to userData

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value
    });
  };

  const handleSaveProfile = () => {
    console.log("Saving profile data:", profileData);
    // Add API call here
  };

  const handleUpdatePassword = () => {
    if (profileData.newPassword !== profileData.confirmPassword) {
      alert("New passwords don't match");
      return;
    }
    console.log("Updating password");
    // Add API call here
  };

  return (
    <div className="flex h-screen bg-gray-50 text-gray-900">
      {/* Import Sidebar Component */}
      <Sidebar activePage="account" />

      {/* Main Content */}
      <div className="flex-1 p-8 pl-24 max-w-4xl">
        <h2 className="text-2xl font-semibold mb-6">Account</h2>

        {/* Profile Section */}
        <div className="bg-white p-6 rounded-2xl shadow-sm mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Profile</h3>
            <button 
              onClick={handleSaveProfile}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-1 text-sm rounded-lg"
            >
              Save
            </button>
          </div>
          
          {/* Rest of the profile section remains unchanged */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-sm font-bold text-white">
              OK
            </div>
            <div>
              <button className="text-sm text-gray-700 underline">Upload image</button>
              <p className="text-xs text-gray-500 mt-1">Recommended: 160x160px in PNG or JPG format</p>
            </div>
          </div>

          {/* Rest of the component remains the same */}
        </div>

        {/* Email Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Email</h3>
            <button 
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-1 text-sm rounded"
            >
              Save
            </button>
          </div>
          
          <div>
            <label className="block text-sm text-gray-600 mb-1">Email</label>
            <input
              type="email"
              name="email"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={profileData.email}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Password Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Change Password</h3>
            <button 
              onClick={handleUpdatePassword}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-1 text-sm rounded"
            >
              Update password
            </button>
          </div>
          
          <div className="space-y-3">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Existing Password</label>
              <input
                type="password"
                name="currentPassword"
                className="w-full border border-gray-300 rounded px-3 py-2"
                value={profileData.currentPassword}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">New Password</label>
              <input
                type="password"
                name="newPassword"
                className="w-full border border-gray-300 rounded px-3 py-2"
                value={profileData.newPassword}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Confirm New Password</label>
              <input
                type="password"
                name="confirmPassword"
                className="w-full border border-gray-300 rounded px-3 py-2"
                value={profileData.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="mt-6">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span className="text-sm text-gray-600">Let Roboflow use your data to build AI models that improve your data.</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
