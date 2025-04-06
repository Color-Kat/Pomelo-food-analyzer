export namespace ScanStatusChanged {
    export const topic = "scan.status-changed.event";

    export enum StatusEnum {
        CREATED = 'created',
        RECOGNITION_PENDING = 'recognition_pending',
        RECOGNIZING = 'recognizing',
        RECOGNITION_FAILED = 'recognition_failed',
        RECOGNIZED = 'recognized',
        // INGREDIENTS_SAVED = 'ingredients_saved',
        ANALYSIS_PENDING = 'analysis_pending',
        ANALYZING = 'analyzing',
        ANALYSIS_FAILED = 'analysis_failed',
        ANALYZED = 'analyzed',
        COMPLETED = 'completed',
        FAILED = 'failed',
    }

    export class Payload {
        scanId: string;
        status: StatusEnum;
    }
}
