import { Tablet } from "./Models/Tablet";

interface InfoCardProps {
    plantName: string;
    children?: React.ReactNode;
    temperature?: string;
    humidity?: string;
    soilMoisture?: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ children, plantName, temperature, humidity, soilMoisture, ...props }) => {
    return (
        <group {...props} >
            <Tablet rotation-x={Math.PI / 2} scale={0.0305} />
            {children}
        </group>

    );
};

export default InfoCard;