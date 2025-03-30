import {IsEnum} from 'class-validator';
import {ScanType} from "@app/interfaces";

export namespace ScanAddScan {
    // export const topic = "scan.add-scan.command";

    export class Request {
        @IsEnum(ScanType)
        type: ScanType;
    }

    export class Response {
        result: string;
    }
}
