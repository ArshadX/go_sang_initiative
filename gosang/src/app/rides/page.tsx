"use client"; // Mark this file as a Client Component

import React, { useState } from 'react';
import FilterCard from '@/components/rides/FilterCard';
import RideCard from '@/components/rides/RideCard';

export default function Page() {
    const [showFilter, setShowFilter] = useState(false); // State to manage filter visibility on mobile

    const toggleFilter = () => {
        setShowFilter(!showFilter); // Toggle filter visibility
    };

    return (
        <div className="flex flex-col lg:flex-row p-6">
            {/* Filter section */}
            <div className="w-full lg:w-1/4 p-4">
                {/* Show button to toggle filter on mobile */}
                <button 
                    className="lg:hidden mb-4 text-blue-500 underline" 
                    onClick={toggleFilter}
                >
                    {showFilter ? 'Close Filters' : 'Show Filters'}
                </button>

                {/* FilterCard visible on large screens and toggled on mobile */}
                <div 
                    className={`${
                        showFilter ? 'block fixed inset-0 bg-white z-50 p-4' : 'hidden'
                    } lg:block lg:static lg:bg-transparent`}
                >
                    <FilterCard />
                    {/* Close button in fullscreen mode */}
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

            {/* Ride section */}
            <div className="w-full lg:w-3/4 p-4">
                <RideCard />
            </div>
        </div>
    );
}
