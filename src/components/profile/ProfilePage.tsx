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


interface User {
  first_name: string;
  last_name: string;
  profileImage: string;
  status: string;
  email: string;
  phone_number: string;
  is_email_verified:boolean;
  is_aadhar_verified :boolean;
  bio: string;
  chatty: string;
  music: string;
  smoking: string;
  pets: string;
  vehicle: string;
}

const ProfilePage = () => {

  const [user, setUser] = useState<User | null>(null);
  const [mobile, setMobile] = useState<string | null | unknown>(null);
  const [token, setToken] = useState<{} | null>(null);
  const [loading,setLoading] = useState(false)
  // Fetch mobile and token from localStorage and update state
   const fetchToken  = useCallback(async()=>{
      return await _verifysession()
  },[])
  useEffect(() => {
       fetchToken().then((res)=>{
          setToken(res.token)
          setMobile(res.phone_number)
          fetchUser(res.phone_number,res.token)
      }).catch((err:any)=>{
          console.log("failed to fetch token",err)
      })
      // if (storedMobile) setMobile(storedMobile);
      // if (storedToken) setToken(storedToken);
  }, []);
  // Fetch user data from the API
  const fetchUser = async (phone_number:unknown,token:{}|null) => {
      try {
          setLoading(true)
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
          }
          setLoading(false)
      } catch (error: any) {
          setLoading(false)
          console.error('Error fetching user:', error.message);
      }
  };


  if(loading){
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
    )
}else if(!user || (token === null)){
    return <Dialogue />
}
  return (
    <>
      <Head>
        <title>Profile Page</title>
      </Head>
      {/* Full height wrapper for mobile */}
      <div className="bg-gray-100 h-screen flex items-center justify-center">
        {/* Responsive container */}
        <div className="bg-white p-6 shadow-lg rounded-lg w-full h-full lg:w-1/2 lg:h-auto lg:max-h-screen">
          <div className="flex items-center mb-6">
            <img
              src="https://placehold.co/60x60"
              alt="Profile picture of Alex Westwood"
              className="w-16 h-16 rounded-full mr-4"
            />
            <div>
              <h2 className="text-xl font-bold">{user.first_name +" "+ user.last_name || "User Name"}</h2>
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
            <li className="flex items-center justify-between">
              <a href="#" className="flex items-center">
                <RiHistoryLine className="text-gray-500 mr-4" />
                <span className="font-semibold">Rides history</span>
              </a>
              <RiArrowRightSLine className="text-gray-500" />
            </li>
            <li className="flex items-center justify-between">
              <a href="#" className="flex items-center">
                <RiIdCardLine className="text-gray-500 mr-4" />
                <span className="font-semibold">Payment methods</span>
              </a>
              <RiArrowRightSLine className="text-gray-500" />
            </li>
            <li className="flex items-center justify-between">
              <a href="#" className="flex items-center">
                <RiQuestionLine className="text-gray-500 mr-4" />
                <span className="font-semibold">FAQ</span>
              </a>
              <RiArrowRightSLine className="text-gray-500" />
            </li>
            <li className="flex items-center justify-between">
              <a href="#" className="flex items-center">
                <RiFileTextLine className="text-gray-500 mr-4" />
                <span className="font-semibold">Terms & Conditions</span>
              </a>
              <RiArrowRightSLine className="text-gray-500" />
            </li>
            <li className="flex items-center justify-between">
              <a href="#" className="flex items-center">
                <RiSettings3Line className="text-gray-500 mr-4" />
                <span className="font-semibold">Settings</span>
              </a>
              <RiArrowRightSLine className="text-gray-500" />
            </li>
            <li className="flex items-center justify-between">
              <a href="#" className="flex items-center">
                <RiHeartLine className="text-gray-500 mr-4" />
                <span className="font-semibold">Support center</span>
              </a>
              <RiArrowRightSLine className="text-gray-500" />
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
