import { useFrame } from "@react-three/fiber";
import { motion as motion3d } from "framer-motion-3d";
import {
    Environment,
    MeshPortalMaterial,
    RoundedBox,
    Text,
    useTexture,
} from "@react-three/drei";
import { easing } from "maath";
import { useRef } from "react";
import * as THREE from "three";

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

    useFrame((_state, delta) => {
        const worldOpen = active === name;
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
            <Text
                font='fonts/Figtree-VariableFont_wght.ttf'
                fontSize={0.5}
                position={[0, 0.9, 0.051]}
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
                    <ambientLight intensity={1} />
                    <Environment preset='sunset' />
                    {children}
                    <mesh>
                        <sphereGeometry args={[5, 64, 64]} />
                        <meshStandardMaterial map={map} side={THREE.BackSide} />
                    </mesh>
                </MeshPortalMaterial>
            </RoundedBox>
        </motion3d.group>
    );
};

export default PlantStage;