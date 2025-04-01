import {ScanCreate} from "@app/contracts";
import {ScanGetScan} from "@app/contracts/scan/scan.get-scan";
import {ScanGetScans} from "@app/contracts/scan/scan.get-scans";
import {HttpService} from "@nestjs/axios";
import {Body, Controller, Get, Inject, OnModuleInit, Param, Post, Sse} from '@nestjs/common';
import {ConfigService} from "@nestjs/config";
import {ClientKafka} from "@nestjs/microservices";
import {firstValueFrom, interval, map, Observable} from "rxjs";

@Controller('scans')
export class ScanController implements OnModuleInit {
    constructor(
        @Inject('KAFKA_SERVICE') private readonly kafkaService: ClientKafka,
        private readonly configService: ConfigService,
        private readonly httpService: HttpService
    ) {
    }

    async onModuleInit() {
        // Subscribe to response for .send method
        this.kafkaService.subscribeToResponseOf('scan.add-scan.command');
        this.kafkaService.connect();
    }

    @Sse(':id/status-updates')
    sse(@Param('id') id: string): Observable<MessageEvent> {
        console.log(id);
        return interval(1000).pipe(map((_) => ({ data: { hello: 'world' } } as any)));
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
