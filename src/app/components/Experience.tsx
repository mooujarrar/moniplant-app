import {
  Environment,
  CameraControls,
  useCursor,
  Lightformer,
} from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Plant1 } from "./Models/Plant1";
import { Plant2 } from "./Models/Plant2";
import { Plant3 } from "./Models/Plant3";
import { Plant4 } from "./Models/Plant4";
import useStore from "./state-management/activePortal";
import InfoCard from "./InfoCard";
import PlantStage from "./PlantStage";

export enum EPlants {
  PLANT1 = 'Plant 1',
  PLANT2 = 'Plant 2',
  PLANT3 = 'Plant 3',
  PLANT4 = 'Plant 4',
  PLANT5 = 'Plant 5',
}

export const Experience = () => {
  const [active, setActive] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const controlsRef = useRef<CameraControls>(null);
  const scene = useThree((state) => state.scene);
  const broadcastActive = useStore((state: any) => state.setActive);

  const handleActiveChanged = (activePortal: string | null) => {
    setActive(activePortal);
    broadcastActive(activePortal);
  };

  useCursor(hovered !== null);

  useEffect(() => {
    const cameraControl = controlsRef.current;
    if (cameraControl) {
      if (active) {
        const targetPosition = new THREE.Vector3();
        scene.getObjectByName(active)?.getWorldPosition(targetPosition);
        cameraControl
          .setLookAt(
            0,
            0,
            4,
            targetPosition.x,
            targetPosition.y,
            targetPosition.z,
            true
          );
      } else {
        cameraControl.setLookAt(0, 0, 16, 0, 0, 0, true);
      }
    }
  }, [active, scene]);
  return (
    <>
      <ambientLight intensity={0.5} />
      <Environment>
        
        <Lightformer
            form="rect" // circle | ring | rect (optional, default = rect)
            intensity={1} // power level (optional = 1)
            color="white" // (optional = white)
            scale={[10, 5, 0]} // Scale it any way you prefer (optional = [1, 1])
            target={[0, 0, 0]} // Target position (optional = undefined)
          />
      </Environment>

      {/*
      <Room
        position-z={-15}
        position-y={-1}
        rotation={[Math.PI / 6, -Math.PI / 4, 0]}
      />
      */}
      <CameraControls
        ref={controlsRef}
        distance={16}
        mouseButtons={{ wheel: 0, left: 1, right: 0, middle: 0 }}
        touches={{ one: 0, two: 0, three: 0 }}
        maxPolarAngle={Math.PI / 1.5}
        minPolarAngle={Math.PI / 2.5}
        maxAzimuthAngle={Math.PI / 8}
        minAzimuthAngle={-Math.PI / 8}
      />
      <PlantStage
        rotation-y={Math.PI / 6}
        position-x={-4}
        position-z={1.5}
        name={EPlants.PLANT1}
        color='#013220'
        texture={"texture/green.jpg"}
        active={active}
        setActive={handleActiveChanged}
        hovered={hovered}
        setHovered={setHovered}
      >
        <Plant1
          scale={0.01}
          position-y={-1}
          hovered={hovered === EPlants.PLANT1}
        />
        {active === EPlants.PLANT1 && <InfoCard position-x={-1} position-y={0.5} position-z={-0.5} plantName={EPlants.PLANT1} />}
      </PlantStage>
      <PlantStage
        rotation-y={Math.PI / 12}
        position-x={-1.5}
        name={EPlants.PLANT2}
        color='#013220'
        texture={"texture/green.jpg"}
        active={active}
        setActive={handleActiveChanged}
        hovered={hovered}
        setHovered={setHovered}
      >
        <Plant2
          scale={0.03}
          position-y={-1}
          hovered={hovered === EPlants.PLANT2}
        />
        {active === EPlants.PLANT2 && <InfoCard position-x={-1} position-y={0.5} position-z={-0.5} plantName={EPlants.PLANT2} />}
      </PlantStage>
      <PlantStage
        rotation-y={-Math.PI / 12}
        position-x={1.5}
        name={EPlants.PLANT3}
        color='#013220'
        texture={"texture/green.jpg"}
        active={active}
        setActive={handleActiveChanged}
        hovered={hovered}
        setHovered={setHovered}
      >
        <Plant3
          scale={0.02}
          position-y={-1}
          hovered={hovered === EPlants.PLANT3}
        />
        {active === EPlants.PLANT3 && <InfoCard position-x={1} position-y={0.5} position-z={-0.5} plantName={EPlants.PLANT3} />}
      </PlantStage>
      <PlantStage
        rotation-y={-Math.PI / 6}
        position-x={4}
        position-z={1.5}
        name={EPlants.PLANT4}
        color='#013220'
        texture={"texture/green.jpg"}
        active={active}
        setActive={handleActiveChanged}
        hovered={hovered}
        setHovered={setHovered}
      >
        <Plant4 scale={1} position-y={-1} hovered={hovered === EPlants.PLANT4} />
        {active === EPlants.PLANT4 && <InfoCard position-x={1} position-y={0.5} position-z={-0.5} plantName={EPlants.PLANT4} />}
      </PlantStage>
    </>
  );
};
