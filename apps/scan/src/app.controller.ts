import {Controller, Get, Inject, OnModuleInit} from '@nestjs/common';
import {AppService} from './app.service';
import {ClientKafka, MessagePattern, Payload} from "@nestjs/microservices";

@Controller()
export class AppController {
    constructor(
        private readonly appService: AppService,
        @Inject('KAFKA_SERVICE') private readonly kafkaService: ClientKafka,
    ) {
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
