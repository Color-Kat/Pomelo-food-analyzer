import { Module } from '@nestjs/common';
import { ApiGatewayController } from './api-gateway.controller';
import { ApiGatewayService } from './api-gateway.service';
import {KafkaModule} from "@app/kafka";
import {ClientsModule, Transport} from "@nestjs/microservices";

@Module({
    imports: [
        KafkaModule.register('api-gateway'),
    ],
    controllers: [ApiGatewayController],
    providers: [ApiGatewayService],
})
export class ApiGatewayModule {}
