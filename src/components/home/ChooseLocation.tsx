"use client";

import React, { useState, useEffect } from 'react';
import { RiSendPlaneLine, RiMapPinUserFill, RiUser3Line } from "react-icons/ri";
import { useRouter } from 'next/navigation';
import useOSRMRoute from '@/hooks/useOSRMRoute';
import { instance } from "@/constants/apis/instance";

type Coordinates = {
  lat: number | null;
  lon: number | null;
};

interface Suggestion {
  properties: {
    osm_id: string;
    name: string;
    city: string;
    state: string;
    country: string;
  };
  geometry: {
    coordinates: [number, number]; // [lon, lat]
  };
}

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

  // Fetch suggestions for "from" location
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (fromLocation) {
        fetch(`https://photon.komoot.io/api/?q=${fromLocation}&bbox=68.1097,6.4627,97.3956,35.5133`)
          .then(response => response.json())
          .then(data => setFromSuggestions(data.features))
          .catch(err => console.error(err));
      } else {
        setFromSuggestions([]);
      }
    }, 1000); // Debounce for 300ms

    return () => clearTimeout(delayDebounceFn);
  }, [fromLocation]);

  // Fetch suggestions for "to" location
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (toLocation) {
        fetch(`https://photon.komoot.io/api/?q=${toLocation}&bbox=68.1097,6.4627,97.3956,35.5133`)
          .then(response => response.json())
          .then(data => setToSuggestions(data.features))
          .catch(err => console.error(err));
      } else {
        setToSuggestions([]);
      }
    }, 1000); 

    return () => clearTimeout(delayDebounceFn);
  }, [toLocation]);

  // Fetch route whenever coordinates change
  useEffect(() => {
    fetchRoute(fromCoordinates, toCoordinates);
  }, [fromCoordinates, toCoordinates]);

  const handleLocationClick = (type: 'from' | 'to', name: string, coordinates: [number, number]) => {
    const [lon, lat] = coordinates;
    if (type === 'from') {
      setFromLocation(name);
      setFromCoordinates({ lat: Number(lat), lon: Number(lon) });
      setFromSuggestions([]); // Clear suggestions for 'from' location
    } else {
      setToLocation(name);
      setToCoordinates({ lat: Number(lat), lon: Number(lon) });
      setToSuggestions([]); // Clear suggestions for 'to' location
    }
  };

  const incrementPassenger = () => setPassengerCount(passengerCount + 1);
  const decrementPassenger = () => {
    if (passengerCount > 1) setPassengerCount(passengerCount - 1);
  };

  const handleSearch = async () => {
    const searchData = {
      coordinates_from: { lon: fromCoordinates.lon, lat: fromCoordinates.lat },
      coordinates_to: { lon: toCoordinates.lon, lat: toCoordinates.lat },
      address_from: fromLocation,
      address_to: toLocation,
      seats: passengerCount, 
      search_origin: "home",
      ladies_only: false,
    };

    try {
      const response = await instance.post("/rides/find_ride/", searchData);
      if (response.status !== 200) {
        throw new Error('Network response was not ok');
      } else {
        const rideData = JSON.parse(response.data.data);
        localStorage.setItem('rides', JSON.stringify(rideData));
        // Handle rideData as needed
        router.push('/rides');
      }

    } catch (error: any) {
      console.error(error.message);
    }
  };

  return (
    <div className="p-4 sm:p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-lg sm:text-xl font-semibold mb-4">Choose Location</h2>

      <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
        {/* Leaving From Input */}
        <div className="relative flex items-center bg-gray-100 rounded-full p-2 w-full sm:w-1/4">
          <span className="text-gray-600"><RiSendPlaneLine/></span>
          <input
            type="text"
            placeholder="Leaving from"
            value={fromLocation}
            onChange={(e) => setFromLocation(e.target.value)}
            className="bg-gray-100 text-gray-600 w-full p-2 rounded-full outline-none"
          />
          {fromSuggestions.length > 0 && (
            <div className="absolute top-full mt-1 bg-white shadow-md rounded-lg w-full max-h-60 overflow-y-auto z-50">
              {fromSuggestions.map((suggestion, index) => (
                <div
                  key={`${suggestion.properties.osm_id}-${index}`}  // Combine osm_id and index
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
          <span className="text-gray-600"><RiMapPinUserFill/></span>
          <input
            type="text"
            placeholder="Going to"
            value={toLocation}
            onChange={(e) => setToLocation(e.target.value)}
            className="bg-gray-100 text-gray-600 w-full p-2 rounded-full outline-none"
          />
          {toSuggestions.length > 0 && (
            <div className="absolute top-full mt-1 bg-white shadow-md rounded-lg w-full max-h-60 overflow-y-auto z-50">
              {toSuggestions.map((suggestion, index) => (
                <div
                  key={`${suggestion.properties.osm_id}-${index}`}  // Combine osm_id and index
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleLocationClick('to', suggestion.properties.name, suggestion.geometry.coordinates)}
                >
                  <strong>{suggestion.properties.name}</strong>, {suggestion.properties.city}, {suggestion.properties.state}, {suggestion.properties.country}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Date Picker Input */}
        <div className="flex items-center bg-gray-100 rounded-full p-2 w-full sm:w-1/4">
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
            <span className="text-gray-600"><RiUser3Line/></span>
            <span className="ml-2 text-gray-600">{passengerCount} Passenger{passengerCount > 1 ? 's' : ''}</span>
          </div>

          {/* Passenger Popup */}
          {showPassengerPopup && (
            <div className="absolute z-50 top-full mt-2 bg-white shadow-lg rounded-lg p-4 w-full sm:w-48 left-0">
              <div className="flex items-center justify-between mb-2">
                <button
                  className="bg-gray-300 text-gray-700 rounded-full w-8 h-8 flex items-center justify-center"
                  onClick={decrementPassenger}
                >
                  -
                </button>
                <span className="text-gray-800">{passengerCount}</span>
                <button
                  className="bg-gray-300 text-gray-700 rounded-full w-8 h-8 flex items-center justify-center"
                  onClick={incrementPassenger}
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

      {/* Search Button */}
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
