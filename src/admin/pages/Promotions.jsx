import React, { useState } from 'react';
import { PlusIcon, CalendarIcon, TagIcon } from '@heroicons/react/outline';

const Promotions = () => {
  const [activeTab, setActiveTab] = useState('discounts');

  const promotions = [
    {
      id: 1,
      name: 'Summer Sale',
      type: 'discount',
      value: '20%',
      startDate: '2024-03-15',
      endDate: '2024-04-15',
      status: 'active',
      applicableTo: 'All Products',
      usageCount: 156
    },
    // Add more sample promotions
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Promotions</h2>
        <button className="flex items-center space-x-2 px-4 py-2 bg-[#FFD700] text-black rounded-lg hover:bg-[#FFE55C] transition-colors">
          <PlusIcon className="w-5 h-5" />
          <span>Create Promotion</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-[rgba(255,255,255,0.1)]">
        <nav className="-mb-px flex space-x-8">
          {['discounts', 'coupons', 'bundles'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab
                  ? 'border-[#FFD700] text-[#FFD700]'
                  : 'border-transparent text-[rgba(255,255,255,0.74)] hover:text-white hover:border-[rgba(255,255,255,0.1)]'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      </div>

      {/* Promotions Table */}
      <div className="bg-[#181818] rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#232323]">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-[rgba(255,255,255,0.74)] uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[rgba(255,255,255,0.74)] uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[rgba(255,255,255,0.74)] uppercase tracking-wider">
                Value
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[rgba(255,255,255,0.74)] uppercase tracking-wider">
                Duration
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[rgba(255,255,255,0.74)] uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[rgba(255,255,255,0.74)] uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[rgba(255,255,255,0.1)]">
            {promotions.map((promo) => (
              <tr key={promo.id} className="hover:bg-[#232323]">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <TagIcon className="w-5 h-5 text-[#FFD700] mr-3" />
                    <div>
                      <div className="text-white font-medium">{promo.name}</div>
                      <div className="text-[rgba(255,255,255,0.74)] text-sm">
                        {promo.applicableTo}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-white capitalize">
                  {promo.type}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-white">
                  {promo.value}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-[rgba(255,255,255,0.74)]">
                    <CalendarIcon className="w-4 h-4 mr-2" />
                    <span>{promo.startDate} - {promo.endDate}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    promo.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {promo.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button className="text-[#FFD700] hover:text-[#FFE55C]">Edit</button>
                  <span className="mx-2 text-[rgba(255,255,255,0.74)]">|</span>
                  <button className="text-red-500 hover:text-red-400">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#181818] p-6 rounded-lg">
          <h3 className="text-white font-medium mb-2">Active Promotions</h3>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-white">12</span>
            <span className="text-green-500 text-sm">+2 this week</span>
          </div>
        </div>
        <div className="bg-[#181818] p-6 rounded-lg">
          <h3 className="text-white font-medium mb-2">Total Revenue Impact</h3>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-white">₹1,23,456</span>
            <span className="text-green-500 text-sm">+15.2%</span>
          </div>
        </div>
        <div className="bg-[#181818] p-6 rounded-lg">
          <h3 className="text-white font-medium mb-2">Promotion Usage</h3>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-white">2,345</span>
            <span className="text-green-500 text-sm">+8.3%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Promotions; 