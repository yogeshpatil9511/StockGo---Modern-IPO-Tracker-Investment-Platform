import React, { useState, useEffect } from 'react';
import { mockIPOData } from '../data/mockData';
import IPOCard from './IPOCard';
import { Activity, TrendingUp, Clock } from 'lucide-react';

const LiveIPOs = () => {
  const [liveIPOs, setLiveIPOs] = useState(mockIPOData.filter(ipo => ipo.status === 'open'));

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setLiveIPOs(prev => prev.map(ipo => ({
        ...ipo,
        subscriptionData: {
          ...ipo.subscriptionData,
          retail: Math.min(ipo.subscriptionData.retail + Math.random() * 0.1, 10),
          nii: Math.min(ipo.subscriptionData.nii + Math.random() * 0.15, 15),
          qib: Math.min(ipo.subscriptionData.qib + Math.random() * 0.12, 20),
        }
      })));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="fade-in mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center">
                <Activity className="w-8 h-8 mr-3 text-green-600" />
                Live IPOs
              </h1>
              <p className="text-gray-600 flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                Real-time subscription updates
                <div className="w-2 h-2 bg-green-500 rounded-full ml-2 pulse-dot"></div>
              </p>
            </div>
            
            <div className="modern-card p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 mb-1">{liveIPOs.length}</div>
                <div className="text-gray-600 text-sm">Active IPOs</div>
              </div>
            </div>
          </div>
        </div>

        {liveIPOs.length === 0 ? (
          <div className="modern-card p-12 text-center">
            <Activity className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No Live IPOs</h2>
            <p className="text-gray-600">There are currently no IPOs open for subscription.</p>
          </div>
        ) : (
          <>
            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="modern-card p-6 text-center">
                <div className="text-2xl font-bold text-green-600 mb-2">
                  ₹{(liveIPOs.reduce((sum, ipo) => sum + ipo.issueSize, 0) / 100).toFixed(0)}Cr
                </div>
                <div className="text-gray-600">Total Issue Size</div>
              </div>
              <div className="modern-card p-6 text-center">
                <div className="text-2xl font-bold text-blue-600 mb-2">
                  {(liveIPOs.reduce((sum, ipo) => sum + ipo.subscriptionData.retail + ipo.subscriptionData.nii + ipo.subscriptionData.qib, 0) / liveIPOs.length).toFixed(1)}x
                </div>
                <div className="text-gray-600">Avg. Subscription</div>
              </div>
              <div className="modern-card p-6 text-center">
                <div className="text-2xl font-bold text-purple-600 mb-2">
                  +₹{(liveIPOs.reduce((sum, ipo) => sum + ipo.gmp, 0) / liveIPOs.length).toFixed(0)}
                </div>
                <div className="text-gray-600">Avg. GMP</div>
              </div>
            </div>

            {/* IPO Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {liveIPOs.map((ipo, index) => (
                <div key={ipo.id} className="slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <IPOCard ipo={ipo} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LiveIPOs;