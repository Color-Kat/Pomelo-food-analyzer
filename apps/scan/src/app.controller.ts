import {Controller, Get, Inject, OnModuleInit} from '@nestjs/common';
import { AppService } from './app.service';
import {ClientKafka, MessagePattern, Payload} from "@nestjs/microservices";

@Controller()
export class AppController implements OnModuleInit{
    constructor(
        private readonly appService: AppService,
        @Inject('KAFKA_SERVICE') private readonly kafkaService: ClientKafka,
    ) {}

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    async onModuleInit() {
        this.kafkaService.subscribeToResponseOf('scan.ping.request');
        await this.kafkaService.connect();
    }

    @MessagePattern('scan.ping.request')
    async handlePing(@Payload() data: { pingId: string; service: string }) {
        console.log('WORK!!!!');
        return { status: 'ok', service: 'scan', timestamp: Date.now() };
    }
}
