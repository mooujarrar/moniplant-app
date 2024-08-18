import React from 'react';
import { motion } from 'framer-motion';

const Temperature: React.FC = () => {
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
};

export default Temperature;
