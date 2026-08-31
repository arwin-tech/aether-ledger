import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart2, TrendingUp, Users, AlertTriangle, Activity, BarChart } from 'lucide-react';
import { EmissionsChart } from '../components/dashboard/EmissionsChart';
import { MetricCard } from '../components/dashboard/MetricCard';
import { RecentActivities } from '../components/dashboard/RecentActivities';
import { AlertsPanel } from '../components/dashboard/AlertsPanel';

export const DashboardPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month');
  
  const handleTimeRangeChange = (range: 'week' | 'month' | 'year') => {
    setTimeRange(range);
  };
  
  return (
    <div className="container mx-auto px-4 py-24">
      <div className="mb-8 flex flex-col justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-dark-500">Monitor your emissions and environmental impact</p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="flex rounded-lg border border-dark-200 p-1"
        >
          <button
            onClick={() => handleTimeRangeChange('week')}
            className={`px-4 py-2 text-sm font-medium ${
              timeRange === 'week'
                ? 'rounded-md bg-primary-100 text-primary-800'
                : 'text-dark-600 hover:text-primary-600'
            }`}
          >
            Week
          </button>
          <button
            onClick={() => handleTimeRangeChange('month')}
            className={`px-4 py-2 text-sm font-medium ${
              timeRange === 'month'
                ? 'rounded-md bg-primary-100 text-primary-800'
                : 'text-dark-600 hover:text-primary-600'
            }`}
          >
            Month
          </button>
          <button
            onClick={() => handleTimeRangeChange('year')}
            className={`px-4 py-2 text-sm font-medium ${
              timeRange === 'year'
                ? 'rounded-md bg-primary-100 text-primary-800'
                : 'text-dark-600 hover:text-primary-600'
            }`}
          >
            Year
          </button>
        </motion.div>
      </div>
      
      {/* Metric Cards */}
      <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Emissions"
          value="1,248 kg"
          change="-12%"
          positive={true}
          icon={<BarChart2 className="h-6 w-6" />}
        />
        <MetricCard
          title="Carbon Intensity"
          value="246 g/kWh"
          change="-8%"
          positive={true}
          icon={<TrendingUp className="h-6 w-6" />}
        />
        <MetricCard
          title="Protected People"
          value="5,672"
          change="+24%"
          positive={true}
          icon={<Users className="h-6 w-6" />}
        />
        <MetricCard
          title="High Risk Zones"
          value="3"
          change="-2"
          positive={true}
          icon={<AlertTriangle className="h-6 w-6" />}
        />
      </div>
      
      {/* Charts and Activity */}
      <div className="mb-8 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="card h-full"
          >
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Emissions Over Time</h3>
                <p className="text-sm text-dark-500">CO₂ equivalent in kg</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="flex items-center text-sm text-success-600">
                  <Activity className="mr-1 h-4 w-4" />
                  -8.2% from previous {timeRange}
                </span>
              </div>
            </div>
            <EmissionsChart timeRange={timeRange} />
          </motion.div>
        </div>
        
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="card h-full"
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold">Carbon Sources</h3>
              <BarChart className="h-5 w-5 text-dark-400" />
            </div>
            <div className="space-y-6">
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm text-dark-600">Transportation</span>
                  <span className="text-sm font-medium">48%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-dark-100">
                  <div className="h-2 rounded-full bg-primary-500" style={{ width: '48%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm text-dark-600">Energy</span>
                  <span className="text-sm font-medium">29%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-dark-100">
                  <div className="h-2 rounded-full bg-secondary-500" style={{ width: '29%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm text-dark-600">Food & Diet</span>
                  <span className="text-sm font-medium">14%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-dark-100">
                  <div className="h-2 rounded-full bg-accent-500" style={{ width: '14%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm text-dark-600">Others</span>
                  <span className="text-sm font-medium">9%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-dark-100">
                  <div className="h-2 rounded-full bg-warning-500" style={{ width: '9%' }}></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Recent Activity and Alerts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <RecentActivities />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <AlertsPanel />
        </motion.div>
      </div>
    </div>
  );
};