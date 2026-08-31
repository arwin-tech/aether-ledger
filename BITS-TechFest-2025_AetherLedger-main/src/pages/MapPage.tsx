import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Map, Gauge, Wind, Calendar, Filter, Clock } from 'lucide-react';
import { EmissionMap } from '../components/map/EmissionMap';
import { TimelineSlider } from '../components/map/TimelineSlider';
import { MapLegend } from '../components/map/MapLegend';
import { MapFilters } from '../components/map/MapFilters';

export const MapPage: React.FC = () => {
  const [forecastDay, setForecastDay] = useState<0 | 24 | 48 | 72>(24);
  const [showFilters, setShowFilters] = useState(false);
  
  const handleForecastChange = (hours: 0 | 24 | 48 | 72) => {
    setForecastDay(hours);
  };
  
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };
  
  const mapData = {
    currentTime: new Date().toLocaleString(),
    windSpeed: '15 km/h',
    windDirection: 'North-East',
    pollutionIndex: 72,
  };
  
  return (
    <div className="container mx-auto px-4 py-24">
      <div className="mb-8 flex flex-col justify-between md:flex-row md:items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className="text-3xl font-bold">Emission Dispersion Map</h1>
          <p className="text-dark-500">
            Visualize where emissions are predicted to travel over time
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-4 flex space-x-2 md:mt-0"
        >
          <button
            onClick={toggleFilters}
            className="btn btn-outline flex items-center"
          >
            <Filter className="mr-2 h-5 w-5" />
            Filters
          </button>
          
          <select
            className="rounded-lg border border-dark-200 bg-white px-4 py-2 font-medium text-dark-800"
            value={forecastDay}
            onChange={(e) => handleForecastChange(Number(e.target.value) as 0 | 24 | 48 | 72)}
          >
            <option value={0}>Current</option>
            <option value={24}>24h Forecast</option>
            <option value={48}>48h Forecast</option>
            <option value={72}>72h Forecast</option>
          </select>
        </motion.div>
      </div>
      
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-6"
        >
          <MapFilters />
        </motion.div>
      )}
      
      <div className="grid gap-6 lg:grid-cols-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-3"
        >
          <div className="card h-full">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="flex items-center text-lg font-semibold">
                <Map className="mr-2 h-5 w-5 text-primary-600" />
                Pollution Dispersion
              </h3>
              
              <div className="flex items-center space-x-2 text-sm text-dark-500">
                <Clock className="h-4 w-4" />
                <span>Updated: {mapData.currentTime}</span>
              </div>
            </div>
            
            <EmissionMap forecastHours={forecastDay} />
            
            <div className="mt-4">
              <TimelineSlider value={forecastDay} onChange={handleForecastChange} />
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-6"
        >
          {/* Pollution Index */}
          <div className="card">
            <h3 className="mb-4 flex items-center text-lg font-semibold">
              <Gauge className="mr-2 h-5 w-5 text-primary-600" />
              Air Quality Index
            </h3>
            
            <div className="flex justify-center">
              <div className="relative h-40 w-40">
                <div
                  className="absolute inset-0 rounded-full border-8 border-dark-100"
                  style={{ clipPath: 'polygon(0 100%, 50% 50%, 100% 100%)' }}
                ></div>
                
                <div
                  className="absolute inset-0 rounded-full border-8"
                  style={{
                    borderColor: mapData.pollutionIndex > 80 ? '#ef4444' : 
                               mapData.pollutionIndex > 50 ? '#f59e0b' : '#22c55e',
                    clipPath: `polygon(0 100%, 50% 50%, ${Math.min((mapData.pollutionIndex / 100) * 100, 100)}% 100%)`,
                  }}
                ></div>
                
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-center">
                  <div className="text-3xl font-bold">{mapData.pollutionIndex}</div>
                  <div className="text-sm text-dark-500">AQI</div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 flex justify-between text-sm">
              <span className="text-success-600">Good</span>
              <span className="text-warning-600">Moderate</span>
              <span className="text-error-600">Poor</span>
            </div>
          </div>
          
          {/* Wind Info */}
          <div className="card">
            <h3 className="mb-4 flex items-center text-lg font-semibold">
              <Wind className="mr-2 h-5 w-5 text-primary-600" />
              Wind Conditions
            </h3>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-dark-500">Wind Speed</p>
                <p className="text-xl font-medium">{mapData.windSpeed}</p>
              </div>
              
              <div>
                <p className="text-sm text-dark-500">Wind Direction</p>
                <p className="text-xl font-medium">{mapData.windDirection}</p>
              </div>
              
              <div className="flex justify-center">
                <div className="relative h-20 w-20">
                  <div className="absolute inset-0 rounded-full border border-dark-200"></div>
                  <div
                    className="absolute left-1/2 top-1/2 h-14 w-1 -translate-x-1/2 -translate-y-1/2 transform bg-primary-600"
                    style={{ rotate: '45deg', transformOrigin: 'center bottom' }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Legend */}
          <div className="card">
            <h3 className="mb-4 flex items-center text-lg font-semibold">
              <Calendar className="mr-2 h-5 w-5 text-primary-600" />
              Map Legend
            </h3>
            
            <MapLegend />
          </div>
        </motion.div>
      </div>
    </div>
  );
};