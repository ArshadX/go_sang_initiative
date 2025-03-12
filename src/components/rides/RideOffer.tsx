"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { getCredentials } from "@/app/actions/auth";
import { instance } from "@/constants/apis/instance";
import Link from "next/link";
import {
  RiSearchLine,
  RiAddLine,
  RiSubtractLine,
  RiMapPinLine,
} from "react-icons/ri";

// Utility debounce function
const debounce = <T extends (...args: any[]) => void>(
  func: T,
  delay: number
) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

interface Stopper {
  address: string;
  coordinates: [number, number] | null;
  price: number;
  suggestions: any[];
}

interface Vehicle {
  vehicle_type: string;
  vehicle_brand: string;
  vehicle_modal: string;
}

interface Feature {
  geometry: {
    coordinates: [number, number];
  };
  properties: {
    name?: string;
    city?: string;
    state?: string;
    country?: string;
  };
}

const RideOffer: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [startLocation, setStartLocation] = useState<string>("");
  const [dropLocation, setDropLocation] = useState<string>("");
  const [startCoordinates, setStartCoordinates] = useState<object | null>(null);
  const [dropCoordinates, setDropCoordinates] = useState<object | null>(null);
  const [startSuggestions, setStartSuggestions] = useState<any[]>([]);
  const [dropSuggestions, setDropSuggestions] = useState<any[]>([]);
  const [stoppers, setStoppers] = useState<Stopper[]>([{ address: "", coordinates: null, price: 0, suggestions: [] }]);
  const [seats, setSeats] = useState<number>(1);
  const [price, setPrice] = useState<string>("");
  const [instantBooking, setInstantBooking] = useState<boolean>(true);
  const [responseTime, setResponseTime] = useState<number>(1);
  const [session, setSession] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [rideDescription, setRideDescription] = useState<string>(""); 
  const [rideTime, setRideTime] = useState<string>(""); 
  const [vehical, setSelectedVehicle] = useState<string>(""); 
  const [showSuccessPopup, setShowSuccessPopup] = useState<boolean>(false); 

  const API_URL = "https://photon.komoot.io/api/?q=";

  useEffect(() => {
    const fetchData = async () => {
      const sessionData = await getCredentials();
      setSession(sessionData);
      return sessionData;
    };

    const fetchUser = async (sessionData: any) => {
      if (sessionData) {
        const response = await instance.post(
          "/user_profile/get_user/",
          { user_id: sessionData.phone_number },
          {
            headers: {
              Authorization: `Bearer ${sessionData.token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const userData = JSON.parse(response.data.user);
        setUser(userData);
        console.log(userData);
      }
    };

    const initialize = async () => {
      const sessionData = await fetchData();
      await fetchUser(sessionData);
    };

    initialize();
  }, []);

  const fetchLocationSuggestions = (setSuggestions: React.Dispatch<React.SetStateAction<any[]>>, location: string) => {
    if (location.length > 2) {
      axios
        .get(`${API_URL}${location}&bbox=68.1097,6.4627,97.3956,35.5133`)
        .then((res) => {
          setSuggestions(res.data.features);
        })
        .catch((err) => console.error(err));
    }
  };

  const debouncedFetchStartSuggestions = debounce((location: string) => fetchLocationSuggestions(setStartSuggestions, location), 300);
  const debouncedFetchDropSuggestions = debounce((location: string) => fetchLocationSuggestions(setDropSuggestions, location), 300);

  useEffect(() => {
    debouncedFetchStartSuggestions(startLocation);
  }, [startLocation]);

  useEffect(() => {
    debouncedFetchDropSuggestions(dropLocation);
  }, [dropLocation]);

  const fetchStopperSuggestions = (index: number, query: string) => {
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

  const formatFullAddress = (properties: Feature["properties"]) => {
    return [properties.name, properties.city, properties.state, properties.country]
      .filter(Boolean)
      .join(", ");
  };

  const handleLocationSelect = (
    feature: Feature,
    setLocation: (location: string) => void,
    setCoordinates: (coordinates: [number, number]) => void,
    clearSuggestions: () => void
  ) => {
    const { geometry, properties } = feature;
    setLocation(formatFullAddress(properties));
    setCoordinates(geometry.coordinates);
    clearSuggestions();
  };

  const handleStopperChange = (index: number, address: string) => {
    const newStoppers = [...stoppers];
    newStoppers[index].address = address;
    setStoppers(newStoppers);
    fetchStopperSuggestions(index, address);
  };

  const getCurrentLocation = (
    setLocation: (location: string) => void,
    setCoordinates: (coordinates: { lat: number; lon: number }) => void
  ) => {
    // Check if Geolocation is supported
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
  
          try {
            // Fetching reverse geolocation data from OpenStreetMap
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
            );
  
            if (!response.ok) {
              throw new Error("Failed to fetch location data");
            }
  
            const data = await response.json();
            const address = data.display_name;
  
            // Update state with location address and coordinates
            setLocation(address);
            setCoordinates({ lat, lon });
          } catch (error) {
            console.error("Error fetching current location data:", error);
          }
        },
        (error) => {
          // Handle errors in retrieving geolocation
          switch (error.code) {
            case error.PERMISSION_DENIED:
              console.error("User denied the request for Geolocation.");
              break;
            case error.POSITION_UNAVAILABLE:
              console.error("Location information is unavailable.");
              break;
            case error.TIMEOUT:
              console.error("The request to get user location timed out.");
              break;
            default:
              console.error("An unknown error occurred while fetching location.");
              break;
          }
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };
  
  const addStopper = () => {
    setStoppers([...stoppers, { address: "", coordinates: null, price: 0, suggestions: [] }]);
  };

  const handleSeatsChange = (operation: "add" | "subtract") => {
    if (operation === "add" && seats < 4) {
      setSeats(seats + 1);
    } else if (operation === "subtract" && seats > 1) {
      setSeats(seats - 1);
    }
  };

  const handleResponseTimeChange = (operation: "add" | "subtract") => {
    if (operation === "add") {
      setResponseTime(prevTime => prevTime + 1);
    } else if (operation === "subtract" && responseTime > 1) {
      setResponseTime(prevTime => prevTime - 1);
    }
  };

  const handlePublishRide = async () => {
    const rideDetails = {
      user_id: user.phone_number,
      coordinates_from: {
        type: "Point",
        coordinates: startCoordinates ?? [0, 0],
      },
      coordinates_to: {
        type: "Point",
        coordinates: dropCoordinates ?? [0, 0],
      },
      address_from: startLocation,
      address_to: dropLocation,
      pick_up_time: rideTime,
      vehicle: user.vehical_list[vehical],
      seats,
      currency: "INR",
      price,
      stoppers,
      instant_booking: instantBooking,
      response_time: responseTime,
      status: true,
      requested_user: [],
      ladies_only: false,
      ride_info: rideDescription,
    };

    try {
      const response = await instance.post("/rides/add_ride/", rideDetails, {
        headers: {
          Authorization: `Bearer ${session.token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        setStep(7);
        setShowSuccessPopup(true);
      } else {
        throw new Error("Network response was not ok");
      }
    } catch (error: any) {
      console.log(error.message);
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
                value={stopper.price || ''} 
                onChange={(e) => {
                  const newStoppers = [...stoppers];
                  
                  newStoppers[index].price = parseFloat(e.target.value) || 0; 

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
      {user.vehical_list.map((vehicle:any, index:any) => (
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
