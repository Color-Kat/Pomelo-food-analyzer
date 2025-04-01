import {microserviceUrls} from "@app/config";
import {IScan, ScanType} from "@app/interfaces";
import {IsEnum, IsString} from 'class-validator';

export namespace ScanCreate {
    export const url = microserviceUrls.scan + "/scans";

    export class Request {
        @IsEnum(ScanType)
        type: ScanType;

        @IsString()
        userId: string;
    }

    export class Response {
        scan: IScan;
    }
}
