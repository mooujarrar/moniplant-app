import { useEffect, useMemo } from 'react';
import mqtt from 'mqtt';
import { useMqttStore } from '../components/state-management/mqttStore';

type SensorData = {
  plant_id: string; // The ID of the plant
  sensor_id: string; // The ID of the sensor
  timestamp: number; // A Unix timestamp in seconds with a fractional part
  value: string; // Sensor value as a string
};

const useMqttClient = (topics: string[] = []) => {
  const brokerUrl = useMemo(() => process.env.MQTT_BROKER_URL || 'mqtt://localhost:8883', []); // Default broker URL
  const defaultOptions = useMemo(
    () => ({
      clientId: `mqtt_${Math.random().toString(16).slice(3)}`,
      clean: true,
      connectTimeout: 4000,
      reconnectPeriod: 1000,
    }),
    []
  ); // Empty dependency array to ensure options are memoized

  const { setMessage } = useMqttStore();

  useEffect(() => {
    // Connect to the MQTT broker
    const mqttClient: mqtt.MqttClient = mqtt.connect(brokerUrl);


    mqttClient.on('connect', () => {
      console.log('Connected to MQTT broker');

      // Subscribe to topics
      if (topics.length > 0) {
        mqttClient.subscribe(topics, (err) => {
          if (err) {
            console.error('Subscription error:', err);
          } else {
            console.log(`Subscribed to topics: ${topics.join(', ')}`);
          }
        });
      }
    });

    mqttClient.on('message', (topic, message: any) => {
      console.log(`Message received on topic ${topic}: ${message.toString()}`);
      const sensorData = JSON.parse(message.toString()).data as SensorData;
      setMessage(sensorData.sensor_id, sensorData.value);
    });

    mqttClient.on('error', (err) => {
      console.error('MQTT client error:', err);
    });

    mqttClient.on('offline', () => {
      console.warn('MQTT client is offline');
    });

    // Cleanup on unmount
    return () => {
      mqttClient.end();
      console.log('MQTT client disconnected');
    };
  }, [brokerUrl, defaultOptions, topics, setMessage]);

  return null;
};

export default useMqttClient;
