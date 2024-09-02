const BottomNavBar = () => {
    return (
      <div className="fixed bottom-0 left-0 w-full bg-white shadow-lg md:hidden flex justify-around py-2">
        <div className="flex flex-col items-center">
          <span className="material-icons">home</span>
          <span className="text-xs">Home</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="material-icons">directions_car</span>
          <span className="text-xs">My Rides</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="material-icons">request_page</span>
          <span className="text-xs">Request</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="material-icons">chat</span>
          <span className="text-xs">Chat</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="material-icons">person</span>
          <span className="text-xs">Profile</span>
        </div>
      </div>
    );
  };
  
  export default BottomNavBar;
  