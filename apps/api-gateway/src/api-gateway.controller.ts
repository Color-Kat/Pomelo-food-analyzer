import {Controller, Get, Inject, OnModuleInit} from '@nestjs/common';
import {ApiGatewayService} from './api-gateway.service';
import {ClientKafka, MessagePattern} from "@nestjs/microservices";
import {firstValueFrom} from "rxjs";

@Controller()
export class ApiGatewayController implements OnModuleInit{
    constructor(
        private readonly apiGatewayService: ApiGatewayService,
        @Inject('SCAN_SERVICE') private readonly scanService: ClientKafka,
    ) {
    }

    async onModuleInit() {
        this.scanService.subscribeToResponseOf('ping.response');
        await this.scanService.connect();
    }

    @MessagePattern('ping.response')
    async pingResult() {
        console.log('RESPONSE!!!!!');
    }

    @Get('ping')
    async pingMicroservices() {
        // const services = ['account', 'scan', 'ingredients-recognition', 'product-analyzer'];
        const services = ['scan'];
        const pingId = Date.now().toString();
        const responses = {};

        // Emit ping to all services
        // services.forEach(service =>
        this.scanService.emit('ping.request', { pingId, service: 'scan' })
        // );

        // Collect responses with a timeout
        const timeout = 5000; // 5 seconds
        await new Promise(resolve => setTimeout(resolve, timeout));

        for (const service of services) {
            const response = await firstValueFrom(
                this.scanService.send('ping.response', { pingId, service })
            ).catch(() => ({ status: 'timeout' }));
            responses[service] = response?.status || 'timeout';
        }

        return responses;
    }

    @Get()
    getHello(): string {
        return this.apiGatewayService.getHello();
    }
}
