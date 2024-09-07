// components/Profile.tsx
import Image from 'next/image';
import { FaIdCard, FaEnvelope, FaPhone, FaCheckCircle, FaComment, FaMusic, FaSmoking, FaPaw, FaChevronRight } from 'react-icons/fa';

const Profile = () => {
    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
            <div className="flex justify-between items-center border-b border-gray-200 pb-3 mb-6">
                <div className="flex-1 flex space-x-4">
                    <a href="#" className="flex-1 text-gray-700 hover:text-blue-500 transition duration-300 text-center py-2 border-b-2 border-transparent hover:border-blue-500">About you</a>
                    <a href="#" className="flex-1 text-gray-700 hover:text-blue-500 transition duration-300 text-center py-2 border-b-2 border-transparent hover:border-blue-500">Account</a>
                </div>
            </div>
            <div className="flex items-center space-x-6 mb-6">
                <Image src="/images/about/vimal.jpg" alt="Profile" width={96} height={96} className="rounded-full border-4 border-blue-200 shadow-md object-cover" />
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-800">Vimal Sharma</h1>
                    <p className="text-gray-600 text-lg">Newcomer</p>
                </div>
                <FaChevronRight className="text-gray-400 ml-auto text-xl" />
            </div>
            <div className="space-y-4 mb-6">
                <a href="#" className="text-blue-600 hover:underline">Edit profile picture</a>
                <a href="#" className="text-blue-600 hover:underline">Edit personal details</a>
            </div>
            <div className="border-t border-gray-200 pt-6 mb-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Verify your profile</h2>
                <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                        <FaIdCard className="text-blue-500 text-xl" />
                        <a href="#" className="text-blue-600 hover:underline">Verify your Govt. ID</a>
                    </div>
                    <div className="flex items-center space-x-3">
                        <FaEnvelope className="text-blue-500 text-xl" />
                        <a href="#" className="text-blue-600 hover:underline">Confirm email vimalsharma0758@gmail.com</a>
                    </div>
                    <div className="flex items-center space-x-3">
                        <FaPhone className="text-blue-500 text-xl" />
                        <span className="text-gray-700">+970898443231</span>
                        <FaCheckCircle className="text-blue-500 text-xl" />
                    </div>
                </div>
            </div>
            <div className="border-t border-gray-200 pt-6 mb-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">About you</h2>
                <p className="text-gray-700 mb-4">
                    I am living in Crossing Republik near ABES Engineering College. I generally travel from ABES Engineering College to Bichalua Anoopsahr with my family, which includes my wife and my 2-year-old baby.
                </p>
                <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                        <FaComment className="text-gray-600 text-xl" />
                        <span className="text-gray-700">I&apos;m chatty when I feel comfortable</span>
                    </div>
                    <div className="flex items-center space-x-3">
                        <FaMusic className="text-gray-600 text-xl" />
                        <span className="text-gray-700">I&apos;ll jam depending on the mood</span>
                    </div>
                    <div className="flex items-center space-x-3">
                        <FaSmoking className="text-gray-600 text-xl" />
                        <span className="text-gray-700">Cigarette breaks outside the car are ok</span>
                    </div>
                    <div className="flex items-center space-x-3">
                        <FaPaw className="text-gray-600 text-xl" />
                        <span className="text-gray-700">I&apos;ll travel with pets depending on the animal</span>
                    </div>
                </div>
                <div className="mt-4">
                    <a href="#" className="text-blue-600 hover:underline">Edit travel preferences</a>
                </div>
            </div>
            <div className="border-t border-gray-200 pt-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Vehicles</h2>
                <p className="text-gray-700 mb-4">MARUTI ALTO 800<br />Black</p>
                <a href="#" className="text-blue-600 hover:underline">Add vehicle</a>
            </div>
        </div>
    );
}

export default Profile;
