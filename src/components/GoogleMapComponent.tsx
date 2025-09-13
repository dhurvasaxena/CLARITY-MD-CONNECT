import React, { useEffect, useRef, useState } from 'react';
import { Wrapper, Status } from '@googlemaps/react-wrapper';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  location: string;
  verified: boolean;
  lat: number;
  lng: number;
  profilePath?: string;
}

interface GoogleMapComponentProps {
  doctors: Doctor[];
  onDoctorClick: (doctor: Doctor) => void;
  onDoctorHover: (doctorId: string | null) => void;
  hoveredDoctorId: string | null;
  activeDoctorId: string | null;
  className?: string;
  isExpanded: boolean;
}

const MapComponent: React.FC<GoogleMapComponentProps> = ({
  doctors,
  onDoctorClick,
  onDoctorHover,
  hoveredDoctorId,
  activeDoctorId,
  className,
  isExpanded
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);
  const [infoWindow, setInfoWindow] = useState<google.maps.InfoWindow | null>(null);

  useEffect(() => {
    if (mapRef.current && !map) {
      const newMap = new google.maps.Map(mapRef.current, {
        center: { lat: 28.6139, lng: 77.2090 }, // New Delhi coordinates
        zoom: isExpanded ? 11 : 10,
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }]
          }
        ]
      });
      setMap(newMap);
    }
  }, [map, isExpanded]);

  useEffect(() => {
    if (map) {
      // Clear existing markers
      markers.forEach(marker => marker.setMap(null));
      
      const newMarkers: google.maps.Marker[] = [];
      const newInfoWindow = new google.maps.InfoWindow();
      setInfoWindow(newInfoWindow);

      doctors.forEach(doctor => {
        const marker = new google.maps.Marker({
          position: { lat: doctor.lat, lng: doctor.lng },
          map,
          title: doctor.name,
          icon: {
            url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
              <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                <circle cx="16" cy="16" r="12" fill="${doctor.verified ? '#10B981' : '#EF4444'}" stroke="white" stroke-width="2"/>
                <text x="16" y="20" text-anchor="middle" fill="white" font-size="12" font-weight="bold">🩺</text>
              </svg>
            `)}`,
            scaledSize: new google.maps.Size(32, 32),
            anchor: new google.maps.Point(16, 32)
          }
        });

        marker.addListener('click', () => {
          onDoctorClick(doctor);
          newInfoWindow.setContent(`
            <div class="p-2">
              <h3 class="font-semibold text-sm">${doctor.name}</h3>
              <p class="text-xs text-gray-600">${doctor.specialty} • ${doctor.location}</p>
              ${doctor.verified ? '<span class="text-xs text-green-600">✓ Verified</span>' : ''}
            </div>
          `);
          newInfoWindow.open(map, marker);
        });

        marker.addListener('mouseover', () => {
          onDoctorHover(doctor.id);
        });

        marker.addListener('mouseout', () => {
          onDoctorHover(null);
        });

        newMarkers.push(marker);
      });

      setMarkers(newMarkers);
    }
  }, [map, doctors, onDoctorClick, onDoctorHover]);

  useEffect(() => {
    if (map && markers.length > 0) {
      const bounds = new google.maps.LatLngBounds();
      markers.forEach(marker => {
        bounds.extend(marker.getPosition()!);
      });
      map.fitBounds(bounds);
      
      // Add some padding
      const listener = google.maps.event.addListener(map, 'idle', () => {
        if (map.getZoom()! > 15) map.setZoom(15);
        google.maps.event.removeListener(listener);
      });
    }
  }, [map, markers]);

  return <div ref={mapRef} className={className} />;
};

const render = (status: Status) => {
  switch (status) {
    case Status.LOADING:
      return (
        <div className="flex items-center justify-center h-full bg-gray-100">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
            <p className="text-sm text-gray-600">Loading map...</p>
          </div>
        </div>
      );
    case Status.FAILURE:
      return (
        <div className="flex items-center justify-center h-full bg-gray-100">
          <div className="text-center">
            <p className="text-sm text-red-600">Failed to load map</p>
            <p className="text-xs text-gray-500 mt-1">Please check your API key</p>
          </div>
        </div>
      );
    default:
      return null;
  }
};

const GoogleMapComponent: React.FC<GoogleMapComponentProps> = (props) => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  // Debug logging
  console.log('Environment variables:', import.meta.env);
  console.log('API Key loaded:', apiKey);

  if (!apiKey) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-100">
        <div className="text-center p-4">
          <p className="text-sm text-red-600 mb-2">Google Maps API Key Required</p>
          <p className="text-xs text-gray-500 mb-2">
            Please add VITE_GOOGLE_MAPS_API_KEY to your .env file
          </p>
          <p className="text-xs text-gray-400">
            Debug: API Key value: {apiKey || 'undefined'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <Wrapper apiKey={apiKey} render={render}>
      <MapComponent {...props} />
    </Wrapper>
  );
};

export default GoogleMapComponent;
