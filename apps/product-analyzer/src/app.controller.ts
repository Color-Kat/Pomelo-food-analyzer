import {Controller, Get} from '@nestjs/common';
import {MessagePattern} from "@nestjs/microservices";
import {PingContract} from "@app/kafka";

@Controller()
export class AppController {

    @MessagePattern('product-analyzer' + PingContract.topic)
    async handlePing(data: PingContract.Request) {
        return {
            status: 'ok',
            service: data.serviceName,
            requestTime: Date.now() - data.startTime + 'ms'
        };
    }

    @Get()
    getHello(): string {
        return "Hi there!";
    }
}
