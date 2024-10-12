"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { getCredentials } from "@/app/actions/auth";
import { instance } from "@/constants/apis/instance";
import Link from "next/link";

import { RiSearchLine, RiAddLine, RiSubtractLine, RiMapPinLine } from "react-icons/ri";

const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

const RideOffer = () => {
  const [step, setStep] = useState(1);
  const [startLocation, setStartLocation] = useState("");
  const [dropLocation, setDropLocation] = useState("");
  const [startCoordinates, setStartCoordinates] = useState(null);
  const [dropCoordinates, setDropCoordinates] = useState(null);
  const [startSuggestions, setStartSuggestions] = useState([]);
  const [dropSuggestions, setDropSuggestions] = useState([]);
  const [stoppers, setStoppers] = useState([{ address: "", coordinates: null, price: 0, suggestions: [] }]);
  const [seats, setSeats] = useState(1);
  const [price, setPrice] = useState('');
  const [instantBooking, setInstantBooking] = useState(true);
  const [responseTime, setResponseTime] = useState(''); // Default response time in minutes
  const [session, setSession] = useState(Object);
  const [user, setUser] = useState(Object);
  const [rideDescription, setRideDescription] = useState(""); 
  const [rideTime, setRideTime] = useState(""); 
  const [vehical, setSelectedVehicle] = useState(""); 
  const [showSuccessPopup, setShowSuccessPopup] = useState(false); // New state for success popup


  const API_URL = "https://photon.komoot.io/api/?q=";

  useEffect(() => {
    const fetchData = async () => {
      const session = await getCredentials();
      setSession(session); // Save session once fetched
      return session; // Return session for further use
    };
  
    const fetchUser = async (sessionData) => {
      if (sessionData) {
        const response = await instance.post(
          '/user_profile/get_user/',
          { user_id: sessionData.phone_number },
          {
            headers: {
              Authorization: `Bearer ${sessionData.token}`,
              'Content-Type': 'application/json',
            },
          }
        );
        const userData  = JSON.parse(response.data.user);
          //  console.log(userData)l
        setUser(userData); // Make sure to use user.data if using axios
        console.log(userData); // Log the response
      }
    };
  
    const initialize = async () => {
      const sessionData = await fetchData();
      await fetchUser(sessionData); // Only call fetchUser after sessionData is set
    };
  
    initialize(); // Call the combined async functions
  
  }, []); // No need to add session to dependencies since we manage it internally
  

  // Debounced function to fetch location suggestions
  const fetchLocationSuggestions = (setSuggestions, location) => {
    if (location.length > 2) {
      axios
        .get(`${API_URL}${location}&bbox=68.1097,6.4627,97.3956,35.5133`)
        .then((res) => setSuggestions(res.data.features))
        .catch((err) => console.error(err));
    }
  };

  // Debounced handlers
  const debouncedFetchStartSuggestions = debounce((location) => fetchLocationSuggestions(setStartSuggestions, location), 300);
  const debouncedFetchDropSuggestions = debounce((location) => fetchLocationSuggestions(setDropSuggestions, location), 300);

  // Fetch suggestions for start location
  useEffect(() => {
    debouncedFetchStartSuggestions(startLocation);
  }, [startLocation]);

  // Fetch suggestions for drop location
  useEffect(() => {
    debouncedFetchDropSuggestions(dropLocation);
  }, [dropLocation]);

  // Fetch suggestions for stopovers
  const fetchStopperSuggestions = (index, query) => {
    if (query.length > 2) {
      axios
        .get(`${API_URL}${query}&bbox=68.1097,6.4627,97.3956,35.5133`)
        .then((res) => {
          const newStoppers = [...stoppers];
          newStoppers[index].suggestions = res.data.features;
          setStoppers(newStoppers);
        })
        .catch((err) => console.error(err));
    }
  };

  // Function to format the full address
  const formatFullAddress = (properties) => {
    return [
      properties.name,
      properties.city,
      properties.state,
      properties.country,
    ]
      .filter(Boolean)
      .join(", ");
  };

  // Handle selection of address (for start, drop, and stoppers)
  const handleLocationSelect = (feature, setLocation, setCoordinates, clearSuggestions) => {
    const { geometry, properties } = feature;
    setLocation(formatFullAddress(properties));
    setCoordinates(geometry.coordinates);
    clearSuggestions();
  };

  // Handle stoppers input and suggestions
  const handleStopperChange = (index, address) => {
    const newStoppers = [...stoppers];
    newStoppers[index].address = address;
    setStoppers(newStoppers);
    fetchStopperSuggestions(index, address); // Fetch suggestions for the stopper
  };

  // Get user's current location
  const getCurrentLocation = (setLocation, setCoordinates) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
  
          try {
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`);
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const data = await response.json();
            const address = data.display_name; // This will give you the full address
            setLocation(address);
            setCoordinates({ lat, lon });
          } catch (error) {
            console.error('Error fetching current location:', error);
          }
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  // Handle adding new stoppers
  const addStopper = () => {
    setStoppers([...stoppers, { address: "", coordinates: null, price: 0, suggestions: [] }]);
  };

  // Handle seats change
  const handleSeatsChange = (operation) => {
    if (operation === "add" && seats < 4) setSeats(seats + 1);
    else if (operation === "subtract" && seats > 1) setSeats(seats - 1);
  };

  // Handle response time change
  const handleResponseTimeChange = (operation) => {
    if (operation === "add") setResponseTime(responseTime + 1);
    else if (operation === "subtract" && responseTime > 1) setResponseTime(responseTime - 1);
  };

  // Handle ride publishing
  const handlePublishRide = async() => {
    const ridedetails=  {
     user_id: user.phone_number,
     coordinates_from:startCoordinates,
     coordinates_to:dropCoordinates,
     address_from: startLocation,
     address_to:dropLocation,
     pick_up_time:rideTime,
     vehicle: user.vehical_list[vehical],
     seats:seats,
     currency:'INR',
     price:price,
     stoppers: stoppers,
     instant_booking:instantBooking,
     response_time:responseTime,
     status:true,
     requested_user:[],
    ladies_only:false,
    ride_info: rideDescription,
    };
    console.log(ridedetails);
    try{
      const response= await instance.post("/rides/add_ride/",ridedetails,{
        headers: {
          Authorization: `Bearer ${session.token}`, 
          'Content-Type': 'application/json',
        },
      });
      console.log(response);
      if (response.status !== 200) {
        throw new Error('Network response was not ok');
      }else if(response.status==200){
        setStep(7);
        setShowSuccessPopup(true);

      }

    }
    catch(error){
    console.log(error.response.data.message);
    }
    
  };

  return (
    
    <div className="max-w-md mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-4">
        {step === 1 && (
          <div>
            <input
              type="text"
              placeholder="Start Location"
              value={startLocation}
              onChange={(e) => setStartLocation(e.target.value)}
              className="border p-2 rounded w-full"
            />
            <button
              onClick={() => getCurrentLocation(setStartLocation, setStartCoordinates)}
              className="mt-2 bg-yellow-400 text-white p-2 rounded w-full flex items-center"
            >
              <RiMapPinLine className="mr-2" />
              Use Current Location
            </button>
            {startSuggestions.length > 0 && (
              <ul className="border rounded-lg max-h-40 overflow-y-auto">
                {startSuggestions.map((suggestion, idx) => (
                  <li
                    key={idx}
                    className="p-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() =>
                      handleLocationSelect(
                        suggestion,
                        setStartLocation,
                        setStartCoordinates,
                        () => setStartSuggestions([])
                      )
                    }
                  >
                    {formatFullAddress(suggestion.properties)}
                  </li>
                ))}
              </ul>
            )}
            <button
              onClick={() => setStep(2)}
              className="mt-2 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded w-full"
            >
              Next
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <input
              type="text"
              placeholder="Drop Location"
              value={dropLocation}
              onChange={(e) => setDropLocation(e.target.value)}
              className="border p-2 rounded w-full"
            />
            <button
              onClick={() => getCurrentLocation(setDropLocation, setDropCoordinates)}
              className="mt-2 bg-yellow-400 text-white p-2 rounded w-full flex items-center"
            >
              <RiMapPinLine className="mr-2" />
              Use Current Location
            </button>
            {dropSuggestions.length > 0 && (
              <ul className="border rounded-lg max-h-40 overflow-y-auto">
                {dropSuggestions.map((suggestion, idx) => (
                  <li
                    key={idx}
                    className="p-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() =>
                      handleLocationSelect(
                        suggestion,
                        setDropLocation,
                        setDropCoordinates,
                        () => setDropSuggestions([])
                      )
                    }
                  >
                    {formatFullAddress(suggestion.properties)}
                  </li>
                ))}
              </ul>
            )}
            <button
              onClick={() => setStep(3)}
              className="mt-2 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded w-full"
            >
              Next
            </button>
          </div>
        )}

{step === 3 && (
  <div className="space-y-4">
    {stoppers.map((stopper, index) => (
      <div key={index} className="border p-4 rounded-lg shadow-md">
        <input
          type="text"
          placeholder="Stopover Location"
          value={stopper.address}
          onChange={(e) => handleStopperChange(index, e.target.value)}
          className="border p-2 rounded w-full mb-2"
        />
        <input
          type="number"
          placeholder="Price (in INR)"
          value={stopper.price || ''} // Ensure to initialize price
          onChange={(e) => {
            const newStoppers = [...stoppers];
            newStoppers[index].price = e.target.value;
            setStoppers(newStoppers);
          }}
          className="border p-2 rounded w-full mb-4"
        />
        {stopper.suggestions.length > 0 && (
          <ul className="border rounded-lg max-h-40 overflow-y-auto bg-white shadow-lg">
            {stopper.suggestions.map((suggestion, idx) => (
              <li
                key={idx}
                className="p-2 hover:bg-gray-200 cursor-pointer"
                onClick={() =>
                  handleLocationSelect(
                    suggestion,
                    (value) => {
                      const newStoppers = [...stoppers];
                      newStoppers[index].address = value;
                      setStoppers(newStoppers);
                    },
                    (coords) => {
                      const newStoppers = [...stoppers];
                      newStoppers[index].coordinates = coords;
                      setStoppers(newStoppers);
                    },
                    () => {
                      const newStoppers = [...stoppers];
                      newStoppers[index].suggestions = [];
                      setStoppers(newStoppers);
                    }
                  )
                }
              >
                {formatFullAddress(suggestion.properties)}
              </li>
            ))}
          </ul>
        )}
      </div>
    ))}
    <button
      onClick={addStopper}
      className="mt-2 bg-green-500 hover:bg-green-600 text-white p-2 rounded w-full flex items-center justify-center transition duration-200 ease-in-out"
    >
      <RiAddLine className="mr-2" />
      Add Stopover
    </button>
    <button
      onClick={() => setStep(4)}
      className="mt-2 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded w-full transition duration-200 ease-in-out"
    >
      Next
    </button>
  </div>
)}


{step === 4 && (
  <div>
    <div className="flex flex-col space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <label className="block text-sm font-medium text-gray-700">Seats</label>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleSeatsChange("subtract")}
              className="p-2 bg-gray-300 hover:bg-gray-400 rounded-full"
            >
              <RiSubtractLine />
            </button>
            <span className="px-4 py-2 border rounded-md bg-white">{seats}</span>
            <button
              onClick={() => handleSeatsChange("add")}
              className="p-2 bg-gray-300 hover:bg-gray-400 rounded-full"
            >
              <RiAddLine />
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Price per Seat</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border p-2 rounded-md w-24 bg-white"
          />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={instantBooking}
          onChange={() => setInstantBooking(!instantBooking)}
          className="h-5 w-5"
        />
        <label className="text-sm font-medium text-gray-700">Enable Instant Booking</label>
      </div>

      {!instantBooking && (
        <div>
          <label className="block text-sm font-medium text-gray-700">Response Time (minutes)</label>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleResponseTimeChange("subtract")}
              className="p-2 bg-gray-300 hover:bg-gray-400 rounded-full"
            >
              <RiSubtractLine />
            </button>
            <span className="px-4 py-2 border rounded-md bg-white">{responseTime}</span>
            <button
              onClick={() => handleResponseTimeChange("add")}
              className="p-2 bg-gray-300 hover:bg-gray-400 rounded-full"
            >
              <RiAddLine />
            </button>
          </div>
        </div>
      )}

             <button
              onClick={() => setStep(5)}
              className="mt-2 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded w-full"
            >
              Next
            </button>
    </div>
  </div>
)}
{step === 5 && (
  <div className="p-6 bg-white rounded shadow-md">
    <h2 className="text-xl font-semibold mb-4">Select Vehicle and Time</h2>

    {/* Vehicle Selection */}
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">Select Vehicle</label>
      <select
        value={vehical}
        onChange={(e) => setSelectedVehicle(e.target.value)}
        className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">-- Select Your Vehicle --</option>
        {user.vehical_list.map((vehicle, index) => (
          <option key={index} value={index}>
         {vehicle.vehicle_type}   {vehicle.vehicle_brand} ({vehicle.vehicle_modal})
          </option>
        ))}
      </select>
    </div>

    {/* Time Selection */}
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">Select Time</label>
      <input
        type="datetime-local"
        value={rideTime}
        onChange={(e) => setRideTime(e.target.value)}
        className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    {/* Next Button */}
    <button
      onClick={() => setStep(step + 1)}
      className="mt-6 bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-md w-full"
    >
      Next
    </button>
  </div>
)}

{step === 6 && (
  <div className="p-6 bg-white rounded shadow-md">
    <h2 className="text-xl font-semibold mb-4">Ride Description</h2>
    <textarea
      placeholder="Describe your ride (e.g., type of vehicle, special instructions, etc.)"
      value={rideDescription}
      onChange={(e) => setRideDescription(e.target.value)}
      className="border border-gray-300 rounded-md p-3 w-full h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    
    <button
      onClick={handlePublishRide}
      className="mt-6 bg-green-500 hover:bg-green-600 text-white p-3 rounded-md w-full"
    >
      Publish Ride
    </button>
  </div>
)}


{showSuccessPopup && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-2 text-green-600">Ride Added Successfully!</h2>
          <p className="mb-4">You can view your ride in MyRides</p>
          <Link href="/profile">
            <span className="text-blue-500 underline mr-4">Go to Profile</span>
          </Link>
          <button
            onClick={() => setShowSuccessPopup(false)}
            className="mt-4 p-2 bg-gray-300 text-gray-700 rounded"
          >
            Close
          </button>
        </div>
      </div>
    )}
  

      </div>
    </div>
  );
};

export default RideOffer;
