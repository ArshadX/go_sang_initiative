import { FaHome, FaCar, FaRegUser } from "react-icons/fa";
import { IoChatbubbleEllipses } from "react-icons/io5";
import { PiCarThin } from "react-icons/pi";
import Link from "next/link";

const BottomNavBar = () => {
    return (
        <div className="fixed bottom-0 left-0 w-full bg-white shadow-lg md:hidden flex justify-around py-2">
            <Link href="/" aria-label="Home" className="flex flex-col items-center">
                <FaHome size={20} />
                <span className="text-xs">Home</span>
            </Link>
            <Link href="/rides" aria-label="My Rides" className="flex flex-col items-center">
                <FaCar size={20} />
                <span className="text-xs">My Rides</span>
            </Link>
            <Link href="/request" aria-label="Request" className="flex flex-col items-center">
                <PiCarThin size={20} />
                <span className="text-xs">Request</span>
            </Link>
            <Link href="/chat" aria-label="Chat" className="flex flex-col items-center">
                <IoChatbubbleEllipses size={20} />
                <span className="text-xs">Chat</span>
            </Link>
            <Link href="/profile" aria-label="Profile" className="flex flex-col items-center">
                <FaRegUser size={20} />
                <span className="text-xs">Profile</span>
            </Link>
        </div>
    );
};

export default BottomNavBar;
