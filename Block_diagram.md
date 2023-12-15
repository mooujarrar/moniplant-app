# Global microservices iteractions diagram
```mermaid
graph TD
  subgraph Frontend
    A(Frontend)
  end

  subgraph API_Gateway
    B(API Gateway)
  end

  subgraph Kafka_Broker
    C(Kafka Broker)
  end

  subgraph Plant_Service
    D(Plant Service)
  end

  subgraph Sensor_Service
    E(Sensor Service)
  end

  subgraph Notification_Service
    F(Notification Service)
  end

  A -->|GraphQL| B
  B -->|Kafka Events| C
  C -->|Sensor Data| E
  E -->|Threshold Check| F
  E -->|Sensor Info| D
  F -->|Raise Flag| C
  D -->|Plant Data| B
```

+-----------------+       +-------------------+       +------------------+
|                 |       |                   |       |                  |
|   Frontend      | <---- |   API Gateway     | <---- |   Plant Service  |
|                 |       |                   |       |                  |
+-----------------+       +-------------------+       +------------------+
                             |
                             |       +-------------------+
                             +-----> |   Sensor Service  |
                             |       +-------------------+
                             |
                             |       +-------------------+
                             +-----> |   Data Service    |
                                     |   (DB Gateway)    |
                                     +-------------------+
                                     |
                                     |       +------------------------+
                                     +-----> | Notification Service   |
                                             +------------------------+