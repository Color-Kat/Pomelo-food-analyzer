import {Controller, Get, Inject, OnModuleInit} from '@nestjs/common';
import {AppService} from './app.service';
import {ClientKafka, MessagePattern, Payload} from "@nestjs/microservices";
import {PingContract} from "@app/kafka";

@Controller()
export class AppController {
    constructor(
        private readonly appService: AppService,
        @Inject('KAFKA_SERVICE') private readonly kafkaService: ClientKafka,
    ) {
    }

    @MessagePattern('scan' + PingContract.topic)
    async handlePing(data: PingContract.Request) {
        return {
            status: 'ok',
            service: data.serviceName,
            requestTime: Date.now() - data.startTime + 'ms'
        };
    }

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    // @MessagePattern('scan.ping.request')
    // async handlePing(@Payload() data: { startTime: number }) {
    //     return {
    //         status: 'ok',
    //         service: 'scan',
    //         requestTime: Date.now() - data.startTime + 'ms'
    //     };
    // }
}
