# Scan microservice
This microservice will manage scans and its status.

- Get request to scan something
- Save photo to storage and return a link
- Save info about new scan into db
- Emits an event about new scan request to message broker (kafka)
- Listen to the message broker for new scan results
- When the result is ready, return the result to user