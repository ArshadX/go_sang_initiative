"use client";
import Head from 'next/head';
import { instance } from "@/constants/apis/instance";
import React, { useCallback, useEffect, useState } from "react";
import { _verifysession } from "@/app/actions/auth";
import Dialogue from "../common/DialogueBox";
import {
  RiHistoryLine,
  RiIdCardLine,
  RiQuestionLine,
  RiFileTextLine,
  RiSettings3Line,
  RiHeartLine,
  RiArrowRightSLine,
} from 'react-icons/ri';

interface Address {
  address_line: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
}

interface User {
  first_name: string;
  last_name: string;
  profileImage: string;
  status: string;
  email: string;
  phone_number: string;
  is_email_verified: boolean;
  is_aadhar_verified: boolean;
  bio: string;
  chatty: string;
  music: string;
  smoking: string;
  pets: string;
  vehicle: string;
  address_line: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
}

const EditProfile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [mobile, setMobile] = useState<string | null | unknown>(null);
  const [token, setToken] = useState<{} | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchToken = useCallback(() => {
    return _verifysession();
  }, []);

  useEffect(() => {
    fetchToken()
      .then((res) => {
        setToken(res.token);
        setMobile(res.phone_number);
        fetchUser(res.phone_number, res.token);
      })
      .catch((err: any) => {
        console.log("failed to fetch token", err);
      });
  }, [fetchToken]);

  const fetchUser = async (phone_number: unknown, token: {} | null) => {
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
  const parsedUser = JSON.parse(result.user);
  
  console.log(parsedUser.address); // This should log the address object correctly

  const userData: User = {
    ...parsedUser, // Spread the properties of the parsed user
    address_line: parsedUser.address?.address_line || '', // Use optional chaining to avoid errors
    city: parsedUser.address?.city || '', // Use optional chaining to avoid errors
    state: parsedUser.address?.state || '', // Use optional chaining to avoid errors
    country: parsedUser.address?.country || '', // Use optional chaining to avoid errors
    pincode: parsedUser.address?.pincode || '', // Use optional chaining to avoid errors
  };

  setUser(userData); // Assuming you're setting the user data here
}

      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      console.error('Error fetching user:', error.message);
    }
  };

  const flattenUserData = (user: User) => ({
   
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    phone_number: user.phone_number,
    address_line: user.address_line,
    city: user.city,
    state: user.state,
    country: user.country,
    pincode: user.pincode,
    // Include other fields as necessary
  });

  const handleUpdateProfile = async (updatedUser: User) => {
    try {
      const response = await instance.post(
        '/user_profile/editProfile/',
        flattenUserData(updatedUser), // Flatten the data before sending
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.status === 200) {
        alert('Profile updated successfully');
      }
    } catch (error: any) {
      console.error('Error updating profile:', error.message);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      handleUpdateProfile(user);
    }
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
  } else if (!user || token === null) {
    return <Dialogue />;
  }

  return (
    <>
      <Head>
        <title>Profile Page</title>
      </Head>
      <div className="bg-gray-100  flex items-center justify-center">
        <div className="bg-white p-6 shadow-lg rounded-lg w-full h-full lg:w-1/2 lg:h-auto ">
          <div className="flex items-center mb-6">
            <img
              src={user.profileImage || "https://placehold.co/60x60"}
              alt={`Profile picture of ${user.first_name} ${user.last_name}`}
              className="w-16 h-16 rounded-full mr-4"
            />
            <div>
              <h2 className="text-xl font-bold">
                {user.first_name + " " + user.last_name || "User Name"}
              </h2>
              <a href="#" className="text-blue-500">
                Edit profile
              </a>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Reusable input field component */}
            {[
              { label: "First Name", value: user.first_name, field: "first_name" },
              { label: "Last Name", value: user.last_name, field: "last_name" },
              { label: "Email", value: user.email, field: "email" },
              { label: "Address Line", value: user.address_line, field: "address_line" },
              { label: "City", value: user.city, field: "city" },
              { label: "State", value: user.state, field: "state" },
              { label: "Country", value: user.country, field: "country" },
              { label: "Pincode", value: user.pincode, field: "pincode" },
            ].map(({ label, value, field }) => (
              <div className="mb-4" key={field}>
                <label className="block text-gray-700 mb-2">{label}</label>
                <input
                  type="text"
                  value={value}
                  onChange={(e) => {
                    setUser((prevUser) => ({
                      ...prevUser!,
                      [field]: e.target.value,
                    }));
                  }}
                  className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>
            ))}

            <div className="flex justify-center mb-4">
              <button
                type="submit"
                className="bg-purple-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-purple-700 transition duration-200"
              >
                Update Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
