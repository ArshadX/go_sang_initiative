"use client"; 

import React, { useCallback, useEffect, useState } from "react";
import FilterCard from '@/components/rides/FilterCard';
import RideCard from '@/components/rides/RideCard';
import Ride from  '@/components/rides/Ride';
export default function Page() {
    const [showFilter, setShowFilter] = useState(false); 
    const [rides, setRides] = useState<Ride[]>([]);

    const toggleFilter = () => {
        setShowFilter(!showFilter); 
    };

    useEffect(()=>{
        const rides= localStorage.getItem('rides');
        if(rides){
            const parsedRides: Ride[] = JSON.parse(rides);
            setRides(parsedRides);
        }

    },[])

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

                        {rides.map((ride, index) => (
                <a key={`${ride._id}-${index}`} className="w-full lg:w-3/4" href={`rides/${index}`}>
                    <RideCard {...ride} /> 
                </a>
            ))}



        </div>
        </>
    );
}
