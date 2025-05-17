import React from 'react';
import Moisture from './Moisture';
import Temperature from './Temperature';
import Humidity from './Humidity';
import MoistureGraph from './MoistureGraph';

interface InfoCardProps {
  // Add any additional props if needed
  timestamp?: string;
  moistureValue?: string;
  moistureTopic: string;
  temperatureValue?: string;
  humidityValue?: string;
  moistureGraphData?: any; // Adjust type as needed
}

const InfoCard: React.FC<InfoCardProps> = ({
  timestamp,
  moistureValue,
  moistureTopic,
  temperatureValue,
  humidityValue,
}) => {
  return (
    <div className='info-card h-full w-full overflow-auto bg-opacity-50 bg-gradient-to-r from-green-200 to-blue-200 p-6 text-green-700'>
      <h2 className='mb-4 text-4xl font-bold'>Plant Information</h2>
      <p className='mb-2 text-lg'>Latest update: {new Date(Number(timestamp)*1000).toLocaleString()}</p>
      <Moisture value={moistureValue} />
      <Temperature value={temperatureValue} />
      <Humidity value={humidityValue} />
      <MoistureGraph moistureTopic={moistureTopic} />
    </div>
  );
};

export default InfoCard;
