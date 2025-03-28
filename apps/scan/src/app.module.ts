import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {KafkaModule} from "@app/kafka";
import {ClientsModule, Transport} from "@nestjs/microservices";

@Module({
    imports: [
        KafkaModule.register('scan'),
        // ClientsModule.register([
        //     {
        //         name: 'API_GATEWAY_SERVICE',
        //         transport: Transport.KAFKA,
        //         options: {
        //             client: {
        //                 brokers: ['kafka:9092'],
        //             },
        //             consumer: {
        //                 groupId: 'api-gateway-group',
        //             },
        //         },
        //     }
        // ]),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
