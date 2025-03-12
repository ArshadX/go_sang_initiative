"use client"; // Mark this as a client component

import { RiCarLine, RiHistoryLine } from "react-icons/ri"; // Importing icons from react-icons
import { useRouter } from "next/navigation"; // For navigation

const Page = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-purple-400 to-pink-500">
      <h1 className="text-4xl font-bold text-white mb-8">Your Rides</h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {/* Offered Rides */}
        <div
          onClick={() => router.push("/rides/offered")} // Redirect on click
          className="cursor-pointer flex flex-col items-center bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
        >
          <RiCarLine className="text-5xl text-purple-700 mb-4" />
          <h2 className="text-2xl font-semibold text-purple-700">Offered Rides</h2>
          <p className="text-gray-500 mt-2">View rides you have offered.</p>
        </div>

        {/* Rides History */}
        <div
          onClick={() => router.push("/rides/get")} // Redirect on click
          className="cursor-pointer flex flex-col items-center bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
        >
          <RiHistoryLine className="text-5xl text-purple-700 mb-4" />
          <h2 className="text-2xl font-semibold text-purple-700">Rides History</h2>
          <p className="text-gray-500 mt-2">Check your previous rides.</p>
        </div>
      </div>
    </div>
  );
};

export default Page;
