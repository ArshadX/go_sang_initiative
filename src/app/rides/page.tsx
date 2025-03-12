"use client";

import React, { useCallback, useEffect, useState } from "react";
import FilterCard from '@/components/rides/FilterCard';
import RideCard from '@/components/rides/RideCard';
import Ride from '@/components/rides/Ride';
import { RiArrowRightSLine } from 'react-icons/ri';

export default function Page() {
  const [showFilter, setShowFilter] = useState(false); 
  const [rides, setRides] = useState<Ride[]>([]);

  const toggleFilter = () => {
    setShowFilter(!showFilter); 
  };

  useEffect(() => {
    const ridesData = localStorage.getItem('rides');
    if (ridesData) {
      const parsedRides: Ride[] = JSON.parse(ridesData);
      setRides(parsedRides);
    }
  }, []);

  const handleCheckNextDay = () => {
    // Logic to check for rides the next day
    alert("Checking for rides on the next day..."); // Replace with actual logic
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row p-6">
        <div className="w-full lg:w-1/4 p-4">
          <button 
            className="lg:hidden mb-4 text-blue-500 underline" 
            onClick={toggleFilter}
          >
            {showFilter ? 'Close Filters' : 'Show Filters'}
          </button>

          <div 
            className={`${
              showFilter ? 'block fixed inset-0 bg-white z-50 p-4' : 'hidden'
            } lg:block lg:static lg:bg-transparent`}
          >
            <FilterCard />
            {showFilter && (
              <button 
                className="block lg:hidden mt-4 text-red-500 underline" 
                onClick={toggleFilter}
              >
                Close
              </button>
            )}
          </div>
        </div>

        <div className="w-full lg:w-3/4">
          {rides.length > 0 ? (
            rides.map((ride, index) => (
              <a key={`${ride._id}-${index}`} className="w-full" href={`rides/${index}`}>
                <RideCard {...ride} /> 
              </a>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <h3 className="text-lg font-semibold text-gray-700">No Rides Available</h3>
              <p className="text-gray-500">It seems there are no rides available for today.</p>
              <button 
                className="mt-4 flex items-center bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition"
                onClick={handleCheckNextDay}
              >
                <RiArrowRightSLine className="mr-2" />
                Check for Next Day
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
