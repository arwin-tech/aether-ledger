import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

export const FilterEffectiveness: React.FC = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);
  
  useEffect(() => {
    if (!chartRef.current) return;
    
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    
    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;
    
    chartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Moss Walls', 'HEPA Filters', 'Ionizers', 'Tree Barriers', 'Carbon Scrubbers'],
        datasets: [
          {
            label: 'PM 2.5 Reduction (%)',
            data: [45, 95, 85, 35, 80],
            backgroundColor: 'rgba(28, 174, 253, 0.7)',
            borderColor: 'rgba(28, 174, 253, 1)',
            borderWidth: 1,
          },
          {
            label: 'CO₂ Reduction (%)',
            data: [25, 5, 15, 40, 65],
            backgroundColor: 'rgba(39, 173, 131, 0.7)',
            borderColor: 'rgba(39, 173, 131, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              font: {
                size: 12,
              },
              padding: 20,
            },
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
            boxPadding: 3,
            usePointStyle: true,
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
            max: 100,
            grid: {
              color: '#e2e8f0',
            },
            ticks: {
              color: '#64748b',
              font: {
                size: 12,
              },
              callback: function(value) {
                return value + '%';
              },
            },
          },
        },
      },
    });
    
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);
  
  return (
    <div className="card h-full">
      <h3 className="mb-6 text-xl font-semibold">Filter Effectiveness Comparison</h3>
      
      <div className="chart-container" style={{ height: '300px' }}>
        <canvas ref={chartRef}></canvas>
      </div>
      
      <div className="mt-4 text-center text-sm text-dark-500">
        Data based on controlled environment studies and real-world implementations
      </div>
    </div>
  );
};