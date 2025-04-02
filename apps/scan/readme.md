# Scan microservice
This microservice will manage scans and its status.

- Get request to scan something
- Save photo to storage and return a link
- Save info about new scan into db
- Emits an event about new scan request to message broker (kafka)
- Listen to the message broker for new scan results
- When the result is ready, return the result to user

### Scan stages
1. `Status = CREATED` Create new scan entity.
2. `Status = CREATED` Save photo to S3 storage and save scan with photo_url to DB.
```
{
    "scanId": string,
    "photoUrl": string,
}
```
3. `Status = RECOGNIZING` In recognition MS take photo from S3 by `photoUrl` 
and extract text from image, normalize it and push to kafka.