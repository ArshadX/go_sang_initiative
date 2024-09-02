const StatsSection = () => {
    return (
      <div className="flex flex-col md:flex-row justify-around items-center bg-purple-600 rounded-lg p-4 md:p-6 text-white">
        <div className="text-center mb-4 md:mb-0">
          <h2 className="text-2xl md:text-3xl font-semibold text-teal-300">+100.000</h2>
          <p className="mt-1 md:mt-2">shared trips</p>
        </div>
        <div className="text-center mb-4 md:mb-0">
          <h2 className="text-2xl md:text-3xl font-semibold text-teal-300">+360.000 kg</h2>
          <p className="mt-1 md:mt-2">of Co2 saved</p>
        </div>
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-teal-300">+2.5 MM</h2>
          <p className="mt-1 md:mt-2">shared kilometers</p>
        </div>
      </div>
    );
  };
  
  export default StatsSection;
  