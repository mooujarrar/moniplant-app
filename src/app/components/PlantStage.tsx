import { useFrame } from "@react-three/fiber";
import { motion as motion3d } from "framer-motion-3d";
import {
  BBAnchor,
  Environment,
  Html,
  MeshPortalMaterial,
  RoundedBox,
  Text,
  useTexture,
} from "@react-three/drei";
import { easing } from "maath";
import { useRef, useState } from "react";
import * as THREE from "three";
import { Tablet } from "./Models/Tablet";

interface PlantStageProps {
  children: React.ReactNode;
  texture: string;
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
  const map = useTexture(texture);
  const portalMaterial = useRef<any>();
  const [worldOpen, setWorldOpen] = useState(false);

  useFrame((_state, delta) => {
    setWorldOpen(active === name);
    easing.damp(portalMaterial.current, "blend", worldOpen ? 1 : 0, 0.2, delta);
  });

  return (
    <motion3d.group
      {...props}
      whileHover={{
        scale: active ? 1 : 1.1,
        transition: {
          type: "spring",
          stiffness: 400,
          damping: 10,
        },
      }}
    >
      {/* Plant name - Title on the Portal */}
      <Text
        font='fonts/Figtree-VariableFont_wght.ttf'
        fontSize={0.5}
        position={[0, 0.9, 0.051]}
        anchorY={"bottom"}
      >
        {name}
        <meshBasicMaterial color={color} toneMapped={false} />
      </Text>

      {/* Border for the Portals */}
      <RoundedBox args={[2 + 0.08, 3 + 0.08, 0.01]}>
        <meshBasicMaterial color='black' />
      </RoundedBox>

      {/* Portal */}
      <RoundedBox
        name={name}
        args={[2, 3, 0.1]}
        onDoubleClick={() => setActive(active === name ? null : name)}
        onPointerEnter={() => setHovered(name)}
        onPointerLeave={() => setHovered(null)}
      >
        {/* Content of the Portal */}
        <MeshPortalMaterial ref={portalMaterial} side={THREE.DoubleSide}>
          <ambientLight intensity={1} />
          <Environment preset='sunset' />
          {children}
          {worldOpen && <group {...props}>
            <Tablet rotation-x={Math.PI / 2} position-x={0.005} position-z={-0.1} scale={0.0305} />
            <Html {...props} position-y={0.18} style={{ userSelect: 'none' }} as='div' className="wrapper" castShadow receiveShadow transform occlude distanceFactor={1}>
              <iframe width="100%" height='100%' src="https://mooujarrar.pro" title="My portfolio"></iframe>
            </Html>
          </group>}
          <mesh>
            <sphereGeometry args={[6, 64, 64]} />
            <meshStandardMaterial map={map} side={THREE.BackSide} transparent={false} />
          </mesh>
        </MeshPortalMaterial>
      </RoundedBox>
    </motion3d.group>
  );
};

export default PlantStage;
