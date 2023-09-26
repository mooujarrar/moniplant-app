import {
  Environment,
  MeshPortalMaterial,
  RoundedBox,
  Text,
  CameraControls,
  useCursor,
  useTexture,
  Center,
  Text3D,
} from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { easing } from "maath";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Plant1 } from "./Plant1";
import { Plant2 } from "./Plant2";
import { Plant3 } from "./Plant3";
import { Plant5 } from "./Plant5";
import { Room } from "./Room";
import useStore from "./state-management/activePortal";
import { Plant4 } from "./Plant4";
import { motion as motion3d } from "framer-motion-3d";
import { Flex, Box } from "@react-three/flex";

export const InfoCard = () => {
  const { width, height } = useThree((state) => state.viewport);
  const font = 'fonts/Supply Center_Regular.json';
  const color = '#008000';
  return (
    <>
      <motion3d.group>
        <Center
          bottom
          right
          position={[-width / 2 - 2, height / 2 + 1, 0]}
          rotation-y={Math.PI / 6}
        >
          <Flex flexDirection='column' align="center" justify="space-around" wrap="wrap">
            <Box centerAnchor>
              <Text3D
                size={0.12}
                font={font}
              >
                Plant Information 
                <meshStandardMaterial color={color} />
              </Text3D>
            </Box>
            <Box centerAnchor>
              <Text3D
                size={0.08}
                font={font}
              >
                Temperature: 
                <meshStandardMaterial color={color} />
              </Text3D>
            </Box>
            <Box centerAnchor>
              <Text3D
                size={0.08}
                font={font}
              >
                Humidity: 
                <meshStandardMaterial color={color} />
              </Text3D>
            </Box>
            <Box centerAnchor>
              <Text3D
                size={0.08}
                font={font}
              >
                Soil Moisture: 
                <meshStandardMaterial color={color} />
              </Text3D>
            </Box>
          </Flex>
        </Center>
      </motion3d.group>
    </>
  );
};

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
        cameraControl.setLookAt(0, 0, 16, 0, 0, 0, true);
        cameraControl.minDistance = 16;
        cameraControl.maxDistance = 16;
        cameraControl.maxAzimuthAngle = Math.PI / 8;
        cameraControl.minAzimuthAngle = -Math.PI / 8;
      }
    }
  }, [active]);
  return (
    <>
      <ambientLight intensity={0.1} />
      <Environment preset='sunset' />

      <Room
        position-z={-15}
        position-y={-1}
        rotation={[Math.PI / 6, -Math.PI / 4, 0]}
      />
      <group>
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
          active={active}
          setActive={handleActiveChanged}
          hovered={hovered}
          setHovered={setHovered}
        >
          <Plant1
            scale={0.01}
            position-y={-1}
            hovered={hovered === "Plant 1"}
          />
          {active && <InfoCard />}
        </PlantStage>
        <PlantStage
          rotation-y={Math.PI / 12}
          position-x={-1.5}
          name='Plant 2'
          color='#013220'
          active={active}
          setActive={handleActiveChanged}
          hovered={hovered}
          setHovered={setHovered}
        >
          <Plant2
            scale={0.03}
            position-y={-1}
            hovered={hovered === "Plant 2"}
          />
        </PlantStage>
        <PlantStage
          rotation-y={-Math.PI / 12}
          position-x={1.5}
          name='Plant 3'
          color='#013220'
          active={active}
          setActive={handleActiveChanged}
          hovered={hovered}
          setHovered={setHovered}
        >
          <Plant3
            scale={0.02}
            position-y={-1}
            hovered={hovered === "Plant 3"}
          />
        </PlantStage>
        <PlantStage
          rotation-y={-Math.PI / 6}
          position-x={4}
          position-z={1.5}
          name='Plant 4'
          color='#013220'
          active={active}
          setActive={handleActiveChanged}
          hovered={hovered}
          setHovered={setHovered}
        >
          <Plant4 scale={1} position-y={-1} hovered={hovered === "Plant 4"} />
        </PlantStage>
      </group>
    </>
  );
};

interface PlantStageProps {
  children: React.ReactNode;
  texture?: string;
  name: string;
  color: string;
  active: string | null;
  setActive: (name: string | null) => void;
  hovered: string | null;
  setHovered: (name: string | null) => void;
}

const PlantStage: React.FC<PlantStageProps> = ({
  children,
  texture,
  name,
  color,
  active,
  setActive,
  hovered,
  setHovered,
  ...props
}) => {
  const map = useTexture("texture/green.jpg");
  const portalMaterial = useRef<any>();

  useFrame((_state, delta) => {
    const worldOpen = active === name;
    easing.damp(portalMaterial.current, "blend", worldOpen ? 1 : 0, 0.2, delta);
  });

  return (
    <group {...props}>
      <motion3d.group
        whileHover={{
          scale: active ? 1 : 1.1,
          transition: {
            type: "spring",
            stiffness: 400,
            damping: 10,
          },
        }}
      >
        <Text
          font='fonts/SupplyCenter-0W9nz.ttf'
          fontSize={0.2}
          position={[0, 1.2, 0.051]}
          anchorY={"bottom"}
        >
          {name}
          <meshBasicMaterial color={color} toneMapped={false} />
        </Text>
        <RoundedBox
          name={name}
          args={[2, 3, 0.1]}
          onDoubleClick={() => setActive(active === name ? null : name)}
          onPointerEnter={() => setHovered(name)}
          onPointerLeave={() => setHovered(null)}
        >
          <MeshPortalMaterial ref={portalMaterial} side={THREE.DoubleSide}>
            <ambientLight intensity={0.5} />
            <Environment preset='sunset' />
            {children}
            <mesh>
              <sphereGeometry args={[5, 64, 64]} />
              <meshStandardMaterial map={map} side={THREE.BackSide} />
            </mesh>
          </MeshPortalMaterial>
        </RoundedBox>
      </motion3d.group>
    </group>
  );
};
