
import { Flex, Box } from "@react-three/flex";
import {
    RoundedBox,
    Center,
    Text3D,
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
                <RoundedBox
                    args={[2, 2, 0.1]}
                >
                </RoundedBox>
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
                    <Box>
                        <Text3D
                            size={0.08}
                            font={font}
                        >
                            Temperature:
                            <meshStandardMaterial color={color} />
                        </Text3D>
                    </Box>
                    <Box>
                        <Text3D
                            size={0.08}
                            font={font}
                        >
                            Humidity:
                            <meshStandardMaterial color={color} />
                        </Text3D>
                    </Box>
                    <Box>
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
        </>
    );
};

export default InfoCard;