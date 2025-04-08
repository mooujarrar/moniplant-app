import { Html } from '@react-three/drei';
import InfoCard from '../UI/monitor/InfoCard';

export function PlantInfo(props) {
  // TODO props.plantData.id (plant id), I need to retrieve the sensors list from the plant data
  // When having sensor ids, I need to subscribe to the mqtt topics with this ids and then show the data in plant info
  return (
    <group {...props}>
      {/*<Line
        points={[
          [-0.4, -0.1, -0.8],
          [-0.4, -0.1, -0.6],
          [-0.1, -0.1, -0.6],
        ]}
        color='white'
        lineWidth={2}
      />
      <Line
        points={[
          [-0.4, 0.4, -0.5],
          [-0.4, 0.4, -0.7],
          [-0.01, 0.4, -0.7],
        ]}
        color='white'
        lineWidth={2}
      />
      <Line
        points={[
          [0.8, -0.2, -0.9],
          [0.8, -0.2, -0.6],
          [0.2, -0.2, -0.6],
        ]}
        color='white'
        lineWidth={2}
      />
      <Line
        points={[
          [0.6, 0.3, -0.5],
          [0.6, 0.3, -0.7],
          [0.3, 0.3, -0.7],
        ]}
        color='white'
        lineWidth={2}
    />*/}
      <Html
        style={{ userSelect: 'none' }}
        as='div'
        className='wrapper'
        castShadow
        receiveShadow
        center
        transform
        distanceFactor={1}
      >
        <InfoCard />
      </Html>
    </group>
  );
}
