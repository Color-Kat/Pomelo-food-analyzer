import {MicroserviceOptions, Transport} from "@nestjs/microservices";
import {kafkaAddress} from "@app/kafka/config";

interface KafkaConsumers {
    apiGatewayService: MicroserviceOptions;
    scanService: MicroserviceOptions;
    productAnalyzerService: MicroserviceOptions;
}

const createKafkaMicroserviceOptions = (serviceName: string): MicroserviceOptions => ({
    transport: Transport.KAFKA,
    options: {
        client: {
            brokers: [kafkaAddress],
            clientId: `${serviceName}-client`,
            // retry: {
            //     initialRetryTime: 50, // Initial retry delay in milliseconds (e.g., 300ms)
            //     retries: 10, // Maximum number of retries
            //     factor: 2, // Exponential backoff factor
            //     maxRetryTime: 10000, // Maximum retry delay in milliseconds (e.g., 5 seconds)
            // }
        },
        consumer: {
            groupId: `${serviceName}-consumer`,
            sessionTimeout: 6000,
            rebalanceTimeout: 1000,
            heartbeatInterval: 500,
            allowAutoTopicCreation: true,
        },
        producer: {
            allowAutoTopicCreation: true,
        }
    },
});

export const kafkaConsumers: KafkaConsumers = {
    apiGatewayService: createKafkaMicroserviceOptions('api-gateway'),
    scanService: createKafkaMicroserviceOptions('scan'),
    productAnalyzerService: createKafkaMicroserviceOptions('product-analyzer')
};