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
                clientId: `api-gateway-client`,
                // connectionTimeout: 50000,
                // requestTimeout: 10000,
                retry: {
                    initialRetryTime: 100, // Initial retry delay in milliseconds (e.g., 300ms)
                    retries: 15, // Maximum number of retries
                    factor: 1, // Exponential backoff factor
                    maxRetryTime: 100000, // Maximum retry delay in milliseconds (e.g., 5 seconds)

                }
                // retry: {
                //     initialRetryTime: 100, // Начальное время ожидания перед повторной попыткой (мс)
                //     retries: 10,          // Количество повторных попыток
                // },
            },
            consumer: {
                groupId: 'api-gateway-consumer',
            },
            // producer: {
            //     allowAutoTopicCreation: true,
            //     retry: {
            //         retries: 20
            //     }
            // }
        },
    },
    scanService: {
        transport: Transport.KAFKA,
        options: {
            client: {
                brokers: [kafkaAddress],
                clientId: `scan-client`,

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
                clientId: `product-analyzer-client`
            },
            consumer: {
                groupId: 'product-analyzer-consumer',
            },
        },
    }
};