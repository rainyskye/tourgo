'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { customLocations, Location } from '@/data/locations';
import { Phone, MapPin, Tag, Navigation, AlertCircle } from 'lucide-react';
import ScrollablePage from '@/components/ScrollablePage';

interface LocationWithDistance extends Location {
  distance: number;
  phoneNumber: string;
  address: string;
  promotions: string[];
}

const NearbyPage: React.FC = () => {
  const [userLocation, setUserLocation] = useState<GeolocationCoordinates | null>(null);
  const [nearbyLocations, setNearbyLocations] = useState<LocationWithDistance[]>([]);
  const [locationError, setLocationError] = useState<string | null>(null);

  const getUserLocation = useCallback(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation(position.coords);
          setLocationError(null);
        },
        (error) => {
          console.error('Geolocation error:', error);
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
          timeout: 5000,
          maximumAge: 0
        }
      );
    } else {
      setLocationError("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    getUserLocation();
  }, [getUserLocation]);

  useEffect(() => {
    if (userLocation) {
      const locationsWithDistance = customLocations.map(location => {
        const distance = calculateDistance(
          userLocation.latitude,
          userLocation.longitude,
          location.lat,
          location.lng
        );
        return { 
          ...location, 
          distance,
          phoneNumber: location.phoneNumber || '000-000-0000',
          address: location.address || '123 Example St, City, Country',
          promotions: location.promotions || ['10% off first visit'],
        };
      });

      const sortedLocations = locationsWithDistance.sort((a, b) => a.distance - b.distance);
      setNearbyLocations(sortedLocations);
    }
  }, [userLocation]);

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return Math.round(d * 10) / 10; // Round to 1 decimal place
  };

  const deg2rad = (deg: number): number => {
    return deg * (Math.PI / 180);
  };

  const handleCall = (phoneNumber: string) => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const handleGetDirections = (address: string, lat: number, lng: number) => {
    const destinationParam = encodeURIComponent(address !== '123 Example St, City, Country' 
      ? address 
      : `${lat},${lng}`);
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${destinationParam}`, '_blank');
  };

  return (
    <ScrollablePage title="Nearby Locations">
      {locationError ? (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4" role="alert">
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
      ) : userLocation ? (
        <ul className="space-y-6">
          {nearbyLocations.map(location => (
            <li key={location.id} className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-2">{location.name}</h2>
              <p className="text-gray-600 mb-3">{location.description}</p>
              
              <div className="flex items-center text-gray-500 mb-2">
                <MapPin size={18} className="mr-2" />
                <span>{location.address}</span>
              </div>
              
              <div className="flex items-center text-gray-500 mb-2">
                <Phone size={18} className="mr-2" />
                <span>{location.phoneNumber}</span>
              </div>
              
              <div className="flex items-center text-blue-600 mb-3">
                <Navigation size={18} className="mr-2" />
                <span>{location.distance} km away</span>
              </div>
              
              <div className="mb-4">
                {location.promotions.map((promo, index) => (
                  <span key={index} className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded mr-2 mb-2">
                    <Tag size={14} className="inline mr-1" />
                    {promo}
                  </span>
                ))}
              </div>
              
              <div className="flex space-x-4">
                <button
                  onClick={() => handleCall(location.phoneNumber)}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                  Call
                </button>
                <button
                  onClick={() => handleGetDirections(location.address, location.lat, location.lng)}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                >
                  Get Directions
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading your location...</p>
      )}
    </ScrollablePage>
  );
};

export default NearbyPage;