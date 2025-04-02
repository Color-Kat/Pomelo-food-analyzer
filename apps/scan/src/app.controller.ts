import {PingContract} from "@app/kafka";
import {Controller, Get, Inject} from '@nestjs/common';
import {ConfigService} from "@nestjs/config";
import {ClientKafka, MessagePattern} from "@nestjs/microservices";
import {AppService} from './app.service';

@Controller()
export class AppController {
    constructor(
        private readonly appService: AppService,
        @Inject('KAFKA_SERVICE') private readonly kafkaService: ClientKafka,
        private readonly configService: ConfigService,
    ) {
    }

    @MessagePattern(PingContract.getTopic('scan'))
    async handlePing(data: PingContract.Request) {
        return {
            status: 'ok!',
            service: data.serviceName,
            requestTime: Date.now() - data.startTime + 'ms'
        };
    }

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }
}
