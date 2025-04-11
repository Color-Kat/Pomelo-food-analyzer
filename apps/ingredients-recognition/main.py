import asyncio
from core.kafka_config import KafkaConfig
from core.kafka_connection import KafkaConnection
from ocr.ocr_controller import OCRController
import signal
import sys

def graceful_exit(signum, frame):
    print(f"Received signal {signum}, exiting gracefully.")
    sys.exit(0)

signal.signal(signal.SIGTERM, graceful_exit)
signal.signal(signal.SIGINT, graceful_exit)


class KafkaService:
    def __init__(self, config, controller_class):
        self.config = config
        self.connection = KafkaConnection(config)
        self.controller = controller_class(self.connection)
        self.topics = list(controller_class._event_handlers.keys())

    async def run(self):
        await self.connection.connect(self.topics)
        print(f"Server is running2. Subscribed to topics: {self.topics}")
        try:
            async for message in self.connection.consume():
                await self.controller.handle_message(message)
        finally:
            await self.connection.disconnect()
            print("Server is stopped")

async def main():
    config = KafkaConfig()
    service = KafkaService(config, OCRController)
    await service.run()

if __name__ == "__main__":
    asyncio.run(main())