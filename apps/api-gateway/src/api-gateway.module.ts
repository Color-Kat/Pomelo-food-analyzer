import { Module } from '@nestjs/common';
import { ApiGatewayController } from './api-gateway.controller';
import { ApiGatewayService } from './api-gateway.service';
import {KafkaProducersModule} from "@app/kafka";
import {ClientsModule, Transport} from "@nestjs/microservices";

@Module({
    imports: [
        KafkaProducersModule.register('api-gateway-producer'),
    ],
    controllers: [ApiGatewayController],
    providers: [ApiGatewayService],
})
export class ApiGatewayModule {}
