from functools import wraps
import asyncio

def EventPattern(topic):
    def decorator(method):
        @wraps(method)
        async def wrapper(self, message):
            data = message.value
            if data is None:
                print(f"Пропущено пустое сообщение для топика {topic}")
                return
            result = await method(self, data)
            if result is not None:
                reply_topic = f"{topic}.reply"
                headers = message.headers
                correlation_id = next((h[1] for h in headers if h[0] == 'kafka_correlationId'), None) if headers else None
                await self.kafka_connection.send(
                    reply_topic,
                    result,
                    headers=[('kafka_correlationId', correlation_id)] if correlation_id else None
                )
                print(f"Автоматически отправлен ответ в {reply_topic}: {result}")
        wrapper._event_pattern = topic
        return wrapper
    return decorator

class ControllerMeta(type):
    def __new__(cls, name, bases, attrs):
        event_handlers = {}
        for key, value in attrs.items():
            if hasattr(value, '_event_pattern'):
                event_handlers[value._event_pattern] = value
        attrs['_event_handlers'] = event_handlers
        return super().__new__(cls, name, bases, attrs)

class BaseController(metaclass=ControllerMeta):
    def __init__(self, kafka_connection):
        self.kafka_connection = kafka_connection

    async def handle_message(self, message):
        topic = message.topic
        handler = self._event_handlers.get(topic)
        if handler:
            await handler(self, message)
        else:
            print(f"Нет обработчика для топика: {topic}")