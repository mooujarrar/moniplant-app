import React from 'react';

const MoistureGraph: React.FC = () => {
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
};

export default MoistureGraph;
