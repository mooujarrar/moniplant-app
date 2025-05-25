import { useCursor } from '@react-three/drei';
import React, { useMemo } from 'react';
import { Plant1 } from './Models/Plant1';
import { Plant2 } from './Models/Plant2';
import { Plant3 } from './Models/Plant3';
import { Plant4 } from './Models/Plant4';
import { MONITOR_FITTING_BOX_NAME, MONITOR_POSITION } from './Positions';
import { usePortalStore } from './state-management/activePortal';
import { Box, Flex } from '@react-three/flex';
import { ApiPlant, usePlants, usePlantTypes } from '../hooks/usePlants';


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

  const { plants } = usePlants();
  //const { types, loading: _loadingTypes, error: _errorTypes } = usePlantTypes();


  const plantsList = useMemo(() => {
    return plants.map((plant: ApiPlant) => {
      const plantComponentMap: Record<string, React.JSX.Element> = {
        'Persea': <Plant3 />,
        'Coffea': <Plant4 />,
        'Citrus': <Plant1 />,
        'Cucumis': <Plant2 />,
      };

      const Component = plantComponentMap[plant.plantTypeAlias] || Plant1;

      return {
        name: plant.name,
        plantData: plant,
        component: Component,
      };
    });
  }, [plants]);
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
        {plantsList.map((plant, index) => {
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
              data: plant.plantData,
              'rotation-y': rotationY,
            })}
          </Box>);
        })}
      </Flex>
    </group>
  );
};
