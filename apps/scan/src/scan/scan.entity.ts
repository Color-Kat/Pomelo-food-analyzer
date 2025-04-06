import {IScan, ScanStatus, ScanType} from "@app/interfaces";

export class ScanEntity implements IScan {
    id: string;
    type: ScanType;
    status: ScanStatus;

    name: string;
    photoUrl: string;
    ingredients: string[];
    userId: string;

    createdAt?: Date;
    updatedAt?: Date;

    constructor(scan: Partial<IScan>) {
        if (scan.id) this.id = scan.id;
        this.type = scan.type || ScanType.FOOD;
        this.status = scan.status || ScanStatus.CREATED;
        this.userId = scan.userId || '';
        this.name = scan.name || '';
        this.photoUrl = scan.photoUrl || '';
        this.ingredients = scan.ingredients || [];
        this.createdAt = scan.createdAt || undefined
        this.updatedAt = scan.updatedAt || undefined;
    }

    public setStatus(status: ScanStatus) {
        this.status = status;
        return this;
    }

    public setPhoto(url: string) {
        this.photoUrl = url;
    }

    public setIngredients(ingredients: string[]) {
        this.ingredients = ingredients;
    }
}
