import { Html } from '@react-three/drei';
import InfoCard from '../UI/monitor/InfoCard';
import { useMemo } from 'react';
import { useRetrieveSensors, useRetrieveSensorsLatestData } from '@/app/hooks/usePlants';
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
  }, [sensors, props.data.id]);

  const sensorIds = useMemo(
    () => sensors.map((sensor) => '/' + props.data.id + '/' + sensor.id),
    [sensors, props.data.id]
  );

  const tempData = useRetrieveSensorsLatestData(sensorTypesMap['Temperature'])?.data;
  const humidityData = useRetrieveSensorsLatestData(sensorTypesMap['Humidity'])?.data;
  const moistureData = useRetrieveSensorsLatestData(sensorTypesMap['Moisture'])?.data;
  
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
          timestamp={messages[sensorTypesMap['Moisture']] ? Date.now() / 1000 : moistureData?.ts}
          moistureValue={messages[sensorTypesMap['Moisture']] ?? moistureData?.value}
          temperatureValue={messages[sensorTypesMap['Temperature']] ?? tempData?.value}
          humidityValue={messages[sensorTypesMap['Humidity']] ?? humidityData?.value}
        />}
      </Html>
    </group>
  );
}
