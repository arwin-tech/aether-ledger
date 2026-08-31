import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

interface EmissionsChartProps {
  timeRange: 'week' | 'month' | 'year';
}

export const EmissionsChart: React.FC<EmissionsChartProps> = ({ timeRange }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);
  
  useEffect(() => {
    if (!chartRef.current) return;
    
    // Destroy existing chart
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    
    // Generate data based on time range
    let labels: string[] = [];
    let data: number[] = [];
    
    if (timeRange === 'week') {
      labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      data = [42, 38, 45, 40, 35, 28, 30];
    } else if (timeRange === 'month') {
      labels = Array.from({ length: 30 }, (_, i) => `${i + 1}`);
      data = Array.from({ length: 30 }, () => Math.floor(Math.random() * 30) + 25);
    } else if (timeRange === 'year') {
      labels = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
      ];
      data = [120, 115, 105, 95, 90, 85, 80, 83, 90, 110, 100, 95];
    }
    
    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;
    
    // Create gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(28, 174, 253, 0.2)');
    gradient.addColorStop(1, 'rgba(28, 174, 253, 0)');
    
    // Create chart
    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'CO₂ Emissions (kg)',
            data,
            borderColor: '#078DF4',
            backgroundColor: gradient,
            tension: 0.4,
            fill: true,
            pointBackgroundColor: '#078DF4',
            pointBorderColor: '#ffffff',
            pointBorderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 6,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            mode: 'index',
            intersect: false,
            backgroundColor: '#ffffff',
            titleColor: '#0f172a',
            bodyColor: '#64748b',
            borderColor: '#e2e8f0',
            borderWidth: 1,
            padding: 12,
            boxPadding:
            3,
            usePointStyle: true,
            callbacks: {
              label: function(context) {
                return `Emissions: ${context.parsed.y} kg CO₂`;
              }
            }
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
            ticks: {
              color: '#64748b',
              font: {
                size: 12,
              },
            },
          },
          y: {
            beginAtZero: true,
            grid: {
              color: '#e2e8f0',
            },
            ticks: {
              color: '#64748b',
              font: {
                size: 12,
              },
              callback: function(value) {
                return value + ' kg';
              },
            },
          },
        },
        interaction: {
          mode: 'nearest',
          axis: 'x',
          intersect: false,
        },
      },
    });
    
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [timeRange]);
  
  return (
    <div className="chart-container" style={{ height: '300px' }}>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};