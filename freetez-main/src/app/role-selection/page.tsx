"use client";

import React from 'react';

type UserRole = 'hire' | 'work';

interface RoleSelectionProps {
  onRoleSelect?: (role: UserRole) => void;
}

const RoleSelectionPage: React.FC<RoleSelectionProps> = ({ onRoleSelect }) => {
  const handleRoleSelect = (role: UserRole): void => {
    // Store the selected role in localStorage
    localStorage.setItem('userRole', role);
    
    // Call the callback if provided
    if (onRoleSelect) {
      onRoleSelect(role);
    }
    
    // Redirect to appropriate page
    if (role === 'hire') {
      window.location.href = '/dashboard';
    } else {
      window.location.href = '/freelancer-dashboard';
    }
  };

  return (
    <div className="relative w-full h-screen flex items-center justify-center">
      {/* Background */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{ 
          backgroundImage: 'url("/api/placeholder/1920/1080")',
        }}
      />

      {/* Overlay for contrast */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      {/* Logo */}
      <div className="absolute top-8 left-8">
        <img
          src="/logo.png"
          alt="Logo"
          className="mb-8 w-48 h-48 object-contain"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 bg-gray-900 bg-opacity-80 p-8 md:p-10 rounded-2xl shadow-2xl text-center w-full max-w-md">
        <h1 className="text-3xl font-extrabold text-white mb-4">Choose Your Role</h1>
        <p className="text-gray-300 mb-8">
          Select how you want to use <span className="text-purple-400 font-semibold">FreeTez</span>
        </p>

        <div className="space-y-6">
          <button
            className="w-full py-4 text-lg font-semibold text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition-all shadow-lg flex items-center justify-center space-x-3 transform hover:scale-105 active:scale-95"
            onClick={() => handleRoleSelect('hire')}
          >
            I Want to Hire
          </button>

          <button
            className="w-full py-4 text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-all shadow-lg flex items-center justify-center space-x-3 transform hover:scale-105 active:scale-95"
            onClick={() => handleRoleSelect('work')}
          >
            I Want to Work
          </button>
        </div>

        <p className="mt-8 text-sm text-gray-400">
          You can change your role later from your profile settings
        </p>
      </div>
    </div>
  );
};

export default RoleSelectionPage;