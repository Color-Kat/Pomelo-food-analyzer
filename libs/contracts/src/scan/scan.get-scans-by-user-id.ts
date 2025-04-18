import {microserviceUrls} from "@app/config";
import {IScan} from "@app/interfaces";

export namespace ScanGetScansByUserId {
    export const url = microserviceUrls.scan + "/scans/user";

    export function getUrl(userId: string): string {
        return `${url}/${userId}`;
    }

    export class Request {

    }

    export class Response {
        scans: IScan[];
    }
}
