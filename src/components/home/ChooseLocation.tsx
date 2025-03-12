"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { RiSendPlaneLine, RiMapPinUserFill, RiUser3Line, RiGpsFill } from "react-icons/ri";
import { useRouter } from 'next/navigation';
import useOSRMRoute from '@/hooks/useOSRMRoute';
import { instance } from "@/constants/apis/instance";

type Coordinates = { lat: number | null; lon: number | null };

interface Suggestion {
  properties: { osm_id: string; name: string; city: string; state: string; country: string };
  geometry: { coordinates: [number, number] }; // [lon, lat]
}

const BBOX = "68.1097,6.4627,97.3956,35.5133"; // Define bbox as a constant

const ChooseLocation = () => {
  const [passengerCount, setPassengerCount] = useState(1);
  const [showPassengerPopup, setShowPassengerPopup] = useState(false);
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [fromSuggestions, setFromSuggestions] = useState<Suggestion[]>([]);
  const [toSuggestions, setToSuggestions] = useState<Suggestion[]>([]);
  const [fromCoordinates, setFromCoordinates] = useState<Coordinates>({ lat: null, lon: null });
  const [toCoordinates, setToCoordinates] = useState<Coordinates>({ lat: null, lon: null });
  const [dateTime, setDateTime] = useState<string>('');
  const { fetchRoute } = useOSRMRoute();
  const router = useRouter();

  // Use refs to track if locations are selected from suggestions
  const fromSelectedRef = useRef(false);
  const toSelectedRef = useRef(false);

  // Debounced fetch function for suggestions
  const fetchSuggestions = useCallback(async (query: string, type: 'from' | 'to') => {
    if (!query) {
      type === 'from' ? setFromSuggestions([]) : setToSuggestions([]);
      return;
    }

    try {
      const response = await fetch(`https://photon.komoot.io/api/?q=${query}&bbox=${BBOX}`);
      const data = await response.json();
      type === 'from' ? setFromSuggestions(data.features) : setToSuggestions(data.features);
    } catch (err) {
      console.error(`Error fetching ${type} suggestions:`, err);
    }
  }, []);

  // Debounce effect for "from" location
  useEffect(() => {
    if (fromSelectedRef.current) return; // Skip if selected from suggestions
    const timer = setTimeout(() => fetchSuggestions(fromLocation, 'from'), 1000);
    return () => clearTimeout(timer);
  }, [fromLocation, fetchSuggestions]);

  // Debounce effect for "to" location
  useEffect(() => {
    if (toSelectedRef.current) return; // Skip if selected from suggestions
    const timer = setTimeout(() => fetchSuggestions(toLocation, 'to'), 1000);
    return () => clearTimeout(timer);
  }, [toLocation, fetchSuggestions]);

  // Fetch route only if both coordinates are set
  useEffect(() => {
    if (fromCoordinates.lat && fromCoordinates.lon && toCoordinates.lat && toCoordinates.lon) {
      fetchRoute(fromCoordinates, toCoordinates);
    }
  }, [fromCoordinates, toCoordinates, fetchRoute]);

  const handleLocationClick = (type: 'from' | 'to', name: string, coordinates: [number, number]) => {
    const [lon, lat] = coordinates;
    if (type === 'from') {
      setFromLocation(name);
      setFromCoordinates({ lat, lon });
      setFromSuggestions([]);
      fromSelectedRef.current = true; // Mark as selected
    } else {
      setToLocation(name);
      setToCoordinates({ lat, lon });
      setToSuggestions([]);
      toSelectedRef.current = true; // Mark as selected
    }
  };

  const handleInputChange = (type: 'from' | 'to', value: string) => {
    if (type === 'from') {
      setFromLocation(value);
      fromSelectedRef.current = false; // Reset when typing
    } else {
      setToLocation(value);
      toSelectedRef.current = false; // Reset when typing
    }
  };

  const useCurrentLocation = useCallback((type: 'from' | 'to') => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const coordinates: Coordinates = { lat: latitude, lon: longitude };

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
          );
          const data = await response.json();
          const address = data.display_name;
          if (type === 'from') {
            setFromCoordinates(coordinates);
            setFromLocation(address);
            fromSelectedRef.current = true;
          } else {
            setToCoordinates(coordinates);
            setToLocation(address);
            toSelectedRef.current = true;
          }
        } catch (err) {
          console.error('Error during reverse geocoding:', err);
        }
      },
      (error) => console.error('Error getting location:', error),
      { enableHighAccuracy: true }
    );
  }, []);

  const handleSearch = async () => {
    const searchData = {
      coordinates_from: { lon: fromCoordinates.lon, lat: fromCoordinates.lat },
      coordinates_to: { lon: toCoordinates.lon, lat: toCoordinates.lat },
      address_from: fromLocation,
      address_to: toLocation,
      seats: passengerCount,
      search_origin: "home",
      ladies_only: false,
      timing: dateTime,
    };

    try {
      const response = await instance.post("/rides/find_ride/", searchData);
      const rideData = JSON.parse(response.data.data);
      localStorage.setItem('rides', JSON.stringify(rideData));
      router.push('/rides');
    } catch (error: any) {
      console.error('Search error:', error.message);
    }
  };

  return (
    <div className="p-4 sm:p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-lg sm:text-xl font-semibold mb-4">Choose Location</h2>

      <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
        {/* Leaving From Input */}
        <div className="relative flex items-center bg-gray-100 rounded-full p-2 w-full sm:w-1/4">
          <RiSendPlaneLine className="text-gray-600" />
          <input
            type="text"
            placeholder="Leaving from"
            value={fromLocation}
            onChange={(e) => handleInputChange('from', e.target.value)}
            className="bg-gray-100 text-gray-600 w-full p-2 rounded-full outline-none"
          />
          <RiGpsFill
            className="absolute right-3 text-gray-600 cursor-pointer"
            onClick={() => useCurrentLocation('from')}
            title="Use Current Location"
          />
          {fromSuggestions.length > 0 && (
            <div className="absolute top-full mt-1 bg-white shadow-md rounded-lg w-full max-h-60 overflow-y-auto z-50">
              {fromSuggestions.map((suggestion, index) => (
                <div
                  key={`${suggestion.properties.osm_id}-${index}`}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleLocationClick('from', suggestion.properties.name, suggestion.geometry.coordinates)}
                >
                  <strong>{suggestion.properties.name}</strong>, {suggestion.properties.city}, {suggestion.properties.state}, {suggestion.properties.country}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Going To Input */}
        <div className="relative flex items-center bg-gray-100 rounded-full p-2 w-full sm:w-1/4">
          <RiMapPinUserFill className="text-gray-600" />
          <input
            type="text"
            placeholder="Going to"
            value={toLocation}
            onChange={(e) => handleInputChange('to', e.target.value)}
            className="bg-gray-100 text-gray-600 w-full p-2 rounded-full outline-none"
          />
          <RiGpsFill
            className="absolute right-3 text-gray-600 cursor-pointer"
            onClick={() => useCurrentLocation('to')}
            title="Use Current Location"
          />
          {toSuggestions.length > 0 && (
            <div className="absolute top-full mt-1 bg-white shadow-md rounded-lg w-full max-h-60 overflow-y-auto z-50">
              {toSuggestions.map((suggestion, index) => (
                <div
                  key={`${suggestion.properties.osm_id}-${index}`}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleLocationClick('to', suggestion.properties.name, suggestion.geometry.coordinates)}
                >
                  <strong>{suggestion.properties.name}</strong>, {suggestion.properties.city}, {suggestion.properties.state}, {suggestion.properties.country}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* DateTime Input */}
        <div className="relative flex items-center bg-gray-100 rounded-full p-2 w-full sm:w-1/4">
          <input
            type="datetime-local"
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
            className="bg-gray-100 text-gray-600 w-full p-2 rounded-full outline-none"
          />
        </div>

        {/* Passenger Input */}
        <div className="relative flex items-center bg-gray-100 rounded-full p-2 w-full sm:w-1/4">
          <div
            className="flex items-center w-full cursor-pointer"
            onClick={() => setShowPassengerPopup(!showPassengerPopup)}
          >
            <RiUser3Line className="text-gray-600" />
            <span className="ml-2 text-gray-600">{passengerCount} Passenger{passengerCount > 1 ? 's' : ''}</span>
          </div>
          {showPassengerPopup && (
            <div className="absolute z-50 top-full mt-2 bg-white shadow-lg rounded-lg p-4 w-full sm:w-48 left-0">
              <div className="flex items-center justify-between mb-2">
                <button
                  className="bg-gray-300 text-gray-700 rounded-full w-8 h-8 flex items-center justify-center"
                  onClick={() => passengerCount > 1 && setPassengerCount(passengerCount - 1)}
                >
                  -
                </button>
                <span className="text-gray-800">{passengerCount}</span>
                <button
                  className="bg-gray-300 text-gray-700 rounded-full w-8 h-8 flex items-center justify-center"
                  onClick={() => setPassengerCount(passengerCount + 1)}
                >
                  +
                </button>
              </div>
              <button
                className="bg-blue-500 text-white rounded-full py-2 w-full"
                onClick={() => setShowPassengerPopup(false)}
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-center">
        <button
          className="mt-4 bg-blue-500 text-white rounded-full py-2 px-4 hover:bg-blue-600 transition"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default ChooseLocation;