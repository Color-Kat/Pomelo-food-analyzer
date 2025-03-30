import {Controller, Get, Inject, OnModuleInit} from '@nestjs/common';
import {ClientKafka} from "@nestjs/microservices";
import {catchError, firstValueFrom} from "rxjs";
import {ConfigService} from "@nestjs/config";
import {HttpService} from "@nestjs/axios";
import {microserviceUrls} from "@app/config";
import {ScanCreate} from "@app/contracts";
import {ScanType} from "@app/interfaces";

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

    // Switch to POST
    // async addNewScan(@Body() body: { type: string }) {
    @Get()
    async addNewScan() {
        const body = {
            type: ScanType.FOOD+'asdf'
        };

        // redirect request to scan service
        // TODO handle errors
        const response = await firstValueFrom(
            this.httpService.post<ScanCreate.Response, any>(
                microserviceUrls.scan + "/scan",
                body
            )
        );

        return response.data;
    }
}
