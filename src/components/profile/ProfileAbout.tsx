"use client";
import React, { useCallback, useEffect, useState } from "react";
import Image from 'next/image';
import { FaIdCard, FaEnvelope, FaPhone, FaCheckCircle, FaComment, FaMusic, FaSmoking, FaPaw, FaChevronRight } from 'react-icons/fa';
import { instance } from "@/constants/apis/instance";
// import { _verifysession } from "@/app/actions/auth";
import Dialogue from "../common/DialogueBox";

// Define the User interface
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

const ProfileAbout = () => {
    // Initialize state with User type or null
    const [user, setUser] = useState<User | null>(null);
    const [mobile, setMobile] = useState<string | null | unknown>(null);
    const [token, setToken] = useState<{} | null>(null);
    const [loading,setLoading] = useState(false)
    // Fetch mobile and token from localStorage and update state
    //  const fetchToken  = useCallback(()=>{
    //     return _verifysession()
    // },[])
    // useEffect(() => {
    //      fetchToken().then((res)=>{
    //         setToken(res.token)
    //         setMobile(res.phone_number)
    //         fetchUser(res.phone_number,res.token)
    //     }).catch((err:any)=>{
    //         console.log("failed to fetch token",err)
    //     })
    //     // if (storedMobile) setMobile(storedMobile);
    //     // if (storedToken) setToken(storedToken);
    // }, []);
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
                console.log(userData);
                setUser(userData);
            }
            setLoading(false)
        } catch (error: any) {
            setLoading(false)
            console.error('Error fetching user:', error.message);
        }
    };
    // Add mobile and token as dependencies

    // Show loading text if user data is not yet available
    
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
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
            <div className="flex justify-between items-center border-b border-gray-200 pb-3 mb-6">
                <div className="flex-1 flex space-x-4">
                    <a href="#" className="flex-1 text-gray-700 hover:text-blue-500 transition duration-300 text-center py-2 border-b-2 border-transparent hover:border-blue-500">About you</a>
                    <a href="#" className="flex-1 text-gray-700 hover:text-blue-500 transition duration-300 text-center py-2 border-b-2 border-transparent hover:border-blue-500">Account</a>
                </div>
            </div>
            <div className="flex items-center space-x-6 mb-6">
                <Image src={user.profileImage || "/images/about/vimal.jpg"} alt="Profile" width={96} height={96} className="rounded-full border-4 border-blue-200 shadow-md object-cover" />
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-800">{user.first_name +" "+ user.last_name || "User Name"}</h1>
                    <p className="text-gray-600 text-lg">{user.status || "Newcomer"}</p>
                </div>
                <FaChevronRight className="text-gray-400 ml-auto text-xl" />
            </div>
            <div className="space-y-4 mb-6">
                <a href="#" className="text-blue-600 hover:underline">Edit profile picture</a><br />
                <a href="#" className="text-blue-600 hover:underline">Edit personal details</a>
            </div>
            <div className="border-t border-gray-200 pt-6 mb-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Verify your profile</h2>
                <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                        <FaIdCard className="text-blue-500 text-xl" />
                        <a href="#" className="text-blue-600 hover:underline">Verify your Govt. ID</a>
                        {user.is_aadhar_verified ? <FaCheckCircle className="text-blue-500 text-xl" /> : ''}

                    </div>
                    <div className="flex items-center space-x-3">
                        <FaEnvelope className="text-blue-500 text-xl" />
                        <a href="#" className="text-blue-600 hover:underline"> {user.email || "Email Not found"}</a>
                        {user.is_email_verified ? <FaCheckCircle className="text-blue-500 text-xl" /> : ''}

                    </div>
                    <div className="flex items-center space-x-3">
                        <FaPhone className="text-blue-500 text-xl" />
                        <span className="text-gray-700">{user.phone_number || "Number Not Found"}</span>
                        
                        <FaCheckCircle className="text-blue-500 text-xl" />
                    </div>
                </div>
            </div>
            <div className="border-t border-gray-200 pt-6 mb-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">About you</h2>
                <p className="text-gray-700 mb-4">
                    {user.bio || "I am living in Crossing Republik near ABES Engineering College. I generally travel from ABES Engineering College to Bichalua Anoopsahr with my family, which includes my wife and my 2-year-old baby."}
                </p>
                <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                        <FaComment className="text-gray-600 text-xl" />
                        <span className="text-gray-700">{user.chatty || "I'm chatty when I feel comfortable"}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                        <FaMusic className="text-gray-600 text-xl" />
                        <span className="text-gray-700">{user.music || "I'll jam depending on the mood"}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                        <FaSmoking className="text-gray-600 text-xl" />
                        <span className="text-gray-700">{user.smoking || "Cigarette breaks outside the car are ok"}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                        <FaPaw className="text-gray-600 text-xl" />
                        <span className="text-gray-700">{user.pets || "I'll travel with pets depending on the animal"}</span>
                    </div>
                </div>
                <div className="mt-4">
                    <a href="#" className="text-blue-600 hover:underline">Edit travel preferences</a>
                </div>
            </div>
            <div className="border-t border-gray-200 pt-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Vehicles</h2>
                <p className="text-gray-700 mb-4">{user.vehicle || "No Vehical"}</p>
                <a href="#" className="text-blue-600 hover:underline">Add vehicle</a>
            </div>
        </div>
    );
};

export default ProfileAbout;
