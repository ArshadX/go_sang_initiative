import React from 'react';
import { RiCarFill } from 'react-icons/ri';
import { FaBoltLightning } from 'react-icons/fa6';
import { BsFillPersonFill, BsFillPersonCheckFill, BsFillPersonPlusFill } from 'react-icons/bs';
import Image from 'next/image'; // Adjust this based on your project

export interface Ride {
  address_from: string;
  address_to: string;
  instant_booking: string;
  pick_up_time: string;
  price: string;
  ladies_only: string;
  requested_user: string;
  response_time: string;
  ride_info: string;
  seats: number; // Use 'number' instead of 'Number'
  status: string;
  stoppers: any[]; // Adjust based on what you expect
  vehicle: object;  // Adjust this type as needed
  _id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}

interface RideCardProps extends Ride { // Extend from Ride to have all properties
}

const RideCard: React.FC<RideCardProps> = (props) => {
  // Log the props to the console
  function formatDate(dateString:any) {
    const date = new Date(dateString);
  
    // Use the correct types for the options
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',    
      month: 'long',      
      day: 'numeric',    
      hour: '2-digit',    
      minute: '2-digit', 
      hour12: false      
    };
  
    // Format the date using toLocaleString
    return date.toLocaleString('en-US', options);
  }
  const {
    pick_up_time,
    address_from,
    address_to,
    ride_info,
    seats,
    price,
    status,
  } = props;

  return (
    <div className="bg-white rounded-md shadow-md p-4 mb-4 lg:w-2/3 w-full mx-auto">
      {/* Upper section for time and location */}
      <div className="flex justify-between items-center">
        {/* Left side - Time and Location */}
        <div className="flex flex-col items-start">
          <h3 className="text-lg font-semibold text-gray-800">{formatDate(pick_up_time)}</h3>
          <p className="text-sm text-gray-600">{props.address_from}</p>
          <div className="flex space-x-2 mt-2">
            <BsFillPersonFill className="text-gray-400" />
            <BsFillPersonCheckFill className="text-yellow-500" />
            <BsFillPersonPlusFill className="text-gray-400" />
          </div>
        </div>
        {/* Timeline */}
        <div className="flex flex-col items-center">
          <div className="flex items-center space-x-2 text-gray-600">
            <span>2h00</span>
            <div className="h-1 w-16 bg-gray-300 rounded-full">
              <div className="h-full w-2/3 bg-green-500 rounded-full"></div>
            </div>
          </div>
        </div>
        {/* Right side - Destination */}
        <div className="flex flex-col items-end">
          <h3 className="text-lg font-semibold text-gray-800">20:00</h3>
          <p className="text-sm text-gray-600">{address_to}</p>
          <div className="flex space-x-2 mt-2">
            <BsFillPersonFill className="text-gray-400" />
            <BsFillPersonCheckFill className="text-yellow-500" />
            <BsFillPersonPlusFill className="text-gray-400" />
          </div>
        </div>
      </div>

      {/* Separator */}
      <div className="my-4 border-t border-gray-300"></div>

      {/* Lower section for driver and booking info */}
      <div className="flex justify-between items-center">
        {/* Driver Info */}
        <div className="flex items-center space-x-4">
          <RiCarFill className="text-gray-500" />
          <Image
            src="/images/about/vimal.jpg" // Update with correct image path
            alt="Driver"
            width={32}
            height={32}
            className="rounded-full object-cover"
          />
          <div className="flex flex-col justify-center">
            <p className="text-sm text-gray-600">Harsh</p>
            <div className="flex items-center space-x-1">
              <span className="text-yellow-500">★</span>
              <span className="text-sm text-gray-600">3.9</span>
            </div>
          </div>
        </div>

        {/* Booking Info and Price */}
        <div className="flex items-center space-x-4 lg:w-1/4 justify-end">
          <div className="flex items-center space-x-1">
            <FaBoltLightning className="text-gray-500" />
            <span className="hidden md:inline text-sm text-gray-600">Instant Booking</span>
          </div>
          <span className="text-xl font-bold text-green-600">₹{price}</span>
        </div>
      </div>
    </div>
  );
};

export default RideCard;
