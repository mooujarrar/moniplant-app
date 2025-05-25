import React from 'react';
import {
  CONFIG_FITTING_BOX_NAME,
  CONFIG_POSITION,
} from './Positions';
import { Board } from './Models/Board';

export const Configuration = () => {
  return (
    <group position={CONFIG_POSITION} rotation-y={Math.PI / 2}>
      <mesh name={CONFIG_FITTING_BOX_NAME} position-y={1} visible={false}>
        <meshBasicMaterial opacity={0.5}  transparent color={'#00ff00'} />
        <boxGeometry args={[12, 8, 1]} />
      </mesh>
      <Board position={[0, -3, 0]} scale={[10, 5, 1]} />
    </group>
  );
};
