import { useCursor } from '@react-three/drei';
import React, { useState } from 'react';
import { Plant1 } from './Models/Plant1';
import { Plant2 } from './Models/Plant2';
import { Plant3 } from './Models/Plant3';
import { Plant4 } from './Models/Plant4';
import { MONITOR_FITTING_BOX_NAME, MONITOR_POSITION } from './Positions';
import { useActivePortalStore } from './state-management/activePortal';
import { Box, Flex } from '@react-three/flex';

export enum EPlants {
  PLANT1 = 'Plant 1',
  PLANT2 = 'Plant 2',
  PLANT3 = 'Plant 3',
  PLANT4 = 'Plant 4',
  PLANT5 = 'Plant 5',
}

export const Monitoring = () => {
  const [hovered, setHovered] = useState<string | null>(null);
  const { activePortal, setActivePortal } = useActivePortalStore();

  const handleActiveChanged = (activePortal: string | null) => {
    setActivePortal(activePortal);
  };

  useCursor(hovered !== null);

  return (
    <group position={MONITOR_POSITION} rotation-y={-Math.PI / 2}>
      <mesh name={MONITOR_FITTING_BOX_NAME} position-y={-1} visible={false}>
        <meshBasicMaterial opacity={0.5} transparent color={'#00ff00'} />
        <boxGeometry args={[10, 6, 4]} />
      </mesh>
      <Flex
        plane='xy'
        width='auto'
        height='auto'
        flexDirection='row'
        justifyContent='center'
        alignItems='center'
      >
        <Box centerAnchor padding={1}>
          <group
            onPointerEnter={() => {
              setHovered(EPlants.PLANT1);
            }}
            onPointerLeave={() => {
              setHovered(null);
            }}
            onDoubleClick={() => {
              handleActiveChanged(
                activePortal === EPlants.PLANT1 ? null : EPlants.PLANT1
              );
            }}
          >
            <Plant1 name={EPlants.PLANT1} rotation-y={Math.PI / 6} />
          </group>
        </Box>
        <Box centerAnchor padding={1}>
          <group
            onPointerEnter={() => {
              setHovered(EPlants.PLANT2);
            }}
            onPointerLeave={() => {
              setHovered(null);
            }}
            onDoubleClick={() => {
              handleActiveChanged(
                activePortal === EPlants.PLANT2 ? null : EPlants.PLANT2
              );
            }}
          >
            <Plant2 name={EPlants.PLANT2} rotation-y={Math.PI / 12} />
          </group>
        </Box>
        <Box centerAnchor padding={1}>
          <group
            onPointerEnter={() => {
              setHovered(EPlants.PLANT3);
            }}
            onPointerLeave={() => {
              setHovered(null);
            }}
            onDoubleClick={() => {
              handleActiveChanged(
                activePortal === EPlants.PLANT3 ? null : EPlants.PLANT3
              );
            }}
          >
            <Plant3 name={EPlants.PLANT3} rotation-y={-Math.PI / 12} />
          </group>
        </Box>
        <Box centerAnchor padding={1}>
          <group
            onPointerEnter={() => {
              setHovered(EPlants.PLANT4);
            }}
            onPointerLeave={() => {
              setHovered(null);
            }}
            onDoubleClick={() => {
              handleActiveChanged(
                activePortal === EPlants.PLANT4 ? null : EPlants.PLANT4
              );
            }}
          >
            <Plant4 rotation-y={-Math.PI / 6} name={EPlants.PLANT4} />
          </group>
        </Box>
      </Flex>
    </group>
  );
};
