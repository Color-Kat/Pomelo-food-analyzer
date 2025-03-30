export enum ScanType {
    FOOD = 'food',
    COSMETIC = 'cosmetic',
}

export interface IScan {
    type: ScanType;
}