from core.decorators import BaseController, EventPattern
from ocr.ocr_service import OCRService
from datetime import datetime
import time
import asyncio

class OCRController(BaseController):
    @EventPattern("ingredients-recognition.ping.request")
    async def handle_ping(self, data):
        print(f"Received ping message: {data}")
        
        pong_data = {
            "status": "ok",
            "service": "ingredients-recognition",
            "requestTime": f"{round(time.time()*1000 - data['startTime'])}ms"
        }
        print(f"Send pong reply: {pong_data}")
        
        return pong_data  # Auto reply to .reply topic

    @EventPattern("scan.photo-submitted.event")
    async def handle_photo_submitted(self, data):
        print(f"Received scan.photo-submitted.event: {data}")
        scan_id = data['scanId']
        photo_url = data['photoUrl']
        type = data['type'] # food or cosmetic
        
        # Recognition is started
        await self.kafka_connection.send(
            "scan.status-changed.event",
            {
                "scanId": scan_id,
                "status": "recognizing"
            }
        )
        
        try:
            recognition_result = await OCRService().extract_text(photo_url, type)
            recognition_result["scanId"] = scan_id
            
            # Send recognition result
            await self.kafka_connection.send(
                "ingredients-recognition.recognized.event",
                recognition_result
            )
            
            # Recognition is started
            await self.kafka_connection.send(
                "scan.status-changed.event",
                {
                    "scanId": scan_id,
                    "status": "recognized"
                }
            )
            
        except Exception as e:
            print("Something went wrong during text extraction:")
            print(e)
            
            # Recognition error
            await self.kafka_connection.send(
                "scan.status-changed.event",
                {
                    "scanId": scan_id,
                    "status": "recognitionFailed"
                }
            )