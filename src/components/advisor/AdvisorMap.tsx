import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet';
import { Lightbulb } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

// Fix for Leaflet marker icons in React
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface Location {
  id: number;
  name: string;
  type: string;
  risk: string;
  population: number;
  recommendation: string;
  impact: string;
  coordinates: [number, number];
}

interface AdvisorMapProps {
  locations: Location[];
  activeLocationId: number | null;
  onLocationSelect: (id: number) => void;
}

export const AdvisorMap: React.FC<AdvisorMapProps> = ({
  locations,
  activeLocationId,
  onLocationSelect,
}) => {
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Critical':
        return '#ef4444';
      case 'High':
        return '#f59e0b';
      case 'Medium':
        return '#3b82f6';
      default:
        return '#22c55e';
    }
  };
  
  return (
    <div className="h-[400px] rounded-xl overflow-hidden">
      <MapContainer
        center={[39.8283, -98.5795]} // Center of the US
        zoom={4}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {locations.map((location) => (
          <React.Fragment key={location.id}>
            <CircleMarker
              center={location.coordinates}
              radius={activeLocationId === location.id ? 30 : 20}
              pathOptions={{
                fillColor: getRiskColor(location.risk),
                fillOpacity: 0.6,
                color: getRiskColor(location.risk),
                weight: activeLocationId === location.id ? 3 : 1,
              }}
              eventHandlers={{
                click: () => onLocationSelect(location.id),
              }}
            />
            
            <Marker position={location.coordinates}>
              <Popup>
                <div className="p-2">
                  <h4 className="font-bold">{location.name}</h4>
                  <p className="text-sm">
                    <span className="font-medium">Type:</span> {location.type}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Risk:</span>{' '}
                    <span style={{ color: getRiskColor(location.risk) }}>{location.risk}</span>
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Population:</span> {location.population}
                  </p>
                  <div className="mt-2 flex items-center text-sm">
                    <Lightbulb className="mr-1 h-4 w-4 text-primary-600" />
                    <span>{location.recommendation}</span>
                  </div>
                </div>
              </Popup>
            </Marker>
          </React.Fragment>
        ))}
      </MapContainer>
    </div>
  );
};