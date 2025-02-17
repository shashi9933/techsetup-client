import React, { useState, useEffect } from 'react';
import { 
  CurrencyDollarIcon, 
  UserGroupIcon, 
  ShoppingCartIcon, 
  CubeIcon 
} from '@heroicons/react/outline';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const StatCard = ({ data }) => {
  const [Icon, title, value, change] = data;
  return (
    <div className="bg-[#181818] p-6 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <Icon className="w-8 h-8 text-[#FFD700]" />
        <span className={`text-sm ${
          change.startsWith('+') ? 'text-green-500' : 'text-red-500'
        }`}>
          {change}
        </span>
      </div>
      <h3 className="text-white text-2xl font-bold mb-1">{value}</h3>
      <p className="text-[rgba(255,255,255,0.74)]">{title}</p>
    </div>
  );
};

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dashboardData, setDashboardData] = useState({
    stats: [],
    salesData: { labels: [], datasets: [] },
    orderStatusData: { labels: [], datasets: [] },
    recentOrders: []
  });

  // Add back the chartOptions configuration
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.74)',
        },
      },
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.74)',
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: 'rgba(255, 255, 255, 0.74)',
        },
      },
    },
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch all dashboard data in parallel
      const [statsRes, salesRes, orderStatusRes, recentOrdersRes] = await Promise.all([
        fetch('/api/admin/dashboard/stats'),
        fetch('/api/admin/dashboard/sales'),
        fetch('/api/admin/dashboard/order-status'),
        fetch('/api/admin/dashboard/recent-orders')
      ]);

      const stats = await statsRes.json();
      const salesData = await salesRes.json();
      const orderStatus = await orderStatusRes.json();
      const recentOrders = await recentOrdersRes.json();

      // Transform data for display
      const statsArray = [
        [CurrencyDollarIcon, 'Total Revenue', `₹${stats.revenue.toLocaleString()}`, '+12.5%'],
        [UserGroupIcon, 'Active Users', stats.users.toString(), '+8.2%'],
        [ShoppingCartIcon, 'Total Orders', stats.orders.toString(), '+3.7%'],
        [CubeIcon, 'Products', stats.products.toString(), '+5.1%']
      ];

      const formattedSalesData = {
        labels: salesData.map(item => {
          const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
          return monthNames[item._id - 1];
        }),
        datasets: [{
          label: 'Sales',
          data: salesData.map(item => item.total),
          borderColor: '#FFD700',
          tension: 0.4,
          fill: false
        }]
      };

      const formattedOrderStatus = {
        labels: orderStatus.map(item => item._id),
        datasets: [{
          label: 'Order Status',
          data: orderStatus.map(item => item.count),
          backgroundColor: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4']
        }]
      };

      setDashboardData({
        stats: statsArray,
        salesData: formattedSalesData,
        orderStatusData: formattedOrderStatus,
        recentOrders
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white">Loading dashboard data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardData.stats.map((statData) => (
          <StatCard key={statData[1]} data={statData} />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#181818] p-6 rounded-lg">
          <h3 className="text-white text-lg font-bold mb-4">Sales Overview</h3>
          <div style={{ height: '300px' }}>
            <Line data={dashboardData.salesData} options={chartOptions} />
          </div>
        </div>

        <div className="bg-[#181818] p-6 rounded-lg">
          <h3 className="text-white text-lg font-bold mb-4">Order Status</h3>
          <div style={{ height: '300px' }}>
            <Bar data={dashboardData.orderStatusData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-[#181818] rounded-lg overflow-hidden">
        <div className="p-6">
          <h3 className="text-white text-lg font-bold">Recent Orders</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#232323]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-[rgba(255,255,255,0.74)] uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[rgba(255,255,255,0.74)] uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[rgba(255,255,255,0.74)] uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[rgba(255,255,255,0.74)] uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[rgba(255,255,255,0.74)] uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgba(255,255,255,0.1)]">
              {dashboardData.recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-[#232323]">
                  <td className="px-6 py-4 whitespace-nowrap text-white">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-white">
                    {order.customer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-white">
                    {order.total}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-[rgba(255,255,255,0.74)]">
                    {order.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 