[![](https://mermaid.ink/img/pako:eNp1kc1Ow0AMhF9l5XMq7jkgISIQEj9VUm65mKzbrEjWkddpqdq-O9kFQYBysz3fjCX7AA1bghw2gkNrVkXtjbkR9kremsXi0lwt725RaYf7KH13SVx26LUi2bqGzsgV-cDyv_7I6tauQXXsv6jIzXMjebwunwvzNJAkNhxNgYqz4B-bkqOkhsV-Cgn_YzqzPllXrVBoubMhM_SWm3vemQd2QUehXyExZjZI9tibSllwQxclqTjaYvdhfMFAkEFP0qOz090PMaEGbamnGvKptCivNdT-NHE4Kld730CuMlIG42Cn8xUOp3f1kK-xC3R6B8JxnWY?type=png)](https://mermaid-js.github.io/mermaid-live-editor/edit#pako:eNp1kc1Ow0AMhF9l5XMq7jkgISIQEj9VUm65mKzbrEjWkddpqdq-O9kFQYBysz3fjCX7AA1bghw2gkNrVkXtjbkR9kremsXi0lwt725RaYf7KH13SVx26LUi2bqGzsgV-cDyv_7I6tauQXXsv6jIzXMjebwunwvzNJAkNhxNgYqz4B-bkqOkhsV-Cgn_YzqzPllXrVBoubMhM_SWm3vemQd2QUehXyExZjZI9tibSllwQxclqTjaYvdhfMFAkEFP0qOz090PMaEGbamnGvKptCivNdT-NHE4Kld730CuMlIG42Cn8xUOp3f1kK-xC3R6B8JxnWY)

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