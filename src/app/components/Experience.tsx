import { Environment, Float, Html, MeshReflectorMaterial, Text3D, useFont } from "@react-three/drei";
import { Monitoring } from "./Monitoring";
import { Island } from "./Models/Island";
import { Color } from "three";
import OverlayButtons from "./UI";
import { EPage, useActivePageStore } from "./state-management/activePage";
import { useActivePortalStore } from "./state-management/activePortal";

const bloomColor = new Color('#00ff50');
bloomColor.multiplyScalar(1.05);

export const Experience = () => {

  const { activePage } = useActivePageStore();
  const { activePortal } = useActivePortalStore();

  return (
    <>
      {!activePortal && <Html as='div' center className="h-screen w-screen">
        {/* Your main content */}
        <OverlayButtons />
      </Html>}
      {activePage === EPage.MONITOR && <Monitoring />}
      {activePage === EPage.HOME && <>
        <ambientLight />
        <hemisphereLight groundColor="green" />
        <Environment background preset="sunset" blur={0.8} />
        <Float>
          <group position-y={1.5}>
            <group position={[4, 0, 0]} >
              <Island rotation-y={Math.PI} scale={6} />
            </group>
            <group position-x={-8} scale-x={1.5}>
              <Text3D
                font={"fonts/Bebas Neue_Regular.json"}
                size={2}
                castShadow
                rotation-y={Math.PI / 8}
                bevelEnabled
                bevelThickness={0.3}
                lineHeight={0.7}
                letterSpacing={0.1}
              >
                Moni{'\n'}Plant
                <meshPhysicalMaterial color={bloomColor} toneMapped={false} roughness={0.1} emissive={'#153721'} metalness={0.2} />
              </Text3D>
            </group>
          </group>
        </Float>
        <mesh position-y={-1.2} rotation-x={-Math.PI / 2}>
          <planeGeometry args={[100, 100]} />
          <MeshReflectorMaterial
            blur={[100, 100]}
            resolution={2048}
            mixBlur={1}
            mixStrength={10}
            roughness={1}
            depthScale={1}
            opacity={0.5}
            transparent
            minDepthThreshold={0.4}
            maxDepthThreshold={1.4}
            color="#333"
            metalness={0.8}
          />
        </mesh>
      </>}

    </>
  );
};

useFont.preload("/fonts/Bebas Neue_Regular.json");