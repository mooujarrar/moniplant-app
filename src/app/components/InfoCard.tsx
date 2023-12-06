import { Html } from "@react-three/drei";
import { Tablet } from "./Models/Tablet";
import { useRef } from "react";

interface InfoCardProps {
    plantName: string;
    temperature?: string;
    humidity?: string;
    soilMoisture?: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ plantName, temperature, humidity, soilMoisture, ...props }) => {
    return (
        <group {...props} >
            <Tablet rotation-x={Math.PI / 2} scale={0.0305} />
            <Html style={{ userSelect: 'none' }} as='div' className="wrapper" castShadow receiveShadow position-z={0.118} transform occlude="blending" distanceFactor={10}>
                <iframe width="100%" height='100%' src="https://mooujarrar.pro" title="My portfolio"></iframe>
                <p>Voilaaa</p>
            </Html>
        </group>

    );
};

export default InfoCard;