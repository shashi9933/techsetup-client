import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-[#000000] flex">
      <AdminSidebar />
      <div className="flex-1">
        <AdminHeader />
        <main className="p-8">
          <div>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout; 