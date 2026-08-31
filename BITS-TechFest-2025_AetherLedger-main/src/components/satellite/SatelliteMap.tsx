import React from 'react';
import { MapContainer, TileLayer, Circle, Polyline, Polygon, Popup, Marker, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Custom icons for map overlays
const icons = {
  factory: new L.DivIcon({ html: '🏭', className: '', iconSize: [24, 24] }),
  hospital: new L.DivIcon({ html: '🏥', className: '', iconSize: [24, 24] }),
  school: new L.DivIcon({ html: '🏫', className: '', iconSize: [24, 24] }),
  filter: new L.DivIcon({ html: '🌿', className: '', iconSize: [24, 24] }),
  arrow: (angle: number) => new L.DivIcon({ html: `<span style='display:inline-block;transform:rotate(${angle}deg);font-size:22px;'>➤</span>`, className: '', iconSize: [24, 24] })
};

// Example emission sources, dispersion paths, and restricted zones for Dubai/UAE
const emissionSources = [
  {
    id: 1,
    name: 'Jebel Ali Industrial Zone',
    position: [25.0657, 55.1713],
    intensity: 90,
    direction: 'NE',
    color: '#f87171',
    advice: 'Avoid placing residential or sensitive sites downwind.'
  },
  {
    id: 2,
    name: 'Sheikh Zayed Road',
    position: [25.1972, 55.2744],
    intensity: 60,
    direction: 'E',
    color: '#fbbf24',
    advice: 'Consider green barriers for pollution interception.'
  },
  {
    id: 3,
    name: 'Dubai Creek',
    position: [25.2637, 55.3088],
    intensity: 40,
    direction: 'N',
    color: '#34d399',
    advice: 'Tree planting can help reduce urban emissions.'
  },
];

// Example dispersion paths (mock wind/pollution flows)
const dispersionPaths = [
  { from: [25.0657, 55.1713], to: [25.1800, 55.2600], color: '#f87171' }, // Jebel Ali → Jumeirah
  { from: [25.1972, 55.2744], to: [25.2700, 55.3200], color: '#fbbf24' }, // SZR → Deira
  { from: [25.2637, 55.3088], to: [25.4000, 55.4200], color: '#34d399' }, // Creek → Sharjah
];

// Example restricted zones (avoid for new factories/hospitals/schools)
const restrictedZones = [
  {
    name: 'Downwind Risk Zone',
    positions: [
      [25.10, 55.19], [25.12, 55.25], [25.18, 55.26], [25.16, 55.20]
    ],
    color: '#fbbf24',
    advice: 'Avoid new construction in this zone due to high downwind exposure.'
  }
];

// Example recommended factory zone (upwind, low risk)
const recommendedFactoryZone = [
  [25.00, 55.10], [25.02, 55.13], [25.04, 55.12], [25.03, 55.09]
];

export const SatelliteMap: React.FC = () => (
  <MapContainer center={[25.25, 55.30]} zoom={10} style={{ height: '420px', width: '100%' }}>
    <TileLayer
      attribution='&copy; OpenStreetMap contributors'
      url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    />
    {/* Emission Sources */}
    {emissionSources.map(src => (
      <React.Fragment key={src.id}>
        <Circle
          center={src.position as [number, number]}
          radius={3500 + src.intensity * 20}
          pathOptions={{ color: src.color, fillOpacity: 0.5 }}
        >
          <Tooltip direction="top" offset={[0, -20]} permanent>
            <span style={{fontWeight:'bold',color:src.color}}>{src.intensity}</span>
          </Tooltip>
          <Popup>
            <b>{src.name}</b><br />
            Emission Intensity: {src.intensity}<br />
            Wind Direction: {src.direction}<br />
            <span style={{ color: src.color }}>{src.advice}</span>
          </Popup>
        </Circle>
        {/* Factory icon for industrial sources */}
        {src.name.includes('Industrial') && (
          <Marker position={src.position as [number, number]} icon={icons.factory}>
            <Tooltip direction="bottom" offset={[0, 18]} permanent>Factory</Tooltip>
          </Marker>
        )}
        {/* Wind direction arrow */}
        <Marker position={src.position as [number, number]} icon={icons.arrow(src.direction==='NE'?45:src.direction==='E'?90:src.direction==='N'?0:0)} interactive={false}/>
      </React.Fragment>
    ))}    
    {/* Example: add hospital, school, filter icons at certain places */}
    <Marker position={[25.2285, 55.3273]} icon={icons.hospital}><Tooltip direction="right" offset={[12,0]} permanent>Hospital</Tooltip></Marker>
    <Marker position={[25.1121, 55.1796]} icon={icons.school}><Tooltip direction="right" offset={[12,0]} permanent>School</Tooltip></Marker>
    <Marker position={[25.315, 55.380]} icon={icons.filter}><Tooltip direction="right" offset={[12,0]} permanent>Filter Site</Tooltip></Marker>
    {/* Dispersion Paths */}
    {dispersionPaths.map((path, i) => (
      <Polyline
        key={i}
        positions={[path.from as [number, number], path.to as [number, number]]}
        pathOptions={{ color: path.color, dashArray: '8 8', weight: 4 }}
      />
    ))}
    {/* Restricted Zones */}
    {restrictedZones.map((zone, i) => (
      <Polygon
        key={i}
        positions={zone.positions as [number, number][]}
        pathOptions={{ color: zone.color, fillOpacity: 0.2 }}
      >
        <Popup>
          <b>{zone.name}</b><br />
          <span style={{ color: zone.color }}>{zone.advice}</span>
        </Popup>
      </Polygon>
    ))}
    {/* Recommended Factory Zone */}
    <Polygon
      positions={recommendedFactoryZone as [number, number][]}
      pathOptions={{ color: '#2563eb', fillOpacity: 0.25 }}
    >
      <Popup>
        <b>Recommended Factory Zone</b><br />
        Upwind, low risk of emissions spreading across country.
      </Popup>
    </Polygon>
  </MapContainer>
);
