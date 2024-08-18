import { Html } from '@react-three/drei';
import React from 'react';
import { motion } from 'framer-motion-3d';
import { PLANT_SPRING, PLANT_VISIBILITY_VARIANTS } from '../../AnimationConstants';

interface PlantCardProps {
  plantName: string;
  visibility: string;
}

const PlantCard: React.FC<PlantCardProps> = ({ plantName, visibility }) => {
  return (
    <motion.group variants={PLANT_VISIBILITY_VARIANTS} initial='hidden' exit='hidden' transition={PLANT_SPRING} animate={visibility} position-y={0.4}>
      <Html
        style={{ userSelect: 'none' }}
        className='card'
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
    </motion.group>
  );
};

export default PlantCard;
