import React, { useState, useEffect } from 'react';
import { SearchIcon, FilterIcon, UserAddIcon } from '@heroicons/react/outline';

const Customers = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    profession: 'all',
    status: 'all',
    dateJoined: 'all'
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0
  });

  useEffect(() => {
    fetchCustomers();
  }, [pagination.page, filters]);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams({
        page: pagination.page,
        limit: pagination.limit,
        ...filters
      });

      const response = await fetch(`/api/admin/customers?${queryParams}`);
      const data = await response.json();

      setCustomers(data.customers);
      setPagination(prev => ({ ...prev, total: data.total }));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]); // Add dependency

  if (loading) {
    return <div className="text-white text-center">Loading customers...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">Error: {error}</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Customers</h2>
        <button className="flex items-center space-x-2 px-4 py-2 bg-[#FFD700] text-black rounded-lg hover:bg-[#FFE55C]">
          <UserAddIcon className="w-5 h-5" />
          <span>Add Customer</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search customers..."
            className="w-full pl-10 pr-4 py-2 bg-[#232323] text-white rounded-lg border border-[rgba(255,255,255,0.1)]"
          />
          <SearchIcon className="absolute left-3 top-2.5 w-5 h-5 text-[rgba(255,255,255,0.5)]" />
        </div>
        
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center space-x-2 px-4 py-2 bg-[#232323] text-white rounded-lg"
        >
          <FilterIcon className="w-5 h-5" />
          <span>Filters</span>
        </button>
      </div>

      {/* Filter Options */}
      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-[#232323] p-4 rounded-lg">
          {/* Add filter options here */}
        </div>
      )}

      {/* Customers Table */}
      <div className="bg-[#181818] rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-[rgba(255,255,255,0.1)]">
          <thead className="bg-[#232323]">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-[rgba(255,255,255,0.5)] uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[rgba(255,255,255,0.5)] uppercase tracking-wider">
                Profession
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[rgba(255,255,255,0.5)] uppercase tracking-wider">
                Orders
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[rgba(255,255,255,0.5)] uppercase tracking-wider">
                Total Spent
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[rgba(255,255,255,0.5)] uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[rgba(255,255,255,0.5)] uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[rgba(255,255,255,0.1)]">
            {customers.map((customer) => (
              <tr key={customer._id} className="hover:bg-[#232323]">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div>
                      <div className="text-sm font-medium text-white">
                        {customer.name}
                      </div>
                      <div className="text-sm text-[rgba(255,255,255,0.5)]">
                        {customer.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                  {customer.profession}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                  {customer.orderCount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                  ₹{customer.totalSpent.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    customer.status === 'active' 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {customer.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#FFD700]">
                  <button className="hover:text-[#FFE55C]">View Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center">
        <div className="text-[rgba(255,255,255,0.74)]">
          Showing {(pagination.page - 1) * pagination.limit + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} customers
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
            disabled={pagination.page === 1}
            className="px-4 py-2 bg-[#232323] text-white rounded-lg disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
            disabled={pagination.page * pagination.limit >= pagination.total}
            className="px-4 py-2 bg-[#FFD700] text-black rounded-lg disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Customers;