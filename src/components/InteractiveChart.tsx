import React, { useEffect, useRef, useState } from 'react';
import { IPOData } from '../types';

interface InteractiveChartProps {
  data: IPOData[];
}

const InteractiveChart: React.FC<InteractiveChartProps> = ({ data }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  const [chartType, setChartType] = useState<'subscription' | 'gmp' | 'issueSize'>('subscription');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    // Clear canvas
    ctx.clearRect(0, 0, rect.width, rect.height);

    const openIPOs = data.filter(ipo => ipo.status === 'open');
    if (openIPOs.length === 0) return;

    const padding = 60;
    const chartWidth = rect.width - padding * 2;
    const chartHeight = rect.height - padding * 2;
    const barWidth = chartWidth / openIPOs.length * 0.7;
    const barSpacing = chartWidth / openIPOs.length * 0.3;

    // Get data based on chart type
    let chartData: number[] = [];
    let maxValue = 0;
    let colors: string[] = [];

    switch (chartType) {
      case 'subscription':
        chartData = openIPOs.map(ipo => 
          ipo.subscriptionData.retail + ipo.subscriptionData.nii + ipo.subscriptionData.qib
        );
        maxValue = Math.max(...chartData);
        colors = ['#00d09c', '#5367ff', '#ff6b35'];
        break;
      case 'gmp':
        chartData = openIPOs.map(ipo => ipo.gmp);
        maxValue = Math.max(...chartData);
        colors = ['#22c55e', '#16a34a', '#15803d'];
        break;
      case 'issueSize':
        chartData = openIPOs.map(ipo => ipo.issueSize);
        maxValue = Math.max(...chartData);
        colors = ['#3b82f6', '#2563eb', '#1d4ed8'];
        break;
    }

    // Draw grid lines
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
      const y = padding + (i * chartHeight) / 5;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(rect.width - padding, y);
      ctx.stroke();
    }

    // Draw bars
    openIPOs.forEach((ipo, index) => {
      const value = chartData[index];
      const barHeight = (value / maxValue) * chartHeight;
      const x = padding + index * (barWidth + barSpacing);
      const y = rect.height - padding - barHeight;

      // Create gradient
      const gradient = ctx.createLinearGradient(0, y, 0, rect.height - padding);
      gradient.addColorStop(0, colors[index % colors.length]);
      gradient.addColorStop(1, colors[index % colors.length] + '80');

      // Draw bar with hover effect
      if (hoveredBar === index) {
        ctx.shadowColor = colors[index % colors.length];
        ctx.shadowBlur = 10;
        ctx.shadowOffsetY = 2;
      }

      ctx.fillStyle = gradient;
      ctx.fillRect(x, y, barWidth, barHeight);

      // Reset shadow
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;
      ctx.shadowOffsetY = 0;

      // Draw value on top of bar
      ctx.fillStyle = '#1e293b';
      ctx.font = 'bold 12px Inter';
      ctx.textAlign = 'center';
      const displayValue = chartType === 'subscription' 
        ? `${value.toFixed(1)}x`
        : chartType === 'gmp'
        ? `₹${value}`
        : `₹${value}Cr`;
      ctx.fillText(displayValue, x + barWidth / 2, y - 8);

      // Draw company name
      ctx.fillStyle = '#64748b';
      ctx.font = '11px Inter';
      const companyName = ipo.companyName.length > 12 
        ? ipo.companyName.substring(0, 12) + '...'
        : ipo.companyName;
      ctx.fillText(companyName, x + barWidth / 2, rect.height - padding + 20);
    });

    // Draw y-axis labels
    ctx.fillStyle = '#64748b';
    ctx.font = '11px Inter';
    ctx.textAlign = 'right';
    for (let i = 0; i <= 5; i++) {
      const value = (maxValue / 5) * (5 - i);
      const y = padding + (i * chartHeight) / 5;
      const displayValue = chartType === 'subscription' 
        ? `${value.toFixed(1)}x`
        : chartType === 'gmp'
        ? `₹${value.toFixed(0)}`
        : `₹${value.toFixed(0)}Cr`;
      ctx.fillText(displayValue, padding - 10, y + 4);
    }

  }, [data, hoveredBar, chartType]);

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    
    const openIPOs = data.filter(ipo => ipo.status === 'open');
    const padding = 60;
    const chartWidth = rect.width - padding * 2;
    const barWidth = chartWidth / openIPOs.length * 0.7;
    const barSpacing = chartWidth / openIPOs.length * 0.3;

    let hoveredIndex = null;
    for (let i = 0; i < openIPOs.length; i++) {
      const barX = padding + i * (barWidth + barSpacing);
      if (x >= barX && x <= barX + barWidth) {
        hoveredIndex = i;
        break;
      }
    }

    setHoveredBar(hoveredIndex);
  };

  const handleMouseLeave = () => {
    setHoveredBar(null);
  };

  return (
    <div className="space-y-4">
      {/* Chart Type Selector */}
      <div className="flex space-x-2">
        <button
          onClick={() => setChartType('subscription')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            chartType === 'subscription'
              ? 'bg-green-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Subscription
        </button>
        <button
          onClick={() => setChartType('gmp')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            chartType === 'gmp'
              ? 'bg-green-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          GMP
        </button>
        <button
          onClick={() => setChartType('issueSize')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            chartType === 'issueSize'
              ? 'bg-green-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Issue Size
        </button>
      </div>

      {/* Chart Canvas */}
      <div className="relative">
        <canvas
          ref={canvasRef}
          className="w-full h-80 cursor-pointer"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        />
        
        {/* Tooltip */}
        {hoveredBar !== null && (
          <div className="absolute top-4 right-4 bg-white border border-gray-200 rounded-lg p-3 shadow-lg">
            <div className="text-sm font-medium text-gray-900">
              {data.filter(ipo => ipo.status === 'open')[hoveredBar]?.companyName}
            </div>
            <div className="text-xs text-gray-600">
              {data.filter(ipo => ipo.status === 'open')[hoveredBar]?.industry}
            </div>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="flex justify-center space-x-6 text-sm text-gray-600">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded"></div>
          <span>
            {chartType === 'subscription' ? 'Total Subscription' : 
             chartType === 'gmp' ? 'Grey Market Premium' : 'Issue Size'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default InteractiveChart;