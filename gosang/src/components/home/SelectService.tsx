const SelectService = () => {
    return (
      <div className="p-4">
        <h2 className="text-lg font-semibold">Select Service</h2>
        <div className="mt-4 flex justify-around">
          <a href="/login" className="bg-orange-500 text-white px-4 py-2 rounded-full">Login</a>
          <a href="/register" className="border-2 border-gray-400 text-gray-600 px-4 py-2 rounded-full">Register</a>
          <a href="/about" className="border-2 border-gray-400 text-gray-600 px-4 py-2 rounded-full">About</a>
        </div>
      </div>
    );
  };
  
  export default SelectService;
  