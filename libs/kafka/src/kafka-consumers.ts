import {Transport} from "@nestjs/microservices";

export const kafkaConsumers = {
    apiGatewayService: {
        name: 'API_GATEWAY_SERVICE',
        transport: Transport.KAFKA,
        options: {
            client: {
                clientId: 'scan-producer',
                brokers: ['kafka:9092'],
            },
            producerOnlyMode: true,
        }
    },
    scanService: {
        name: 'SCAN_SERVICE',
        transport: Transport.KAFKA,
        options: {
            client: {
                clientId: 'api-gateway-producer',
                brokers: ['kafka:9092'],
            },
            producerOnlyMode: true,
        },
    }
};