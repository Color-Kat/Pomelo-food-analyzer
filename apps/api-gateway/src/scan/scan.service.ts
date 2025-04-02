import { Injectable } from '@nestjs/common';
import {Subject} from "rxjs";
import {EventPattern} from "@nestjs/microservices";
import {ScanStatusChanged} from "@app/contracts/scan/scan.status-changed";
import {ScanStatus} from "@app/interfaces";

export type ScanStatusChangedEventSubject = Subject<{
    event: typeof ScanStatusChanged.topic,
    data: ScanStatusChanged.Response,
}>

@Injectable()
export class ScanService {
    private clients: Map<string, ScanStatusChangedEventSubject> = new Map();

    registerClient(scanId: string, subject: ScanStatusChangedEventSubject) {
        this.clients.set(scanId, subject);
        console.log(this.clients);
    }

    handleOrderStatusChanged(data: ScanStatusChanged.Response) {
        const { id: scanId, status } = data;
        const clientSubject = this.clients.get(scanId);

        if (clientSubject) {
            clientSubject.next({
                event: ScanStatusChanged.topic,
                data: data
            });

            // Close the connection if the scan is completed
            if (status === ScanStatus.COMPLETED) {
                clientSubject.complete();
                this.clients.delete(scanId);
            }
        }
    }
}
