from core.decorators import BaseController, EventPattern
from datetime import datetime
import time
import json
import asyncio

class OCRController(BaseController):
    @EventPattern("ingredients-recognition.ping.request")
    async def handle_ping(self, data):
        ping_size = len(json.dumps(data).encode('utf-8'))
        print(f"Получено ping-сообщение: {data}, размер: {ping_size} байт")
        print(type(data['startTime']))
        print(datetime.now())
        print(type(datetime.now()))

        pong_data = {
            "status": "success",
            "service": "ingredients-recognition",
            "requestTime": f"{time.time()*1000 - data['startTime']}ms"
        }
        pong_size = len(json.dumps(pong_data).encode('utf-8'))
        print(f"Подготовлен pong-ответ: {pong_data}, размер: {pong_size} байт")
        
        return pong_data  # Автоматически отправится в .reply топик

    @EventPattern("scan.photo-submitted.event")
    async def handle_photo_submitted(self, data):
        print(f"Получено событие photo-submitted: {data}")
        
        await asyncio.sleep(2)  # Имитация обработки
        
        recognition_result = {
            "status": "recognized",
            "ingredients": ["tomato", "cucumber", "cheese"],
            "timestamp": datetime.now().isoformat()
        }
        
        # Здесь мы не используем return, поэтому ответ отправляется вручную
        await self.kafka_connection.send(
            "ingredients-recognition.ingredients-recognized.event",
            recognition_result
        )
        print(f"Отправлено событие ingredients-recognized: {recognition_result}")