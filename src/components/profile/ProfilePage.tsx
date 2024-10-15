"use client";
import Head from 'next/head';
import { instance } from "@/constants/apis/instance";
import React, { useCallback, useEffect, useState } from "react";
import { getCredentials } from "@/app/actions/auth";
import Dialogue from "../common/DialogueBox";

import {
  RiHistoryLine,
  RiIdCardLine,
  RiQuestionLine,
  RiFileTextLine,
  RiSettings3Line,
  RiHeartLine,
  RiArrowRightSLine,
  RiDeleteBinLine
} from 'react-icons/ri';
import { useRouter } from 'next/navigation';

interface Vehicle {
  vehicle_brand: string;
  vehicle_capacity: string;
  vehicle_modal: string;
  vehicle_number: string;
  vehicle_type: string;
}

interface User {
  first_name: string;
  last_name: string;
  profileImage: string;
  status: string;
  email: string;
  phone_number: string;
  is_email_verified: boolean;
  vehical_list: Array<Vehicle>;  
  is_aadhar_verified: boolean;
  bio: string;
  chatty: string;
  music: string;
  smoking: string;
  pets: string;
  vehicle: string;
}

// Define the keys for collapsible items
type CollapsibleKeys = 'vehicles' | 'paymentHistory' | 'faq' | 'termsConditions' | 'settings' | 'supportCenter';

const ProfilePage = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [vehicles, setVehicles] = useState<Vehicle[] | null>(null); // Change here
  const [loading, setLoading] = useState(false);
  const [deleteVehicle, setDeleteVehicle] = useState<Vehicle | null>(null); // Store the vehicle to delete
const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false); // Control the confirmation dialog

  const [collapseStates, setCollapseStates] = useState<Record<CollapsibleKeys, boolean>>({
    vehicles: false,
    paymentHistory: false,
    faq: false,
    termsConditions: false,
    settings: false,
    supportCenter: false,
  });

  const fetchToken = useCallback(async () => {
    const session = await getCredentials();
    fetchUser(session.phone_number, session.token);
  }, []);

  useEffect(() => {
    fetchToken();
  }, []);

  const fetchUser = async (phone_number: unknown, token: unknown | string) => {
    try {
      setLoading(true);
      const response = await instance.post(
        '/user_profile/get_user/',
        { user_id: phone_number },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const result = response.data;
      if (result.user) {
        const userData: User = JSON.parse(result.user);
        setUser(userData);
        setVehicles(userData.vehical_list); // Keep the spelling as you mentioned
      }
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      console.error('Error fetching user:', error.message);
    }
  };


  const handleDeleteVehicle = async (vehicle: Vehicle) => {
    try {
        const session = await getCredentials();
        const response = await instance.post(
            '/user_profile/delete_vehical/',
            {
                user_id: session.phone_number,
                vehicle_number: vehicle.vehicle_number,
                vehicle_modal: vehicle.vehicle_modal,
            },
            {
                headers: {
                    Authorization: `Bearer ${session.token}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        if (response.data.success) {
            // Update vehicles state to remove the deleted vehicle
            setVehicles((prevVehicles) => prevVehicles?.filter(v => v.vehicle_number !== vehicle.vehicle_number) || []);
        }
    } catch (error:any) {
        console.error('Error deleting vehicle:', error.message);
    } finally {
        setShowDeleteConfirmation(false); 
        setDeleteVehicle(null); 
    }
};


  // Toggle the collapse state for a specific item
  const toggleCollapse = (key: CollapsibleKeys) => {
    setCollapseStates((prevStates) => ({
      ...prevStates,
      [key]: !prevStates[key],
    }));
  };

  if (loading) {
    return (
      <div className="relative left-0 right-0 top-72 h-full isolate">
        <div className="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
          <div className="animate-pulse flex space-x-4">
            <div className="rounded-full bg-slate-700 h-10 w-10"></div>
            <div className="flex-1 space-y-6 py-1">
              <div className="h-2 bg-slate-700 rounded"></div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                  <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                </div>
                <div className="h-2 bg-slate-700 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (!user) {
    return <Dialogue />;
  }

  return (
    <>
      <Head>
        <title>Profile Page</title>
      </Head>

      {showDeleteConfirmation && (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded shadow-lg">
            <h3 className="text-lg font-bold mb-4">Are you sure you want to delete this vehicle?</h3>
            <div className="flex justify-end">
                <button onClick={() => setShowDeleteConfirmation(false)} className="mr-2 text-gray-600">Cancel</button>
                <button onClick={() => deleteVehicle && handleDeleteVehicle(deleteVehicle)} className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
            </div>
        </div>
    </div>
)}

      <div className="bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-6 shadow-lg rounded-lg w-full h-full lg:w-1/2 lg:h-auto lg:max-h-screen">
          <div className="flex items-center mb-6">
            <img
              src="https://placehold.co/60x60"
              alt="Profile picture of Alex Westwood"
              className="w-16 h-16 rounded-full mr-4"
            />
            <div>
              <h2 className="text-xl font-bold">{user.first_name + " " + user.last_name || "User Name"}</h2>
              <a href="/editprofile" className="text-blue-500">
                Edit profile
              </a>
            </div>
          </div>
          <div className="flex justify-between mb-6">
            <div className="bg-gray-100 rounded-lg p-4 text-center w-1/2 mr-2">
              <div className="text-2xl font-bold">9735</div>
              <div className="text-gray-500">Total km</div>
            </div>
            <div className="bg-gray-100 rounded-lg p-4 text-center w-1/2 ml-2">
              <div className="text-2xl font-bold">19</div>
              <div className="text-gray-500">Total rides</div>
            </div>
          </div>
          <ul className="space-y-4">
            {/* Vehicles Section */}
            <li onClick={() => toggleCollapse('vehicles')} className="flex items-center justify-between cursor-pointer">
              <a href="#" className="flex items-center">
                <RiIdCardLine className="text-gray-500 mr-4" />
                <span className="font-semibold">Vehicles</span>
              </a>
              <RiArrowRightSLine className="text-gray-500" />
            </li>
            {collapseStates.vehicles && (
            <ul className="pl-8">
                {vehicles && vehicles.map((vehicle, index) => (
                    <li key={index} className="flex items-center justify-between">
                        <b>{vehicle.vehicle_brand} - {vehicle.vehicle_number}</b>
                        <button onClick={() => { setDeleteVehicle(vehicle); setShowDeleteConfirmation(true); }} className="text-red-500 ml-2">
                            <RiDeleteBinLine />
                        </button>
                    </li>
                ))}
            </ul>
        )}


            {/* Payment History Section */}
            <li onClick={() => toggleCollapse('paymentHistory')} className="flex items-center justify-between cursor-pointer">
              <a href="#" className="flex items-center">
                <RiHistoryLine className="text-gray-500 mr-4" />
                <span className="font-semibold">Payment History</span>
              </a>
              <RiArrowRightSLine className="text-gray-500" />
            </li>
            {collapseStates.paymentHistory && (
              <ul className="pl-8">
                <li>Payment 1</li>
                <li>Payment 2</li>
              </ul>
            )}

            {/* FAQ Section */}
            <li onClick={() => toggleCollapse('faq')} className="flex items-center justify-between cursor-pointer">
              <a href="/faq" className="flex items-center">
                <RiQuestionLine className="text-gray-500 mr-4" />
                <span className="font-semibold">FAQ</span>
              </a>
              <RiArrowRightSLine className="text-gray-500" />
            </li>
           

            {/* Terms & Conditions Section */}
            <li onClick={() => toggleCollapse('termsConditions')} className="flex items-center justify-between cursor-pointer">
              <a href="/terms&conditions" className="flex items-center">
                <RiFileTextLine className="text-gray-500 mr-4" />
                <span className="font-semibold">Terms & Conditions</span>
              </a>
              <RiArrowRightSLine className="text-gray-500" />
            </li>
           

            {/* Settings Section */}
            <li onClick={() => toggleCollapse('settings')} className="flex items-center justify-between cursor-pointer">
              <a href="#" className="flex items-center">
                <RiSettings3Line className="text-gray-500 mr-4" />
                <span className="font-semibold">Settings</span>
              </a>
              <RiArrowRightSLine className="text-gray-500" />
            </li>
            {collapseStates.settings && (
              <ul className="pl-8">
                <li>Setting 1</li>
                <li>Setting 2</li>
              </ul>
            )}

            {/* Support Center Section */}
            <li onClick={() => toggleCollapse('supportCenter')} className="flex items-center justify-between cursor-pointer">
              <a href="#" className="flex items-center">
                <RiHeartLine className="text-gray-500 mr-4" />
                <span className="font-semibold">Support Center</span>
              </a>
              <RiArrowRightSLine className="text-gray-500" />
            </li>
            {collapseStates.supportCenter && (
              <ul className="pl-8">
                <li>Support 1</li>
                <li>Support 2</li>
              </ul>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
