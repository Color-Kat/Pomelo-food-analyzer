import {microserviceUrls} from "@app/config";
import {ScanCreate} from "@app/contracts";
import {ScanType} from "@app/interfaces";
import {HttpService} from "@nestjs/axios";
import {Controller, Get, Inject, OnModuleInit} from '@nestjs/common';
import {ConfigService} from "@nestjs/config";
import {ClientKafka} from "@nestjs/microservices";
import {firstValueFrom} from "rxjs";

@Controller('scan')
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

    @Get()
    async getAllScans() {
        // Redirect request to scan service
        const response = await firstValueFrom(
            this.httpService.get(microserviceUrls.scan + "/scan")
        );

        return response.data;
    }

    // TODO: Switch to POST
    // async addNewScan(@Body() body: { type: string }) {
    @Get('/add')
    async addNewScan() {
        const body = {
            type: ScanType.FOOD
        };

        // Redirect request to scan service
        const response = await firstValueFrom(
            this.httpService.post<ScanCreate.Response, any>(
                microserviceUrls.scan + "/scan",
                body
            )
        );

        return response.data;
    }
}
