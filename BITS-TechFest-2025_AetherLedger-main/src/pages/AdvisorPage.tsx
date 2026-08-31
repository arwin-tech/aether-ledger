import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, MapPin, Filter, ChevronRight, Leaf, AlertTriangle, ThumbsUp } from 'lucide-react';
import { AdvisorMap } from '../components/advisor/AdvisorMap';
import { RecommendationCard } from '../components/advisor/RecommendationCard';
import { FilterEffectiveness } from '../components/advisor/FilterEffectiveness';

export const AdvisorPage: React.FC = () => {
  const [activeLocation, setActiveLocation] = useState<number | null>(null);
  
  const recommendedLocations = [
    {
      id: 1,
      name: 'GEMS Wellington International School',
      type: 'School Zone',
      risk: 'High',
      population: 2200,
      recommendation: 'Install moss walls and industrial purifiers',
      impact: 'Protects 2,200+ children and 150+ staff',
      coordinates: [25.1121, 55.1796], // Dubai
    },
    {
      id: 2,
      name: 'Dubai Healthcare City',
      type: 'Healthcare',
      risk: 'Critical',
      population: 1200,
      recommendation: 'Deploy HEPA filtration and green buffer zone',
      impact: 'Protects 1,200+ patients and 300+ medical staff',
      coordinates: [25.2285, 55.3273], // Dubai
    },
    {
      id: 3,
      name: 'Al Qusais Residential Area',
      type: 'Residential',
      risk: 'Medium',
      population: 8000,
      recommendation: 'Community air purifiers and tree planting',
      impact: 'Improves air quality for 8,000+ residents',
      coordinates: [25.276987, 55.3617], // Dubai
    },
    {
      id: 4,
      name: 'Sharjah Senior Care Center',
      type: 'Elderly Care',
      risk: 'High',
      population: 600,
      recommendation: 'Indoor filtration systems and outdoor ionizers',
      impact: 'Protects 600+ vulnerable seniors',
      coordinates: [25.3463, 55.4209], // Sharjah
    },
  ];
  
  const handleLocationClick = (id: number) => {
    setActiveLocation(id === activeLocation ? null : id);
  };
  
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Critical':
        return 'text-error-600 bg-error-50';
      case 'High':
        return 'text-warning-600 bg-warning-50';
      case 'Medium':
        return 'text-primary-600 bg-primary-50';
      default:
        return 'text-success-600 bg-success-50';
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-24">
      <div className="mb-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="mb-4 inline-flex items-center text-3xl font-bold md:text-4xl">
            <Lightbulb className="mr-3 h-8 w-8 text-primary-600" />
            Filter Deployment Advisor
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-dark-600">
            Strategically deploy air purification measures to protect vulnerable communities
            from pollutants based on emission forecasts.
          </p>
        </motion.div>
      </div>
      
      <div className="grid gap-8 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="card"
          >
            <h3 className="mb-6 text-xl font-semibold">Recommended Locations</h3>
            
            <div className="space-y-4">
              {recommendedLocations.map((location) => (
                <div
                  key={location.id}
                  className={`cursor-pointer rounded-lg border p-4 transition-colors ${
                    activeLocation === location.id
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-dark-100 hover:border-primary-200 hover:bg-dark-50'
                  }`}
                  onClick={() => handleLocationClick(location.id)}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-primary-600">
                          <MapPin className="h-4 w-4" />
                        </div>
                        <h4 className="ml-2 font-medium">{location.name}</h4>
                      </div>
                      
                      <div className="mt-2 flex items-center space-x-2">
                        <span className="rounded-full bg-dark-100 px-2 py-0.5 text-xs text-dark-600">
                          {location.type}
                        </span>
                        <span className={`rounded-full px-2 py-0.5 text-xs ${getRiskColor(location.risk)}`}>
                          {location.risk} Risk
                        </span>
                      </div>
                      
                      <p className="mt-2 text-sm text-dark-500">
                        <span className="font-medium">{location.population}</span> people affected
                      </p>
                    </div>
                    
                    <ChevronRight
                      className={`h-5 w-5 transition-transform ${
                        activeLocation === location.id ? 'rotate-90 text-primary-600' : 'text-dark-400'
                      }`}
                    />
                  </div>
                  
                  {activeLocation === location.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 border-t border-primary-200 pt-4"
                    >
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm font-medium text-dark-700">Recommendation:</p>
                          <p className="flex items-center text-sm text-dark-600">
                            <Lightbulb className="mr-1 h-4 w-4 text-primary-600" />
                            {location.recommendation}
                          </p>
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium text-dark-700">Impact:</p>
                          <p className="flex items-center text-sm text-success-600">
                            <ThumbsUp className="mr-1 h-4 w-4" />
                            {location.impact}
                          </p>
                        </div>
                        
                        <div className="flex space-x-2">
                          <button className="btn btn-primary btn-sm">View Details</button>
                          <button className="btn btn-outline btn-sm">Implement</button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="mt-6">
              <button className="btn btn-outline w-full">
                View All Recommendations
              </button>
            </div>
          </motion.div>
        </div>
        
        <div className="lg:col-span-3">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="card"
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-semibold">Deployment Map</h3>
              
              <button className="flex items-center rounded-md bg-dark-100 px-3 py-1 text-sm font-medium text-dark-700 hover:bg-dark-200">
                <Filter className="mr-1 h-4 w-4" />
                Filters
              </button>
            </div>
            
            <AdvisorMap
              locations={recommendedLocations}
              activeLocationId={activeLocation}
              onLocationSelect={handleLocationClick}
            />
            
            <div className="mt-6 rounded-lg bg-dark-50 p-4">
              <div className="flex items-start space-x-3">
                <div className="rounded-full bg-warning-100 p-2 text-warning-600">
                  <AlertTriangle className="h-5 w-5" />
                </div>
                
                <div>
                  <h4 className="font-medium">Critical Air Quality Alert</h4>
                  <p className="text-sm text-dark-600">
                    Forecasts predict poor air quality in urban centers over the next 48 hours.
                    Consider implementing recommended filters in high-risk areas.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <RecommendationCard />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <FilterEffectiveness />
        </motion.div>
      </div>
    </div>
  );
};