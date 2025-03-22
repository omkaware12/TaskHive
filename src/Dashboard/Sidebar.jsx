import React, { useState } from "react";
import { FaTasks } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import { Menu, X } from 'lucide-react';

const Sidebar = ({ activePage }) => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Mobile menu button */}
      <button 
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow-md"
        onClick={toggleMobileMenu}
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-40
        w-64 bg-white border-r border-gray-200 
        transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 flex flex-col px-4 py-6
      `}>
        <div className="flex items-center mb-8">
          <div className="bg-blue-600 p-1.5 rounded-lg mr-2">
            <FaTasks size={18} className="text-white" />
          </div>
          <h1 className="text-xl font-bold">TaskHive</h1>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-1 text-sm">
          <button 
            className={`text-left px-3 py-2 rounded ${activePage === 'account' ? 'bg-gray-100 font-medium' : 'hover:bg-gray-100'}`}
            onClick={() => {
              navigate('/profile');
              setIsMobileMenuOpen(false);
            }}
          >
            Account
          </button>
          <button 
            className={`text-left px-3 py-2 rounded ${activePage === 'manage-plan' ? 'bg-gray-100 font-medium' : 'hover:bg-gray-100'}`}
            onClick={() => {
              navigate('/manage-plan');
              setIsMobileMenuOpen(false);
            }}
          >
            Manage Plan
          </button>
        </nav>

        <div className="mt-auto">
          <button 
            onClick={() => {
              navigate('/dashboard');
              setIsMobileMenuOpen(false);
            }}
            className="text-sm text-gray-600 hover:text-blue-600"
          >
            Go to Dashboard
          </button>
        </div>
      </aside>
      
      {/* Overlay to close sidebar on mobile */}
      {isMobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-transparent z-30"
          onClick={toggleMobileMenu}
        ></div>
      )}
    </>
  );
};

export default Sidebar;