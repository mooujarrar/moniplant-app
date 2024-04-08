import React from 'react';
import { motion } from 'framer-motion';

interface InfoCardProps {
  // Add any additional props if needed
}

export function Moisture() {
  return (
    <div className='mb-4 flex flex-col'>
      <motion.div
        className='mb-2 rounded-md bg-white p-4 text-green-700 shadow-lg'
        style={{ width: '50%' }}
        whileHover={{ scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
      >
        <p className='mb-1 text-2xl font-semibold'>Moisture</p>
        {/* Add your icon here */}
        <span
          role='img'
          aria-label='moisture-icon'
          style={{ fontSize: '3em', display: 'block', textAlign: 'center' }}
        >
          💧
        </span>
        <p className='text-2xl'>75%</p>
      </motion.div>
    </div>
  );
}

export function Temperature() {
  return (
    <div className='flex flex-row justify-end'>
      <div className='mb-4 flex flex-col' style={{ width: '50%' }}>
        <motion.div
          className='mb-2 rounded-md bg-white p-4 text-green-700 shadow-lg'
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        >
          <p className='mb-1 text-2xl font-semibold'>Temperature</p>
          {/* Add your icon here */}
          <span
            role='img'
            aria-label='temperature-icon'
            style={{ fontSize: '3em', display: 'block', textAlign: 'center' }}
          >
            🌡️
          </span>
          <p className='text-2xl'>24°C</p>
        </motion.div>
      </div>
    </div>
  );
}

export function Humidity() {
  return (
    <div className='mb-4 flex flex-col'>
      <motion.div
        className='mb-2 rounded-md bg-white p-4 text-green-700 shadow-lg'
        style={{ width: '50%' }}
        whileHover={{ scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
      >
        <p className='mb-1 text-2xl font-semibold'>Humidity</p>
        {/* Add your icon here */}
        <span
          role='img'
          aria-label='humidity-icon'
          style={{ fontSize: '3em', display: 'block', textAlign: 'center' }}
        >
          💦
        </span>
        <p className='text-2xl'>60%</p>
      </motion.div>
    </div>
  );
}

export function MoistureGraph() {
  return (
    <div className='flex flex-col'>
      <div
        className='rounded-md bg-white p-4 text-green-700 shadow-lg'
        style={{ width: '100%' }}
      >
        <p className='mb-1 text-2xl font-semibold'>Moisture Development</p>
        {/* Replace the following div with your actual graph component */}
        <div className='h-32 w-full bg-green-600'></div>
      </div>
    </div>
  );
}



const InfoCard: React.FC<InfoCardProps> = () => {
  return (
    <div className='info-card h-full w-full overflow-auto bg-green-500 p-6 text-white'>
      <h2 className='mb-4 text-4xl font-bold'>Plant Information</h2>
      <Moisture />
      <Temperature />
      <Humidity />
      <MoistureGraph />
    </div>
  );
};

export default InfoCard;
