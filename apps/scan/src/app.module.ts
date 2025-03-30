import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {KafkaModule} from "@app/kafka";
import {ClientsModule, Transport} from "@nestjs/microservices";
import {ConfigModule} from "@app/config";

@Module({
    imports: [
        KafkaModule.register('scan'),
        ConfigModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
