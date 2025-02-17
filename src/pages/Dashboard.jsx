import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const sections = [
    {
      title: 'My Orders',
      icon: '📦',
      link: '/orders',
      count: 5
    },
    {
      title: 'Wishlist',
      icon: '❤️',
      link: '/wishlist',
      count: 8
    },
    {
      title: 'Saved Addresses',
      icon: '📍',
      link: '/addresses',
      count: 2
    },
    {
      title: 'Payment Methods',
      icon: '💳',
      link: '/payment-methods',
      count: 3
    }
  ];

  return (
    <div className="min-h-screen bg-[#000000] py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="bg-[#181818] rounded-lg p-6">
            <nav className="space-y-4">
              {sections.map((section) => (
                <Link
                  key={section.title}
                  to={section.link}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-[#232323] transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <span>{section.icon}</span>
                    <span className="text-white">{section.title}</span>
                  </div>
                  <span className="bg-[#FFD700] text-black px-2 py-1 rounded-full text-sm">
                    {section.count}
                  </span>
                </Link>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3 space-y-8">
            {/* Recent Orders */}
            <div className="bg-[#181818] rounded-lg p-6">
              <h2 className="text-xl font-bold text-white mb-4">Recent Orders</h2>
              {/* Add order list component */}
            </div>

            {/* Recommended Products */}
            <div className="bg-[#181818] rounded-lg p-6">
              <h2 className="text-xl font-bold text-white mb-4">Recommended For You</h2>
              {/* Add product recommendations */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 