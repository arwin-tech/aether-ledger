import React from 'react';
import { Clock, Car, Home, ShoppingBag, Lightbulb } from 'lucide-react';

export const RecentActivities: React.FC = () => {
  const activities = [
    {
      id: 1,
      type: 'transport',
      description: 'Commute to work',
      time: '2 hours ago',
      emissions: '3.2 kg CO₂',
      icon: <Car className="h-5 w-5" />,
      iconBg: 'bg-primary-100 text-primary-600',
    },
    {
      id: 2,
      type: 'home',
      description: 'Electricity consumption',
      time: '4 hours ago',
      emissions: '1.8 kg CO₂',
      icon: <Home className="h-5 w-5" />,
      iconBg: 'bg-secondary-100 text-secondary-600',
    },
    {
      id: 3,
      type: 'purchase',
      description: 'Grocery shopping',
      time: 'Yesterday',
      emissions: '4.5 kg CO₂',
      icon: <ShoppingBag className="h-5 w-5" />,
      iconBg: 'bg-accent-100 text-accent-600',
    },
    {
      id: 4,
      type: 'suggestion',
      description: 'Installed air purifier',
      time: '2 days ago',
      impact: 'Protects 12 people',
      icon: <Lightbulb className="h-5 w-5" />,
      iconBg: 'bg-success-100 text-success-600',
    },
  ];
  
  return (
    <div className="card h-full">
      <div className="mb-4 flex items-center">
        <Clock className="mr-2 h-5 w-5 text-dark-400" />
        <h3 className="text-lg font-semibold">Recent Activities</h3>
      </div>
      
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3 rounded-lg p-3 hover:bg-dark-50">
            <div className={`rounded-full p-2 ${activity.iconBg}`}>
              {activity.icon}
            </div>
            
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <p className="font-medium">{activity.description}</p>
                <span className="text-xs text-dark-500">{activity.time}</span>
              </div>
              
              {'emissions' in activity ? (
                <p className="text-sm text-dark-500">
                  Emissions: <span className="font-medium">{activity.emissions}</span>
                </p>
              ) : (
                <p className="text-sm text-success-600">
                  <span className="font-medium">{activity.impact}</span>
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4">
        <button className="w-full rounded-lg border border-primary-200 py-2 text-center text-sm font-medium text-primary-600 hover:bg-primary-50">
          View All Activities
        </button>
      </div>
    </div>
  );
};