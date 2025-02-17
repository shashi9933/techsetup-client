import React from 'react';
import { BellIcon, UserCircleIcon } from '@heroicons/react/outline';

const AdminHeader = () => {
  return (
    <header className="bg-[#181818] px-8 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
        
        <div className="flex items-center space-x-4">
          <button className="text-white hover:text-[#FFD700]">
            <BellIcon className="w-6 h-6" />
          </button>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-white">
              <UserCircleIcon className="w-8 h-8" />
              <span>Admin User</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;