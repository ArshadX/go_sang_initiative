'use client'
import Link from "next/link";
import { RiAddCircleLine, RiCarLine, RiChat1Line, RiProfileLine, RiSearchLine } from "react-icons/ri";
import { usePathname } from 'next/navigation'
const BottomTab = () => {
    const pathname = usePathname()
    return (
        <div className="fixed bottom-0 left-0 w-full bg-white shadow-lg md:hidden flex justify-around py-2">
            <Link href="/" aria-label="Home" className="flex cyan flex-col items-center">
                <RiSearchLine size={20} color={pathname === "/"?"#22d3ee":"#000"} />
                <span className="text-xs">Book</span>
            </Link>
            <Link href="/request" aria-label="Request" className="flex flex-col items-center">
                <RiAddCircleLine size={20} color={pathname === "/request"?"#22d3ee":"#000"} />
                <span className="text-xs">Add Ride </span>
            </Link>
            <Link href="/rides" aria-label="My Rides" className="flex flex-col items-center">
                <RiCarLine size={20} color={pathname === "/rides"?"#22d3ee":"#000"}/>
                <span className="text-xs">My Rides</span>
            </Link>
            <Link href="/chat" aria-label="Chat" className="flex flex-col items-center">
                <RiChat1Line size={20} color={pathname === "/chat"?"#22d3ee":"#000"} />
                <span className="text-xs">Chat</span>
            </Link>
            <Link href="/profile" aria-label="Profile" className="flex flex-col items-center">
                <RiProfileLine size={20} color={pathname === "/profile"?"#22d3ee":"#000"} />
                <span className="text-xs">Profile</span>
            </Link>
        </div>
    );
};

export default BottomTab;
