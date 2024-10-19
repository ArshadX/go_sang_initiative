"use client";

import React, { useCallback, useEffect, useState } from "react";
import FilterCard from '@/components/rides/FilterCard';
import RideCard from '@/components/rides/RideCard';
import Ride from  '@/components/rides/Ride';
import { instance } from "@/constants/apis/instance";
import { getCredentials } from "@/app/actions/auth";

export default function Page() {
    const [showFilter, setShowFilter] = useState(false); 
    const [rides, setRides] = useState<Ride[]>([]);

    const toggleFilter = useCallback(() => {
        setShowFilter(prev => !prev); 
    }, []);

    useEffect(() => {
        const ridesdata = async () => {
            try {
                const session = await getCredentials();
                console.log(session.phone_number);
    
                const response = await instance.post(
                    '/rides/ride_history/',
                    { user_id: session.phone_number },
                    {
                        headers: {
                            Authorization: `Bearer ${session.token}`,
                            'Content-Type': 'application/json',
                        },
                    }
                );
    
                if (response.status === 200) {
                  const rides=  JSON.parse( response.data.data);
                    return rides;
                } else {
                    console.log(response.data.message);
                }
            } catch (error) {
              return ['Not able to fetch rides'];
                console.error('Error fetching rides:', error);
            }
        };
    
        const fetchRides = async () => {
            const fetchedRides = await ridesdata();
            console.log(fetchedRides);
            if (fetchedRides) {
                setRides(fetchedRides); 
            }
        };

        fetchRides();
    }, []);

    return (
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
            {Array.isArray(rides) && rides.map((ride, index) => (
                    <a key={`${ride._id}-${index}`} href={`rides/${index}`}>
                        <RideCard {...ride} /> 
                    </a>
                ))}
            </div>
        </div>
    );
}
