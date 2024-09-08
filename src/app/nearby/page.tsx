'use client';

import React, { useState, useEffect } from 'react';
import { customLocations, Location } from '@/data/locations';
import { Phone, MapPin, Tag, Navigation } from 'lucide-react';

interface LocationWithDistance extends Location {
  distance: number;
  phoneNumber: string;
  address: string;
  promotions: string[];
}

const NearbyPage: React.FC = () => {
  const [userLocation, setUserLocation] = useState<GeolocationCoordinates | null>(null);
  const [nearbyLocations, setNearbyLocations] = useState<LocationWithDistance[]>([]);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation(position.coords);
        },
        (error) => {
          console.error('Error getting user location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

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
          phoneNumber: location.phoneNumber || 'No Phone Number Available',
          address: location.address || 'No Address Available',
          promotions: location.promotions || ['No Promotions Available'],
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
    const destinationParam = encodeURIComponent(address !== 'No Address Available' 
      ? address 
      : `${lat},${lng}`);
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${destinationParam}`, '_blank');
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Nearby Locations</h1>
      {userLocation ? (
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
    </div>
  );
};

export default NearbyPage;