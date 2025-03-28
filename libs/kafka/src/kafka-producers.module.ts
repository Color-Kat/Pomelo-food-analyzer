import {Module} from '@nestjs/common';
import {ClientsModule, Transport} from "@nestjs/microservices";

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'KAFKA_SERVICE',
                transport: Transport.KAFKA,
                options: {
                    client: {
                        clientId: 'kafka-producer',
                        brokers: ['kafka:9092'],
                    },
                    producerOnlyMode: true,
                },
            },
            {
                name: 'SCAN_SERVICE',
                transport: Transport.KAFKA,
                options: {
                    client: {
                        clientId: 'api-gateway-producer',
                        brokers: ['kafka:9092'],
                    },
                    producerOnlyMode: true,
                },
            },
            {
                name: 'API_GATEWAY_SERVICE',
                transport: Transport.KAFKA,
                options: {
                    client: {
                        clientId: 'scan-producer',
                        brokers: ['kafka:9092'],
                    },
                    producerOnlyMode: true,
                },
            },
        ]),
    ],
    exports: [ClientsModule],
})
export class KafkaProducersModule {}
