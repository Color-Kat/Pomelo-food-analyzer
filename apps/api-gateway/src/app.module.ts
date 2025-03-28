import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {KafkaModule} from "@app/kafka";
import {ClientsModule, Transport} from "@nestjs/microservices";

@Module({
    imports: [
        KafkaModule.register('api-gateway'),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
