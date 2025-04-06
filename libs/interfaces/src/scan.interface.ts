export enum ScanType {
    FOOD = 'food',
    COSMETIC = 'cosmetic',
}

export enum ScanStatus {
    CREATED            = "created",
    RECOGNITION_FAILED = "recognition_failed",
    RECOGNIZED         = "recognized",
    ANALYSIS_FAILED    = "analysis_failed",
    COMPLETED          = "completed",
}

export interface IScan {
    id: string
    type: ScanType;
    status: ScanStatus

    name: string | null;
    photoUrl: string | null;
    ingredients: string[];
    userId: string;

    updatedAt?: Date;
    createdAt?: Date;
}