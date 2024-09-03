import { FaHome } from "react-icons/fa";
import { FaCar } from "react-icons/fa";
import { IoChatbubbleEllipses } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { PiCarThin } from "react-icons/pi";


const BottomNavBar = () => {
    return (
      <div className="fixed bottom-0 left-0 w-full bg-white shadow-lg md:hidden flex justify-around py-2">
        <div className="flex flex-col items-center">
          <span className="material-icons"><FaHome/></span>
          <span className="text-xs">Home</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="material-icons"><FaCar/></span>
          <span className="text-xs">My Rides</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="material-icons"><PiCarThin/></span>
          <span className="text-xs">Request</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="material-icons"><IoChatbubbleEllipses/></span>
          <span className="text-xs">Chat</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="material-icons"><FaRegUser/></span>
          <span className="text-xs">Profile</span>
        </div>
      </div>
    );
  };
  
  export default BottomNavBar;
  