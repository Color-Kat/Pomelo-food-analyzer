import {IsEnum} from 'class-validator';

export enum ScanType {
    FOOD = 'food',
    COSMETIC = 'cosmetic',
}

export namespace ScanAddScan {
    export const topic = "scan.add-scan.command";

    export class Request {
        @IsEnum(ScanType)
        type: ScanType;
    }

    export class Response {
        result: string;
    }
}
