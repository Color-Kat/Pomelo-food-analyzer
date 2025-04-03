# Scan microservice
This microservice will manage scans and its status.

- Get request to scan something
- Save photo to storage and return a link
- Save info about new scan into db
- Emits an event about new scan request to message broker (kafka)
- Listen to the message broker for new scan results
- When the result is ready, return the result to user

### Scan Analysis Process Stages

1.  **Stage: Image Received**
    - Client sends an image via API Gateway.
    - Actions:
        * The Scan microservice receives the image.
        * Saves the image to S3 storage service
        * A new scan record is created in the database with the status `RECOGNITION_PENDING`.
    - Published Kafka Topics:
        * `scan.status-changed.event` (with new status `CREATED`?).
        * `scan.status-changed.event` (with new status `RECOGNITION_PENDING`).
        * `scan.image-submitted.event` (with payload `{scanId, photoUrl}`).

2.  Stage: Text Recognition
    - Trigger Event: `scan.image-submitted.event`.
    - Actions:
        * Emit status `RECOGNIZING`.
        * The Scan microservice initiates the text recognition process on the image.
        * If text recognition fails, the scan status is updated to `RECOGNITION_FAILED`.
        * If text recognition is successful, emit event with extracted text.
    - Published Kafka Topics:
        * `scan.status-changed.event` (with new status `RECOGNIZING`).
        * `scan.status-changed.event` (with new status `RECOGNITION_FAILED` or `RECOGNIZED`).
        * `ingredients-recognition.text-recognized.event` (with recognized text or error).

3.  **Stage: Recognized text saving**
    - Trigger Event: `ingredients-recognition.text-recognized.event`.
    - Actions:
        * The Scan microservice saves the recognized text to the database.
        * If recognition fails, the scan status is updated to `RECOGNITION_FAILED`.
        * If recognition is successful, the scan status is updated to `RECOGNIZED`.
    - Published Kafka Topics:
        * `scan.ready-for-analysis.event` (with recognized text) (for orchestration)

4. **Stage: Product Analysis**
    - Trigger Event: `ingredients.text-recognized.event` (for choreography).
    - Trigger Event: `scan.ready-for-analysis.event` (for orchestration).
    - Actions:
        * Emit status `ANALYZING`.
        * Initiates the analysis of the recognized text to identify products.
        * If the analysis fails, emit scan status `ANALYSIS_FAILED`.
        * If the analysis is successful, emit scan status `ANALYZED`.
    - Published Kafka Topics:
        * `product-analyzer.analysis-completed.event` (with analysis results or error).
        * `scan.status-changed.event` (with new status `ANALYSIS_FAILED`).

5. **Stage: Analysis result saving**
    - Trigger Event: `product-analyzer.analysis-completed.event`.
    - Actions:
        * The Scan microservice saves the analysis result to the database.
        * If analysis fails, the scan status is updated to `ANALIZIS_FAILED`.
        * If analysis is successful, the scan status is updated to `COMPLETED`.
    - **Published Kafka Topics:**
        * `status.changed.event` (with new status `COMPLETED`).

6. **Stage: Result Retrieval**
    - Trigger Event: Client requests scan data via API Gateway after `COMPLETED` status wia http GET.
    - Actions:
        * The Scan microservice retrieves the scan record from the database.
        * The scan record (IScan type) is returned to the client via API Gateway.

#### Scan Statuses in DB

* `RECOGNITION_PENDING`: Awaiting text recognition.
* `RECOGNITION_FAILED`: Text recognition failed.
* `RECOGNIZED`: Text recognition successful.
* `ANALYSIS_PENDING`: Awaiting product analysis.
* `ANALYSIS_FAILED`: Product analysis failed.
* `COMPLETED`: Analysis completed successfully.

#### Scan Statuses in Kafka
`CREATED`: Initial state
`RECOGNITION_PENDING`: Sent for recognition
`RECOGNIZING`: currently recognizing
`RECOGNITION_FAILED`: recognition error
`RECOGNIZED`: text successfully recognized (but not saved in DB yer)
`INGREDIENTS_SAVED`: recognized text is saved in DB
`ANALYSIS_PENDING`: sent for analysis
`ANALYZING`: currently analyzing
`ANALYSIS_FAILED`: analysis error
`ANALYZED`: analysis completed (but not saved in DB yet)
`COMPLETED`: scan is fully completed
`FAILED`: something went wrong
