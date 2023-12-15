
```mermaid
graph TD
  Frontend --> APIGateway
  APIGateway --> PlantService
  APIGateway --> SensorService
  APIGateway --> NotificationService

  PlantService -->|CRUD Operations| DataService
  SensorService -->|Record Sensor Data| DataService
  NotificationService -->|Thresholds, ex: Low Moisture| DataService

  DataService -->|Data Storage/Retrieval| Database
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