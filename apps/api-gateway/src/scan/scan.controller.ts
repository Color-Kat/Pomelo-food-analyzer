import {ScanService} from "@api-gateway/scan/scan.service";
import {ScanCreate} from "@app/contracts";
import {ScanStatusChanged} from "@app/contracts/scan/scan.status-changed";
import {HttpService} from "@nestjs/axios";
import {Controller, Get, Inject, OnModuleInit, Param, Post, Req, Sse} from '@nestjs/common';
import {ConfigService} from "@nestjs/config";
import {ClientKafka, EventPattern} from "@nestjs/microservices";
import {firstValueFrom} from "rxjs";

@Controller('scans')
export class ScanController implements OnModuleInit {
    constructor(
        @Inject('KAFKA_SERVICE') private readonly kafkaService: ClientKafka,
        private readonly configService: ConfigService,
        private readonly httpService: HttpService,
        private readonly scanService: ScanService
    ) {
    }

    async onModuleInit() {
        // Subscribe to response for .send method
        this.kafkaService.subscribeToResponseOf('scan.add-scan.command');
        this.kafkaService.connect();
    }

    @Sse(':id/status-updates')
    sse(@Param('id') id: string) {
        return this.scanService.streamScanStatus(id);
    }

    @EventPattern(ScanStatusChanged.topic)
    handleOrderStatusChanged(data: ScanStatusChanged.Payload) {
        this.scanService.handleScanStatusChanged(data);
    }

    @Get()
    getAll() {
        this.kafkaService.emit('scan.photo-submitted.event', { hello: 'hi' });
        return this.scanService.getAll();
    }

    @Get("/:id")
    getOne(@Param('id') id: string) {
        return this.scanService.getOne(id);
    }

    // @Post()
    // async create(@Body() body: ScanCreate.Request) {
    //     return this.scanService.create(body);
    // }

    @Post()
    async create(@Req() request: Request) {
        const response = await firstValueFrom(
            this.httpService.post(
                ScanCreate.url,
                request,
                {
                    headers: request.headers as any,
                    responseType: 'json',
                },
            )
        );

        return response.data;
    }
}
