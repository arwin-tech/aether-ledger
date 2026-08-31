import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowUp } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  positive: boolean;
  icon: React.ReactNode;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  positive,
  icon,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="card"
    >
      <div className="flex items-center justify-between">
        <div className="rounded-full bg-primary-100 p-3 text-primary-600">
          {icon}
        </div>
        
        <div
          className={`flex items-center rounded-full px-2 py-1 text-xs font-medium ${
            positive ? 'bg-success-100 text-success-800' : 'bg-error-100 text-error-800'
          }`}
        >
          {positive ? (
            <ArrowDown className="mr-1 h-3 w-3" />
          ) : (
            <ArrowUp className="mr-1 h-3 w-3" />
          )}
          {change}
        </div>
      </div>
      
      <div className="mt-4">
        <p className="text-sm text-dark-500">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </motion.div>
  );
};