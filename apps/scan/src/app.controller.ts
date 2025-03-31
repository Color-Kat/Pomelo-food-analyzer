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

    @MessagePattern('scan' + PingContract.topic)
    async handlePing(data: PingContract.Request) {
        return {
            status: 'ok!',
            service: data.serviceName,
            requestTime: Date.now() - data.startTime + 'ms'
        };
    }

    @MessagePattern('scan.add-scan.command')
    async addNewScan(data: any) {
        console.log("data received", data);
        return {
            scan: {
                id: 'sha256:ovnskdq5dn',
                type: data.scan.type,
                ingredients: [],
            }
        }
    }

    @Get()
    getHello(): string {
        console.log(this.configService.get('DATABASE_URL'))

        return this.appService.getHello();
    }
}
