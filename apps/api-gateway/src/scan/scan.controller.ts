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

    // Switch to POST
    // async addNewScan(@Body() body: { type: string }) {
    @Get()
    async addNewScan() {
        const body = {
            type: ScanType.FOOD
        };

        // redirect request to scan service
        // TODO handle errors
        const response = await firstValueFrom(
            this.httpService.post<ScanCreate.Response, any>(
                microserviceUrls.scan + "/scan",
                body
            )
            //     .pipe(
            //     catchError((error: AxiosError) => {
            //         // Извлекаем детали ошибки из ответа микросервиса
            //         const errorResponse = error.response?.data;
            //         throw new BadRequestException(
            //             errorResponse || 'Something went wrong',
            //         );
            //     }),
            // ),
        );

        return response.data;
    }
}
