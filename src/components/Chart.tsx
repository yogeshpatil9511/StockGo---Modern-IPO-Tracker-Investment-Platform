import React, { useEffect, useRef } from 'react';
import { IPOData } from '../types';

interface ChartProps {
  data: IPOData[];
}

const Chart: React.FC<ChartProps> = ({ data }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = 200;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw chart background
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Chart data
    const openIPOs = data.filter(ipo => ipo.status === 'open');
    const maxSubscription = Math.max(...openIPOs.map(ipo => 
      ipo.subscriptionData.retail + ipo.subscriptionData.nii + ipo.subscriptionData.qib
    ));

    if (openIPOs.length === 0) return;

    const barWidth = (canvas.width - 40) / openIPOs.length;
    const maxHeight = canvas.height - 40;

    openIPOs.forEach((ipo, index) => {
      const totalSub = ipo.subscriptionData.retail + ipo.subscriptionData.nii + ipo.subscriptionData.qib;
      const barHeight = (totalSub / maxSubscription) * maxHeight;
      const x = 20 + index * barWidth;
      const y = canvas.height - 20 - barHeight;

      // Draw bar
      const gradient = ctx.createLinearGradient(0, y, 0, canvas.height - 20);
      gradient.addColorStop(0, '#3b82f6');
      gradient.addColorStop(1, '#1d4ed8');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(x, y, barWidth - 10, barHeight);

      // Draw company name
      ctx.fillStyle = '#ffffff';
      ctx.font = '12px Inter';
      ctx.textAlign = 'center';
      ctx.fillText(
        ipo.companyName.substring(0, 10) + '...',
        x + (barWidth - 10) / 2,
        canvas.height - 5
      );

      // Draw value
      ctx.fillStyle = '#3b82f6';
      ctx.font = 'bold 12px Inter';
      ctx.fillText(
        `${totalSub.toFixed(1)}x`,
        x + (barWidth - 10) / 2,
        y - 5
      );
    });

    // Draw grid lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
      const y = 20 + (i * maxHeight) / 5;
      ctx.beginPath();
      ctx.moveTo(20, y);
      ctx.lineTo(canvas.width - 20, y);
      ctx.stroke();
    }
  }, [data]);

  return (
    <div className="chart-container">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ height: '200px' }}
      />
    </div>
  );
};

export default Chart;