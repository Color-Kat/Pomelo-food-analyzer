import {kafkaAddress} from "@app/kafka/config";
import {KafkaOptions, MicroserviceOptions, Transport} from "@nestjs/microservices";

interface KafkaConsumers {
    apiGatewayService: MicroserviceOptions;
    scanService: MicroserviceOptions;
    productAnalyzerService: MicroserviceOptions;
}

const createKafkaMicroserviceOptions = (serviceName: string): KafkaOptions => ({
    transport: Transport.KAFKA,
    options: {
        client: {
            brokers: [kafkaAddress],
            clientId: `${serviceName}-client`,
            // retry: {
            //     initialRetryTime: 1500, // Initial retry delay in milliseconds (e.g., 300ms)
            //     // retries: 10,         // Maximum number of retries
            //     // factor: 2,           // Exponential backoff factor
            //     maxRetryTime: 35000,    // Maximum retry delay in milliseconds (e.g., 5 seconds)
            // },
            connectionTimeout: 35000,

            // retry: {
                // initialRetryTime: 1000, // Initial delay in ms
                // retries: 5, // Number of retries
                // Runs if all retries are failed
                // restartOnFailure: async (e) => {
                //     return false;
                // },
            // },
        },
        consumer: {
            groupId: `${serviceName}-consumer`,
            sessionTimeout: 6000,
            rebalanceTimeout: 1000,
            heartbeatInterval: 500,
            allowAutoTopicCreation: true,
            // retry: {
            //     retries: 2,
            //     initialRetryTime: 10000
            // //     restartOnFailure: async (e) => {
            // //     console.log("HERE:", e)
            // //     return false;
            // // },
            // }
        },
        producer: {
            allowAutoTopicCreation: true,
        },
    },
});

export const kafkaConsumers: KafkaConsumers = {
    apiGatewayService: createKafkaMicroserviceOptions('api-gateway'),
    scanService: createKafkaMicroserviceOptions('scan'),
    productAnalyzerService: createKafkaMicroserviceOptions('product-analyzer')
};