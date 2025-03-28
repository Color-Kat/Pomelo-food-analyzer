import {Controller, Get, Inject, Injectable, OnModuleInit} from '@nestjs/common';
import {ClientKafka, EventPattern, MessagePattern, Payload} from "@nestjs/microservices";
import {catchError, firstValueFrom, timeout} from "rxjs";

interface PingRequest {
    serviceName: string;
    startTime: number;
}

@Controller()
export class KafkaController implements OnModuleInit{
    private readonly services = ['api-gateway', 'scan', 'product-analyzer', 'ingredients-recognition'];

    constructor(
        @Inject('KAFKA_SERVICE') private readonly kafkaService: ClientKafka,
    ) {}

    async onModuleInit() {
        // Subscribe to response for .send method
        this.services.forEach((service) => {
            this.kafkaService.subscribeToResponseOf(service + '.ping.request');
        });
        await this.kafkaService.connect();
    }

    @Get('ping')
    async pingMicroservices(): Promise<any> {
        const responses = {};

        const pingPromises = this.services.map((service) => {
            return firstValueFrom(
                this.kafkaService
                    .send(`${service}.ping.request`, {
                        serviceName: service,
                        startTime: Date.now()
                    })
                    .pipe(
                        timeout(5000),
                        catchError(() => ['timeout 5s'])
                    )
            ).then((response) => {
                responses[service] = response;
            });
        });

        await Promise.all(pingPromises);

        return responses;
    }

    async handlePing(data: PingRequest) {
        return {
            status: 'ok',
            service: data.serviceName,
            requestTime: Date.now() - data.startTime + 'ms'
        };
    }

    @MessagePattern('api-gateway.ping.request')
    handleApiGatewayPing(@Payload() data: PingRequest) {
        return this.handlePing(data);
    }

    @MessagePattern('scan.ping.request')
    handleScanPing(@Payload() data: PingRequest) {
        return this.handlePing(data);
    }

    @MessagePattern('product-analyzer.ping.request')
    handleProductAnalyzerPing(@Payload() data: PingRequest) {
        return this.handlePing(data);
    }

    @MessagePattern('ingredients-recognition.ping.request')
    handleIngredientsRecognitionPing(@Payload() data: PingRequest) {
        return this.handlePing(data);
    }
}
