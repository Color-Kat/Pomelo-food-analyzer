import {Controller, Get, Inject, OnModuleInit} from '@nestjs/common';
import { AppService } from './app.service';
import {ClientKafka, MessagePattern, Payload} from "@nestjs/microservices";

@Controller()
export class AppController implements OnModuleInit{
    constructor(
        private readonly appService: AppService,
        @Inject('API_GATEWAY_SERVICE') private readonly apiGatewayClient: ClientKafka,
    ) {}

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    async onModuleInit() {
        this.apiGatewayClient.subscribeToResponseOf('ping.request');
        await this.apiGatewayClient.connect();
    }

    @MessagePattern('ping.request')
    async handlePing(@Payload() data: { pingId: string; service: string }) {
        console.log('WORK!!!!');
        // if (data.service === 'scan') {
        this.apiGatewayClient.emit('ping.response', { pingId: data.pingId, service: 'scan', status: 'ok' });
        this.apiGatewayClient.emit('test.request', { test: 123 });
        // }
    }
}
