'use client';
import React, { useState, useCallback, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { customLocations } from '@/data/locations';
import { AlertCircle, Info } from 'lucide-react';

const containerStyle = {
  width: '100%',
  height: '100%',
};

const initialCenter = {
  lat: 0,
  lng: 0
};

const Map: React.FC = () => {
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [userLocation, setUserLocation] = useState<google.maps.LatLngLiteral | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<string>('');

  const addDebugInfo = (info: string) => {
    setDebugInfo(prev => `${prev}\n${info}`);
  };

  const getUserLocation = useCallback(() => {
    addDebugInfo('Attempting to get user location...');
    if ('geolocation' in navigator) {
      addDebugInfo('Geolocation is available');
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userPos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          addDebugInfo(`Location obtained: ${JSON.stringify(userPos)}`);
          setUserLocation(userPos);
          setLocationError(null);
          if (map) {
            map.setCenter(userPos);
            map.setZoom(12);
            addDebugInfo('Map centered on user location');
          } else {
            addDebugInfo('Map not available to center');
          }
        },
        (error) => {
          console.error('Geolocation error:', error);
          addDebugInfo(`Geolocation error: ${error.code} - ${error.message}`);
          switch(error.code) {
            case error.PERMISSION_DENIED:
              setLocationError("Location access was denied. Please enable location services.");
              break;
            case error.POSITION_UNAVAILABLE:
              setLocationError("Location information is unavailable. Please try again later.");
              break;
            case error.TIMEOUT:
              setLocationError("The request to get your location timed out. Please try again.");
              break;
            default:
              setLocationError("An unknown error occurred while trying to get your location.");
              break;
          }
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    } else {
      addDebugInfo('Geolocation is not supported by this browser.');
      setLocationError("Geolocation is not supported by this browser.");
    }
  }, [map]);

  useEffect(() => {
    if (isLoaded) {
      addDebugInfo('Map script loaded successfully');
      getUserLocation();
    }
  }, [isLoaded, getUserLocation]);

  const onLoad = useCallback((map: google.maps.Map) => {
    addDebugInfo('Map loaded');
    const bounds = new window.google.maps.LatLngBounds(initialCenter);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>;
  }

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <>
      {locationError && (
        <div className="absolute top-4 left-4 right-4 z-10 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4" role="alert">
          <div className="flex items-center">
            <AlertCircle className="h-6 w-6 text-yellow-500 mr-4" />
            <p>{locationError}</p>
          </div>
          <button 
            onClick={getUserLocation} 
            className="mt-2 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
          >
            Retry Location Access
          </button>
        </div>
      )}
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={userLocation || initialCenter}
        zoom={userLocation ? 12 : 2}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          fullscreenControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          zoomControl: false,
        }}
      >
        {userLocation && (
          <Marker
            position={userLocation}
            icon={{
              url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
              scaledSize: new window.google.maps.Size(50, 50)
            }}
          />
        )}
        {customLocations.map((location) => (
          <Marker
            key={location.id}
            position={{ lat: location.lat, lng: location.lng }}
            title={location.name}
          />
        ))}
      </GoogleMap>
      <div className="absolute bottom-4 left-4 right-4 z-10 bg-white bg-opacity-75 p-4 rounded">
        <details>
          <summary className="flex items-center cursor-pointer">
            <Info className="h-6 w-6 mr-2" />
            Debug Information
          </summary>
          <pre className="mt-2 text-xs whitespace-pre-wrap">{debugInfo}</pre>
        </details>
      </div>
    </>
  );
};

export default Map;