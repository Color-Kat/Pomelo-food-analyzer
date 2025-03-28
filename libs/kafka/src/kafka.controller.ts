import {Controller, Get, Inject, OnModuleInit} from '@nestjs/common';
import {ClientKafka} from "@nestjs/microservices";
import {catchError, firstValueFrom, timeout} from "rxjs";
import {PingContract} from "@app/kafka/ping.contract";

@Controller()
export class KafkaController implements OnModuleInit {
    private readonly services = [
        'api-gateway',
        'scan',
        'product-analyzer',
        'ingredients-recognition'
    ];

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

        const pingPromises = this.services.map(async (service) => {
            responses[service] = await firstValueFrom(
                this.kafkaService
                    .send<PingContract.Response, PingContract.Request>(
                        `${service}.ping.request`,
                        {
                            serviceName: service,
                            startTime: Date.now()
                        }
                    )
                    .pipe(
                        timeout(3000),
                        catchError(() => ['timeout 3s'])
                    )
            );
        });

        await Promise.all(pingPromises);

        return responses;
    }

    // Example of usage in microservices
    // @MessagePattern('api-gateway' + PingContract.topic)
    // async handlePing(data: PingContract.Request) {
    //     return {
    //         status: 'ok',
    //         service: data.serviceName,
    //         requestTime: Date.now() - data.startTime + 'ms'
    //     };
    // }
}
