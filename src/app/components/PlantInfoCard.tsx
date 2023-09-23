import React from 'react';

function PlantInfoCard() {
  return (
    <div className="font-sans max-w-xl mx-auto bg-opacity-75 bg-blue-200 rounded-lg overflow-hidden shadow-xl">
      <div className="px-8 py-6">
        <div className="font-bold text-2xl mb-4">Plant Information</div>
        <div className="mb-4">
          <span className="text-gray-700">Plant Type:</span> <span className="text-gray-900">Rose</span>
        </div>
        <div className="mb-4">
          <span className="text-gray-700">Humidity:</span> <span className="text-gray-900">65%</span>
        </div>
        <div className="mb-4">
          <span className="text-gray-700">Temperature:</span> <span className="text-gray-900">25°C</span>
        </div>
        <div>
          <span className="text-gray-700">Soil Moisture:</span> <span className="text-gray-900">Medium</span>
        </div>
      </div>
    </div>
  );
}

export default PlantInfoCard;