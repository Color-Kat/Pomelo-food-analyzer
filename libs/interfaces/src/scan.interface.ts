export enum ScanType {
    FOOD = 'food',
    COSMETIC = 'cosmetic',
}

export enum ScanStatus {
    STARTED = 'started',
    PHOTO_UPLOADED = 'uploaded',
    RECOGNIZING = 'recognizing',
    ANALYZING = 'analyzing',
    COMPLETED = 'completed',
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