"use client";
import React, { useEffect, useState } from 'react';
import { RiMapPinLine, RiArrowRightSLine, RiCheckboxCircleLine, RiStarFill, RiCloseCircleLine, RiFlashlightLine } from 'react-icons/ri';
import { useParams } from 'next/navigation';
import { instance } from '@/constants/apis/instance';
import { getCredentials } from "@/app/actions/auth";
import { UserProfile } from '@/utils/UserProfile';
import Ride from '@/components/rides/Ride';
import User, { Vehicle } from '../profile/User';
import Dialogue from '../common/DialogueBox';
import { OtherUser } from '@/utils/OtherUser';

const BookingPage = () => {
  const [ride, setRide] = useState<Ride | null>(null);
  const [rideid, setRideid] = useState<string>('');
  const [user, setUser] = useState<User | null>(null);
  const [isRideBooked, setIsRideBooked] = useState<boolean>(false);
  const [RequestedUsers, setRequestedUsers] = useState<Array<any>>([]);
  
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const fetchRideData = async () => {
      try {
        // Get user credentials and profile
        const data = await getCredentials();
        const user = await UserProfile();
        if (user) setUser(user as User);

        // Retrieve rides from localStorage
        const rides = localStorage.getItem('rides');
        if (rides) {
          const parsedRides: Record<string, Ride> = JSON.parse(rides);
          if (typeof id === 'string' && parsedRides[id]) {
            setRide(parsedRides[id]);
            setRideid(parsedRides[id]._id.$oid);

            const requested_user_ids = parsedRides[id].requested_user;
            const coTravellers = await Promise.all(
                requested_user_ids.map(async (userObj: { _id: { $oid: string } }) => {
                  const userDetails = await OtherUser(userObj._id.$oid); 
                  return userDetails;
                })
              );
              setRequestedUsers(coTravellers);
           
          }
        }
      } catch (error) {
        console.error('Error fetching ride data:', error);
      }
    };

    fetchRideData();
  }, [id]);

  // Function to handle ride booking
  const bookRide = async () => {
    try {
      const data = await getCredentials();
      const userdata = {
        user_id: data.phone_number,
        ride_id: rideid,
      };

      const response = await instance.post('/rides/book_ride/', userdata,{
        headers: {
            Authorization: `Bearer ${data.token}`,
            'Content-Type': 'application/json',
        },
         });
      if (response.status === 200) {
        setIsRideBooked(true);
        console.log('Ride booked successfully:', response.data);
      } else {
        console.log('Unexpected response:', response.status);
      }
    } catch (error: any) {
      if (error.response) {
        console.log('Error response data:', error.response.data);
      } else if (error.request) {
        console.log('No response received:', error.request);
      } else {
        console.log('Error:', error.message);
      }
    }
  };

  if (!ride) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Dialogue />;
  }

  return (
    <div className="max-w-4xl mx-auto bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">
        {new Date(ride.pick_up_time).toLocaleDateString('en-US', {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
        })}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Ride route details */}
        <div className="md:col-span-2">
          <div className="bg-white p-4 rounded-lg shadow mb-4">
            <div className="flex items-center mb-2">
              <span className="text-gray-500 text-sm">
                {new Date(ride.pick_up_time).toLocaleTimeString('en-US')}
              </span>
              <RiMapPinLine className="text-gray-500 mx-2 font-semibold" />
              <span className="text-sm">{ride.address_from}</span>
            </div>
            <div className="flex items-center mb-2">
              <span className="text-gray-500 text-sm">
                {new Date(ride.pick_up_time).toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true,
                })}
              </span>
              <RiMapPinLine className="text-gray-500 mx-2 font-semibold" />
              <span className="text-sm">{ride.address_to}</span>
            </div>
            <div className="flex items-center text-gray-700 mt-4">
              <RiArrowRightSLine className="text-xl text-blue-500 mr-2" />
              <span className="text-sm">Estimated Duration: 30 minutes</span>
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

          {/* Ride information */}
          <div className="bg-white p-4 rounded-lg shadow mb-4">
            <h2 className="text-lg font-bold mb-4">Ride Information</h2>
            <p className="text-sm text-gray-700">{ride.ride_info}</p>
          </div>

          {/* Co-travellers */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-bold mb-4">Co-travellers</h2>
            {RequestedUsers.map((requested_user_id, index) => (
              <div className="flex items-center mb-4" key={index}>
                <img src="https://placehold.co/50x50" alt="Profile picture" className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <h3 className="text-sm font-bold">Co-traveller Name</h3> {/* Replace with actual co-traveller data */}
                  <p className="text-sm text-gray-500">Co-traveller Route</p> {/* Replace with actual route data */}
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
            {isRideBooked ? (
              <div className="flex items-center justify-center bg-green-100 text-green-600 py-2 rounded-lg">
                <RiCheckboxCircleLine className="mr-2 text-xl" />
                <span className="font-semibold">Ride Booked</span>
              </div>
            ) : (
              <button
                className="bg-blue-500 text-white w-full py-2 rounded-lg flex items-center justify-center"
                onClick={bookRide}
              >
                <RiFlashlightLine className="mr-2" />
                Book
              </button>
            )}
          </div>

          <div>
            <h2 className="text-lg font-bold mb-4">Vehicle Information</h2>
            <p>
              <strong>Brand:</strong> {ride.vehicle.vehicle_brand}
            </p>
            <p>
              <strong>Model:</strong> {ride.vehicle.vehicle_modal}
            </p>
            <p>
              <strong>Color:</strong> {ride.vehicle.vehicle_color}
            </p>
            <p>
              <strong>Capacity:</strong> {ride.vehicle.vehicle_capacity}
            </p>
            <p>
              <strong>Vehicle Number:</strong> {ride.vehicle.vehicle_number}
            </p>
            <p>
              <strong>Type:</strong> {ride.vehicle.vehicle_type}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
