import React from 'react';
import { Bell, MapPin, AlertTriangle, AlertCircle, Info } from 'lucide-react';

export const AlertsPanel: React.FC = () => {
  const alerts = [
    {
      id: 1,
      severity: 'high',
      message: 'High pollution detected in Deira district',
      location: 'Deira, Dubai',
      time: '30 minutes ago',
      icon: <AlertTriangle className="h-5 w-5" />,
      iconBg: 'bg-error-100 text-error-600',
    },
    {
      id: 2,
      severity: 'medium',
      message: 'Increased emissions from transportation',
      location: 'Sheikh Zayed Road, Dubai',
      time: '2 hours ago',
      icon: <AlertCircle className="h-5 w-5" />,
      iconBg: 'bg-warning-100 text-warning-600',
    },
    {
      id: 3,
      severity: 'low',
      message: 'Filter deployment recommended near school',
      location: 'GEMS Wellington International School, Dubai',
      time: '1 day ago',
      icon: <Info className="h-5 w-5" />,
      iconBg: 'bg-info-100 text-info-600',
    },
  ];
  
  const getSeverityClass = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-error-100 text-error-800';
      case 'medium':
        return 'bg-warning-100 text-warning-800';
      case 'low':
        return 'bg-info-100 text-info-800';
      default:
        return 'bg-dark-100 text-dark-800';
    }
  };
  
  return (
    <div className="card h-full">
      <div className="mb-4 flex items-center">
        <Bell className="mr-2 h-5 w-5 text-dark-400" />
        <h3 className="text-lg font-semibold">Alerts & Notifications</h3>
      </div>
      
      <div className="space-y-4">
        {alerts.map((alert) => (
          <div key={alert.id} className="flex items-start space-x-3 rounded-lg p-3 hover:bg-dark-50">
            <div className={`rounded-full p-2 ${alert.iconBg}`}>
              {alert.icon}
            </div>
            
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <p className="font-medium">{alert.message}</p>
                <span
                  className={`ml-2 rounded-full px-2 py-0.5 text-xs font-medium ${getSeverityClass(
                    alert.severity
                  )}`}
                >
                  {alert.severity}
                </span>
              </div>
              
              <div className="mt-1 flex items-center text-sm text-dark-500">
                <MapPin className="mr-1 h-3 w-3" />
                {alert.location}
              </div>
              
              <p className="mt-1 text-xs text-dark-400">{alert.time}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4">
        <button className="w-full rounded-lg border border-primary-200 py-2 text-center text-sm font-medium text-primary-600 hover:bg-primary-50">
          View All Alerts
        </button>
      </div>
    </div>
  );
};