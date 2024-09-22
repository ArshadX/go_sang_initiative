"use client";
// pages/add-vehicle.tsx
import Head from 'next/head';
import { useState } from 'react';

type Errors = {
  make?: string;
  model?: string;
  year?: string;
  vehicleNumber?: string;
  seats?: string;
};

export default function AddVehicle() {
  const [vehicleType, setVehicleType] = useState<'Car' | 'Bike'>('Car');
  const [make, setMake] = useState<string>('');
  const [model, setModel] = useState<string>('');
  const [year, setYear] = useState<string>('');
  const [vehicleNumber, setVehicleNumber] = useState<string>('');
  const [seats, setSeats] = useState<string>('');
  const [errors, setErrors] = useState<Errors>({});

  // Vehicle makes for cars and bikes
  const carMakes = ['Toyota', 'Honda', 'Maruti Suzuki', 'Hyundai', 'Ford'];
  const bikeMakes = ['Hero', 'Honda', 'Bajaj', 'TVS', 'Royal Enfield'];

  const handleVehicleTypeChange = (type: 'Car' | 'Bike') => {
    setVehicleType(type);
    setMake(''); // Clear selected make when switching vehicle types
    if (type === 'Bike') {
      setSeats(''); // Clear seats when switching to bike
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors: Errors = {};

    if (!make) validationErrors.make = 'Make is required';
    if (!model) validationErrors.model = 'Model is required';
    if (!year) validationErrors.year = 'Vehicle Year is required';
    if (!vehicleNumber) validationErrors.vehicleNumber = 'Vehicle Number is required';
    if (vehicleType === 'Car' && !seats) validationErrors.seats = 'Seats are required for cars';

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Prepare data to send
    const vehicleData = {
      type: vehicleType,
      make,
      model,
      year,
      vehicleNumber,
      seats: vehicleType === 'Car' ? seats : undefined,
    };

    try {
      const response = await fetch('/api/vehicle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(vehicleData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Handle successful response
      console.log('Vehicle added successfully');
    } catch (error) {
      // Handle error
      console.error('Error adding vehicle:', error);
    }
  };

  return (
    <>
      <Head>
        <title>Add Vehicle</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" />
      </Head>
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md p-4">
          <div className="flex items-center justify-between bg-orange-500 p-2">
            <i className="fas fa-arrow-left text-white"></i>
            <h1 className="text-white text-lg">Add Vehicle</h1>
            <div></div>
          </div>
          <div className="flex justify-center mt-4">
            <div className="flex space-x-4">
              <button 
                onClick={() => handleVehicleTypeChange('Car')} 
                className={`text-${vehicleType === 'Car' ? 'orange-500 border-b-2 border-orange-500' : 'gray-400'} ${vehicleType === 'Car' ? 'font-bold' : ''}`}
              >
                Car
              </button>
              <button 
                onClick={() => handleVehicleTypeChange('Bike')} 
                className={`text-${vehicleType === 'Bike' ? 'orange-500 border-b-2 border-orange-500' : 'gray-400'} ${vehicleType === 'Bike' ? 'font-bold' : ''}`}
              >
                Bike
              </button>
            </div>
          </div>
          <div className="flex justify-center mt-8">
            <i className={`fas fa-${vehicleType === 'Car' ? 'car' : 'motorcycle'} text-6xl`}></i>
          </div>
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label className="block text-gray-700">Make</label>
              <select 
                value={make}
                onChange={(e) => setMake(e.target.value)}
                className={`w-full p-2 border border-gray-300 rounded bg-gray-100 ${errors.make ? 'border-red-500' : 'text-gray-500'}`}
                required
              >
                <option value="">Select Vehicle Make</option>
                {(vehicleType === 'Car' ? carMakes : bikeMakes).map((makeOption) => (
                  <option key={makeOption} value={makeOption}>{makeOption}</option>
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
                className={`w-full p-2 border border-gray-300 rounded bg-gray-100 ${errors.model ? 'border-red-500' : ''}`}
                required
              />
              {errors.model && <p className="text-red-500 text-sm">{errors.model}</p>}
            </div>
            <div>
              <label className="block text-gray-700">Vehicle Year</label>
              <select 
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className={`w-full p-2 border border-gray-300 rounded bg-gray-100 ${errors.year ? 'border-red-500' : 'text-gray-500'}`}
                required
              >
                <option value="">Select</option>
                {/* Add more options as needed */}
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
                  className={`w-full p-2 border border-gray-300 rounded bg-gray-100 ${errors.vehicleNumber ? 'border-red-500' : ''}`} 
                  placeholder="Add Vehicle Number" 
                  required
                />
                <i className="fas fa-exclamation-circle text-red-500 absolute right-2 top-2"></i>
              </div>
              {errors.vehicleNumber && <p className="text-red-500 text-sm">{errors.vehicleNumber}</p>}
            </div>
            {vehicleType === 'Car' && (
              <div>
                <label className="block text-gray-700">Seats</label>
                <select 
                  value={seats}
                  onChange={(e) => setSeats(e.target.value)}
                  className={`w-full p-2 border border-gray-300 rounded bg-gray-100 ${errors.seats ? 'border-red-500' : 'text-gray-500'}`}
                  required
                >
                  <option value="">Select</option>
                  {/* Add more options as needed */}
                </select>
                {errors.seats && <p className="text-red-500 text-sm">{errors.seats}</p>}
              </div>
            )}
            <button type="submit" className="w-full p-2 bg-orange-500 text-white rounded">NEXT</button>
          </form>
        </div>
      </div>
    </>
  );
}
