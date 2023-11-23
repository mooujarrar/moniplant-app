
import { Flex, Box } from "@react-three/flex";
import {
    Text3D,
    GradientTexture,
    Svg,
    Billboard,
    GradientType,
} from "@react-three/drei";
import { Tablet } from "./Models/Tablet";

interface InfoCardProps {
    plantName: string;
    temperature?: string;
    humidity?: string;
    soilMoisture?: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ plantName, temperature, humidity, soilMoisture, ...props }) => {
    const font = 'fonts/Supply Center_Regular.json';
    const color = '#72CC50';
    return (
            <Billboard {...props} follow={true} lockY={false} lockX={false} lockZ={false} scale={0.5}>
                <Tablet scale={0.05} rotation-x={Math.PI / 2} position-y={-0.2} />
                {/*<mesh position-z={0.1}>
                    <planeGeometry args={[1.8, 2.2, 32, 32]} />
                    <meshBasicMaterial>
                        <GradientTexture type={GradientType.Radial} innerCircleRadius={0.2} stops={[0, 0.5, 1]} colors={['#3e8127', '#47e639', '#868e43']} size={20} />
                    </meshBasicMaterial>
                </mesh>*/}
                <Flex width={2} height={2} centerAnchor flexWrap="wrap" flexDirection='column' align="center" justify="space-around" wrap="wrap">
                    <Box>
                        <Text3D
                            size={0.15}
                            font={font}
                        >
                            {plantName}
                            <meshStandardMaterial color={color} />
                        </Text3D>
                    </Box>
                    <Box flexDirection="row" flexWrap="no-wrap" alignItems={'baseline'}>
                        <Box>
                            <Text3D
                                size={0.08}
                                font={font}
                            >
                                Temperature
                                <meshStandardMaterial color={color} />
                            </Text3D>
                        </Box>
                        <Box>
                            <Svg position-z={0.2} src={"icons/thermometer.svg"} scale={0.0025} />
                        </Box>
                    </Box>
                    <Box flexDirection="row" flexWrap="no-wrap" alignItems={'baseline'}>
                        <Box>
                            <Text3D
                                size={0.08}
                                font={font}
                            >
                                Humidity
                                <meshStandardMaterial color={color} />
                            </Text3D>
                        </Box>
                        <Box marginLeft={0.1}>
                            <Svg position-z={0.2} src={"icons/humidity.svg"} scale={0.0008} />
                        </Box>
                    </Box>
                    <Box flexDirection="row" flexWrap="no-wrap" alignItems={'baseline'}>
                        <Box>
                            <Text3D
                                size={0.08}
                                font={font}
                            >
                                Soil Moisture
                                <meshStandardMaterial color={color} />
                            </Text3D>
                        </Box>
                        <Box marginLeft={0.1}>
                            <Svg position-z={0.2} src={"icons/moisture-sensor.svg"} scale={0.0008} />
                        </Box>
                    </Box>
                </Flex>
            </Billboard>
    );
};

export default InfoCard;