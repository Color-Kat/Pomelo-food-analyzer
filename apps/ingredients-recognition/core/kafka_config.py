import os
from dataclasses import dataclass

@dataclass
class KafkaConfig:
    bootstrap_servers: str = os.getenv("KAFKA_BROKER", "localhost:9092")
    group_id: str = "ingredients-recognition-group"
    auto_offset_reset: str = "latest"
    enable_auto_commit: bool = True
    client_id: str = "ingredients-recognition-client"