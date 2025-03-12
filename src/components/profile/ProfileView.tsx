"use client"; // Mark this as a Client Component

import { useEffect, useState } from 'react';
import { RiShieldStarLine, RiErrorWarningLine, RiChat1Line, RiMailLine, RiCloseCircleLine } from 'react-icons/ri';
import { useParams } from 'next/navigation';
import { OtherUser } from '@/utils/OtherUser';
import User  from './User'; 

const ProfileView = () => {
    const { id } = useParams(); 
    const [user, setUser] = useState<User | null>(null); 

    // Fetch the user profile when the id changes
    useEffect(() => {
        const fetchProfile = async () => {
            if (id) { 
                const userData = await OtherUser(id as string); 
                setUser(userData);
            }
        };
        fetchProfile(); 
    }, [id]); 

    const [verificationStatus, setVerificationStatus] = useState({
        aadhar: false,
        rc: false,
        drivingLicense: false,
    });

    // Update verification status when user is fetched
    useEffect(() => {
        if (user) {
            setVerificationStatus({
                aadhar: user.is_aadhar_verified || false,
                rc: user.is_email_verified || false, 
                drivingLicense: user.is_number_verified || false, 
            });
        }
    }, [user]);

    if (!user) {
        return <div>Loading...</div>; 
    }

    const profileImage = '/path-to-dummy-image.jpg'; 
    const dummyDescription = "This is a sample description for the user."; 
    const ridesPublished = 10; 

    const createdAtDate = user.created_at?.$date 
        ? new Date(user.created_at.$date).toLocaleDateString() 
        : 'Unknown'; 

    // Determine card colors
    const cardColor = 'bg-pink-300'; 
    const verifiedColor = 'bg-yellow-200'; 
    const unverifiedColor = 'bg-gray-300'; 

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className={` ${cardColor} max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6`}>
                {/* Header */}
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Profile</h1>

                {/* Profile Card */}
                <div className={`bg-white rounded-lg shadow-lg p-6 mb-4 flex items-center transition-transform transform hover:scale-105 duration-300 ease-in-out`}>
                    <img src={profileImage} alt="Profile" className="w-24 h-24 rounded-full border-4 border-gray-300 shadow-md transition-transform duration-200 ease-in-out hover:scale-110" />
                    <div className="ml-6">
                        <div className="flex items-center mb-2">
                            <RiShieldStarLine className={`text-2xl ${verificationStatus.aadhar ? 'text-yellow-500' : 'text-gray-300'}`} />
                            <h2 className="text-xl font-bold ml-2 text-gray-800 hover:text-blue-600 transition-colors duration-300">{user.first_name} {user.last_name}</h2>
                        </div>
                        <p className="text-sm text-gray-600 italic mb-3">{dummyDescription}</p>
                        <div className="flex flex-col justify-start text-gray-700 text-sm">
                            <span className="font-semibold">{ridesPublished} rides published</span>
                            <span className="font-semibold">Member since {createdAtDate}</span> {/* Rendering the parsed date */}
                        </div>
                    </div>
                </div>

                {/* Contact Options */}
                <div className="bg-white rounded-lg shadow-lg p-4 mb-4 flex items-center space-x-4">
                    <RiChat1Line className="text-2xl text-blue-500" />
                    <span className="text-lg font-semibold text-gray-800">Chat with {user.first_name}</span>
                </div>
                <div className="bg-white rounded-lg shadow-lg p-4 flex items-center space-x-4">
                    <RiMailLine className="text-2xl text-blue-500" />
                    <span className="text-lg font-semibold text-gray-800">{user.email || 'Email not provided'}</span>
                </div>

                {/* Verification Status Section */}
                <div className="bg-white rounded-lg shadow-lg p-4 mb-4">
                    <h3 className="text-lg font-bold mb-2">Verification Status</h3>
                    <div className="flex flex-col">
                        {verificationStatus.aadhar ? (
                            <div className={`${verifiedColor} flex items-center p-2 rounded mb-2`}>
                                <span className="mr-2">Aadhar Verified</span>
                                <RiShieldStarLine className="text-yellow-500" />
                            </div>
                        ) : (
                            <div className={`${unverifiedColor} flex items-center p-2 rounded mb-2`}>
                                <RiCloseCircleLine className="text-red-500 mr-2" />
                                <span className="text-gray-600">Aadhar Not Verified</span>
                            </div>
                        )}
                        {verificationStatus.rc ? (
                            <div className={`${verifiedColor} flex items-center p-2 rounded mb-2`}>
                                <span className="mr-2">RC Verified</span>
                                <RiShieldStarLine className="text-yellow-500" />
                            </div>
                        ) : (
                            <div className={`${unverifiedColor} flex items-center p-2 rounded mb-2`}>
                                <RiCloseCircleLine className="text-red-500 mr-2" />
                                <span className="text-gray-600">RC Not Verified</span>
                            </div>
                        )}
                        {verificationStatus.drivingLicense ? (
                            <div className={`${verifiedColor} flex items-center p-2 rounded mb-2`}>
                                <span className="mr-2">Driving License Verified</span>
                                <RiShieldStarLine className="text-yellow-500" />
                            </div>
                        ) : (
                            <div className={`${unverifiedColor} flex items-center p-2 rounded mb-2`}>
                                <RiCloseCircleLine className="text-red-500 mr-2" />
                                <span className="text-gray-600">Driving License Not Verified</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Report Section */}
                <div className="bg-white rounded-lg shadow-lg p-4 mb-4">
                    <h3 className="text-lg font-bold mb-2">Report</h3>
                    <p className="text-sm text-gray-600 flex items-center">
                        <RiErrorWarningLine className="text-red-500 mr-2" />
                        If you find any issues with this profile, please report.
                    </p>
                </div>

                {/* Additional Information Section */}
                <div className="bg-white rounded-lg shadow-lg p-4">
                    <h3 className="text-lg font-bold mb-2">Additional Information</h3>
                    <p className="text-sm text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent in libero nisi. Morbi eget nulla in velit gravida dapibus.</p>
                </div>
            </div>
        </div>
    );
};

export default ProfileView;
