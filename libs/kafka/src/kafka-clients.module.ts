import {Module} from '@nestjs/common';
import {ClientsModule, Transport} from "@nestjs/microservices";

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'API_GATEWAY_SERVICE',
                transport: Transport.KAFKA,
                options: {
                    client: {
                        brokers: ['kafka:9092'],
                    },
                    consumer: {
                        groupId: 'api-gateway-group',
                    },
                },
            },
            {
                name: 'SCAN_SERVICE',
                transport: Transport.KAFKA,
                options: {
                    client: {
                        brokers: ['kafka:9092'],
                    },
                    consumer: {
                        groupId: 'scan-group',
                    },
                },
            },
        ]),
    ],
    exports: [ClientsModule],
})
export class KafkaClientsModule {}
