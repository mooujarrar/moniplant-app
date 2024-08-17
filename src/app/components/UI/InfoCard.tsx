import React from 'react';
import Moisture from './Moisture';
import Temperature from './Temperature';
import Humidity from './Humidity';
import MoistureGraph from './MoistureGraph';

interface InfoCardProps {
  // Add any additional props if needed
}

const InfoCard: React.FC<InfoCardProps> = () => {
  return (
    <div className='info-card h-full w-full overflow-auto bg-opacity-50 bg-gradient-to-r from-green-200 to-blue-200 p-6 text-green-700'>
      <h2 className='mb-4 text-4xl font-bold'>Plant Information</h2>
      <Moisture />
      <Temperature />
      <Humidity />
      <MoistureGraph />
    </div>
  );
};

export default InfoCard;
