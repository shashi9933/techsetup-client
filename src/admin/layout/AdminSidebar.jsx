import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  HomeIcon,
  CubeIcon,
  ClipboardListIcon,
  UserGroupIcon,
  ChartBarIcon,
  TagIcon,
  CogIcon,
} from '@heroicons/react/outline';

const AdminSidebar = () => {
  const location = useLocation();

  const menuItems = [
    [HomeIcon, 'Dashboard', '/admin'],
    [CubeIcon, 'Products', '/admin/products'],
    [ClipboardListIcon, 'Orders', '/admin/orders'],
    [UserGroupIcon, 'Customers', '/admin/customers'],
    [ChartBarIcon, 'Analytics', '/admin/analytics'],
    [TagIcon, 'Promotions', '/admin/promotions'],
    [CogIcon, 'Settings', '/admin/settings']
  ];

  return (
    <div className="w-64 bg-[#181818] min-h-screen p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
      </div>
      
      <nav className="space-y-2">
        {menuItems.map(([Icon, name, path]) => (
          <Link
            key={name}
            to={path}
            className={`flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-colors ${
              location.pathname === path 
                ? 'bg-[#FFD700] text-black' 
                : 'text-white hover:bg-[#232323]'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span>{name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default AdminSidebar; 