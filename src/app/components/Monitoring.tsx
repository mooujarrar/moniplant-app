import { useCursor } from '@react-three/drei';
import React from 'react';
import { Plant1 } from './Models/Plant1';
import { Plant2 } from './Models/Plant2';
import { Plant3 } from './Models/Plant3';
import { Plant4 } from './Models/Plant4';
import { MONITOR_FITTING_BOX_NAME, MONITOR_POSITION } from './Positions';
import { usePortalStore } from './state-management/activePortal';
import { Box, Flex } from '@react-three/flex';

export enum EPlants {
  PLANT1 = 'Plant 1',
  PLANT2 = 'Plant 2',
  PLANT3 = 'Plant 3',
  PLANT4 = 'Plant 4',
  PLANT5 = 'Plant 5',
}

function calculateRotations(totalPlants: number) {
  const rotations = [];
  
  const halfPlants = Math.floor(totalPlants / 2);
  
  for (let i = 0; i < halfPlants; i++) {
    rotations.push(Math.PI / (4 * (halfPlants + i)));
  }
  
  if (totalPlants % 2 === 1) {
    rotations.push(0); // Center plant
  }
  
  return [...rotations, ...rotations.map(angle => -angle).reverse()];
}

export const Monitoring = () => {
  const { activePortal, hoveredPortal, setActivePortal, setHoveredPortal } =
    usePortalStore();

  const handleActiveChanged = (activePortal: string | null) => {
    setActivePortal(activePortal);
  };

  const handleHoveredChanged = (_hoveredPortal: string | null) => {
    setHoveredPortal(_hoveredPortal);
  };

  const plants = [
    { name: EPlants.PLANT1, component: <Plant1 />},
    { name: EPlants.PLANT2, component: <Plant2 />},
    { name: EPlants.PLANT3, component: <Plant3 />},
    { name: EPlants.PLANT4, component: <Plant4 />},

  ];
  const rotations = calculateRotations(plants.length);


  useCursor(hoveredPortal !== null);

  return (
    <group position={MONITOR_POSITION} rotation-y={-Math.PI / 2}>
      <mesh name={MONITOR_FITTING_BOX_NAME} position-y={-1} visible={false}>
        <meshBasicMaterial opacity={0.5} transparent color={'#00ff00'} />
        <boxGeometry args={[10, 6, 1]} />
      </mesh>
      <Flex
        centerAnchor
        plane='xy'
        width='auto'
        height='auto'
        flexDirection='row'
        justifyContent='center'
        alignItems='center'
      >
        {plants.map((plant, index) => {
          const rotationY = rotations[index] || 0; // Use the specified rotation or default to 0
          return (<Box
            key={index}
            onPointerEnter={() => {
              handleHoveredChanged(plant.name);
            }}
            onPointerLeave={() => {
              handleHoveredChanged(null);
            }}
            onDoubleClick={() => {
              handleActiveChanged(
                activePortal === plant.name ? null : plant.name
              );
            }}
            centerAnchor
            padding={1}
          >
            {React.cloneElement(plant.component, {
              name: plant.name,
              'rotation-y': rotationY,
            })}
          </Box>);
        })}
      </Flex>
    </group>
  );
};
