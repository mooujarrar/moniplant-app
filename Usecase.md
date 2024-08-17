# Plant Monitoring System

## Overview
The Plant Monitoring System is a platform designed to help users monitor the health and status of their plants using Raspberry Pi devices connected to various sensors. Each user has their own Raspberry Pi which is linked to multiple plants, with each plant monitored by three specific sensors:

1. **Temperature Sensor** - Monitors the ambient temperature around the plant.
2. **Humidity Sensor** - Tracks the humidity levels in the air around the plant.
3. **Soil Moisture Sensor** - Measures the moisture content in the soil.

## System Architecture

### 1. Raspberry Pi
- **Role**: Acts as the central hub for data collection and processing.
- **Connections**: Linked to multiple sensors for monitoring different parameters of the plants.
- **Users**: Each user is assigned their own Raspberry Pi.

### 2. Sensors
Each plant is associated with the following sensors:
- **Temperature Sensor (e.g., DHT11/DHT22)**
  - Measures the temperature in the vicinity of the plant.
  - Provides data in °C/°F.
- **Humidity Sensor (e.g., DHT11/DHT22)**
  - Monitors the relative humidity of the air surrounding the plant.
  - Provides data in percentage (%).
- **Soil Moisture Sensor (e.g., Capacitive Soil Moisture Sensor)**
  - Detects the water content within the soil.
  - Provides data as an analog or digital value.

### 3. Plants
Each plant is connected to one set of sensors (temperature, humidity, and moisture). Data from these sensors is collected and processed by the Raspberry Pi, providing real-time insights into the plant's environment.

## Data Flow

1. **Sensor Data Collection**: 
   - Sensors collect data on temperature, humidity, and soil moisture at regular intervals.
   
2. **Data Transmission**:
   - The Raspberry Pi receives the sensor data and processes it.
   
3. **Data Analysis**:
   - The Raspberry Pi can analyze the data locally or transmit it to a cloud service for further analysis.
   
4. **User Interface**:
   - Users can view the sensor data through a web interface, mobile app, or other platforms supported by the Raspberry Pi.

## Example Use Case

### User Plant Setup
- **User**: Alice
- **Plants Monitored**: 2

#### Plant 1: Basil
- **Temperature Sensor ID**: `TEMP001`
- **Humidity Sensor ID**: `HUM001`
- **Soil Moisture Sensor ID**: `MOIS001`

#### Plant 2: Rosemary
- **Temperature Sensor ID**: `TEMP002`
- **Humidity Sensor ID**: `HUM002`
- **Soil Moisture Sensor ID**: `MOIS002`

## Conclusion
This system provides users with essential insights into the conditions of their plants, ensuring they can take timely action to maintain optimal plant health. The Raspberry Pi serves as the backbone of the system, enabling easy scalability and customization for different plants and sensors.