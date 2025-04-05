import {microserviceUrls} from "@app/config";
import {IScan, ScanType} from "@app/interfaces";
import {IsEnum, IsOptional, IsString} from 'class-validator';

export namespace ScanCreate {
    export const url = microserviceUrls.scan + "/scans";

    export class Request {
        @IsEnum(ScanType)
        type: ScanType;

        @IsString()
        userId: string;

        // Just for documentation
        // `photo` must be passed in FormData, but validation is in FileInterceptor
        @IsOptional()
        photo?: Express.Multer.File;
    }

    export class Response {
        scan: IScan;
    }
}
