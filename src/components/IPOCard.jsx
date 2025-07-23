import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, IndianRupee, TrendingUp, Users, Clock, Building2 } from 'lucide-react';

const IPOCard = ({ ipo }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'open':
        return 'status-open';
      case 'upcoming':
        return 'status-upcoming';
      case 'closed':
        return 'status-closed';
      default:
        return 'status-closed';
    }
  };

  const totalSubscription = ipo.subscriptionData.retail + ipo.subscriptionData.nii + ipo.subscriptionData.qib;

  // Generate company logo initials
  const getCompanyInitials = (name) => {
    return name.split(' ').map(word => word[0]).join('').substring(0, 2).toUpperCase();
  };

  return (
    <Link to={`/ipo/${ipo.id}`} className="block">
      <div className="ipo-card group">
        {/* Company Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="company-logo">
              {getCompanyInitials(ipo.companyName)}
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                {ipo.companyName}
              </h3>
              <p className="text-gray-600 text-sm flex items-center">
                <Building2 className="w-3 h-3 mr-1" />
                {ipo.industry}
              </p>
            </div>
          </div>
          <span className={`status-badge ${getStatusColor(ipo.status)}`}>
            {ipo.status}
          </span>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="flex items-center text-gray-600 text-xs mb-1">
              <IndianRupee className="w-3 h-3 mr-1" />
              Issue Size
            </div>
            <div className="font-bold text-gray-900">₹{ipo.issueSize} Cr</div>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="flex items-center text-gray-600 text-xs mb-1">
              <TrendingUp className="w-3 h-3 mr-1" />
              Price Band
            </div>
            <div className="font-bold text-gray-900">₹{ipo.priceBand.min} - ₹{ipo.priceBand.max}</div>
          </div>
        </div>

        {/* Dates */}
        <div className="space-y-2 mb-4">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600 flex items-center">
              <Calendar className="w-3 h-3 mr-1" />
              {ipo.status === 'upcoming' ? 'Opens' : ipo.status === 'open' ? 'Closes' : 'Closed'}
            </span>
            <span className="font-medium text-gray-900">
              {ipo.status === 'upcoming' ? ipo.openDate : ipo.closeDate}
            </span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Listing Date</span>
            <span className="font-medium text-gray-900">{ipo.listingDate}</span>
          </div>
        </div>

        {/* Subscription Status for Open IPOs */}
        {ipo.status === 'open' && (
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600 text-sm flex items-center">
                <Users className="w-3 h-3 mr-1" />
                Total Subscription
              </span>
              <span className="font-bold text-green-600">{totalSubscription.toFixed(1)}x</span>
            </div>
            
            {/* Subscription Breakdown */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Retail: {ipo.subscriptionData.retail.toFixed(1)}x</span>
                <span className="text-gray-500">NII: {ipo.subscriptionData.nii.toFixed(1)}x</span>
                <span className="text-gray-500">QIB: {ipo.subscriptionData.qib.toFixed(1)}x</span>
              </div>
              
              {/* Visual subscription bars */}
              <div className="subscription-visual">
                <div className="subscription-segment">
                  <div 
                    className="subscription-fill progress-retail" 
                    style={{ width: `${Math.min((ipo.subscriptionData.retail / 5) * 100, 100)}%` }}
                  ></div>
                </div>
                <div className="subscription-segment">
                  <div 
                    className="subscription-fill progress-nii" 
                    style={{ width: `${Math.min((ipo.subscriptionData.nii / 8) * 100, 100)}%` }}
                  ></div>
                </div>
                <div className="subscription-segment">
                  <div 
                    className="subscription-fill progress-qib" 
                    style={{ width: `${Math.min((ipo.subscriptionData.qib / 10) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* GMP and Live Indicator */}
        <div className="flex justify-between items-center">
          <div>
            <span className="text-gray-600 text-sm">GMP</span>
            <div className={`font-bold ${ipo.gmp >= 0 ? 'price-positive' : 'price-negative'}`}>
              {ipo.gmp >= 0 ? '+' : ''}₹{ipo.gmp}
            </div>
          </div>
          
          {ipo.status === 'open' && (
            <div className="flex items-center text-green-600 text-sm">
              <Clock className="w-3 h-3 mr-1" />
              <span>Live</span>
              <div className="w-2 h-2 bg-green-500 rounded-full ml-1 pulse-dot"></div>
            </div>
          )}
        </div>

        {/* Market Cap */}
        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Market Cap</span>
            <span className="font-medium text-gray-900">₹{ipo.marketCap} Cr</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default IPOCard;