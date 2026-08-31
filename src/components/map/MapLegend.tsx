import React from 'react';

export const MapLegend: React.FC = () => {
  const legendItems = [
    { color: '#ef4444', label: 'High Pollution (AQI > 70)' },
    { color: '#f59e0b', label: 'Moderate Pollution (AQI 50-70)' },
    { color: '#22c55e', label: 'Low Pollution (AQI < 50)' },
  ];
  
  const overlayItems = [
    { icon: '🏙️', label: 'Dubai & UAE Cities' },
    { icon: '🏭', label: 'Industrial Zones (e.g. Jebel Ali)' },
    { icon: '🏫', label: 'Schools & Hospitals (UAE)' },
    { icon: '🌴', label: 'Green/Protected Areas' },
  ];
  
  return (
    <div className="space-y-4">
      <div>
        <h4 className="mb-2 text-sm font-medium text-dark-700">Pollution Levels</h4>
        <div className="space-y-2">
          {legendItems.map((item, index) => (
            <div key={index} className="flex items-center">
              <div
                className="mr-2 h-4 w-4 rounded-full"
                style={{ backgroundColor: item.color }}
              ></div>
              <span className="text-sm">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h4 className="mb-2 text-sm font-medium text-dark-700">Map Overlays</h4>
        <div className="space-y-2">
          {overlayItems.map((item, index) => (
            <div key={index} className="flex items-center">
              <div className="mr-2 text-base">{item.icon}</div>
              <span className="text-sm">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};