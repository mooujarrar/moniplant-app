import {
  Environment,
  CameraControls,
  useCursor,
} from "@react-three/drei";
import { LayerMaterial, Depth, Noise, Color } from 'lamina';
import { useThree } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Plant1 } from "./Plant1";
import { Plant2 } from "./Plant2";
import { Plant3 } from "./Plant3";
import { Plant4 } from "./Plant4";
import { Plant5 } from "./Plant5";
import { Room } from "./Room";
import useStore from "./state-management/activePortal";
import InfoCard from "./InfoCard";
import PlantStage from "./PlantStage";

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
          )
          .then(() => {
            cameraControl.minDistance = 4;
            cameraControl.maxDistance = 4;
            cameraControl.maxAzimuthAngle = cameraControl.azimuthAngle;
            cameraControl.minAzimuthAngle = cameraControl.azimuthAngle;
          });
      } else {
        cameraControl.setLookAt(0, 0, 16, 0, 0, 0, true).then(() => {
          cameraControl.minDistance = 16;
          cameraControl.maxDistance = 16;
          cameraControl.maxAzimuthAngle = Math.PI / 8;
          cameraControl.minAzimuthAngle = -Math.PI / 8;
        });
      }
    }
  }, [active, scene]);
  return (
    <>
      <ambientLight intensity={0.5} />
      <Environment background resolution={64}>
        <mesh scale={100}>
          <sphereGeometry args={[1, 64, 64]} />
          <LayerMaterial side={THREE.BackSide}>
            <Color color={'blue'} alpha={1} mode="normal" />
            <Depth colorA="#00ffff" colorB="#ff8f00" alpha={0.5} mode="normal" near={0} far={100} origin={[0, 0, 0]} />
            <Noise mapping="local" type="cell" scale={0.5} mode="softlight" />
          </LayerMaterial>
        </mesh>
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
        minDistance={16}
        maxDistance={16}
        maxPolarAngle={Math.PI / 1.5}
        minPolarAngle={Math.PI / 2.5}
        maxAzimuthAngle={Math.PI / 8}
        minAzimuthAngle={-Math.PI / 8}
      />
      <PlantStage
        rotation-y={Math.PI / 6}
        position-x={-4}
        position-z={1.5}
        name='Plant 1'
        color='#013220'
        texture={"texture/green.jpg"}
        active={active}
        setActive={handleActiveChanged}
        hovered={hovered}
        setHovered={setHovered}
      >
        <Suspense fallback={null}>
          <Plant1
            scale={0.01}
            position-y={-1}
            hovered={hovered === "Plant 1"}
          />
        </Suspense>
        {active && <InfoCard plantName={'Plant 1'} />}
      </PlantStage>
      <PlantStage
        rotation-y={Math.PI / 12}
        position-x={-1.5}
        name='Plant 2'
        color='#013220'
        texture={"texture/green.jpg"}
        active={active}
        setActive={handleActiveChanged}
        hovered={hovered}
        setHovered={setHovered}
      >
        <Suspense fallback={null}>
          <Plant2
            scale={0.03}
            position-y={-1}
            hovered={hovered === "Plant 2"}
          />
        </Suspense>
      </PlantStage>
      <PlantStage
        rotation-y={-Math.PI / 12}
        position-x={1.5}
        name='Plant 3'
        color='#013220'
        texture={"texture/green.jpg"}
        active={active}
        setActive={handleActiveChanged}
        hovered={hovered}
        setHovered={setHovered}
      >
        <Suspense fallback={null}>
          <Plant3
            scale={0.02}
            position-y={-1}
            hovered={hovered === "Plant 3"}
          />
        </Suspense>
      </PlantStage>
      <PlantStage
        rotation-y={-Math.PI / 6}
        position-x={4}
        position-z={1.5}
        name='Plant 4'
        color='#013220'
        texture={"texture/green.jpg"}
        active={active}
        setActive={handleActiveChanged}
        hovered={hovered}
        setHovered={setHovered}
      >
        <Suspense fallback={null}>
          <Plant4 scale={1} position-y={-1} hovered={hovered === "Plant 4"} />
        </Suspense>
      </PlantStage>
    </>
  );
};
