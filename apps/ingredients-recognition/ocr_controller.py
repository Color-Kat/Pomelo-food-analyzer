from core.decorators import BaseController, EventPattern
from datetime import datetime
import time
import json
import asyncio

class OCRController(BaseController):
    @EventPattern("ingredients-recognition.ping.request")
    async def handle_ping(self, data):
        print(f"Got ping message: {data}")

        pong_data = {
            "status": "ok",
            "service": "ingredients-recognition",
            "requestTime": f"{time.time()*1000 - data['startTime']}ms"
        }
        print(f"Send pong reply: {pong_data}")
        
        return pong_data  # Auto reply to .reply topic

    @EventPattern("scan.photo-submitted.event")
    async def handle_photo_submitted(self, data):
        print(f"Got scan.photo-submitted.event: {data}")
        
        await asyncio.sleep(2)  # Processing imitation
        
        recognition_result = {
            "status": "recognized",
            "ingredients": ["tomato", "cucumber", "cheese"],
            "timestamp": datetime.now().isoformat()
        }
        
        await self.kafka_connection.send(
            "ingredients-recognition.ingredients-recognized.event",
            recognition_result
        )