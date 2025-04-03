#!/usr/bin/env python3
import asyncio
import json
import time
from datetime import datetime
from aiokafka import AIOKafkaConsumer, AIOKafkaProducer

KAFKA_BOOTSTRAP_SERVERS = "kafka:9093"  # Замените на ваши сервера
PING_TOPIC = "ingredients-recognition.ping.request"  # Топик для подписки
PONG_TOPIC = "ingredients-recognition.ping.request.reply"  # Топик для ответа


class KafkaPingPongService:
    def __init__(self, bootstrap_servers):
        self.bootstrap_servers = bootstrap_servers
        self.consumer = None
        self.producer = None
        self.running = False

    async def start(self):
        """Запускает сервис"""
        self.running = True

        # Создаем потребителя и производителя
        self.consumer = AIOKafkaConsumer(
            PING_TOPIC,
            bootstrap_servers=self.bootstrap_servers,
            group_id="ingredients-recognition-service",
            auto_offset_reset="latest",
            enable_auto_commit=True,
            value_deserializer=lambda m: json.loads(m.decode('utf-8'))
        )

        self.producer = AIOKafkaProducer(
            client_id="dsfgsdfg43qergfdb",
            bootstrap_servers=self.bootstrap_servers,
            value_serializer=lambda v: json.dumps(v).encode('utf-8')
        )

        # Запускаем потребителя и производителя
        while True:
            try:
                await self.consumer.start()
                await asyncio.sleep(3)
                break
            except:
                continue
        await self.producer.start()

        print(f"Сервис запущен. Подписан на топик {PING_TOPIC}")

        try:
            async for message in self.consumer:
                await self.handle_ping(message)
        finally:
            await self.stop()


    async def handle_ping(self, message):
        headers = message.headers
        ping_data = message.value
        ping_size = len(json.dumps(ping_data).encode('utf-8'))
        print(f"Получено ping-сообщение: {ping_data}, размер: {ping_size} байт")

        pong_data = {
            "status": "success",
            "service": "ingredients-recognition",
            "requestTime": datetime.now().isoformat()
        }
        pong_size = len(json.dumps(pong_data).encode('utf-8'))
        print(f"Отправлено pong-сообщение: {pong_data}, размер: {pong_size} байт")

        await self.producer.send_and_wait(PONG_TOPIC,
                                          pong_data,
                                          headers=[('kafka_correlationId', headers[0][1])])


    async def stop(self):
        """Останавливает сервис"""
        self.running = False

        if self.consumer:
            await self.consumer.stop()

        if self.producer:
            await self.producer.stop()

        print("Сервис остановлен")


async def main():
    service = KafkaPingPongService(KAFKA_BOOTSTRAP_SERVERS)
    try:
        await service.start()
    except KeyboardInterrupt:
        pass


if __name__ == "__main__":
    asyncio.run(main())