"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import L from "leaflet";
import "./map.css";

// Define the Location interface
interface Location {
  id: number;
  name: string;
  position: [number, number];
  calls: number;
}

// Define the component props
interface CallerLocationMapProps {
  locations: Location[];
}

export default function CallerLocationMap({ locations }: CallerLocationMapProps) {
  const [isMounted, setIsMounted] = useState(false);

  // Fix for Leaflet marker icons in Next.js
  useEffect(() => {
    setIsMounted(true);
    
    // Fix the default icon issue with Leaflet in Next.js
    // @ts-ignore - _getIconUrl does exist but TypeScript doesn't recognize it
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
      iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
      shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    });
  }, []);

  // Calculate marker size based on call volume
  const getMarkerSize = (calls: number) => {
    const minSize = 20;
    const maxSize = 60;
    const minCalls = Math.min(...locations.map(loc => loc.calls));
    const maxCalls = Math.max(...locations.map(loc => loc.calls));
    
    // Linear scaling between min and max size
    return minSize + ((calls - minCalls) / (maxCalls - minCalls)) * (maxSize - minSize);
  };

  // Only render the map on the client side
  if (!isMounted) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-muted/30 rounded-md">
        <div className="text-center">
          <div className="h-12 w-12 mx-auto mb-4 text-muted-foreground">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
              <path d="M2 12h20"></path>
            </svg>
          </div>
          <p className="text-muted-foreground">Loading map...</p>
        </div>
      </div>
    );
  }

  return (
    <MapContainer 
      center={[20, 0]} 
      zoom={2} 
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {locations.map((location) => {
        const markerSize = getMarkerSize(location.calls);
        
        return (
          <div key={location.id}>
            <Circle
              center={location.position}
              radius={markerSize * 1000}
              pathOptions={{ 
                fillColor: "#3b82f6", 
                fillOpacity: 0.5, 
                color: "#2563eb",
                weight: 1
              }}
            />
            <Marker position={location.position}>
              <Popup className="caller-map-popup">
                <div className="p-1">
                  <h3 className="font-semibold">{location.name}</h3>
                  <p className="text-sm">{location.calls} calls</p>
                </div>
              </Popup>
            </Marker>
          </div>
        );
      })}
    </MapContainer>
  );
}
