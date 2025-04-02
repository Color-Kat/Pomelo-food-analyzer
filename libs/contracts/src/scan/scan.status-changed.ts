import {microserviceUrls} from "@app/config";
import {IScan, ScanStatus, ScanType} from "@app/interfaces";
import {IsEnum, IsString} from 'class-validator';

export namespace ScanStatusChanged {
    export const topic = "scan.status-changed.event";

    export class Request {

    }

    export class Response {
        id: string;
        status: ScanStatus;
    }
}
