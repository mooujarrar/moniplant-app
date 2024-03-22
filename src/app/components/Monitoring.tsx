import { useCursor } from '@react-three/drei';
import React, { useState } from 'react';
import { Plant1 } from './Models/Plant1';
import { Plant2 } from './Models/Plant2';
import { Plant3 } from './Models/Plant3';
import { Plant4 } from './Models/Plant4';
import { Tablet } from './Models/Tablet';
import { MONITOR_POSITION } from './Positions';
import { useActivePortalStore } from './state-management/activePortal';

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
        <Plant1
          name={EPlants.PLANT1}
          scale={0.01}
          position-x={-4}
          position-z={1.5}
          position-y={-1.875}
          rotation-y={Math.PI / 6}
          hovered={hovered === EPlants.PLANT1}
        />
        <Tablet
          visible={activePortal === EPlants.PLANT1}
          position-x={-4.33}
          position-z={1.25}
          rotation-x={Math.PI / 2}
          scale={0.04}
        />
      </group>
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
        <Plant2
          name={EPlants.PLANT2}
          scale={0.03}
          position-y={-1.69}
          rotation-y={Math.PI / 12}
          position-x={-1.5}
          hovered={hovered === EPlants.PLANT2}
        />
        <Tablet
          visible={activePortal === EPlants.PLANT2}
          position-x={-0.3}
          position-z={-0.54}
          rotation-x={Math.PI / 2}
          scale={0.04}
        />
      </group>
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
        <Plant3
          name={EPlants.PLANT3}
          scale={0.02}
          position-y={-1.69}
          rotation-y={-Math.PI / 12}
          position-x={1.5}
          hovered={hovered === EPlants.PLANT3}
        />
        <Tablet
          visible={activePortal === EPlants.PLANT3}
          position-x={-0.04}
          position-z={-0.51}
          rotation-x={Math.PI / 2}
          scale={0.04}
        />
      </group>
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
        <Plant4
          name={EPlants.PLANT4}
          scale={1}
          rotation-y={-Math.PI / 6}
          position-x={4}
          position-z={1.5}
          position-y={-1.66}
          hovered={hovered === EPlants.PLANT4}
        />
        <Tablet
          visible={activePortal === EPlants.PLANT4}
          position-x={0}
          position-z={1.19}
          rotation-x={Math.PI / 2}
          scale={0.04}
        />
      </group>
    </group>
  );
};
