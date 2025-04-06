import {ScanType} from "@app/interfaces";

export namespace ScanPhotoSubmitted {
    export const topic = "scan.photo-submitted.event";

    export class Payload {
        scanId: string;
        type: ScanType;
        photoUrl: string;
    }
}
