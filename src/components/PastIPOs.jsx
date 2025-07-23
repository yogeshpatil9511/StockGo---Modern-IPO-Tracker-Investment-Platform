import React from 'react';
import { mockIPOData } from '../data/mockData';
import IPOCard from './IPOCard';
import { History, TrendingUp } from 'lucide-react';

const PastIPOs = () => {
  const pastIPOs = mockIPOData.filter(ipo => ipo.status === 'closed');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="fade-in mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center">
                <History className="w-8 h-8 mr-3 text-gray-600" />
                Past IPOs
              </h1>
              <p className="text-gray-600">Previously closed IPOs and their performance</p>
            </div>
            
            <div className="modern-card p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-600 mb-1">{pastIPOs.length}</div>
                <div className="text-gray-600 text-sm">Completed</div>
              </div>
            </div>
          </div>
        </div>

        {pastIPOs.length === 0 ? (
          <div className="modern-card p-12 text-center">
            <History className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No Past IPOs</h2>
            <p className="text-gray-600">No previously closed IPOs to display.</p>
          </div>
        ) : (
          <>
            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="modern-card p-6 text-center">
                <div className="text-2xl font-bold text-gray-600 mb-2">
                  ₹{(pastIPOs.reduce((sum, ipo) => sum + ipo.issueSize, 0) / 100).toFixed(0)}Cr
                </div>
                <div className="text-gray-600">Total Raised</div>
              </div>
              <div className="modern-card p-6 text-center">
                <div className="text-2xl font-bold text-green-600 mb-2">
                  {(pastIPOs.reduce((sum, ipo) => sum + ipo.subscriptionData.retail + ipo.subscriptionData.nii + ipo.subscriptionData.qib, 0) / pastIPOs.length).toFixed(1)}x
                </div>
                <div className="text-gray-600">Avg. Subscription</div>
              </div>
              <div className="modern-card p-6 text-center">
                <div className="text-2xl font-bold text-blue-600 mb-2">85%</div>
                <div className="text-gray-600">Success Rate</div>
              </div>
            </div>

            {/* IPO Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pastIPOs.map((ipo, index) => (
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

export default PastIPOs;