import {Controller, Get, Inject, OnModuleInit} from '@nestjs/common';
import {AppService} from './app.service';
import {ClientKafka, MessagePattern} from "@nestjs/microservices";
import {PingContract} from "@app/kafka";
import {ConfigService} from "@nestjs/config";

@Controller()
export class AppController {
    constructor(
        private readonly apiGatewayService: AppService,
        @Inject('KAFKA_SERVICE') private readonly kafkaService: ClientKafka,
        private readonly configService: ConfigService,
        // private readonly kafkaService: ClientKafka,
    ) {
    }
    @MessagePattern('api-gateway' + PingContract.topic)
    async handlePing(data: PingContract.Request) {
        return {
            status: 'ok',
            service: data.serviceName,
            requestTime: Date.now() - data.startTime + 'ms'
        };
    }

    @Get()
    getHello(): string {
        console.log(this.configService.get('KAFKA_BROKER'));
        return this.apiGatewayService.getHello();
    }
}
