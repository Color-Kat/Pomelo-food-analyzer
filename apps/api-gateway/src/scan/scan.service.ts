import {ScanCreate, ScanGetScansByUserId, ScanIngredientsChanged, ScanPhotoSubmitted, ScanUpdate} from "@app/contracts";
import {ScanGetScan} from "@app/contracts/scan/scan.get-scan";
import {ScanGetScans} from "@app/contracts/scan/scan.get-scans";
import {ScanStatusChanged} from "@app/contracts/scan/scan.status-changed";
import {ScanStatus} from "@app/interfaces";
import {HttpService} from "@nestjs/axios";
import {Injectable, NotFoundException} from '@nestjs/common';
import {finalize, firstValueFrom, Subject} from "rxjs";
import {ScanEntity} from "@scan/scan/scan.entity";

// type ScanStatusChangedEvent =

export type ScanStatusChangedEventSubject = Subject<{
    event: typeof ScanStatusChanged.topic,
    data: ScanStatusChanged.Payload,
}>

@Injectable()
export class ScanService {
    private sseClients: Map<string, ScanStatusChangedEventSubject> = new Map();

    constructor(
        private readonly httpService: HttpService,
    ) {
    }

    registerSseClient(scanId: string, subject: ScanStatusChangedEventSubject) {
        this.sseClients.set(scanId, subject);
    }

    handleScanStatusChanged(data: ScanStatusChanged.Payload) {
        const { scanId, status } = data;
        const clientSubject = this.sseClients.get(scanId);

        if (clientSubject) {
            clientSubject.next({
                event: ScanStatusChanged.topic,
                data: data
            });

            // Close the connection if the scan is completed
            if (status === ScanStatusChanged.StatusEnum.COMPLETED) {
                clientSubject.complete();
            }
        }
    }

    async streamScanStatus(scanId: string) {
        // Check if the scan exists
        const scan = await this.getOne(scanId);
        if (!scan) throw new NotFoundException("Scan not found");

        // Create subject to stream scan status updates
        const subject: ScanStatusChangedEventSubject = new Subject();

        // Register this subject to receive updates for the given orderId
        this.registerSseClient(scanId, subject);

        // Timeout for SSE connection
        const timeout = setTimeout(() => {
            subject.complete();
        }, 60 * 1000);

        return subject.asObservable().pipe(
            finalize(() => {
                this.sseClients.delete(scanId);
                clearTimeout(timeout);
            })
        );
    }

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

    async getOne(scanId: string) {
        // Redirect request to scan service
        const response = await firstValueFrom(
            this.httpService.get<
                ScanGetScan.Response,
                ScanGetScan.Request
            >(ScanGetScan.getUrl(scanId))
        );

        return response.data;
    }

    async getScansByUserId(userId: string) {
        // Redirect request to scan service
        const response = await firstValueFrom(
            this.httpService.get<
                ScanGetScansByUserId.Response,
                ScanGetScansByUserId.Request
            >(ScanGetScansByUserId.getUrl(userId))
        );

        return response.data;
    }

    async create(request: Request) {
        // Redirect request (with image form data)
        const response = await firstValueFrom(
            this.httpService.post<ScanCreate.Response>(
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

    async update(scanId: string, updateScanDto: ScanUpdate.Request) {
        // Redirect request to scan service
        const response = await firstValueFrom(
            this.httpService.patch<
                ScanUpdate.Response,
                ScanUpdate.Request
            >(
                ScanUpdate.getUrl(scanId),
                updateScanDto
            )
        );

        return response.data;
    }
}
