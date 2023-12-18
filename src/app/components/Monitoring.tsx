import {
    Environment,
    CameraControls,
    useCursor,
    Html,
  } from "@react-three/drei";
  import { useThree } from "@react-three/fiber";
  import { Suspense, useEffect, useRef, useState } from "react";
  import * as THREE from "three";
  import { Plant1 } from "./Models/Plant1";
  import { Plant2 } from "./Models/Plant2";
  import { Plant3 } from "./Models/Plant3";
  import { Plant4 } from "./Models/Plant4";
  import PlantStage from "./PlantStage";
  import { Tablet } from "./Models/Tablet";
  import InfoCard from "./InfoCard";
  
  export enum EPlants {
    PLANT1 = 'Plant 1',
    PLANT2 = 'Plant 2',
    PLANT3 = 'Plant 3',
    PLANT4 = 'Plant 4',
    PLANT5 = 'Plant 5',
  }
  
  export const Monitoring = () => {
    const [active, setActive] = useState<string | null>(null);
    const [hovered, setHovered] = useState<string | null>(null);
    const controlsRef = useRef<CameraControls>(null);
    const { camera } = useThree();
    const scene = useThree((state) => state.scene);
  
    const handleActiveChanged = (activePortal: string | null) => {
      setActive(activePortal);
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
        <hemisphereLight groundColor="red" />
        <Environment background preset="dawn" blur={0.8} />
  
        {/*
        <Room
          position-z={-15}
          position-y={-1}
          rotation={[Math.PI / 6, -Math.PI / 4, 0]}
        />
        */}
        <CameraControls
          makeDefault
          camera={camera}
          ref={controlsRef}
          distance={16}
          mouseButtons={{ wheel: 0, left: active ? 0 : 1, right: 0, middle: 0 }}
          touches={{ one: 0, two: 0, three: 0 }}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 2.5}
          maxAzimuthAngle={active ? Infinity : Math.PI / 8}
          minAzimuthAngle={active ? -Infinity : -Math.PI / 8}
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
          {active === EPlants.PLANT1 &&
            <Suspense fallback={null}>
              <group position-x={-2} position-y={0.2} rotation-y={Math.PI / 4}>
                <Tablet position-x={-0.33} position-z={1.25} rotation-x={Math.PI / 2} scale={0.04} />
                <Html position-x={-4} position-z={0.5} rotation-y={Math.PI / 6} position-y={0.232} style={{ userSelect: 'none' }} as='div' className="wrapper" castShadow receiveShadow transform occlude distanceFactor={1}>
                  <InfoCard />
                </Html>
              </group>
            </Suspense>
          }
        </PlantStage >
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
          {active === EPlants.PLANT2 &&
            <Suspense fallback={null}>
              <group position-x={-1.4} position-y={0.5} rotation-y={Math.PI / 8}>
                <Tablet position-x={-0.3} position-z={-0.54} rotation-x={Math.PI / 2} scale={0.04} />
                <Html position-x={-1.87} position-z={-0.499} rotation-y={Math.PI / 12} position-y={0.23} style={{ userSelect: 'none' }} as='div' className="wrapper" castShadow receiveShadow transform occlude distanceFactor={1}>
                  <InfoCard />
                </Html>
              </group>
            </Suspense>
          }
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
          {active === EPlants.PLANT3 &&
            <Suspense fallback={null}>
              <group position-x={1.4} position-y={0.5}>
                <Tablet position-x={-0.04} position-z={-0.51} rotation-x={Math.PI / 2} scale={0.04} />
                <Html position-x={1.5} rotation-y={-Math.PI / 12} position-y={0.23} style={{ userSelect: 'none' }} as='div' className="wrapper" castShadow receiveShadow transform occlude distanceFactor={1}>
                  <InfoCard />
                </Html>
              </group>
            </Suspense>
          }
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
          {active === EPlants.PLANT4 &&
            <Suspense fallback={null}>
              <group position-x={2} position-y={0.2} rotation-y={-Math.PI / 4}>
                <Tablet position-x={0} position-z={1.19} rotation-x={Math.PI / 2} scale={0.04} />
                <Html position-x={3.71} position-z={0.3} rotation-y={-Math.PI / 6} position-y={0.232} style={{ userSelect: 'none' }} as='div' className="wrapper" castShadow receiveShadow transform occlude distanceFactor={1}>
                  <InfoCard />
                </Html>
              </group>
            </Suspense>
          }
        </PlantStage>
      </>
    );
  };
  