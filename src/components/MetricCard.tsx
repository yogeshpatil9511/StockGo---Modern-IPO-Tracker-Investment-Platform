import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
  bgColor: string;
  trend?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, icon: Icon, color, bgColor, trend }) => {
  return (
    <div className="metric-card interactive-element">
      <div className={`w-12 h-12 rounded-xl ${bgColor} flex items-center justify-center mb-4 mx-auto`}>
        <Icon className={`w-6 h-6 ${color}`} />
      </div>
      <div className="text-3xl font-bold text-gray-900 mb-2">{value}</div>
      <div className="text-gray-600 text-sm mb-2">{title}</div>
      {trend && (
        <div className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full inline-block">
          {trend}
        </div>
      )}
    </div>
  );
};

export default MetricCard;