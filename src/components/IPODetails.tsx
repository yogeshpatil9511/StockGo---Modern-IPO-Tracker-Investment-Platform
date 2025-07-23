import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, IndianRupee, TrendingUp, Users, Building, Clock, BarChart3, Eye, Share2, Bell } from 'lucide-react';
import { mockIPOData } from '../data/mockData';
import { IPOData } from '../types';

const IPODetails = () => {
  const { id } = useParams<{ id: string }>();
  const [ipo, setIpo] = useState<IPOData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const found = mockIPOData.find(item => item.id === id);
      setIpo(found || null);
      setLoading(false);
    }, 500);
  }, [id]);

  useEffect(() => {
    if (!ipo || ipo.status !== 'open') return;

    // Simulate real-time updates for open IPOs
    const interval = setInterval(() => {
      setIpo(prev => {
        if (!prev) return null;
        return {
          ...prev,
          subscriptionData: {
            ...prev.subscriptionData,
            retail: Math.min(prev.subscriptionData.retail + Math.random() * 0.05, 10),
            nii: Math.min(prev.subscriptionData.nii + Math.random() * 0.1, 15),
            qib: Math.min(prev.subscriptionData.qib + Math.random() * 0.08, 20),
          }
        };
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [ipo]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="modern-card p-8 text-center">
            <div className="w-8 h-8 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading IPO details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!ipo) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="modern-card p-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">IPO Not Found</h1>
            <Link to="/" className="text-green-600 hover:text-green-700 flex items-center justify-center">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const totalSubscription = ipo.subscriptionData.retail + ipo.subscriptionData.nii + ipo.subscriptionData.qib;
  const getCompanyInitials = (name: string) => {
    return name.split(' ').map(word => word[0]).join('').substring(0, 2).toUpperCase();
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'subscription', label: 'Subscription' },
    { id: 'financials', label: 'Financials' },
    { id: 'timeline', label: 'Timeline' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6 fade-in">
          <Link to="/" className="text-green-600 hover:text-green-700 flex items-center mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
          
          <div className="modern-card p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-4">
                <div className="company-logo text-2xl">
                  {getCompanyInitials(ipo.companyName)}
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-1">{ipo.companyName}</h1>
                  <p className="text-gray-600 text-lg flex items-center">
                    <Building className="w-4 h-4 mr-1" />
                    {ipo.industry}
                  </p>
                  <div className="flex items-center space-x-4 mt-2">
                    <span className={`status-badge ${ipo.status === 'open' ? 'status-open' : ipo.status === 'upcoming' ? 'status-upcoming' : 'status-closed'}`}>
                      {ipo.status}
                    </span>
                    {ipo.status === 'open' && (
                      <div className="flex items-center text-green-600 text-sm">
                        <Clock className="w-3 h-3 mr-1" />
                        <span>Live Updates</span>
                        <div className="w-2 h-2 bg-green-500 rounded-full ml-1 pulse-dot"></div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button className="btn-secondary flex items-center space-x-2">
                  <Bell className="w-4 h-4" />
                  <span>Set Alert</span>
                </button>
                <button className="btn-secondary flex items-center space-x-2">
                  <Share2 className="w-4 h-4" />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 slide-up">
          <div className="modern-card p-4 text-center">
            <div className="text-2xl font-bold text-gray-900 mb-1">₹{ipo.issueSize} Cr</div>
            <div className="text-gray-600 text-sm">Issue Size</div>
          </div>
          <div className="modern-card p-4 text-center">
            <div className="text-2xl font-bold text-gray-900 mb-1">₹{ipo.priceBand.min} - ₹{ipo.priceBand.max}</div>
            <div className="text-gray-600 text-sm">Price Band</div>
          </div>
          <div className="modern-card p-4 text-center">
            <div className={`text-2xl font-bold mb-1 ${ipo.gmp >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {ipo.gmp >= 0 ? '+' : ''}₹{ipo.gmp}
            </div>
            <div className="text-gray-600 text-sm">GMP</div>
          </div>
          <div className="modern-card p-4 text-center">
            <div className="text-2xl font-bold text-gray-900 mb-1">₹{ipo.marketCap} Cr</div>
            <div className="text-gray-600 text-sm">Market Cap</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8 slide-up">
          <div className="modern-card p-1">
            <div className="flex space-x-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 flex-1 ${
                    activeTab === tab.id
                      ? 'bg-green-600 text-white shadow-lg'
                      : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="slide-up">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="modern-card p-6 mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Company Overview</h2>
                  <p className="text-gray-700 leading-relaxed mb-6">{ipo.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Issue Details</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Face Value</span>
                          <span className="font-medium">₹{ipo.faceValue}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Market Lot</span>
                          <span className="font-medium">{ipo.marketLot} shares</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Exchange</span>
                          <span className="font-medium">{ipo.exchange}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Key Dates</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Open Date</span>
                          <span className="font-medium">{ipo.openDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Close Date</span>
                          <span className="font-medium">{ipo.closeDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Listing Date</span>
                          <span className="font-medium">{ipo.listingDate}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                {ipo.status === 'open' && (
                  <div className="modern-card p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Live Subscription</h3>
                    <div className="text-center mb-4">
                      <div className="text-3xl font-bold text-green-600 mb-1">
                        {totalSubscription.toFixed(1)}x
                      </div>
                      <div className="text-gray-600">Overall Subscription</div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-gray-700">Retail</span>
                          <span className="text-sm font-bold text-green-600">{ipo.subscriptionData.retail.toFixed(2)}x</span>
                        </div>
                        <div className="progress-container">
                          <div 
                            className="progress-bar progress-retail" 
                            style={{ width: `${Math.min((ipo.subscriptionData.retail / 5) * 100, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-gray-700">NII</span>
                          <span className="text-sm font-bold text-purple-600">{ipo.subscriptionData.nii.toFixed(2)}x</span>
                        </div>
                        <div className="progress-container">
                          <div 
                            className="progress-bar progress-nii" 
                            style={{ width: `${Math.min((ipo.subscriptionData.nii / 8) * 100, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-gray-700">QIB</span>
                          <span className="text-sm font-bold text-orange-600">{ipo.subscriptionData.qib.toFixed(2)}x</span>
                        </div>
                        <div className="progress-container">
                          <div 
                            className="progress-bar progress-qib" 
                            style={{ width: `${Math.min((ipo.subscriptionData.qib / 10) * 100, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'financials' && (
            <div className="modern-card p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Financial Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-green-50 p-6 rounded-lg text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">₹{ipo.financials.revenue} Cr</div>
                  <div className="text-gray-700 font-medium">Revenue</div>
                  <div className="text-sm text-gray-600 mt-1">Annual</div>
                </div>
                <div className="bg-blue-50 p-6 rounded-lg text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">₹{ipo.financials.profit} Cr</div>
                  <div className="text-gray-700 font-medium">Net Profit</div>
                  <div className="text-sm text-gray-600 mt-1">Annual</div>
                </div>
                <div className="bg-purple-50 p-6 rounded-lg text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">₹{ipo.financials.assets} Cr</div>
                  <div className="text-gray-700 font-medium">Total Assets</div>
                  <div className="text-sm text-gray-600 mt-1">As of latest</div>
                </div>
              </div>
            </div>
          )}

          {/* Add other tab contents as needed */}
        </div>
      </div>
    </div>
  );
};

export default IPODetails;