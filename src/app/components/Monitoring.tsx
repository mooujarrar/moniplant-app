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

export const Monitoring = () => {
  const { activePortal, hoveredPortal, setActivePortal, setHoveredPortal } =
    usePortalStore();

  const handleActiveChanged = (activePortal: string | null) => {
    setActivePortal(activePortal);
  };

  const handleHoveredChanged = (_hoveredPortal: string | null) => {
    setHoveredPortal(_hoveredPortal);
  };

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
        <Box
          onPointerEnter={() => {
            handleHoveredChanged(EPlants.PLANT1);
          }}
          onPointerLeave={() => {
            handleHoveredChanged(null);
          }}
          onDoubleClick={() => {
            handleActiveChanged(
              activePortal === EPlants.PLANT1 ? null : EPlants.PLANT1
            );
          }}
          centerAnchor
          padding={1}
        >
          <Plant1 name={EPlants.PLANT1} rotation-y={Math.PI / 6} />
        </Box>
        <Box
          onPointerEnter={() => {
            handleHoveredChanged(EPlants.PLANT2);
          }}
          onPointerLeave={() => {
            handleHoveredChanged(null);
          }}
          onDoubleClick={() => {
            handleActiveChanged(
              activePortal === EPlants.PLANT2 ? null : EPlants.PLANT2
            );
          }}
          centerAnchor
          padding={1}
        >
          <Plant2 name={EPlants.PLANT2} rotation-y={Math.PI / 12} />
        </Box>
        <Box
          onPointerEnter={() => {
            handleHoveredChanged(EPlants.PLANT3);
          }}
          onPointerLeave={() => {
            handleHoveredChanged(null);
          }}
          onDoubleClick={() => {
            handleActiveChanged(
              activePortal === EPlants.PLANT3 ? null : EPlants.PLANT3
            );
          }}
          centerAnchor
          padding={1}
        >
          <Plant3 name={EPlants.PLANT3} rotation-y={-Math.PI / 12} />
        </Box>
        <Box
          onPointerEnter={() => {
            handleHoveredChanged(EPlants.PLANT4);
          }}
          onPointerLeave={() => {
            handleHoveredChanged(null);
          }}
          onDoubleClick={() => {
            handleActiveChanged(
              activePortal === EPlants.PLANT4 ? null : EPlants.PLANT4
            );
          }}
          centerAnchor
          padding={1}
        >
          <Plant4 rotation-y={-Math.PI / 6} name={EPlants.PLANT4} />
        </Box>
      </Flex>
    </group>
  );
};
