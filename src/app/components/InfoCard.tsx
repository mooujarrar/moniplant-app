
import { Flex, Box } from "@react-three/flex";
import {
    RoundedBox,
    Center,
    Text3D,
    MeshDistortMaterial,
    GradientTexture,
    Svg,
} from "@react-three/drei";
import { useThree } from "@react-three/fiber";

interface InfoCardProps {
    plantName: string;
    temperature?: string;
    humidity?: string;
    soilMoisture?: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ plantName, temperature, humidity, soilMoisture }) => {
    const { width, height } = useThree((state) => state.viewport);
    const font = 'fonts/Supply Center_Regular.json';
    const color = '#008000';
    return (
        <>
            <Center
                bottom
                right
                position={[-width / 2 - 2, height / 2 + 1, -0.01]}
                rotation-y={Math.PI / 6}
            >
                <mesh>
                    <planeGeometry args={[2, 2.2, 32, 32]} />
                    <MeshDistortMaterial speed={2} distort={0.3}>
                        <GradientTexture stops={[0, 0.5, 1]} colors={['#3e8127', '#47e639', '#868e43']} size={100} />
                    </MeshDistortMaterial>
                </mesh>
            </Center>
            <Center
                bottom
                right
                position={[-width / 2 - 2, height / 2 + 1, 0]}
                rotation-y={Math.PI / 6}
            >
                <Flex width={2} height={2} flexWrap="wrap" flexDirection='column' align="center" justify="space-around" wrap="wrap">
                    <Box>
                        <Text3D
                            size={0.12}
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
            </Center>
        </>
    );
};

export default InfoCard;