import { useEffect, useMemo } from 'react';
import mqtt from 'mqtt';
import { useMqttStore } from '../components/state-management/mqttStore';

const useMqttClient = (topics = []) => {
  const brokerUrl = process.env.MQTT_BROKER_URL || 'mqtt://localhost:1883';
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
    const mqttClient: mqtt.MqttClient = mqtt.connect(brokerUrl, defaultOptions);


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

    mqttClient.on('message', (topic, message) => {
      console.log(`Message received on topic ${topic}: ${message.toString()}`);
      setMessage(topic, message.toString());
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
