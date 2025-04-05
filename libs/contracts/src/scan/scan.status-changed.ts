import {ScanStatus} from "@app/interfaces";

export namespace ScanStatusChanged {
    export const topic = "scan.status-changed.event";

    export class Payload {
        scanId: string;
        status: ScanStatus;
    }
}
