import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Circle, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

interface EmissionMapProps {
  forecastHours: number;
}

// List of hotspots with their coordinates and details
const getHotspots = (forecastHours: number) => {
  // Base hotspots (current emissions)
  const baseHotspots = [
    // Dubai, UAE example data
    {
      id: 1,
      position: [25.276987, 55.296249], // Dubai
      intensity: 70,
      radius: 22000,
      name: 'Dubai Metropolitan Area',
      source: 'Urban & industrial emissions',
      population: 3700000,
      type: 'Urban',
      risk: 'Moderate',
      category: 'Metropolis',
      AQI: 70,
      PM25: 35,
      PM10: 60,
      NO2: 45,
      SO2: 10,
      CO: 0.7,
      O3: 25,
      notes: 'Expo 2025 preparations, increased monitoring',
      lastUpdated: '2025-05-10T11:49:32+04:00',
      icon: '🏙️',
    },
    {
      id: 2,
      position: [24.453884, 54.3773438], // Abu Dhabi
      intensity: 65,
      radius: 18000,
      name: 'Abu Dhabi City',
      source: 'Urban emissions',
      population: 1500000,
      type: 'Urban',
      risk: 'Moderate',
      category: 'Capital',
      AQI: 65,
      PM25: 30,
      PM10: 50,
      NO2: 40,
      SO2: 8,
      CO: 0.6,
      O3: 20,
      notes: 'Governmental and administrative center',
      lastUpdated: '2025-05-10T11:49:32+04:00',
      icon: '🏙️',
    },
    {
      id: 3,
      position: [25.4052165, 55.5136433], // Sharjah
      intensity: 55,
      radius: 15000,
      name: 'Sharjah',
      source: 'Urban emissions',
      population: 1400000,
      type: 'Urban',
      risk: 'Low',
      category: 'City',
      AQI: 55,
      PM25: 25,
      PM10: 40,
      NO2: 30,
      SO2: 6,
      CO: 0.5,
      O3: 18,
      notes: 'Cultural capital of UAE',
      lastUpdated: '2025-05-10T11:49:32+04:00',
      icon: '🏙️',
    },
    {
      id: 4,
      position: [25.0657, 55.1713], // Jebel Ali Industrial
      intensity: 80,
      radius: 12000,
      name: 'Jebel Ali Industrial Zone',
      source: 'Industrial emissions',
      population: 100000,
      type: 'Industrial',
      risk: 'High',
      category: 'Industrial Zone',
      AQI: 80,
      PM25: 50,
      PM10: 90,
      NO2: 60,
      SO2: 20,
      CO: 1.2,
      O3: 35,
      notes: 'Major port and industrial hub',
      lastUpdated: '2025-05-10T11:49:32+04:00',
      icon: '🏭',
      windSpeed: 22, // km/h
      carbonEmissions: 6.2, // tons CO2e per capita
      humidity: 48, // %
      temperature: 38, // Celsius
      pressure: 1010, // hPa
      visibility: 8, // km
      windDirection: 'W',
      precipitation: 0, // mm
      filterZones: ['Industrial'],
      isGreenZone: false,
    },
  ];

  // Simulate dispersion of emissions based on forecast hours
  if (forecastHours === 0) {
    return baseHotspots;
  }

  // Apply transformations to simulate dispersion over time
  return baseHotspots.map(hotspot => {
    // Simulate wind effect by shifting coordinates
    // This is a simplistic model - in a real app, would use actual wind data
    const lat = hotspot.position[0] + (forecastHours / 72) * 0.5; // Move north with time
    const lng = hotspot.position[1] + (forecastHours / 48) * 0.8; // Move east with time

    // Simulate dispersion by increasing radius and decreasing intensity
    const radiusMultiplier = 1 + (forecastHours / 24) * 0.5;
    const intensityReduction = (forecastHours / 24) * 15;

    return {
      ...hotspot,
      position: [lat, lng] as [number, number],
      radius: hotspot.radius * radiusMultiplier,
      intensity: Math.max(20, hotspot.intensity - intensityReduction),
    };
  });
};

const MapUpdater: React.FC<{ hotspots: any[] }> = ({ hotspots }) => {
  const map = useMap();

  useEffect(() => {
    if (hotspots.length > 0) {
      // Calculate bounds that include all hotspots
      const bounds = hotspots.reduce(
        (acc, hotspot) => acc.extend(hotspot.position),
        map.getBounds()
      );

      // Fit the map to these bounds with some padding
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [map, hotspots]);

  return null;
};

export const EmissionMap: React.FC<EmissionMapProps> = ({ forecastHours }) => {
  const hotspots = getHotspots(forecastHours);

  // Function to determine circle color based on intensity
  const getCircleColor = (intensity: number) => {
    if (intensity > 70) return '#ef4444'; // Red for high intensity
    if (intensity > 50) return '#f59e0b'; // Orange for medium intensity
    return '#22c55e'; // Green for low intensity
  };

  return (
    <div className="h-[500px] rounded-xl overflow-hidden">
      <MapContainer
        center={[24.774265, 54.738937]} // Center of UAE
        zoom={7}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        <MapUpdater hotspots={hotspots} />

        
        {hotspots.map((hotspot) => (
          <Circle
            key={hotspot.id}
            center={hotspot.position}
            radius={hotspot.radius}
            pathOptions={{
              fillColor: getCircleColor(hotspot.intensity),
              fillOpacity: 0.5,
              color: getCircleColor(hotspot.intensity),
              weight: 1,
            }}
          >
            <Popup>
              <div className="p-1">
                <h4 className="font-bold">{hotspot.name}</h4>
                <p className="text-sm">Source: {hotspot.source}</p>
                <p className="text-sm">
                  Intensity: <span className="font-medium">{hotspot.intensity}</span>
                </p>
                <p className="text-sm">
                  Forecast: <span className="font-medium">{forecastHours}h</span>
                </p>
              </div>
            </Popup>
          </Circle>
        ))}
      </MapContainer>
    </div>
  );
};