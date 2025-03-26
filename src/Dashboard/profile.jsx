import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contextAPI/index"; 
import Sidebar from "./Sidebar";

const AccountSettings = () => {
  const navigate = useNavigate();
  const { userData, updateUserData } = useAuth();
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    profileImage: null,
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef(null);

  // Update local state when userData changes
  useEffect(() => {
    console.log("userData from context:", userData);
    if (userData) {
      setProfileData(prevData => ({
        ...prevData,
        firstName: userData.firstName || '',
        lastName: userData.lastName || '',
        email: userData.email || '',
        profileImage: userData.profileImage || null
      }));
      setProfileImage(userData.profileImage || null);
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value
    });
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target.result;
        setProfileImage(imageUrl);
        setProfileData({
          ...profileData,
          profileImage: imageUrl
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = () => {
    console.log("Saving profile data:", profileData);
    // Update the context with the new profile data
    updateUserData(profileData);
    // Add API call here to save to backend
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
    <div className="flex flex-col md:flex-row h-screen bg-gray-50 text-gray-900">
      <Sidebar activePage="account" />

      <div className="flex-1 p-4 md:p-8 mt-16 md:mt-0 md:pl-24 max-w-full md:max-w-4xl overflow-auto">
        <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6">Account</h2>

        {/* Profile Section */}
        <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm mb-4 md:mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Profile</h3>
            <button 
              onClick={handleSaveProfile}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 md:px-4 py-1 text-sm rounded-lg"
            >
              Save
            </button>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
            <div 
              onClick={handleImageClick}
              className="w-16 h-16 rounded-full overflow-hidden cursor-pointer border-2 border-gray-200 flex items-center justify-center relative group"
            >
              {profileImage ? (
                <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-blue-500 flex items-center justify-center text-sm font-bold text-white">
                  {profileData?.firstName?.charAt(0) || ''}{profileData?.lastName?.charAt(0) || 'OK'}
                </div>
              )}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 flex items-center justify-center transition-all">
                <div className="bg-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-500">Recommended: 160x160px in PNG or JPG format</p>
            </div>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleImageChange} 
              className="hidden" 
              accept="image/*"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">First Name</label>
              <input
                type="text"
                name="firstName"
                className="w-full border border-gray-300 rounded px-3 py-2"
                value={profileData.firstName || ''}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Last Name</label>
              <input
                type="text"
                name="lastName"
                className="w-full border border-gray-300 rounded px-3 py-2"
                value={profileData.lastName || ''}
                onChange={handleChange}
              />
            </div>
          </div>
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
