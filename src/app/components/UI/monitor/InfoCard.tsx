import React from 'react';
import Moisture from './Moisture';
import Temperature from './Temperature';
import Humidity from './Humidity';
import MoistureGraph from './MoistureGraph';

interface InfoCardProps {
  // Add any additional props if needed
  moistureValue?: string;
  temperatureValue?: string;
  humidityValue?: string;
  moistureGraphData?: any; // Adjust type as needed
}

const InfoCard: React.FC<InfoCardProps> = ({
  moistureValue,
  temperatureValue,
  humidityValue,
}) => {
  return (
    <div className='info-card h-full w-full overflow-auto bg-opacity-50 bg-gradient-to-r from-green-200 to-blue-200 p-6 text-green-700'>
      <h2 className='mb-4 text-4xl font-bold'>Plant Information</h2>
      <Moisture value={moistureValue} />
      <Temperature value={temperatureValue} />
      <Humidity value={humidityValue} />
      <MoistureGraph />
    </div>
  );
};

export default InfoCard;
