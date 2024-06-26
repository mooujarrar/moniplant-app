import { useFrame } from '@react-three/fiber';
import { motion as motion3d } from 'framer-motion-3d';
import {
  Environment,
  MeshPortalMaterial,
  RoundedBox,
  Text,
  useTexture,
} from '@react-three/drei';
import { easing } from 'maath';
import { useRef } from 'react';
import * as THREE from 'three';
import { usePortalStore } from './state-management/activePortal';

interface PlantStageProps {
  children: React.ReactNode;
  texture: string;
  name: string;
  color: string;
  hovered: string | null;
  setHovered: (name: string | null) => void;
}

const PlantStage: React.FC<PlantStageProps> = ({
  children,
  texture,
  name,
  color,
  hovered,
  setHovered,
  ...props
}) => {
  const map = useTexture(texture);
  const portalMaterial = useRef<any>();
  const { activePortal, setActivePortal } = usePortalStore();

  const handleActiveChanged = (activePortal: string | null) => {
    setActivePortal(activePortal);
  };

  useFrame((_state, delta) => {
    easing.damp(
      portalMaterial.current,
      'blend',
      activePortal === name ? 1 : 0,
      0.1,
      delta,
      2
    );
  });

  return (
    <motion3d.group
      {...props}
      whileHover={{
        scale: activePortal ? 1 : 1.1,
        transition: {
          type: 'spring',
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
        anchorY={'bottom'}
      >
        {name}
        <meshBasicMaterial color={color} toneMapped={false} />
      </Text>

      {/* Border for the Portals */}
      <RoundedBox args={[2 + 0.08, 3 + 0.08, 0.01]}>
        <meshBasicMaterial color='#0F5132' />
      </RoundedBox>

      {/* Portal */}
      <RoundedBox
        name={name}
        args={[2, 3, 0.1]}
        onDoubleClick={() =>
          handleActiveChanged(activePortal === name ? null : name)
        }
        onPointerEnter={() => setHovered(name)}
        onPointerLeave={() => setHovered(null)}
      >
        {/* Content of the Portal */}
        <MeshPortalMaterial ref={portalMaterial} side={THREE.DoubleSide}>
          <ambientLight intensity={1} />
          <Environment preset='sunset' />
          {children}
          <mesh>
            <sphereGeometry args={[6, 64, 64]} />
            <meshStandardMaterial
              map={map}
              side={THREE.BackSide}
              transparent={false}
            />
          </mesh>
        </MeshPortalMaterial>
      </RoundedBox>
    </motion3d.group>
  );
};

export default PlantStage;
