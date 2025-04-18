import {microserviceUrls} from "@app/config";
import {IScan, ScanType} from "@app/interfaces";
import {IsArray, IsEnum, IsOptional, IsString} from 'class-validator';

export namespace ScanUpdate {
    export const url = microserviceUrls.scan + "/scans";

    export function getUrl(scanId: string): string {
        return `${url}/${scanId}`;
    }

    export class Request {
        @IsEnum(ScanType)
        @IsOptional()
        type?: ScanType;

        @IsString()
        @IsOptional()
        name?: string;

        // TODO: @IsArray of strings
        @IsOptional()
        @IsArray()
        ingredients?: string[];
    }

    export class Response {
        scan: IScan;
    }
}
