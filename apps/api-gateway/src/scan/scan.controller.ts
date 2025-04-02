import {ScanCreate} from "@app/contracts";
import {ScanGetScan} from "@app/contracts/scan/scan.get-scan";
import {ScanGetScans} from "@app/contracts/scan/scan.get-scans";
import {HttpService} from "@nestjs/axios";
import {Body, Controller, Get, Inject, OnModuleInit, Param, Post, Sse} from '@nestjs/common';
import {ConfigService} from "@nestjs/config";
import {ClientKafka, EventPattern} from "@nestjs/microservices";
import {firstValueFrom, interval, map, Observable, Subject} from "rxjs";
import {ScanService} from "@api-gateway/scan/scan.service";
import {ScanStatusChanged} from "@app/contracts/scan/scan.status-changed";
import {ScanStatus} from "@app/interfaces";

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
        // return interval(1000).pipe(map((_) => ({ data: { hello: 'world' } } as any)));
        const subject = new Subject<any>();

        // Register this subject to receive updates for the given orderId
        this.scanService.registerClient(id, subject);

        return subject.asObservable();
    }

    @EventPattern(ScanStatusChanged.topic)
    handleOrderStatusChanged(data: ScanStatusChanged.Response) {
        this.scanService.handleOrderStatusChanged(data);
    }

    @Get()
    async getAll() {
        // Redirect request to scan service
        const response = await firstValueFrom(
            this.httpService.get<
                ScanGetScans.Response,
                ScanGetScans.Request
            >(ScanGetScans.url)
        );

        return response.data;
    }

    @Get("/:id")
    async getOne(@Param('id') id: string) {
        // Redirect request to scan service
        const response = await firstValueFrom(
            this.httpService.get<
                ScanGetScan.Response,
                ScanGetScan.Request
            >(ScanGetScan.getUrl(id))
        );

        return response.data;
    }

    @Post()
    async create(@Body() body: ScanCreate.Request) {
        // Redirect request to scan service
        const response = await firstValueFrom(
            this.httpService.post<ScanCreate.Response, ScanCreate.Request>(
                ScanCreate.url,
                body
            )
        );

        return response.data;
    }
}
