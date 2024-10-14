"use client";
import React, { useEffect, useState } from 'react';
import { RiMapPinLine, RiStarFill, RiCloseCircleLine, RiFlashlightLine } from 'react-icons/ri';
import { useParams } from 'next/navigation';
import { instance } from '@/constants/apis/instance';
import { getCredentials } from "@/app/actions/auth";
import Ride from '@/components/rides/Ride'; // Importing the Ride interface



const BookingPage = () => {
    const [ride, setRide] = useState<Ride | null>(null);
    const [rideid, setRideid] = useState<string>('');

    const params = useParams();
    const { id } = params; 

    useEffect(() => {
        const fetchRideData = async () => {
            const rides = localStorage.getItem('rides');
            if (rides) {
                const parsedRides: Record<string, Ride> = JSON.parse(rides);
                if (typeof id === 'string' && parsedRides[id]) {
                    setRide(parsedRides[id]);
                    setRideid(parsedRides[id]._id.$oid); // Extracting the $oid as a string
                }
            }
        };

        fetchRideData(); // Fetch ride data when component mounts
    }, [id]);

    const bookride = async () => {
        const data = await getCredentials();
        const userdata = {
            user_id: data.phone_number,
            ride_id: rideid,
        };
        const response = await instance.post('/rides/book_ride/', userdata); // Ensure the correct API route
        console.log(response);
    };
    
    

    if (!ride) {
        return <div>Loading...</div>; // Handle loading state if ride data is not available
    } else {
        console.log(rideid); // Logs the ride ID string
    }

    return (
        <div className="max-w-4xl mx-auto bg-gray-100 p-6">
            <h1 className="text-2xl font-bold mb-4">
                {new Date(ride.pick_up_time).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                    {/* Ride route details */}
                    <div className="bg-white p-4 rounded-lg shadow mb-4">
                        <div className="flex items-center mb-2">
                            <span className="text-gray-500 text-sm">{new Date(ride.pick_up_time).toLocaleTimeString('en-US')}</span>
                            <RiMapPinLine className="text-gray-500 mx-2" />
                            <span className="text-sm">{ride.address_from}</span>
                        </div>
                        <div className="flex items-center">
                            <span className="text-gray-500 text-sm">{new Date(ride.pick_up_time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}</span>
                            <RiMapPinLine className="text-gray-500 mx-2" />
                            <span className="text-sm">{ride.address_to}</span>
                        </div>
                    </div>

                    {/* Driver information */}
                    <div className="bg-white p-4 rounded-lg shadow mb-4">
                        <div className="flex items-center mb-4">
                            <img src="https://placehold.co/50x50" alt="Profile picture" className="w-12 h-12 rounded-full mr-4" />
                            <div>
                                <h2 className="text-lg font-bold">Driver</h2>
                                <div className="flex items-center text-sm text-gray-500">
                                    <RiStarFill className="text-yellow-500 mr-1" />
                                    5/5 - 6 ratings
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center text-sm text-gray-500 mb-4">
                            <RiCloseCircleLine className="text-green-500 mr-2" />
                            Rarely cancels rides
                        </div>
                        {ride.instant_booking === 'true' && (
                            <div className="flex items-center text-sm text-gray-500 mb-4">
                                <RiFlashlightLine className="text-blue-500 mr-2" />
                                Your booking will be confirmed instantly
                            </div>
                        )}
                        <button className="bg-blue-100 text-blue-500 px-4 py-2 rounded-lg">Ask a question</button>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow mb-4">
                        <h2 className="text-lg font-bold mb-4">Ride Information</h2>
                        <p className="text-sm text-gray-700">{ride.ride_info}</p>
                    </div>

                    {/* Co-travellers */}
                    <div className="bg-white p-4 rounded-lg shadow">
                        <h2 className="text-lg font-bold mb-4">Co-travellers</h2>
                        {ride.stoppers.map((stopper, index) => (
                            <div className="flex items-center mb-4" key={index}>
                                <img src="https://placehold.co/50x50" alt="Profile picture" className="w-12 h-12 rounded-full mr-4" />
                                <div>
                                    <h3 className="text-sm font-bold">{stopper.name}</h3>
                                    <p className="text-sm text-gray-500">{stopper.route}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Ride cost and action */}
                <div>
                    <div className="bg-white p-4 rounded-lg shadow mb-4">
                        <h2 className="text-lg font-bold mb-4">Booking Details</h2>
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-sm">{ride.seats} passenger(s)</span>
                            <span className="text-lg font-bold">₹{ride.price}</span>
                        </div>
                        <button className="bg-blue-500 text-white w-full py-2 rounded-lg flex items-center justify-center" onClick={bookride}>
                            <RiFlashlightLine className="mr-2" />
                            Book
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingPage;
