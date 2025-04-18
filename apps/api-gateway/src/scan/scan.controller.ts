import {ScanService} from "@api-gateway/scan/scan.service";
import {ScanCreate, ScanUpdate} from "@app/contracts";
import {ScanStatusChanged} from "@app/contracts/scan/scan.status-changed";
import {HttpService} from "@nestjs/axios";
import {Body, Controller, Get, Inject, OnModuleInit, Param, Patch, Post, Req, Sse} from '@nestjs/common';
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

    @Get("/user/:userId")
    getScansByUserId(@Param('userId') userId: string) {
        return this.scanService.getScansByUserId(userId);
    }

    // @Post()
    // async create(@Body() body: ScanCreate.Request) {
    //     return this.scanService.create(body);
    // }

    @Post()
    async create(@Req() request: Request): Promise<ScanCreate.Response> {
        return this.scanService.create(request);
    }

    @Patch('/:scanId')
    async update(
        @Param('scanId') scanId: string,
        @Body() updateScanDto: ScanUpdate.Request
    ): Promise<ScanUpdate.Response> {
        return this.scanService.update(scanId, updateScanDto);
    }
}
