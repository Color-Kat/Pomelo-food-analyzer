import {Controller, Get, Inject, OnModuleInit} from '@nestjs/common';
import {ApiGatewayService} from './api-gateway.service';
import {ClientKafka, MessagePattern} from "@nestjs/microservices";
import {catchError, firstValueFrom, timeout} from "rxjs";

@Controller()
export class ApiGatewayController implements OnModuleInit{
    constructor(
        private readonly apiGatewayService: ApiGatewayService,
        @Inject('KAFKA_SERVICE') private readonly kafkaService: ClientKafka,
    ) {
    }

    async onModuleInit() {
        this.kafkaService.subscribeToResponseOf('ping.response');
        this.kafkaService.subscribeToResponseOf('scan.ping.request');
        await this.kafkaService.connect();
    }

    @MessagePattern('ping.response')
    async pingResult() {
        console.log('RESPONSE!!!!!');
    }

    @Get('ping')
    async pingMicroservices(): Promise<any> {
        const services = ['scan', 'api-gateway'];
        const responses = {};

        console.log('ping microservices...');
        this.kafkaService.send(`scan.ping.request`, {ping: "test"})

        const pingPromises = services.map((service) => {
            return firstValueFrom(
                this.kafkaService
                    .send(`${service}.ping.request`, {})
                    .pipe(
                        timeout(5000), // Тайм-аут 3 секунды на каждый ответ
                        catchError(() => ['timeout 5s']) // Возвращаем 'timeout' при отсутствии ответа
                    )
            ).then((response) => {
                responses[service] = response;
            });
        });

        await Promise.all(pingPromises);

        console.log('ping microservices done');

        return responses;
    }

    @Get()
    getHello(): string {
        return this.apiGatewayService.getHello();
    }
}
