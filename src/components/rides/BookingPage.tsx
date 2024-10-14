// components/BookingPage.js
import React from 'react';
import { RiMapPinLine, RiStarFill, RiCloseCircleLine, RiFlashlightLine } from 'react-icons/ri';

const BookingPage = () => {
    return (
        <div className="max-w-4xl mx-auto bg-gray-100 p-6">
            <h1 className="text-2xl font-bold mb-4">Monday, 14 October</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                    <div className="bg-white p-4 rounded-lg shadow mb-4">
                        <div className="flex items-center mb-2">
                            <span className="text-gray-500 text-sm">16:00</span>
                            <RiMapPinLine className="text-gray-500 mx-2" />
                            <span className="text-sm">Advant Navis Business Park, Noida-Greater Noida Expy, Paras Tierea, Sector 142, Noida, Uttar Pradesh</span>
                        </div>
                        <div className="flex items-center">
                            <span className="text-gray-500 text-sm">17:30</span>
                            <RiMapPinLine className="text-gray-500 mx-2" />
                            <span className="text-sm">C433-JRP, Vegetable Mandi Rd, Seelampur, Jahangirabad, Uttar Pradesh</span>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow mb-4">
                        <div className="flex items-center mb-4">
                            <img src="https://placehold.co/50x50" alt="Profile picture of Himanshu" className="w-12 h-12 rounded-full mr-4" />
                            <div>
                                <h2 className="text-lg font-bold">Himanshu</h2>
                                <div className="flex items-center text-sm text-gray-500">
                                    <RiStarFill className="text-yellow-500 mr-1" />
                                    5/5 - 6 ratings
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center text-sm text-gray-500 mb-4">
                            <RiCloseCircleLine className="text-green-500 mr-2" />
                            Rarely cancels rides
                        </div>
                        <div className="flex items-center text-sm text-gray-500 mb-4">
                            <RiFlashlightLine className="text-blue-500 mr-2" />
                            Your booking will be confirmed instantly
                        </div>
                        <button className="bg-blue-100 text-blue-500 px-4 py-2 rounded-lg">Ask Himanshu a question</button>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow">
                        <h2 className="text-lg font-bold mb-4">Co-travellers</h2>
                        <div className="flex items-center mb-4">
                            <img src="https://placehold.co/50x50" alt="Profile picture of Anupam" className="w-12 h-12 rounded-full mr-4" />
                            <div>
                                <h3 className="text-sm font-bold">Anupam</h3>
                                <p className="text-sm text-gray-500">Noida → Jahangirabad</p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <img src="https://placehold.co/50x50" alt="Profile picture of Rahul" className="w-12 h-12 rounded-full mr-4" />
                            <div>
                                <h3 className="text-sm font-bold">Rahul</h3>
                                <p className="text-sm text-gray-500">Noida → Jahangirabad</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="bg-white p-4 rounded-lg shadow mb-4">
                        <h2 className="text-lg font-bold mb-4">Monday, 14 October</h2>
                        <div className="flex items-center mb-2">
                            <span className="text-gray-500 text-sm">16:00</span>
                            <RiMapPinLine className="text-gray-500 mx-2" />
                            <span className="text-sm">Advant Navis Business Park, Noida-Greater Noida Expy, Paras Tierea, Sector 142, Noida, Uttar Pradesh</span>
                        </div>
                        <div className="flex items-center">
                            <span className="text-gray-500 text-sm">17:30</span>
                            <RiMapPinLine className="text-gray-500 mx-2" />
                            <span className="text-sm">C433-JRP, Vegetable Mandi Rd, Seelampur, Jahangirabad, Uttar Pradesh</span>
                        </div>
                        <div className="flex items-center mt-4">
                            <img src="https://placehold.co/50x50" alt="Profile picture of Himanshu" className="w-12 h-12 rounded-full mr-4" />
                            <div>
                                <h3 className="text-sm font-bold">Himanshu</h3>
                                <div className="flex items-center text-sm text-gray-500">
                                    <RiStarFill className="text-yellow-500 mr-1" />
                                    5
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow mb-4">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-sm">1 passenger</span>
                            <span className="text-lg font-bold">₹180.00</span>
                        </div>
                        <button className="bg-blue-500 text-white w-full py-2 rounded-lg flex items-center justify-center">
                            <RiFlashlightLine className="mr-2" />
                            Book
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingPage;
