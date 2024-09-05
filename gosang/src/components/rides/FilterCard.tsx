import React from 'react';

const FilterCard = () => {
  return (
    <div className="bg-gray-100 p-4 rounded-md shadow-md">
      <h3 className="text-lg font-medium text-gray-800 mb-4">Filters</h3>
      {/* Add your filter options here */}
      <div>
        <p className="text-sm text-gray-600">Filter Option 1</p>
        <p className="text-sm text-gray-600">Filter Option 2</p>
        {/* Add more filter options as needed */}
      </div>
    </div>
  );
};

export default FilterCard;
