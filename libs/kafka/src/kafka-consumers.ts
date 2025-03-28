import {MicroserviceOptions, Transport} from "@nestjs/microservices";

interface KafkaConsumers {
    apiGatewayService: MicroserviceOptions;
    scanService: MicroserviceOptions;
}

export const kafkaConsumers: KafkaConsumers = {
    apiGatewayService: {
        transport: Transport.KAFKA,
        options: {
            client: {
                brokers: ['kafka:9092'],
            },
            consumer: {
                groupId: 'api-gateway-consumer',
            },
        },
    },
    scanService: {
        transport: Transport.KAFKA,
        options: {
            client: {
                brokers: ['kafka:9092'],
            },
            consumer: {
                groupId: 'scan-consumer',
            },
        },
    }
};