"use client";
import { instance } from "@/constants/apis/instance";
import { getCredentials } from "@/app/actions/auth";
import { useEffect, useState } from "react";
import { RiArrowLeftLine, RiCarLine, RiMotorbikeLine, RiErrorWarningFill } from "react-icons/ri";
import Head from "next/head";
import Link from "next/link";

type Errors = {
  make?: string;
  model?: string;
  year?: string;
  vehicleNumber?: string;
  seats?: string;
};

interface SessionData {
  isAuth: boolean;
  token: string | null;
  phone_number: string | null | {};
}

export default function AddVehicle() {
  const [vehicleType, setVehicleType] = useState<"Car" | "Bike">("Car");
  const [make, setMake] = useState<string>("");
  const [model, setModel] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [vehicleNumber, setVehicleNumber] = useState<string>("");
  const [seats, setSeats] = useState<string>("");
  const [errors, setErrors] = useState<Errors>({});
  const [user_id, setUserPhoneNumber] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const [showSuccessPopup, setShowSuccessPopup] = useState(false); // New state for success popup
  const currentYear = new Date().getFullYear();
  const validYears = Array.from({ length: 15 }, (_, i) => (currentYear - i).toString());
  const carMakes = ["Toyota", "Honda", "Maruti Suzuki", "Hyundai", "Ford"];
  const bikeMakes = ["Hero", "Honda", "Bajaj", "TVS", "Royal Enfield"];

  useEffect(() => {
    const fetchData = async () => {
      const session = await getCredentials();
      if (session && typeof session.phone_number === "string") {
        setUserPhoneNumber(session.phone_number);
        setToken(session.token as string);
      } else {
        setUserPhoneNumber(null);
      }
    };

    fetchData();
  }, []);

  const handleVehicleTypeChange = (type: "Car" | "Bike") => {
    setVehicleType(type);
    setMake("");
    if (type === "Bike") {
      setSeats("");
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors: Errors = {};

    if (!make) validationErrors.make = "Make is required";
    if (!model) validationErrors.model = "Model is required";
    if (!year) validationErrors.year = "Vehicle Year is required";
    if (!vehicleNumber) validationErrors.vehicleNumber = "Vehicle Number is required";
    if (vehicleType === "Car" && !seats) validationErrors.seats = "Seats are required for cars";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const vehicleData = {
      user_id: user_id,
      vehicle_number: vehicleNumber,
      vehicle_type: vehicleType,
      vehicle_brand: make,
      vehicle_modal: model,
      vehicle_color: "Black",
      vehicle_capacity: vehicleType === "Car" ? seats : 1,
    };
     console.log(vehicleData);

    try {
      const response = await instance.post("/user_profile/add_vehical/", vehicleData,
     {
            headers: {
              Authorization: `Bearer ${token}`, // Ensure token is valid and present
              'Content-Type': 'application/json',
            },
          }
      );
      
      if (response.status !== 200) {
        throw new Error('Network response was not ok');
      }

      // Show success popup on successful vehicle addition
      setShowSuccessPopup(true);
    } catch (error) {
      console.error("Error adding vehicle:", error);
    }
  };

  return (
    <>
      <Head>
        <title>Add Vehicle</title>
      </Head>
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md p-4">
          <div className="flex items-center justify-between bg-orange-500 p-2">
            <RiArrowLeftLine className="text-white text-xl" />
            <h1 className="text-white text-lg">Add Vehicle</h1>
            <div></div>
          </div>

          {/* Vehicle type selection */}
          <div className="flex justify-center mt-4">
            <div className="flex space-x-4">
              <button
                onClick={() => handleVehicleTypeChange("Car")}
                className={`${vehicleType === "Car" ? "text-orange-500 border-b-2 border-orange-500 font-bold" : "text-gray-400"}`}
              >
                Car
              </button>
              <button
                onClick={() => handleVehicleTypeChange("Bike")}
                className={`${vehicleType === "Bike" ? "text-orange-500 border-b-2 border-orange-500 font-bold" : "text-gray-400"}`}
              >
                Bike
              </button>
            </div>
          </div>

          {/* Vehicle icon display */}
          <div className="flex justify-center mt-8">
            {vehicleType === "Car" ? (
              <RiCarLine className="text-6xl text-gray-700" />
            ) : (
              <RiMotorbikeLine className="text-6xl text-gray-700" />
            )}
          </div>

          {/* Vehicle form */}
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label className="block text-gray-700">Make</label>
              <select
                value={make}
                onChange={(e) => setMake(e.target.value)}
                className={`w-full p-2 border border-gray-300 rounded bg-gray-100 ${errors.make ? "border-red-500" : "text-gray-500"}`}
                required
              >
                <option value="">Select Vehicle Make</option>
                {(vehicleType === "Car" ? carMakes : bikeMakes).map((makeOption) => (
                  <option key={makeOption} value={makeOption}>
                    {makeOption}
                  </option>
                ))}
              </select>
              {errors.make && <p className="text-red-500 text-sm">{errors.make}</p>}
            </div>
            <div>
              <label className="block text-gray-700">Model</label>
              <input
                type="text"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className={`w-full p-2 border border-gray-300 rounded bg-gray-100 ${errors.model ? "border-red-500" : ""}`}
                required
              />
              {errors.model && <p className="text-red-500 text-sm">{errors.model}</p>}
            </div>
            <div>
              <label className="block text-gray-700">Vehicle Year</label>
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className={`w-full p-2 border border-gray-300 rounded bg-gray-100 ${errors.year ? "border-red-500" : "text-gray-500"}`}
                required
              >
                <option value="">Select Year</option>
                {validYears.map((yearOption) => (
                  <option key={yearOption} value={yearOption}>
                    {yearOption}
                  </option>
                ))}
              </select>
              {errors.year && <p className="text-red-500 text-sm">{errors.year}</p>}
            </div>
            <div>
              <label className="block text-gray-700">Vehicle Number</label>
              <div className="relative">
                <input
                  type="text"
                  value={vehicleNumber}
                  onChange={(e) => setVehicleNumber(e.target.value)}
                  className={`w-full p-2 border border-gray-300 rounded bg-gray-100 ${errors.vehicleNumber ? "border-red-500" : ""}`}
                  placeholder="Add Vehicle Number"
                  required
                />
                {errors.vehicleNumber && <RiErrorWarningFill className="text-red-500 absolute right-2 top-2" />}
              </div>
              {errors.vehicleNumber && <p className="text-red-500 text-sm">{errors.vehicleNumber}</p>}
            </div>
            {vehicleType === "Car" && (
              <div>
                <label className="block text-gray-700">Seats</label>
                <select
                  value={seats}
                  onChange={(e) => setSeats(e.target.value)}
                  className={`w-full p-2 border border-gray-300 rounded bg-gray-100 ${errors.seats ? "border-red-500" : "text-gray-500"}`}
                  required
                >
                  <option value="">Select</option>
                  {Array.from({ length: 10 }, (_, index) => (
                    <option key={index + 1} value={index + 1}>
                      {index + 1}
                    </option>
                  ))}
                </select>
                {errors.seats && <p className="text-red-500 text-sm">{errors.seats}</p>}
              </div>
            )}
            <button
              type="submit"
              className="w-full p-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition duration-200"
            >
              Save & Proceed
            </button>
          </form>

          {/* Success Popup */}
         {/* Success Popup */}
              {showSuccessPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                  <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-xl font-bold mb-2 text-green-600">Vehicle Added Successfully!</h2>
                    <p className="mb-4">You can view your profile and manage your vehicles.</p>
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
    </>
  );
}
