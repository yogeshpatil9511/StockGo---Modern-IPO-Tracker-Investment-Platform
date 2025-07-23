import React from 'react';
import { mockIPOData } from '../data/mockData';
import IPOCard from './IPOCard';
import { Calendar, Clock } from 'lucide-react';

const UpcomingIPOs = () => {
  const upcomingIPOs = mockIPOData.filter(ipo => ipo.status === 'upcoming');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="fade-in mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center">
                <Calendar className="w-8 h-8 mr-3 text-orange-600" />
                Upcoming IPOs
              </h1>
              <p className="text-gray-600">IPOs scheduled to open soon</p>
            </div>
            
            <div className="modern-card p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600 mb-1">{upcomingIPOs.length}</div>
                <div className="text-gray-600 text-sm">Upcoming</div>
              </div>
            </div>
          </div>
        </div>

        {upcomingIPOs.length === 0 ? (
          <div className="modern-card p-12 text-center">
            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No Upcoming IPOs</h2>
            <p className="text-gray-600">There are currently no upcoming IPOs scheduled.</p>
          </div>
        ) : (
          <>
            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="modern-card p-6 text-center">
                <div className="text-2xl font-bold text-orange-600 mb-2">
                  ₹{(upcomingIPOs.reduce((sum, ipo) => sum + ipo.issueSize, 0) / 100).toFixed(0)}Cr
                </div>
                <div className="text-gray-600">Total Pipeline</div>
              </div>
              <div className="modern-card p-6 text-center">
                <div className="text-2xl font-bold text-blue-600 mb-2">
                  ₹{Math.min(...upcomingIPOs.map(ipo => ipo.priceBand.min))} - ₹{Math.max(...upcomingIPOs.map(ipo => ipo.priceBand.max))}
                </div>
                <div className="text-gray-600">Price Range</div>
              </div>
              <div className="modern-card p-6 text-center">
                <div className="text-2xl font-bold text-green-600 mb-2">
                  +₹{(upcomingIPOs.reduce((sum, ipo) => sum + ipo.gmp, 0) / upcomingIPOs.length).toFixed(0)}
                </div>
                <div className="text-gray-600">Expected GMP</div>
              </div>
            </div>

            {/* IPO Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingIPOs.map((ipo, index) => (
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

export default UpcomingIPOs;