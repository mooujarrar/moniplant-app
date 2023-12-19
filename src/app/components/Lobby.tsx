import { Float, Text3D, MeshReflectorMaterial } from "@react-three/drei";
import { Shelf } from "./Models/Shelf";
import { Color } from "three";

const bloomColor = new Color('#00ff50');
bloomColor.multiplyScalar(1.05);

export const Lobby = () => {
    return (
        <>
            <Float floatIntensity={0.5} rotationIntensity={0.5}>
                <group position-y={1.5}>
                    <group position={[4, 0, 0]} >
                        <Shelf castShadow receiveShadow rotation-y={-Math.PI / 8} scale={4} />
                    </group>
                    <group position-y={-2} position-x={-8} scale-x={1.5}>
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
            <mesh position-y={-3} rotation-x={-Math.PI / 2}>
                <planeGeometry args={[100, 100]} />
                <MeshReflectorMaterial
                    blur={[100, 100]}
                    resolution={2048}
                    mixBlur={1}
                    mixStrength={10}
                    roughness={1}
                    depthScale={1}
                    opacity={0.9}
                    transparent
                    minDepthThreshold={0.4}
                    maxDepthThreshold={1.4}
                    color="#333"
                    metalness={0.8}
                />
            </mesh>
        </>
    );
};

