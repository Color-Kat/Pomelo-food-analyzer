from aiokafka import AIOKafkaConsumer, AIOKafkaProducer
import json
import asyncio

class KafkaConnection:
    def __init__(self, config):
        self.config = config
        self.consumer = None
        self.producer = None

    async def connect(self, topics):
        self.consumer = AIOKafkaConsumer(
            *topics,
            bootstrap_servers=self.config.bootstrap_servers,
            group_id=self.config.group_id,
            auto_offset_reset=self.config.auto_offset_reset,
            enable_auto_commit=self.config.enable_auto_commit,
            value_deserializer=self._deserialize_message
        )
        
        self.producer = AIOKafkaProducer(
            client_id=self.config.client_id,
            bootstrap_servers=self.config.bootstrap_servers,
            value_serializer=lambda v: json.dumps(v).encode('utf-8'),  
        )
        
        while True:
            try:
                await self.consumer.start()
                await self.producer.start()
                print(f"Successfully connected to Kafka: {self.config.bootstrap_servers}")
                break
            except Exception as e:
                print(f"Kafka connection error: {e}")
                await asyncio.sleep(1)

    def _deserialize_message(self, message):
        if message is None:
            print("Received empty message (None)")
            return None
        try:
            return json.loads(message.decode('utf-8'))
        except json.JSONDecodeError as e:
            print(f"Kafka message deserialization error: {e}. Raw data: {message}")
            return None
        except Exception as e:
            print(f"Unknown kafka message deserialization error: {e}. Raw data: {message}")
            return None

    async def disconnect(self):
        if self.consumer:
            await self.consumer.stop()
        if self.producer:
            await self.producer.stop()

    async def send(self, topic, message, headers=None):
        await self.producer.send_and_wait(topic, message, headers=headers)

    async def consume(self):
        async for message in self.consumer:
            yield message