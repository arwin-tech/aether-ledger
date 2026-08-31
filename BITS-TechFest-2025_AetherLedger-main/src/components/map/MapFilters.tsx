import React from 'react';
import { motion } from 'framer-motion';

export const MapFilters: React.FC = () => {
  return (
    <motion.div
      className="card"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className="mb-4 text-lg font-semibold">Map Filters</h3>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-2">
        <div>
          <label className="block text-sm font-medium text-dark-700">Wind Speed (km/h)</label>
          <input type="range" min="0" max="50" className="w-full" />
        </div>
        <div>
          <label className="block text-sm font-medium text-dark-700">Carbon Emissions (tons CO2e/capita)</label>
          <input type="range" min="0" max="10" step="0.1" className="w-full" />
        </div>
        <div>
          <label className="block text-sm font-medium text-dark-700">Humidity (%)</label>
          <input type="range" min="0" max="100" className="w-full" />
        </div>
        <div>
          <label className="block text-sm font-medium text-dark-700">Temperature (°C)</label>
          <input type="range" min="-10" max="50" className="w-full" />
        </div>
        <div>
          <label className="block text-sm font-medium text-dark-700">Pressure (hPa)</label>
          <input type="range" min="950" max="1050" className="w-full" />
        </div>
        <div>
          <label className="block text-sm font-medium text-dark-700">Visibility (km)</label>
          <input type="range" min="0" max="20" className="w-full" />
        </div>
        <div>
          <label className="block text-sm font-medium text-dark-700">Wind Direction</label>
          <select className="w-full">
            <option>Any</option>
            <option>North</option>
            <option>NE</option>
            <option>East</option>
            <option>SE</option>
            <option>South</option>
            <option>SW</option>
            <option>West</option>
            <option>NW</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-dark-700">Precipitation (mm)</label>
          <input type="range" min="0" max="100" className="w-full" />
        </div>
        <div>
          <label className="block text-sm font-medium text-dark-700">Filter Zones</label>
          <select multiple className="w-full">
            <option>Urban</option>
            <option>Industrial</option>
            <option>Green Zone</option>
            <option>Coastal</option>
          </select>
        </div>
        <div>
          <label className="flex items-center mt-2">
            <input type="checkbox" className="mr-2 h-4 w-4 rounded border-dark-300" />
            Green Zones Only
          </label>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-3">
        <div>
          <h4 className="mb-2 text-sm font-medium text-dark-700">Emission Sources</h4>
          <div className="space-y-2">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2 h-4 w-4 rounded border-dark-300" defaultChecked />
              <span className="text-sm">Industrial</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2 h-4 w-4 rounded border-dark-300" defaultChecked />
              <span className="text-sm">Transportation</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2 h-4 w-4 rounded border-dark-300" defaultChecked />
              <span className="text-sm">Residential</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2 h-4 w-4 rounded border-dark-300" defaultChecked />
              <span className="text-sm">Agricultural</span>
            </label>
          </div>
        </div>
        
        <div>
          <h4 className="mb-2 text-sm font-medium text-dark-700">Pollution Types</h4>
          <div className="space-y-2">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2 h-4 w-4 rounded border-dark-300" defaultChecked />
              <span className="text-sm">Carbon Dioxide (CO₂)</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2 h-4 w-4 rounded border-dark-300" defaultChecked />
              <span className="text-sm">Particulate Matter (PM2.5)</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2 h-4 w-4 rounded border-dark-300" defaultChecked />
              <span className="text-sm">Nitrogen Oxides (NOx)</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2 h-4 w-4 rounded border-dark-300" defaultChecked />
              <span className="text-sm">Sulfur Dioxide (SO₂)</span>
            </label>
          </div>
        </div>
        
        <div>
          <h4 className="mb-2 text-sm font-medium text-dark-700">Overlays</h4>
          <div className="space-y-2">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2 h-4 w-4 rounded border-dark-300" defaultChecked />
              <span className="text-sm">Population Density</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2 h-4 w-4 rounded border-dark-300" defaultChecked />
              <span className="text-sm">Vulnerable Communities</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2 h-4 w-4 rounded border-dark-300" defaultChecked />
              <span className="text-sm">Filter Deployment Zones</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2 h-4 w-4 rounded border-dark-300" defaultChecked />
              <span className="text-sm">Wind Patterns</span>
            </label>
          </div>
        </div>
      </div>
      
      <div className="mt-6 flex justify-end space-x-4">
        <button className="btn bg-dark-100 text-dark-800 hover:bg-dark-200">Reset</button>
        <button className="btn btn-primary">Apply Filters</button>
      </div>
    </motion.div>
  );
};