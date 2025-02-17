import React, { useState, useEffect } from 'react';
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
  ArcElement,
} from 'chart.js';
import { Line, Bar, Pie } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Analytics = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [analyticsData, setAnalyticsData] = useState({
    revenue: { daily: [], weekly: [], monthly: [] },
    customerMetrics: { acquisition: [], retention: [], churn: [] },
    productPerformance: { topSelling: [], lowStock: [] },
    salesByCategory: [],
    salesByProfession: []
  });

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        setLoading(true);
        const [
          revenueResponse,
          customerResponse,
          productResponse,
          categoryResponse,
          professionResponse
        ] = await Promise.all([
          fetch('/api/admin/analytics/revenue'),
          fetch('/api/admin/analytics/customers'),
          fetch('/api/admin/analytics/products'),
          fetch('/api/admin/analytics/sales-by-category'),
          fetch('/api/admin/analytics/sales-by-profession')
        ]);

        const revenue = await revenueResponse.json();
        const customers = await customerResponse.json();
        const products = await productResponse.json();
        const categories = await categoryResponse.json();
        const professions = await professionResponse.json();

        setAnalyticsData({
          revenue,
          customerMetrics: customers,
          productPerformance: products,
          salesByCategory: categories,
          salesByProfession: professions
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalyticsData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-white">Loading analytics...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  // Chart configurations
  const revenueChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)'
        }
      },
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)'
        }
      }
    },
    plugins: {
      legend: {
        labels: {
          color: 'rgba(255, 255, 255, 0.7)'
        }
      }
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Analytics Overview</h2>

      {/* Revenue Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#181818] p-6 rounded-lg">
          <h3 className="text-white text-lg font-bold mb-4">Revenue Trends</h3>
          <div style={{ height: '300px' }}>
            <Line 
              data={{
                labels: analyticsData.revenue.monthly.map(item => item.date),
                datasets: [{
                  label: 'Monthly Revenue',
                  data: analyticsData.revenue.monthly.map(item => item.amount),
                  borderColor: '#FFD700',
                  tension: 0.4
                }]
              }} 
              options={revenueChartOptions} 
            />
          </div>
        </div>

        <div className="bg-[#181818] p-6 rounded-lg">
          <h3 className="text-white text-lg font-bold mb-4">Sales by Category</h3>
          <div style={{ height: '300px' }}>
            <Bar 
              data={{
                labels: analyticsData.salesByCategory.map(item => item.category),
                datasets: [{
                  label: 'Sales',
                  data: analyticsData.salesByCategory.map(item => item.sales),
                  backgroundColor: '#FFD700'
                }]
              }} 
              options={revenueChartOptions} 
            />
          </div>
        </div>
      </div>

      {/* Customer Metrics */}
      <div className="bg-[#181818] p-6 rounded-lg">
        <h3 className="text-white text-lg font-bold mb-4">Customer Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            ['New Customers', analyticsData.customerMetrics.acquisition.total || 0],
            ['Retention Rate', `${analyticsData.customerMetrics.retention.rate || 0}%`],
            ['Churn Rate', `${analyticsData.customerMetrics.churn.rate || 0}%`]
          ].map(([label, value]) => (
            <div key={label} className="bg-[#232323] p-4 rounded-lg">
              <h4 className="text-[rgba(255,255,255,0.7)] text-sm">{label}</h4>
              <p className="text-white text-2xl font-bold">{value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Product Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#181818] p-6 rounded-lg">
          <h3 className="text-white text-lg font-bold mb-4">Top Selling Products</h3>
          <div className="space-y-4">
            {analyticsData.productPerformance.topSelling.map(product => (
              <div key={product._id} className="flex justify-between items-center">
                <span className="text-white">{product.name}</span>
                <span className="text-[#FFD700]">{product.sales} sales</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#181818] p-6 rounded-lg">
          <h3 className="text-white text-lg font-bold mb-4">Sales by Profession</h3>
          <div style={{ height: '300px' }}>
            <Pie 
              data={{
                labels: analyticsData.salesByProfession.map(item => item.profession),
                datasets: [{
                  data: analyticsData.salesByProfession.map(item => item.sales),
                  backgroundColor: [
                    '#FFD700',
                    '#FFA07A',
                    '#98FB98',
                    '#87CEEB'
                  ]
                }]
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;