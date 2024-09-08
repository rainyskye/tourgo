'use client';

import { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

const Map: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
        version: 'weekly',
      });

      try {
        const google = await loader.load();
        const { Map, Marker } = google.maps;

        if (mapRef.current) {
          const mapOptions = {
            center: userLocation || { lat: 0, lng: 0 },
            zoom: userLocation ? 15 : 2,
            disableDefaultUI: true,
            zoomControl: true,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: false,
          };

          const map = new Map(mapRef.current, mapOptions);

          if (userLocation) {
            new Marker({
              position: userLocation,
              map: map,
              title: 'Your Location'
            });
          }
        }
      } catch (error) {
        console.error('Error loading Google Maps:', error);
      }
    };

    if (userLocation) {
      initMap();
    }
  }, [userLocation]);

  useEffect(() => {
    const getUserLocation = () => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setUserLocation({ lat: latitude, lng: longitude });
          },
          (error) => {
            console.error('Error getting user location:', error);
            // If geolocation fails, we could set a default location or handle the error as needed
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
        // Handle lack of geolocation support
      }
    };

    getUserLocation();
  }, []);

  return <div ref={mapRef} className="w-full h-full" />;
};

export default Map;