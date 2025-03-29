import {Controller, Get, Inject, OnModuleInit} from '@nestjs/common';
import {ClientKafka, MessagePattern} from "@nestjs/microservices";
import {catchError, firstValueFrom, timeout} from "rxjs";

@Controller('scan')
export class ScanController implements OnModuleInit {
    constructor(
        @Inject('KAFKA_SERVICE') private readonly kafkaService: ClientKafka
    ) {
    }

    async onModuleInit() {
        // Subscribe to response for .send method
        this.kafkaService.subscribeToResponseOf('scan.add-scan.command');
        this.kafkaService.connect();
    }

    @Get()
    async addNewScan() {
        const result = await firstValueFrom(
            this.kafkaService.send(
                'scan.add-scan.command',
                {
                    scan: {
                        type: 'food'
                    }
                }
            ));

        console.log('New scan created successfully:', result);
    }

    @MessagePattern('scan.scan-processed')
    async scanProcessed(data: any) {
        console.log('scan processed:', data)
    }
}
