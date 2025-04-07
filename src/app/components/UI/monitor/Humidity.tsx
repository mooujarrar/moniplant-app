import React from 'react';
import { motion } from 'framer-motion';

const Humidity: React.FC<{value?: string}> = ({value}) => {
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
        <p className='text-2xl'>{value}%</p>
      </motion.div>
    </div>
  );
};

export default Humidity;
