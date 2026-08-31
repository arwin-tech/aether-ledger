import React from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

interface TimelineSliderProps {
  value: number;
  onChange: (value: 0 | 24 | 48 | 72) => void;
}

export const TimelineSlider: React.FC<TimelineSliderProps> = ({ value, onChange }) => {
  const timePoints = [
    { value: 0, label: 'Now' },
    { value: 24, label: '24h' },
    { value: 48, label: '48h' },
    { value: 72, label: '72h' },
  ];
  
  return (
    <div className="px-4">
      <div className="mb-2 flex items-center">
        <Clock className="mr-2 h-5 w-5 text-primary-600" />
        <span className="font-medium">Time Forecast</span>
      </div>
      
      <div className="relative mb-2 h-2 rounded-full bg-dark-100">
        <motion.div
          className="absolute left-0 top-0 h-2 rounded-full bg-primary-600"
          initial={{ width: '0%' }}
          animate={{ width: `${(value / 72) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
        
        {timePoints.map((point) => (
          <motion.button
            key={point.value}
            type="button"
            className={`absolute top-0 -ml-3 h-6 w-6 -translate-y-1/4 transform rounded-full border-2 ${
              value === point.value
                ? 'border-primary-600 bg-white'
                : 'border-dark-200 bg-white'
            }`}
            style={{ left: `${(point.value / 72) * 100}%` }}
            onClick={() => onChange(point.value as 0 | 24 | 48 | 72)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>
      
      <div className="flex justify-between text-sm text-dark-500">
        {timePoints.map((point) => (
          <div
            key={point.value}
            className={`text-center ${
              value === point.value ? 'font-medium text-primary-600' : ''
            }`}
            style={{ width: '25%' }}
          >
            {point.label}
          </div>
        ))}
      </div>
    </div>
  );
};