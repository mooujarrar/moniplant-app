import { Html } from '@react-three/drei';
import InfoCard from '../UI/monitor/InfoCard';
import { useEffect, useMemo } from 'react';
import { useRetrieveSensors } from '@/app/hooks/usePlants';
import useMqttClient from '@/app/hooks/useMqttClient';
import { useMqttStore } from '../state-management/mqttStore';
import { ESensorType } from '@/app/utils/ESensorType';

export function PlantInfo(props) {
  const { sensors } = useRetrieveSensors(props.data.id);

  const sensorTypesMap = useMemo(() => {
    const map = {};
    sensors.forEach((sensor) => {
      if (sensor.label === ESensorType.TEMPERATURE) {
        map['Temperature'] = '/' + props.data.id + '/' + sensor.id;
      } else if (sensor.label === ESensorType.HUMIDITY) {
        map['Humidity'] = '/' + props.data.id + '/' + sensor.id;
      } else if (sensor.label === ESensorType.SOIL_MOISTURE) {
        map['Moisture'] = '/' + props.data.id + '/' + sensor.id;
      }
    });
    return map;
  }, [sensors]);

  const sensorIds = useMemo(
    () => sensors.map((sensor) => '/' + props.data.id + '/' + sensor.id),
    [sensors, props.data.id]
  );


  useMqttClient(sensorIds);
  
  const { messages } = useMqttStore();


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
        {messages && sensorTypesMap && <InfoCard
          moistureValue={messages[sensorTypesMap['Moisture']]}
          temperatureValue={messages[sensorTypesMap['Temperature']]}
          humidityValue={messages[sensorTypesMap['Humidity']]}
        />}
      </Html>
    </group>
  );
}
