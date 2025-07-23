import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Calendar, IndianRupee, Users, BarChart3, Activity, Eye } from 'lucide-react';
import { mockIPOData } from '../data/mockData';
import IPOCard from './IPOCard';
import MetricCard from './MetricCard';
import InteractiveChart from './InteractiveChart';

const Dashboard = () => {
  const [ipoData, setIpoData] = useState(mockIPOData);
  const [selectedFilter, setSelectedFilter] = useState('all');

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setIpoData(prev => prev.map(ipo => ({
        ...ipo,
        subscriptionData: {
          ...ipo.subscriptionData,
          retail: Math.min(ipo.subscriptionData.retail + Math.random() * 0.1, 10),
          nii: Math.min(ipo.subscriptionData.nii + Math.random() * 0.2, 15),
          qib: Math.min(ipo.subscriptionData.qib + Math.random() * 0.15, 20),
        }
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const filteredData = ipoData.filter(ipo => {
    if (selectedFilter === 'all') return true;
    return ipo.status === selectedFilter;
  });

  const liveIPOs = ipoData.filter(ipo => ipo.status === 'open');
  const upcomingIPOs = ipoData.filter(ipo => ipo.status === 'upcoming');
  const totalMarketCap = ipoData.reduce((sum, ipo) => sum + ipo.marketCap, 0);
  const avgSubscription = liveIPOs.length > 0 
    ? liveIPOs.reduce((sum, ipo) => sum + ipo.subscriptionData.retail + ipo.subscriptionData.nii + ipo.subscriptionData.qib, 0) / liveIPOs.length 
    : 0;

  const metrics = [
    {
      title: 'Live IPOs',
      value: liveIPOs.length,
      icon: Activity,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      trend: '+2 this week'
    },
    {
      title: 'Upcoming',
      value: upcomingIPOs.length,
      icon: Calendar,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      trend: '+5 next month'
    },
    {
      title: 'Total Market Cap',
      value: `₹${(totalMarketCap / 10000).toFixed(1)}K Cr`,
      icon: IndianRupee,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      trend: '+12% this quarter'
    },
    {
      title: 'Avg. Subscription',
      value: `${avgSubscription.toFixed(1)}x`,
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      trend: '+0.5x from last week'
    }
  ];

  const filterButtons = [
    { key: 'all', label: 'All IPOs', count: ipoData.length },
    { key: 'open', label: 'Live', count: liveIPOs.length },
    { key: 'upcoming', label: 'Upcoming', count: upcomingIPOs.length },
    { key: 'closed', label: 'Closed', count: ipoData.filter(ipo => ipo.status === 'closed').length }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 fade-in">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">IPO Dashboard</h1>
          <p className="text-gray-600 text-lg">Track live IPOs, upcoming launches, and market trends</p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <div key={index} className="slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <MetricCard {...metric} />
            </div>
          ))}
        </div>

        {/* Market Trends Chart */}
        <div className="modern-card p-6 mb-8 slide-up" style={{ animationDelay: '0.4s' }}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Market Trends</h2>
              <p className="text-gray-600">Real-time subscription data and performance metrics</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full pulse-dot"></div>
              <span className="text-sm text-gray-600">Live Data</span>
            </div>
          </div>
          <InteractiveChart data={ipoData} />
        </div>

        {/* Filter Section */}
        <div className="mb-8 slide-up" style={{ animationDelay: '0.5s' }}>
          <div className="flex flex-wrap gap-4">
            {filterButtons.map((filter) => (
              <button
                key={filter.key}
                onClick={() => setSelectedFilter(filter.key)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2 ${
                  selectedFilter === filter.key
                    ? 'bg-green-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-green-300 hover:text-green-600'
                }`}
              >
                <span>{filter.label}</span>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  selectedFilter === filter.key
                    ? 'bg-white bg-opacity-20 text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {filter.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* IPO Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredData.map((ipo, index) => (
            <div key={ipo.id} className="slide-up" style={{ animationDelay: `${0.6 + index * 0.1}s` }}>
              <IPOCard ipo={ipo} />
            </div>
          ))}
        </div>

        {/* Quick Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 slide-up" style={{ animationDelay: '0.8s' }}>
          {/* Top Performers */}
          <div className="modern-card p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
              Top Performing IPOs
            </h3>
            <div className="space-y-4">
              {liveIPOs.slice(0, 3).map((ipo) => {
                const totalSub = ipo.subscriptionData.retail + ipo.subscriptionData.nii + ipo.subscriptionData.qib;
                return (
                  <div key={ipo.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">{ipo.companyName}</div>
                      <div className="text-sm text-gray-600">{ipo.industry}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-600">{totalSub.toFixed(1)}x</div>
                      <div className="text-xs text-gray-500">Subscribed</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Market Summary */}
          <div className="modern-card p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
              Market Summary
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Issue Size (Live)</span>
                <span className="font-bold text-gray-900">
                  ₹{(liveIPOs.reduce((sum, ipo) => sum + ipo.issueSize, 0) / 100).toFixed(0)}Cr
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Average GMP</span>
                <span className="font-bold text-green-600">
                  +₹{(liveIPOs.reduce((sum, ipo) => sum + ipo.gmp, 0) / liveIPOs.length || 0).toFixed(0)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Most Active Sector</span>
                <span className="font-bold text-gray-900">Technology</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Success Rate</span>
                <span className="font-bold text-purple-600">85%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;