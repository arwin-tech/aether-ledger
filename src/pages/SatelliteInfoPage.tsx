import React from 'react';
import { Satellite, Wind, MapPin, Leaf, Building2, HeartPulse, School } from 'lucide-react';

const mockCarbonSources = [
  { id: 1, name: 'Jebel Ali Industrial Zone', type: 'Industrial', coordinates: [25.0657, 55.1713], emission: 'High', direction: 'NE', suggestion: 'Install industrial-grade filters and green buffers' },
  { id: 2, name: 'Sheikh Zayed Road', type: 'Traffic Corridor', coordinates: [25.1972, 55.2744], emission: 'Medium', direction: 'E', suggestion: 'Deploy roadside moss walls and air-purifying plants' },
  { id: 3, name: 'Dubai Creek', type: 'Urban', coordinates: [25.2637, 55.3088], emission: 'Moderate', direction: 'N', suggestion: 'Increase tree cover along the creek' },
];

const mockDispersionPaths = [
  { from: 'Jebel Ali Industrial Zone', to: 'Jumeirah', direction: 'NE', hours: 24 },
  { from: 'Sheikh Zayed Road', to: 'Deira', direction: 'E', hours: 48 },
  { from: 'Dubai Creek', to: 'Sharjah', direction: 'N', hours: 72 },
];

const mockSuggestions = [
  { type: 'Filter', location: 'Al Barsha', suggestion: 'Install urban air filters near schools' },
  { type: 'Company', location: 'Dubai South', suggestion: 'Prefer new company sites upwind of major sources' },
  { type: 'Hospital', location: 'Mirdif', suggestion: 'Site hospitals away from high-dispersion corridors' },
  { type: 'School', location: 'Al Nahda', suggestion: 'Build schools near green buffer zones' },
];

import { SatelliteMap } from '../components/satellite/SatelliteMap';

export const SatelliteInfoPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      {/* Satellite Map Visualization */}
      <div className="mb-14 rounded-xl shadow-lg overflow-hidden">
        <SatelliteMap />
      </div>
      <div className="mb-12 text-center">
        <Satellite className="mx-auto mb-3 h-14 w-14 text-primary-600" />
        <h1 className="text-4xl font-extrabold mb-3 tracking-tight text-dark-900">Satellite & Dispersion Insights</h1>
        <p className="text-lg text-dark-500 max-w-2xl mx-auto">View real-time satellite-based carbon emission sources, dispersion paths, and smart recommendations for Dubai & UAE.</p>
      </div>
      <div className="mb-14 grid gap-8 md:grid-cols-2">
        {/* Carbon Emission Sources */}
        <div className="bg-white rounded-2xl shadow p-6 flex flex-col gap-5">
          <h2 className="text-2xl font-bold flex items-center gap-2 text-primary-700 mb-3">
            <Wind className="h-7 w-7 text-primary-500" /> Carbon Emission Sources
          </h2>
          <ul className="divide-y divide-dark-100">
            {mockCarbonSources.map((src) => (
              <li key={src.id} className="flex flex-col gap-1 py-3 md:flex-row md:items-center md:gap-4 md:py-2">
                <span className="font-semibold text-dark-800 w-48">{src.name}</span>
                <span className="text-xs text-dark-400 font-medium">({src.type})</span>
                <span className={`ml-auto px-2 py-0.5 rounded text-xs font-semibold ${src.emission === 'High' ? 'bg-error-100 text-error-700' : src.emission === 'Medium' ? 'bg-warning-100 text-warning-700' : 'bg-primary-100 text-primary-700'}`}>Emission: {src.emission}</span>
                <span className="ml-4 flex items-center text-xs text-dark-500 font-medium"><Wind className="mr-1 h-4 w-4" />Direction: <span className="ml-1 font-bold text-primary-700">{src.direction}</span></span>
                <span className="ml-4 italic text-green-700">{src.suggestion}</span>
              </li>
            ))}
          </ul>
        </div>
        {/* Dispersion Paths */}
        <div className="bg-white rounded-2xl shadow p-6 flex flex-col gap-5">
          <h2 className="text-2xl font-bold flex items-center gap-2 text-primary-700 mb-3">
            <MapPin className="h-7 w-7 text-primary-500" /> Dispersion Paths
          </h2>
          <ul className="divide-y divide-dark-100">
            {mockDispersionPaths.map((path, i) => (
              <li key={i} className="flex flex-col gap-1 py-3 md:flex-row md:items-center md:gap-4 md:py-2">
                <span className="font-semibold text-dark-800 w-48">{path.from}</span>
                <span className="mx-2 text-lg text-dark-300">→</span>
                <span className="font-semibold text-dark-800 w-32">{path.to}</span>
                <span className="ml-4 flex items-center text-xs text-dark-500 font-medium"><Wind className="mr-1 h-4 w-4" />Direction: <span className="ml-1 font-bold text-primary-700">{path.direction}</span></span>
                <span className="ml-4 text-xs px-2 py-0.5 rounded bg-primary-50 text-primary-700 font-semibold">{path.hours}h forecast</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* Smart Siting Suggestions */}
      <div className="bg-white rounded-2xl shadow p-6 mb-14">
        <h2 className="text-2xl font-bold flex items-center gap-2 text-green-700 mb-3">
          <Leaf className="h-7 w-7 text-green-500" /> Smart Siting Suggestions
        </h2>
        <ul className="divide-y divide-dark-100">
          {mockSuggestions.map((s, i) => (
            <li key={i} className="flex flex-col gap-1 py-3 md:flex-row md:items-center md:gap-4 md:py-2">
              {s.type === 'Filter' && <Leaf className="text-green-600 mr-2 h-5 w-5" />}
              {s.type === 'Company' && <Building2 className="text-blue-600 mr-2 h-5 w-5" />}
              {s.type === 'Hospital' && <HeartPulse className="text-red-600 mr-2 h-5 w-5" />}
              {s.type === 'School' && <School className="text-yellow-600 mr-2 h-5 w-5" />}
              <span className="font-semibold text-dark-800 w-40">{s.location}</span>
              <span className="ml-4 italic text-primary-700">{s.suggestion}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
