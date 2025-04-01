import {microserviceUrls} from "@app/config";
import {IScan} from "@app/interfaces";

export namespace ScanGetScan {
    export const url = microserviceUrls.scan + "/scans";

    export function getUrl(id: string): string {
        return `${url}/${id}`;
    }

    export class Request {

    }

    export class Response {
        scan: IScan;
    }
}
