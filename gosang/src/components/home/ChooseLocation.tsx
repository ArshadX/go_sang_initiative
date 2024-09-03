"use client";

import React, { useState } from 'react';
import { RiSendPlaneLine } from "react-icons/ri";
import { RiMapPinUserFill } from "react-icons/ri";
import { RiUser3Line } from "react-icons/ri";




const ChooseLocation = () => {
  const [passengerCount, setPassengerCount] = useState(1);
  const [showPassengerPopup, setShowPassengerPopup] = useState(false);

  const incrementPassenger = () => setPassengerCount(passengerCount + 1);
  const decrementPassenger = () => {
    if (passengerCount > 1) setPassengerCount(passengerCount - 1);
  };

  return (
    <div className="p-4 sm:p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-lg sm:text-xl font-semibold mb-4">Choose Location</h2>

      <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
        {/* Leaving From Input */}
        <div className="flex items-center bg-gray-100 rounded-full p-2 w-full sm:w-1/4">
          <span className="material-icons text-gray-600"><RiSendPlaneLine/></span>
          <input
            type="text"
            placeholder="Leaving from"
            className="bg-gray-100 text-gray-600 w-full p-2 rounded-full outline-none"
          />
        </div>

        {/* Going To Input */}
        <div className="flex items-center bg-gray-100 rounded-full p-2 w-full sm:w-1/4">
          <span className="material-icons text-gray-600"><RiMapPinUserFill/></span>
          <input
            type="text"
            placeholder="Going to"
            className="bg-gray-100 text-gray-600 w-full p-2 rounded-full outline-none"
          />
        </div>

        {/* Date Picker Input */}
        <div className="flex items-center bg-gray-100 rounded-full p-2 w-full sm:w-1/4">
          <span className="material-icons text-gray-600"></span>
          <input
             type="datetime-local"
            className="bg-gray-100 text-gray-600 w-full p-2 rounded-full outline-none"
          />
        </div>

        {/* Passenger Input */}
        <div className="relative flex items-center bg-gray-100 rounded-full p-2 w-full sm:w-1/4">
          <div
            className="flex items-center w-full cursor-pointer"
            onClick={() => setShowPassengerPopup(!showPassengerPopup)}
          >
            <span className="material-icons text-gray-600"><RiUser3Line/></span>
            <span className="ml-2 text-gray-600">{passengerCount} Passenger{passengerCount > 1 ? 's' : ''}</span>
          </div>

          {/* Passenger Popup */}
          {showPassengerPopup && (
            <div className="absolute z-10 top-full mt-2 bg-white shadow-lg rounded-lg p-4 w-full sm:w-48 left-0">
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
                className="bg-blue-500 text-white w-full p-2 rounded-full hover:bg-blue-600"
                onClick={() => setShowPassengerPopup(false)}
              >
                Done
              </button>
            </div>
          )}
        </div>

        {/* Search Button */}
        <button className="bg-blue-500 text-white rounded-full p-3 px-6 hover:bg-blue-600 w-full sm:w-auto">
          Search
        </button>
      </div>
    </div>
  );
};

export default ChooseLocation;
