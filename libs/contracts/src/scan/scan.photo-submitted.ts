import {microserviceUrls} from "@app/config";
import {IScan, ScanStatus, ScanType} from "@app/interfaces";
import {IsEnum, IsString} from 'class-validator';

export namespace ScanPhotoSubmitted {
    export const topic = "scan.photo-submitted.event";

    export class Request {
        scanId: string;
        photoUrl: string;
    }

    export class Response {

    }
}
