import {MicroserviceOptions, Transport} from "@nestjs/microservices";
import {kafkaAddress} from "@app/kafka/config";

interface KafkaConsumers {
    apiGatewayService: MicroserviceOptions;
    scanService: MicroserviceOptions;
    productAnalyzerService: MicroserviceOptions;
}

export const kafkaConsumers: KafkaConsumers = {
    apiGatewayService: {
        transport: Transport.KAFKA,
        options: {
            client: {
                brokers: [kafkaAddress],
                // clientId: `api-gateway-producer`
                // connectionTimeout: 50000,
                // requestTimeout: 10000,
                // retry: {
                //     initialRetryTime: 100, // Начальное время ожидания перед повторной попыткой (мс)
                //     retries: 10,          // Количество повторных попыток
                // },
            },
            consumer: {
                groupId: 'api-gateway-consumer',
            },
            producer: {
                allowAutoTopicCreation: true,
            }
        },
    },
    scanService: {
        transport: Transport.KAFKA,
        options: {
            client: {
                brokers: [kafkaAddress],
                clientId: `scan-producer`

                // connectionTimeout: 50000,
                // requestTimeout: 10000,
            },
            consumer: {
                groupId: 'scan-consumer',
            },
        },
    },
    productAnalyzerService: {
        transport: Transport.KAFKA,
        options: {
            client: {
                brokers: [kafkaAddress],
            },
            consumer: {
                groupId: 'product-analyzer-consumer',
            },
        },
    }
};