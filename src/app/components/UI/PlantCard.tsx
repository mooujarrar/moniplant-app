import { Html } from '@react-three/drei';
import React from 'react';

interface PlantCardProps {
  plantName: string;
  opacity: string;
}

const PlantCard: React.FC<PlantCardProps> = ({ plantName, opacity }) => {
  return (
    <group position-y={0.4}>
      <Html
        style={{ userSelect: 'none' }}
        className={`card ${opacity}`}
        as='div'
        castShadow
        receiveShadow
        center
        transform
        distanceFactor={2}
      >
        <div className='rounded-lg bg-opacity-50 bg-gradient-to-r from-green-200 to-blue-200 p-4 shadow-md'>
          <div className='text-center text-4xl text-green-700'>{plantName}</div>
          <div className='mt-2 text-sm text-center text-gray-600'>
           🌱 Double click on me to know how am I doing 🌱
          </div>
        </div>
      </Html>
    </group>
  );
};

export default PlantCard;
