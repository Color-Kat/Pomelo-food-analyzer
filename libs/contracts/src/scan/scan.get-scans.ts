import {microserviceUrls} from "@app/config";
import {IScan} from "@app/interfaces";

export namespace ScanGetScans {
    export const url = microserviceUrls.scan + "/scans";

    export class Request {

    }

    export class Response {
        scans: IScan[];
    }
}
