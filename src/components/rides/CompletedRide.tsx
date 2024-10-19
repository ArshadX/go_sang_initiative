"use client";

import { FaCar } from 'react-icons/fa';
import Image from 'next/image';

const CompletedRide = () => {
  return (
    
    <div className="max-w-sm mx-auto bg-white rounded-lg shadow-md p-4 mt-6">
      <div className="text-lg font-semibold mb-4">Your rides</div>

      <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
        <div className="flex justify-between items-center mb-2">
          <span className="text-blue-500 font-medium">Exchange ratings</span>
        </div>

        <div className="mb-2">
          <span className="font-semibold text-lg">Thu 29 Aug</span>
        </div>

        <div className="text-sm text-gray-500 mb-4">
          <div className="flex items-center">
            <span className="mr-4">08:10</span>
            <span className="flex-grow border-t border-gray-300"></span>
            <span className="ml-4">Ghaziabad</span>
          </div>

          <div className="text-xs text-gray-400 mt-1">0h10</div>

          <div className="flex items-center">
            <span className="mr-4">08:20</span>
            <span className="flex-grow border-t border-gray-300"></span>
            <span className="ml-4">Noida</span>
          </div>
        </div>

        <div className="flex items-center mt-4">
          <FaCar className="text-gray-600 mr-2" size={24} />
          <div className="relative w-10 h-10">
            <Image
              src="/images/about/vimal.jpg"  // Update the path to your image
              alt="User"
              fill
              className="rounded-full object-cover"
            />
          </div>
          <span className="ml-3 font-medium text-gray-700">sohit</span>
        </div>
      </div>
    </div>
  );
};

export default CompletedRide;
